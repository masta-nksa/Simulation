/* ==========================================================================
   Modelle «segregation» und «segregation-hand»: Segregation nach Schelling

   Die Stadt ist ein Raster aus quadratischen Feldern. Jedes Feld ist leer oder
   von genau einer Person bewohnt; jede Person gehört zu einer von zwei Gruppen
   (Dreiecke und Quadrate). Nachbarn sind die bis zu acht angrenzenden Felder,
   der Rand ist Stadtrand (kein Ring). Es gilt eine einzige Regel:

     Wer weniger gleiche Nachbarn hat, als der Wohlfühlfaktor verlangt, ist
     unzufrieden und zieht in ein zufällig gewähltes freies Feld – auch wenn
     es dort nicht besser ist. Wer keine Nachbarn hat, ist zufrieden.

   Bei jedem Umzug wird eine der unzufriedenen Personen zufällig ausgewählt.
   Das Modell folgt der «Parabel der Polygone» von Vi Hart und Nicky Case
   (ncase.me/polygons-de, gemeinfrei, CC0), die auf Thomas Schellings «Dynamic
   Models of Segregation» (1971) beruht. Was anders ist und warum:
   - Masszahl ist der Anteil gleicher Nachbarn im Durchschnitt aller Personen
     mit Nachbarn (bei zufälliger Verteilung etwa 50 %). Die Parabel rechnet
     ihn auf eine Skala «Segregation» von 0 bis 100 % um.
   - Gruppen und leere Felder werden genau abgezählt statt ausgewürfelt.
   - Sind nach 100 000 Umzügen noch nicht alle zufrieden, gilt die Stadt als «nicht
     zur Ruhe gekommen» (bei 80 % reicht das fast immer, ab 85 % nie).

     <div class="simulation" data-modell="segregation" data-ziel="segregation"></div>
     data-ziel     Messtabelle für den Knopf «Messen». Ohne data-ziel gibt es
                   den Knopf nicht.
     data-messen   Was «Messen» in die Tabelle schreibt, mit ; getrennt
                   (Standard: wohl;gleich;umzuege;ruhe):
                     wohl, vielfalt, dreiecke, leer   die Einstellungen in %
                     gleich                           Anteil gleicher Nachbarn in %
                     gleich-dreiecke, gleich-quadrate derselbe Anteil je Gruppe
                     umzuege                          Umzüge bis zur Ruhe
                     umzuege-dreiecke, umzuege-quadrate  davon je Gruppe
                     ruhe                             «ja» oder «nein»
     data-regler   Welche Regler erscheinen, mit ; getrennt (Standard: wohl):
                     wohl      Wohlfühlfaktor: mindestens so viele gleiche Nachbarn
                     vielfalt  Obergrenze: höchstens so viele gleiche Nachbarn
                     dreiecke  Anteil der Dreiecke an allen Personen
                     leer      Anteil leerer Felder
     data-werte    Startwerte in %, z. B. "wohl=33;vielfalt=100;dreiecke=50;leer=20"
     data-start    "getrennt": Dreiecke links, Quadrate rechts (sonst zufällig)

     <div class="simulation" data-modell="segregation-hand"></div>
     Von Hand: ein kleines Raster mit fester Startverteilung. Man zieht die
     unzufriedenen Personen selbst um, bis alle zufrieden sind.
     data-wohl     Wohlfühlfaktor in % (Standard: ein Drittel)
   ========================================================================== */

