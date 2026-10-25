/* ==========================================================================
   Fortschritt: Wie weit ist eine Unterlage bearbeitet?

   Zählt auf jeder Unterlage der SuS die Aufgaben und wie viele davon schon
   bearbeitet sind, merkt sich das Ergebnis im Browser und zeigt es an – in
   beiden Designs gleich:

   - als Farbe der ganzen Seite (Rahmen, Schimmer am Rand, leichter Grundton):
     So sieht die Lehrperson im Vorbeigehen, wie weit jemand gekommen ist,
   - als Leiste unter der Kopfzeile und als Zähler neben den Badges,
   - auf der Lektionsseite an jeder Unterlage (die Seite selbst trägt die
     Farbe der ganzen Lektion), auf der Startseite an jeder Lektion und in der
     Kopfzeile unter jeder Lektionsnummer. Die Startseite selbst bleibt
     ungefärbt – über die ganze Einheit gerechnet wäre sie fast immer orange.

   AUFGABEN UND «BEARBEITET» (die Felder baut uebungen.js)
     Lücke, Auswahlliste   etwas eingetragen bzw. gewählt
     Auswahl-Chips         mindestens ein Chip gewählt
     Antwortfeld           mindestens drei Zeichen geschrieben
     Multiple Choice       mindestens ein Kästchen angekreuzt
     Checkliste            mindestens ein Punkt abgehakt (die ganze Liste
                           zählt als eine Aufgabe – Lernziele hakt man nur
                           ab, wenn man sie sicher kann)
     Messtabelle           mindestens eine Zeile mit Werten
   Simulationen selbst zählen nicht, nur was man aus ihnen festhält. Ob eine
   Antwort stimmt, spielt für die Farbe keine Rolle; wer eine ganze Unterlage
   fehlerfrei geprüft hat, bekommt zusätzlich einen Stern (★).

   STUFEN                                       Anteil bearbeitet
     0  keine Farbe   noch nicht begonnen       0 %
     1  Orange        begonnen                  unter einem Drittel
     2  Gelb          gut unterwegs             ab einem Drittel
     3  Hellgrün      fast fertig               ab zwei Dritteln
     4  Grün          fertig                    alles
   Die Farben stehen als --fs-1 … --fs-4 im Stylesheet (Abschnitt 8).

   WELCHE SEITEN
     Gezählt wird auf Unterlagen (layout: material), ausser für die
     Lehrperson, Musterlösungen und das Dossier. Eine Lektion ist der
     Durchschnitt ihrer Unterlagen; Zusatz-Etappen sind freiwillig und zählen
     dort nicht mit, zeigen aber ihren eigenen Stand. Eine Unterlage, die noch
     nie geöffnet wurde, zählt als 0 %. Welche Unterlagen zu einer Lektion
     gehören, schreibt Jekyll an die Lektionsnummern der Kopfzeile
     (data-fs-seiten), die Art der Seite an <body> (data-fs-ansicht).

   EREIGNISSE
     «fortschritt:stufe» (detail: stufe, vorher, lektion), sobald nach einer
     Eingabe gut eine Sekunde Ruhe herrscht und die Stufe gestiegen ist – darauf
     hört feier.js.

   Gespeichert wird unter «fortschritt:<Adresse der Unterlage>» – nur auf
   diesem Gerät, es wird nichts übertragen.
   ========================================================================== */