(function () {
  "use strict";

  var LEER = 0, DREIECK = 1, QUADRAT = 2;
  var GRUPPE = ["", "Dreieck", "Quadrat"];
  var MAX_UMZUEGE = 100000;

  // ------------------------------------------------------------ Das Modell
  // Eine Welt: Raster (breit × hoch) als Liste von Feldern, Zeile für Zeile.
  // Damit ein Umzug nicht die ganze Stadt neu prüfen muss, führt die Welt Buch:
  // pro Feld die Zahl der Nachbarn und der gleichen Nachbarn, dazu die Menge
  // der Unzufriedenen und die Menge der freien Felder.
  function welt(breit, hoch) {
    var n = breit * hoch;
    return { breit: breit, hoch: hoch, feld: new Int8Array(n),
             alle: new Int8Array(n), gleich: new Int8Array(n), unz: menge(n), frei: menge(n),
             wohl: 1 / 3, vielfalt: 1, umzuege: 0, umzuegeGruppe: [0, 0, 0] };
  }

  // Menge von Feldnummern: hinzufügen, entfernen, zufällig ziehen – alles in
  // einem Schritt, egal wie gross die Stadt ist.
  function menge(n) { var pos = new Int32Array(n); pos.fill(-1); return { el: [], pos: pos }; }
  function dazu(m, i) { if (m.pos[i] < 0) { m.pos[i] = m.el.length; m.el.push(i); } }
  function weg(m, i) {
    var p = m.pos[i];
    if (p < 0) return;
    var letztes = m.el.pop();
    if (letztes !== i) { m.el[p] = letztes; m.pos[letztes] = p; }
    m.pos[i] = -1;
  }
  function ziehen(m) { return m.el[Math.floor(Math.random() * m.el.length)]; }

  // Alle (höchstens acht) Nachbarfelder; am Stadtrand sind es weniger.
  function rundum(w, i, tun) {
    var x = i % w.breit, y = (i - x) / w.breit;
    for (var dy = -1; dy <= 1; dy++) {
      for (var dx = -1; dx <= 1; dx++) {
        var nx = x + dx, ny = y + dy;
        if ((dx || dy) && nx >= 0 && ny >= 0 && nx < w.breit && ny < w.hoch) tun(ny * w.breit + nx);
      }
    }
  }

  // Wie viele Nachbarn, wie viele davon gleich? (frisch gezählt)
  function nachbarn(w, i) {
    var g = w.feld[i], n = { alle: 0, gleich: 0 };
    rundum(w, i, function (j) {
      if (w.feld[j] === LEER) return;
      n.alle++;
      if (w.feld[j] === g) n.gleich++;
    });
    return n;
  }

  // Die Regel. Die kleine Zugabe verhindert, dass 1/3 wegen Rundung als
  // «weniger als 33,33 %» gilt.
  function unzufrieden(w, i) {
    if (w.feld[i] === LEER || w.alle[i] === 0) return false;
    var anteil = w.gleich[i] / w.alle[i];
    return anteil < w.wohl - 1e-9 || anteil > w.vielfalt + 1e-9;
  }
  function pruefen(w, i) { if (unzufrieden(w, i)) dazu(w.unz, i); else weg(w.unz, i); }
  function unzufriedene(w) { return w.unz.el; }

  // Buch neu anlegen: nach dem Besiedeln (Zählung) oder wenn ein Regler die
  // Regel geändert hat (nur Prüfung).
  function zaehlen(w) {
    for (var i = 0; i < w.feld.length; i++) {
      var nb = nachbarn(w, i);
      w.alle[i] = w.feld[i] === LEER ? 0 : nb.alle;
      w.gleich[i] = w.feld[i] === LEER ? 0 : nb.gleich;
      if (w.feld[i] === LEER) dazu(w.frei, i); else weg(w.frei, i);
    }
    regelPruefen(w);
  }
  function regelPruefen(w) { for (var i = 0; i < w.feld.length; i++) pruefen(w, i); }

  // Eine Person zieht von «von» nach «nach» (ein freies Feld).
  function verschieben(w, von, nach) {
    var g = w.feld[von];
    w.feld[von] = LEER;                      // auszählen: die alten Nachbarn verlieren jemanden
    rundum(w, von, function (j) { if (w.feld[j] !== LEER) { w.alle[j]--; if (w.feld[j] === g) w.gleich[j]--; } });
    w.feld[nach] = g;                        // einzählen: die neuen Nachbarn gewinnen jemanden
    rundum(w, nach, function (j) { if (w.feld[j] !== LEER) { w.alle[j]++; if (w.feld[j] === g) w.gleich[j]++; } });
    var nb = nachbarn(w, nach);
    w.alle[nach] = nb.alle; w.gleich[nach] = nb.gleich;
    w.alle[von] = 0; w.gleich[von] = 0;
    weg(w.frei, nach); dazu(w.frei, von);
    // Zufrieden oder nicht: Das kann sich nur rund um die beiden Felder ändern.
    pruefen(w, von); pruefen(w, nach);
    rundum(w, von, function (j) { pruefen(w, j); });
    rundum(w, nach, function (j) { pruefen(w, j); });
    w.umzuegeGruppe[g]++;
    w.umzuege++;
  }

  // Ein Umzug: eine zufällige unzufriedene Person in ein zufälliges freies Feld.
  // Rückgabe false, wenn alle zufrieden sind (oder kein Feld frei ist).
  function umziehen(w) {
    if (!w.unz.el.length || !w.frei.el.length) return false;
    verschieben(w, ziehen(w.unz), ziehen(w.frei));
    return true;
  }

  // Masszahl: Anteil gleicher Nachbarn, gemittelt über alle Personen mit
  // mindestens einem Nachbarn – insgesamt und je Gruppe.
  function masszahl(w) {
    var s = [0, 0, 0], n = [0, 0, 0];
    for (var i = 0; i < w.feld.length; i++) {
      var g = w.feld[i];
      if (g === LEER || !w.alle[i]) continue;
      s[g] += w.gleich[i] / w.alle[i]; n[g]++;
    }
    function q(a, b) { return b ? a / b : 0; }
    return { alle: q(s[1] + s[2], n[1] + n[2]), dreiecke: q(s[1], n[1]), quadrate: q(s[2], n[2]) };
  }

  // Neu besiedeln: genau abgezählte Gruppen, zufällig verteilt oder getrennt
  // (Dreiecke links, Quadrate rechts, die leeren Felder zufällig).
  function besiedeln(w, anteilDreiecke, anteilLeer, getrennt) {
    var zellen = w.feld.length;
    var leer = Math.round(zellen * anteilLeer);
    var personen = zellen - leer;
    var dreiecke = Math.round(personen * anteilDreiecke);
    var i, j, t, ort = [];
    for (i = 0; i < zellen; i++) ort.push(i);
    mischen(ort);
    var bewohnt = ort.slice(0, personen);
    if (getrennt) {
      // Bewohnte Felder von links nach rechts (spaltenweise) ordnen
      bewohnt.sort(function (a, b) { return (a % w.breit) - (b % w.breit) || a - b; });
    }
    w.feld.fill(LEER);
    for (i = 0; i < personen; i++) w.feld[bewohnt[i]] = i < dreiecke ? DREIECK : QUADRAT;
    w.umzuege = 0; w.umzuegeGruppe = [0, 0, 0];
    zaehlen(w);
    function mischen(a) { for (i = a.length - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = a[i]; a[i] = a[j]; a[j] = t; } }
  }

  // ------------------------------------------------------------ Zeichnen
  function form(ctx, g, x, y, s) {
    ctx.beginPath();
    if (g === DREIECK) {
      ctx.moveTo(x + s / 2, y + s * 0.12);
      ctx.lineTo(x + s * 0.9, y + s * 0.86);
      ctx.lineTo(x + s * 0.1, y + s * 0.86);
      ctx.closePath();
    } else {
      ctx.rect(x + s * 0.18, y + s * 0.18, s * 0.64, s * 0.64);
    }
    ctx.fill();
  }

  // Werte aus der Seite, z. B. data-werte="wohl=33;dreiecke=50"
  function einstellungen(text) {
    var e = {};
    String(text || "").split(";").forEach(function (teil) {
      var k = teil.indexOf("=");
      if (k > 0) e[teil.slice(0, k).trim()] = parseFloat(teil.slice(k + 1));
    });
    return e;
  }
  function prozent(x) { return Math.round(x * 100); }

  // ------------------------------------------------------------ Modell «segregation»
  function bauen(kasten, h) {
    var N = 20;
    var ziel = kasten.dataset.ziel || "";
    var messen = (kasten.dataset.messen || "wohl;gleich;umzuege;ruhe").split(";").map(function (s) { return s.trim(); });
    var welche = (kasten.dataset.regler || "wohl").split(";").map(function (s) { return s.trim(); });
    var start = einstellungen(kasten.dataset.werte);
    var getrennt = kasten.dataset.start === "getrennt";
    function wert(k, ersatz) { return isNaN(start[k]) ? ersatz : start[k]; }

    var w = welt(N, N);
    var verlauf = [];             // Anteil gleicher Nachbarn nach jedem Umzug
    var laeuft = false, rahmen = null, letzte = 0, ruhe = false;

    // Bilder: links die Stadt, rechts der Verlauf der Masszahl
    var stadt = h.leinwand(300, 300, "Stadt aus 20 × 20 Feldern mit Dreiecken und Quadraten; unzufriedene Personen sind gelb hinterlegt.");
    var kurve = h.leinwand(320, 300, "Verlauf: Anteil gleicher Nachbarn in Abhängigkeit von der Zahl der Umzüge.");
    var bilder = h.el("div", { class: "seg-bilder" });
    bilder.append(stadt.element, kurve.element);
    var legende = legendeBauen(h);

    // Regler
    var R = {};
    R.wohl = h.regler({ titel: "Wohlfühlfaktor: mindestens … gleiche Nachbarn", min: 0, max: 100, wert: wert("wohl", 33), einheit: "%",
      beiAenderung: function (v) { w.wohl = v / 100; regelPruefen(w); weiterGehts(); } });
    R.vielfalt = h.regler({ titel: "Vielfalt: höchstens … gleiche Nachbarn", min: 0, max: 100, wert: wert("vielfalt", 100), einheit: "%",
      beiAenderung: function (v) { w.vielfalt = v / 100; regelPruefen(w); weiterGehts(); } });
    R.dreiecke = h.regler({ titel: "Anteil Dreiecke", min: 10, max: 90, schritt: 5, wert: wert("dreiecke", 50), einheit: "%",
      beiAenderung: function () { neu(); } });
    R.leer = h.regler({ titel: "Leere Felder", min: 5, max: 50, schritt: 5, wert: wert("leer", 20), einheit: "%",
      beiAenderung: function () { neu(); } });
    w.wohl = R.wohl.wert() / 100; w.vielfalt = R.vielfalt.wert() / 100;

    var TAKT = [4, 40, 400], TAKT_NAME = ["langsam", "mittel", "schnell"];   // Umzüge pro Sekunde
    var tempo = h.regler({ titel: "Tempo der Anzeige", min: 0, max: 2, wert: 1, format: function (v) { return TAKT_NAME[v]; } });

    var status = h.el("p", { class: "sim-status", "aria-live": "off" });
    var meldung = h.el("p", { class: "sim-status sim-meldung", "aria-live": "polite" });
    var knopfStart = h.knopf("Start", function () {
      if (laeuft) { laeuft = false; beschriften(); return; }
      if (!unzufriedene(w).length) { meldung.textContent = "Alle sind zufrieden – niemand zieht um. Ändern Sie einen Regler oder verteilen Sie neu."; return; }
      laeuft = true; ruhe = false; meldung.textContent = ""; beschriften(); schleife();
    }, "haupt");
    var knopfNeu = h.knopf("Neu verteilen", function () { neu(); });
    var leiste = h.el("div", { class: "sim-knoepfe" });
    leiste.append(knopfStart, knopfNeu);
    if (ziel) leiste.appendChild(h.knopf("Messen", messenKlick));

    var reglerBox = h.el("div", { class: "sim-reglerfeld" });
    ["wohl", "vielfalt", "dreiecke", "leer"].forEach(function (k) { if (welche.indexOf(k) >= 0) reglerBox.appendChild(R[k].element); });
    reglerBox.appendChild(tempo.element);
    kasten.append(bilder, legende, status, leiste, meldung, reglerBox);

    function neu() {
      laeuft = false; ruhe = false;
      besiedeln(w, R.dreiecke.wert() / 100, R.leer.wert() / 100, getrennt);
      verlauf = [masszahl(w).alle];
      meldung.textContent = "";
      beschriften(); zeichne();
    }
    // Ein Regler hat die Regel geändert: Wer jetzt unzufrieden ist, zeigt sich
    // sofort; weiter geht es mit «Start».
    function weiterGehts() {
      if (ruhe && unzufriedene(w).length) { ruhe = false; meldung.textContent = ""; }
      beschriften(); zeichne();
    }

    function ein() {
      if (!umziehen(w)) return false;
      verlauf.push(masszahl(w).alle);
      return true;
    }
    function angekommen() {
      laeuft = false; ruhe = true;
      var m = masszahl(w);
      meldung.textContent = unzufriedene(w).length
        ? "Nach " + MAX_UMZUEGE.toLocaleString("de-CH") + " Umzügen sind noch nicht alle zufrieden – die Stadt kommt nicht zur Ruhe. Anteil gleicher Nachbarn: " + prozent(m.alle) + " %."
        : "Alle sind zufrieden – nach " + w.umzuege + " Umzügen. Anteil gleicher Nachbarn: " + prozent(m.alle) + " %.";
    }

    // «Messen»: ein ganzer Durchgang im Hintergrund – neu verteilen, umziehen
    // lassen, bis alle zufrieden sind (oder bis zur Höchstzahl), Ergebnis in
    // die Tabelle. Gezeigt wird danach der Endzustand.
    function messenKlick() {
      neu();
      while (w.umzuege < MAX_UMZUEGE && ein()) { /* weiter */ }
      angekommen();
      var m = masszahl(w), zufrieden = !unzufriedene(w).length;
      var werte = {
        wohl: R.wohl.wert(), vielfalt: R.vielfalt.wert(), dreiecke: R.dreiecke.wert(), leer: R.leer.wert(),
        gleich: prozent(m.alle), "gleich-dreiecke": prozent(m.dreiecke), "gleich-quadrate": prozent(m.quadrate),
        umzuege: w.umzuege, "umzuege-dreiecke": w.umzuegeGruppe[DREIECK], "umzuege-quadrate": w.umzuegeGruppe[QUADRAT],
        ruhe: zufrieden ? "ja" : "nein"
      };
      h.Daten.anhaengen(ziel, messen.map(function (k) { return werte[k] == null ? "" : werte[k]; }));
      meldung.textContent += " Der Messwert steht in der Tabelle.";
      beschriften(); zeichne();
    }

    function schleife() {
      if (rahmen) cancelAnimationFrame(rahmen);
      letzte = 0;
      rahmen = requestAnimationFrame(function takt(jetzt) {
        rahmen = null;
        if (!laeuft) return;
        // Nach der Uhr rechnen, nicht nach Bildern (wie beim Stau)
        var ms = 1000 / TAKT[tempo.wert()];
        if (!letzte) letzte = jetzt - ms;
        var faellig = Math.min(200, Math.floor((jetzt - letzte) / ms));
        if (faellig > 0) {
          letzte = faellig === 200 ? jetzt : letzte + faellig * ms;
          for (var k = 0; k < faellig; k++) {
            if (w.umzuege >= MAX_UMZUEGE || !ein()) { angekommen(); break; }
          }
          beschriften(); zeichne();
        }
        if (laeuft) rahmen = requestAnimationFrame(takt);
      });
    }

    function beschriften() {
      knopfStart.textContent = laeuft ? "Pause" : (w.umzuege && !ruhe ? "Weiter" : "Start");
      var m = masszahl(w);
      var t = "Umzüge: " + w.umzuege + " · unzufrieden: " + unzufriedene(w).length + " · Anteil gleicher Nachbarn: " + prozent(m.alle) + " %";
      if (welche.indexOf("dreiecke") >= 0) t += " (Dreiecke " + prozent(m.dreiecke) + " %, Quadrate " + prozent(m.quadrate) + " %)";
      status.textContent = t;
    }

    function zeichne() {
      var f = h.farben();
      zeichneStadt(stadt, w, f, null);
      zeichneVerlauf(f);
    }

    function zeichneVerlauf(f) {
      var ctx = kurve.ctx, B = kurve.breite, H = kurve.hoehe;
      var L = 44, Rr = 12, O = 14, U = 40;
      ctx.fillStyle = f.grund; ctx.fillRect(0, 0, B, H);
      ctx.font = "500 11px " + (getComputedStyle(document.documentElement).getPropertyValue("--font-mono") || "monospace");
      var xmax = schoen(Math.max(100, verlauf.length - 1));
      function X(x) { return L + x / xmax * (B - L - Rr); }
      function Y(p) { return H - U - p * (H - O - U); }
      // Raster und Beschriftung
      ctx.lineWidth = 1; ctx.textAlign = "right";
      for (var p = 0; p <= 1.0001; p += 0.25) {
        ctx.strokeStyle = p === 0 ? f.text : f.linie; ctx.globalAlpha = p === 0 ? 1 : 0.35;
        ctx.beginPath(); ctx.moveTo(L, Y(p) + .5); ctx.lineTo(B - Rr, Y(p) + .5); ctx.stroke();
        ctx.globalAlpha = 1; ctx.fillStyle = f.gedaempft;
        ctx.fillText(prozent(p) + " %", L - 6, Y(p) + 4);
      }
      ctx.textAlign = "center";
      for (var x = 0; x <= xmax; x += xmax / 4) ctx.fillText(String(Math.round(x)), X(x), H - U + 15);
      ctx.fillStyle = f.text;
      ctx.fillText("Umzüge →", (L + B - Rr) / 2, H - 6);
      ctx.textAlign = "left";
      ctx.fillText("Anteil gleicher Nachbarn", L, O - 3);

      // Gestrichelte Linien: die Regel (Wohlfühlfaktor, Vielfalt)
      ctx.setLineDash([5, 4]); ctx.strokeStyle = f.text; ctx.lineWidth = 1;
      [[w.wohl, "Wohlfühlfaktor"], [w.vielfalt, "Vielfalt"]].forEach(function (g) {
        if (g[1] === "Vielfalt" && welche.indexOf("vielfalt") < 0) return;
        if (g[1] === "Wohlfühlfaktor" && g[0] <= 0) return;
        ctx.beginPath(); ctx.moveTo(L, Y(g[0]) + .5); ctx.lineTo(B - Rr, Y(g[0]) + .5); ctx.stroke();
        ctx.fillStyle = f.gedaempft; ctx.textAlign = "right";
        ctx.fillText(g[1] + " " + prozent(g[0]) + " %", B - Rr - 2, Y(g[0]) + (g[0] > 0.9 ? 13 : -4));
      });
      ctx.setLineDash([]);

      // Kurve (bei langen Läufen ausgedünnt)
      var schritt = Math.max(1, Math.floor(verlauf.length / 400));
      ctx.strokeStyle = f.text; ctx.lineWidth = 2; ctx.beginPath();
      for (var i = 0; i < verlauf.length; i += schritt) {
        if (i) ctx.lineTo(X(i), Y(verlauf[i])); else ctx.moveTo(X(i), Y(verlauf[i]));
      }
      var n = verlauf.length - 1;
      if (n > 0) ctx.lineTo(X(n), Y(verlauf[n]));
      ctx.stroke();
      ctx.fillStyle = f.text;                     // Punkt: der aktuelle Stand
      ctx.beginPath(); ctx.arc(X(n), Y(verlauf[n]), 3, 0, 2 * Math.PI); ctx.fill();
    }

    document.addEventListener("sim:farben", zeichne);
    neu();
  }

  // Achsenende: 100, 200, 500, 1000, 2000, …
  function schoen(n) {
    var p = Math.pow(10, Math.floor(Math.log10(n)));
    var m = n / p;
    return (m <= 1 ? 1 : m <= 2 ? 2 : m <= 5 ? 5 : 10) * p;
  }

  function zeichneStadt(bild, w, f, auswahl) {
    var ctx = bild.ctx, s = bild.breite / w.breit;
    ctx.fillStyle = f.grund; ctx.fillRect(0, 0, bild.breite, bild.hoehe);
    // feines Raster
    ctx.strokeStyle = f.linie; ctx.globalAlpha = 0.25; ctx.lineWidth = 1;
    for (var k = 0; k <= w.breit; k++) {
      ctx.beginPath(); ctx.moveTo(k * s + .5, 0); ctx.lineTo(k * s + .5, w.hoch * s); ctx.stroke();
    }
    for (k = 0; k <= w.hoch; k++) {
      ctx.beginPath(); ctx.moveTo(0, k * s + .5); ctx.lineTo(w.breit * s, k * s + .5); ctx.stroke();
    }
    ctx.globalAlpha = 1;
    for (var i = 0; i < w.feld.length; i++) {
      var g = w.feld[i];
      if (g === LEER) continue;
      var x = (i % w.breit) * s, y = Math.floor(i / w.breit) * s;
      // Auf Gelb sind beide Formen dunkel (auch im dunklen Modus), sonst
      // Dreiecke in Tinte, Quadrate grau.
      if (unzufrieden(w, i)) {
        ctx.fillStyle = f.marker; ctx.fillRect(x + 1, y + 1, s - 1, s - 1);
        ctx.fillStyle = f.aufMarker;
      } else ctx.fillStyle = g === DREIECK ? f.text : f.linie;
      form(ctx, g, x, y, s);
    }
  }

  // Legende als kleine Zeile unter den Bildern
  function legendeBauen(h) {
    var p = h.el("p", { class: "seg-legende" });
    function zeichen(klasse, text) {
      var span = h.el("span", { class: "seg-zeichen " + klasse, "aria-hidden": "true" });
      p.append(span, " " + text + "   ");
    }
    zeichen("dreieck", "Dreieck");
    zeichen("quadrat", "Quadrat");
    zeichen("unzufrieden", "unzufrieden (zieht um)");
    return p;
  }

  // ------------------------------------------------------------ Modell «segregation-hand»
  // 6 × 8 Felder, 18 Dreiecke (D), 18 Quadrate (Q), 12 leere Felder (.). Mit
  // dem Wohlfühlfaktor von einem Drittel sind zu Beginn acht Personen
  // unzufrieden, der Anteil gleicher Nachbarn liegt bei etwa 50 %.
  var START_HAND = [
    ".D..DQDQ",
    "QD.QQ.DD",
    "DDQQQ.DD",
    "QDQDQQQ.",
    ".DDQDQQ.",
    ".QD.DD.Q"
  ];

  function hand(kasten, h) {
    var w = welt(START_HAND[0].length, START_HAND.length);
    var p = parseFloat(kasten.dataset.wohl);
    w.wohl = isNaN(p) ? 1 / 3 : p / 100;
    var gewaehlt = -1, anfang = 0;

    var raster = h.el("div", { class: "seg-hand", role: "group", "aria-label": "Stadt aus " + w.hoch + " × " + w.breit + " Feldern" });
    raster.style.gridTemplateColumns = "repeat(" + w.breit + ", 1fr)";
    var knoepfe = [];
    for (var i = 0; i < w.feld.length; i++) {
      var b = h.el("button", { type: "button", class: "seg-feld" });
      b.addEventListener("pointerdown", druck.bind(null, i));
      b.addEventListener("pointerup", los.bind(null, i));
      b.addEventListener("keydown", taste.bind(null, i));
      knoepfe.push(b); raster.appendChild(b);
    }
    var legende = legendeBauen(h);
    var status = h.el("p", { class: "sim-status", "aria-live": "off" });
    var info = h.el("p", { class: "seg-info", "aria-live": "polite" });
    var leiste = h.el("div", { class: "sim-knoepfe" });
    leiste.appendChild(h.knopf("Von vorn", start));
    kasten.append(raster, legende, status, info, leiste);

    // Person anklicken, dann ein freies Feld anklicken. Mit der Maus geht auch
    // Ziehen: Person anfassen, im freien Feld loslassen. (Auf dem Touchscreen
    // bleibt der Finger beim Ziehen am ersten Feld hängen – dort also tippen.)
    function druck(i) { if (w.feld[i] !== LEER) waehlen(i); }
    function los(i) { if (w.feld[i] === LEER && gewaehlt >= 0) setzen(gewaehlt, i); }
    function taste(i, ev) {
      if (ev.key !== "Enter" && ev.key !== " ") return;
      ev.preventDefault();
      if (w.feld[i] === LEER) { if (gewaehlt >= 0) setzen(gewaehlt, i); }
      else waehlen(i);
    }

    function waehlen(i) {
      var nb = nachbarn(w, i), wer = GRUPPE[w.feld[i]];
      var anteil = nb.alle ? nb.gleich / nb.alle : 0;
      var text = wer + ": " + nb.gleich + " von " + nb.alle + " Nachbarn gleich" + (nb.alle ? " (" + prozent(anteil) + " %)" : "") + " – ";
      if (!nb.alle) text += "keine Nachbarn, also zufrieden.";
      else if (unzufrieden(w, i)) text += "weniger als " + wohlText() + ", also unzufrieden. Klicken Sie auf ein freies Feld, um umzuziehen.";
      else text += "mindestens " + wohlText() + ", also zufrieden. Umziehen dürfen nur Unzufriedene.";
      gewaehlt = unzufrieden(w, i) ? i : -1;
      info.textContent = text;
      zeichne(i);
    }
    function setzen(von, nach) {
      verschieben(w, von, nach);
      gewaehlt = -1;
      var u = unzufriedene(w).length;
      var nb = nachbarn(w, nach);
      info.textContent = u
        ? "Umgezogen. Am neuen Ort: " + nb.gleich + " von " + nb.alle + " Nachbarn gleich" + (unzufrieden(w, nach) ? " – immer noch unzufrieden." : " – zufrieden.") +
          " Achtung: Der Umzug kann andere unzufrieden machen."
        : "Geschafft: Alle sind zufrieden – nach " + w.umzuege + " Umzügen. Anteil gleicher Nachbarn: vorher " + prozent(anfang) + " %, jetzt " + prozent(masszahl(w).alle) + " %.";
      zeichne(nach);
    }
    function wohlText() {
      return Math.abs(w.wohl - 1 / 3) < 1e-6 ? "ein Drittel" : prozent(w.wohl) + " %";
    }

    function start() {
      START_HAND.forEach(function (zeile, y) {
        for (var x = 0; x < zeile.length; x++) w.feld[y * w.breit + x] = zeile[x] === "D" ? DREIECK : zeile[x] === "Q" ? QUADRAT : LEER;
      });
      zaehlen(w);
      w.umzuege = 0; gewaehlt = -1; anfang = masszahl(w).alle;
      info.textContent = "Wählen Sie eine gelb hinterlegte Person aus.";
      zeichne(-1);
    }

    function zeichne(markiert) {
      var mx = markiert >= 0 ? markiert % w.breit : -9, my = markiert >= 0 ? Math.floor(markiert / w.breit) : -9;
      for (var i = 0; i < w.feld.length; i++) {
        var g = w.feld[i], x = i % w.breit, y = Math.floor(i / w.breit);
        var nachbar = i !== markiert && Math.abs(x - mx) <= 1 && Math.abs(y - my) <= 1;
        var b = knoepfe[i];
        b.className = "seg-feld" + (g ? " " + (g === DREIECK ? "dreieck" : "quadrat") : " leer") +
          (unzufrieden(w, i) ? " unzufrieden" : "") + (i === markiert ? " gewaehlt" : "") + (nachbar ? " nachbar" : "");
        b.textContent = "";
        if (g) b.appendChild(h.el("span", { class: "seg-zeichen " + (g === DREIECK ? "dreieck" : "quadrat"), "aria-hidden": "true" }));
        b.setAttribute("aria-label", "Zeile " + (y + 1) + ", Spalte " + (x + 1) + ": " +
          (g ? GRUPPE[g] + (unzufrieden(w, i) ? ", unzufrieden" : ", zufrieden") : "frei"));
      }
      status.textContent = "Umzüge: " + w.umzuege + " · unzufrieden: " + unzufriedene(w).length +
        " · Anteil gleicher Nachbarn: " + prozent(masszahl(w).alle) + " %";
    }

    start();
  }

  if (typeof window !== "undefined" && window.Simulation) {
    window.Simulation.modell("segregation", bauen);
    window.Simulation.modell("segregation-hand", hand);
  }
  // Für Testläufe ausserhalb des Browsers (Node)
  if (typeof module === "object" && module.exports) {
    module.exports = { welt: welt, besiedeln: besiedeln, umziehen: umziehen, unzufriedene: unzufriedene, verschieben: verschieben, zaehlen: zaehlen,
      masszahl: masszahl, nachbarn: nachbarn, START_HAND: START_HAND, MAX_UMZUEGE: MAX_UMZUEGE };
  }
})();