(function () {
  "use strict";

  var PREFIX = "fortschritt:";
  var TEXT = ["noch nicht begonnen", "begonnen", "gut unterwegs", "fast fertig", "fertig"];

  // ------------------------------------------------------------ Speicher
  function lesen(url) {
    try { var v = JSON.parse(localStorage.getItem(PREFIX + url)); return v && typeof v === "object" ? v : null; }
    catch (e) { return null; }
  }
  function schreiben(url, v) {
    try { localStorage.setItem(PREFIX + url, JSON.stringify(v)); } catch (e) { /* gesperrt */ }
  }

  // ------------------------------------------------------------ Rechnen
  // Anteil einer Unterlage 0 … 1. Eine geöffnete Seite ohne Aufgaben ist fertig.
  function anteil(url) {
    var v = lesen(url);
    if (!v) return 0;
    return v.a ? Math.min(1, v.b / v.a) : 1;
  }
  function stufe(p) {
    if (p == null || p <= 0) return 0;
    if (p >= 1) return 4;
    return p < 1 / 3 ? 1 : p < 2 / 3 ? 2 : 3;
  }
  function mittel(urls) {
    if (!urls.length) return null;
    return urls.reduce(function (s, u) { return s + anteil(u); }, 0) / urls.length;
  }
  function navLektion(nr) { return document.querySelector('.site-nav a[data-fs-lektion="' + nr + '"]'); }
  function seitenDerLektion(nr) {
    var a = navLektion(nr);
    return a && a.dataset.fsSeiten ? a.dataset.fsSeiten.split(/\s+/).filter(Boolean) : [];
  }
  function prozent(p) { return Math.round(p * 100) + " %"; }

  // ------------------------------------------------------------ Zählen
  function q(wurzel, sel) { return Array.prototype.slice.call(wurzel.querySelectorAll(sel)); }
  function ausserhalbSimulation(e) { return !e.closest(".simulation"); }
  function messwerte(id) {
    var D = window.Simulation && window.Simulation.Daten;
    return !!D && D.lesen(id).some(function (z) { return z.some(function (w) { return String(w == null ? "" : w).trim() !== ""; }); });
  }
  function zaehlen(art) {
    var a = 0, b = 0;
    function aufgabe(fertig) { a++; if (fertig) b++; }
    q(art, ".luecke-feld").filter(ausserhalbSimulation).forEach(function (f) { aufgabe(f.value.trim() !== ""); });
    q(art, ".wahl-gruppe").filter(ausserhalbSimulation).forEach(function (g) { aufgabe(!!g.querySelector('.chip[aria-pressed="true"]')); });
    q(art, ".antwort-feld").forEach(function (t) { aufgabe(t.value.replace(/\s/g, "").length >= 3); });
    q(art, "ul.mc-liste, ul.checkliste").forEach(function (ul) { aufgabe(!!ul.querySelector("input:checked")); });
    q(art, ".messtabelle[data-id]").forEach(function (t) { aufgabe(messwerte(t.dataset.id)); });
    return { a: a, b: b };
  }

  // ------------------------------------------------------------ Anzeigen
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function stufeSetzen(e, p) {
    if (p == null) { e.removeAttribute("data-fs-stufe"); return; }
    e.setAttribute("data-fs-stufe", stufe(p));
    e.style.setProperty("--fs-anteil", p.toFixed(3));
  }

  // Kleine Leiste mit Text, für Karten und die Lektionsliste
  function mini(ziel, p, text) {
    var m = ziel.querySelector(":scope > .fs-mini");
    if (!m) {
      m = el("span", "fs-mini");
      m.append(el("span", "fs-mini-leiste"), el("span", "fs-mini-text"));
      ziel.appendChild(m);
    }
    stufeSetzen(m, p);
    m.querySelector(".fs-mini-text").textContent = text;
  }

  // Leiste unter der Kopfzeile und Farbe der Seite
  function seiteFaerben(p, beschriftung) {
    stufeSetzen(document.documentElement, p);
    var kopf = document.querySelector(".site-header");
    if (!kopf) return;
    var leiste = kopf.querySelector(".fs-leiste");
    if (!leiste) {
      leiste = el("div", "fs-leiste");
      leiste.setAttribute("role", "progressbar");
      leiste.setAttribute("aria-valuemin", "0");
      leiste.setAttribute("aria-valuemax", "100");
      leiste.appendChild(el("span"));
      kopf.appendChild(leiste);
    }
    leiste.setAttribute("aria-label", beschriftung);
    leiste.setAttribute("aria-valuenow", String(Math.round(p * 100)));
    leiste.setAttribute("aria-valuetext", prozent(p) + " – " + TEXT[stufe(p)]);
  }

  function lektionsnummern() {
    Array.prototype.forEach.call(document.querySelectorAll(".site-nav a[data-fs-seiten]"), function (a) {
      var p = mittel(seitenDerLektion(a.dataset.fsLektion));
      stufeSetzen(a, p);
      if (a.dataset.fsTitel == null) a.dataset.fsTitel = a.title;
      if (p != null) a.title = a.dataset.fsTitel + " – " + prozent(p) + " bearbeitet";
    });
  }

  function seitenText(url) {
    var v = lesen(url);
    if (!v) return "noch nicht geöffnet";
    var t = !v.a ? "gelesen" : v.b >= v.a ? "✓ fertig" : v.b + " von " + v.a + " Aufgaben";
    return v.s ? t + " · ★ alles richtig" : t;
  }

  // Lektionsseite: jede Unterlage einzeln
  function karten() {
    Array.prototype.forEach.call(document.querySelectorAll("[data-fs-url]"), function (a) {
      var url = a.dataset.fsUrl;
      var p = lesen(url) ? anteil(url) : 0;
      stufeSetzen(a, p);
      mini(a, p, seitenText(url));
    });
  }

  // Startseite: jede Lektion als Durchschnitt ihrer Unterlagen
  function lektionsliste() {
    Array.prototype.forEach.call(document.querySelectorAll(".lektion-list [data-fs-lektion]"), function (a) {
      var urls = seitenDerLektion(a.dataset.fsLektion);
      var p = mittel(urls);
      if (p == null) return;
      var fertig = urls.filter(function (u) { return anteil(u) >= 1; }).length;
      stufeSetzen(a, p);
      var ziel = a.querySelector(".lektion-body") || a;
      mini(ziel, p, p <= 0 ? "noch nicht begonnen" : prozent(p) + " · " + fertig + " von " + urls.length + " Unterlagen fertig");
    });
  }

  // Zähler unter dem Titel einer Lektion bzw. neben den Badges einer Unterlage
  function zaehler(ziel, text, p) {
    if (!ziel) return;
    var z = ziel.querySelector(":scope > .fs-zaehler");
    if (!z) { z = el("span", "fs-zaehler"); ziel.appendChild(z); }
    stufeSetzen(z, p);
    z.textContent = text;
  }

  // ------------------------------------------------------------ Seitenarten
  var body = document.body;
  var ansicht = body.dataset.fsAnsicht;
  var lektion = body.dataset.fsLektion;
  var seite = body.dataset.fsSeite;
  var art = document.querySelector("article.prose");

  function lektionsStand() {
    if (!lektion) return null;
    var urls = seitenDerLektion(lektion);
    var a = navLektion(lektion);
    return urls.length ? { nr: lektion, anteil: mittel(urls), url: a ? a.getAttribute("href") : "" } : null;
  }

  function zeichneUebersichten() {
    lektionsnummern();
    karten();
    lektionsliste();
    if (ansicht === "lektion") {
      var l = lektionsStand();
      if (l) {
        seiteFaerben(l.anteil, "Fortschritt in Lektion " + lektion);
        var urls = seitenDerLektion(lektion);
        var fertig = urls.filter(function (u) { return anteil(u) >= 1; }).length;
        zaehler(document.querySelector(".lektion-header"), "Fortschritt: " + prozent(l.anteil) + " · " + fertig + " von " + urls.length + " Unterlagen fertig", l.anteil);
      }
    }
  }

  var stand = null, gemeldet = 0, ruhe = null;
  function seiteMessen() {
    if (ansicht !== "seite" || !seite || !art) return;
    var neu = zaehlen(art), alt = lesen(seite) || {};
    var p = neu.a ? neu.b / neu.a : 1;
    if (!stand || neu.a !== stand.a || neu.b !== stand.b || !lesen(seite)) {
      schreiben(seite, { a: neu.a, b: neu.b, s: alt.s ? 1 : 0, z: Date.now() });
    }
    stand = neu;
    seiteFaerben(p, "Fortschritt auf dieser Unterlage");
    var tags = document.querySelector(".material-tags");
    if (neu.a) zaehler(tags, neu.b + " von " + neu.a + " Aufgaben bearbeitet" + (alt.s ? " · ★" : ""), p);
    lektionsnummern();
    return p;
  }

  // Nach einer Eingabe: Anzeige sofort, Meldung an feier.js erst nach einer
  // kurzen Pause – sonst ginge das Feuerwerk mitten im Tippen los.
  var zeichnen = null;
  function geaendert() {
    clearTimeout(zeichnen);
    zeichnen = setTimeout(function () {
      var p = seiteMessen();
      if (p == null) return;
      clearTimeout(ruhe);
      ruhe = setTimeout(function () {
        var s = stufe(p);
        if (s > gemeldet) {
          document.dispatchEvent(new CustomEvent("fortschritt:stufe", { detail: { stufe: s, vorher: gemeldet, anteil: p, seite: seite, lektion: lektionsStand() } }));
        }
        gemeldet = s;
      }, 1200);
    }, 80);
  }

  function start() {
    if (ansicht === "seite" && seite && art) {
      gemeldet = stufe(seiteMessen());
      ["input", "change", "click"].forEach(function (typ) { art.addEventListener(typ, geaendert); });
      document.addEventListener("sim:daten", geaendert);
    }
    zeichneUebersichten();
  }

  // Stern für eine fehlerfrei geprüfte Unterlage; «Alle Eingaben löschen» nimmt ihn weg
  function sternSetzen(an) {
    if (!seite) return;
    var v = lesen(seite) || zaehlen(art);
    v.s = an ? 1 : 0;
    schreiben(seite, v);
    stand = null;
    geaendert();
  }
  document.addEventListener("uebungen:geprueft", function (ev) {
    if (ansicht === "seite" && ev.detail.container === art && ev.detail.seiteRichtig) sternSetzen(true);
  });
  document.addEventListener("uebungen:geloescht", function (ev) {
    if (ansicht === "seite" && ev.detail.container === art) { sternSetzen(false); gemeldet = 0; }
  });

  // Andere Registerkarte oder «Zurück» im Browser: neu zeichnen
  window.addEventListener("storage", function (ev) { if (!ev.key || ev.key.indexOf(PREFIX) === 0) { stand = null; seiteMessen(); zeichneUebersichten(); } });
  window.addEventListener("pageshow", function (ev) { if (ev.persisted) { stand = null; seiteMessen(); zeichneUebersichten(); } });

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();

  window.Fortschritt = { anteil: anteil, stufe: stufe, lektion: lektionsStand, text: TEXT };
})();
