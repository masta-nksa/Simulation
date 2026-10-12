/* ==========================================================================
   Simulationen, Messtabellen und Schaubilder

   Drei Bausteine, die im Markdown als leere Platzhalter stehen (als HTML
   schreiben, Leerzeile davor und danach). Auf Papier erscheint statt einer
   Simulation ein Hinweis, Messtabellen und Schaubilder werden gedruckt.

   SIMULATION
     <div class="simulation" data-modell="brown" data-ziel="brown"></div>
     data-modell   Name des Modells (siehe sim-*.js)
     data-ziel     Kennung der Messtabelle, in die jeder Durchgang sein
                   Ergebnis schreibt

   MESSTABELLE
     <div class="messtabelle" data-id="essig" data-spalten="Abstand (cm);Zeit (s)" data-zeilen="6"></div>
     data-id       Kennung. Sie gilt für die ganze Einheit: Eine Tabelle, die
                   in Lektion 1 ausgefüllt wird, lässt sich in Lektion 2 als
                   Schaubild zeigen.
     data-spalten  Spaltentitel, mit ; getrennt
     data-zeilen   Anzahl leerer Zeilen zum Ausfüllen (Standard 5)
     data-fest     Die Tabelle wird von einer Simulation gefüllt; von Hand
                   lassen sich nur Zeilen löschen.
     data-teilen   Knopf «Link mit diesen Messwerten kopieren». Der Link
                   enthält die Werte selbst (hinter dem #, sie gehen an keinen
                   Server). Wer ihn öffnet, hat die Tabelle auf seinem Gerät –
                   so kommen Messwerte, die am Beamer gesammelt wurden, zur
                   ganzen Klasse.

   SCHAUBILD
     <div class="schaubild" data-quelle="brown" data-kurven="linear;quadratisch"></div>
     data-quelle   Kennung der Messtabelle (1. Spalte waagrecht, 2. senkrecht)
     data-x, data-y  Achsentitel (sonst die Spaltentitel der Tabelle)
     data-kurven   Vergleichskurven zum Einblenden: linear (y = a · x),
                   quadratisch (y = c · x²)

   Alle Messwerte bleiben im Browser gespeichert (localStorage) – nur auf
   diesem Gerät, es wird nichts übertragen.

   EIGENE MODELLE
     Simulation.modell("name", function (kasten, hilfen) { … });
     Die Funktion baut Leinwand, Regler und Knöpfe in «kasten» auf. «hilfen»
     stellt el(), regler(), knopf(), leinwand(), farben() und Daten bereit.
   ========================================================================== */

(function () {
  "use strict";

  // Pro Einheit ein Namensraum: Mehrere Einheiten teilen sich auf GitHub Pages
  // dieselbe Herkunft und unterscheiden sich nur im Pfad (baseurl).
  var skript = document.currentScript;
  var basis = skript ? new URL(skript.src).pathname.replace(/\/assets\/js\/[^/]*$/, "") : "";

  // ------------------------------------------------------------ Hilfen
  function el(tag, attrs, text) {
    var e = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { e.setAttribute(k, attrs[k]); });
    if (text != null) e.textContent = text;
    return e;
  }
  function svg(tag, attrs, text) {
    var e = document.createElementNS("http://www.w3.org/2000/svg", tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { e.setAttribute(k, attrs[k]); });
    if (text != null) e.textContent = text;
    return e;
  }
  function zahl(v) {
    var x = parseFloat(String(v == null ? "" : v).replace(/['’\s]/g, "").replace(",", "."));
    return isFinite(x) ? x : NaN;
  }
  // Zahl für die Anzeige: höchstens drei geltende Nachkommastellen, Komma erlaubt
  function zeige(x) {
    if (typeof x !== "number") return String(x == null ? "" : x);
    return String(Math.round(x * 1000) / 1000);
  }

  // ------------------------------------------------------------ Daten
  // Eine Messtabelle ist eine Liste von Zeilen, jede Zeile eine Liste von
  // Werten. Wer schreibt, meldet das der Seite, damit Tabellen und Schaubilder
  // nachziehen.
  var Daten = {
    schluessel: function (id) { return "sim:" + basis + ":tabelle:" + id; },
    lesen: function (id) {
      try {
        var v = JSON.parse(localStorage.getItem(Daten.schluessel(id)));
        return Array.isArray(v) ? v : [];
      } catch (e) { return []; }
    },
    schreiben: function (id, zeilen, quelle) {
      try {
        if (zeilen && zeilen.length) localStorage.setItem(Daten.schluessel(id), JSON.stringify(zeilen));
        else localStorage.removeItem(Daten.schluessel(id));
      } catch (e) { /* gesperrt oder voll */ }
      document.dispatchEvent(new CustomEvent("sim:daten", { detail: { id: id, quelle: quelle || null } }));
    },
    anhaengen: function (id, zeile) {
      var z = Daten.lesen(id);
      z.push(zeile);
      Daten.schreiben(id, z);
    },
    // Zahlenpaare (x, y) aus den ersten beiden Spalten; unvollständige Zeilen fallen weg
    punkte: function (id) {
      return Daten.lesen(id).map(function (z) { return [zahl(z[0]), zahl(z[1])]; })
        .filter(function (p) { return !isNaN(p[0]) && !isNaN(p[1]); });
    }
  };

  // ------------------------------------------------------------ Messtabelle
  function messtabelle(kasten) {
    var id = kasten.dataset.id;
    var spalten = (kasten.dataset.spalten || "x;y").split(";");
    var fest = kasten.hasAttribute("data-fest");
    var minZeilen = parseInt(kasten.dataset.zeilen, 10) || 5;

    var tabelle = el("table", { class: "messwerte" });
    var kopf = el("tr");
    kopf.appendChild(el("th", { scope: "col", class: "messwerte-nr" }, "Nr."));
    spalten.forEach(function (s) { kopf.appendChild(el("th", { scope: "col" }, s)); });
    if (fest) kopf.appendChild(el("th", { scope: "col", class: "messwerte-weg" }, ""));
    var thead = el("thead"); thead.appendChild(kopf);
    var tbody = el("tbody");
    tabelle.append(thead, tbody);
    var leiste = el("p", { class: "sim-leiste" });
    // Breite Tabellen auf schmalen Bildschirmen scrollbar machen (das Layout
    // erledigt das nur für Tabellen, die schon im Markdown stehen).
    var rolle = el("div", { class: "table-scroll" });
    rolle.appendChild(tabelle);
    kasten.append(rolle, leiste);

    function zeichneFest() {
      var zeilen = Daten.lesen(id);
      tbody.textContent = "";
      if (!zeilen.length) {
        var leer = el("td", { colspan: String(spalten.length + 2), class: "messwerte-leer" },
          kasten.dataset.leer || "Noch keine Messwerte. Jeder Durchgang der Simulation fügt eine Zeile hinzu.");
        var tr0 = el("tr"); tr0.appendChild(leer); tbody.appendChild(tr0);
      }
      zeilen.forEach(function (z, i) {
        var tr = el("tr");
        tr.appendChild(el("td", { class: "messwerte-nr" }, String(i + 1)));
        spalten.forEach(function (s, k) { tr.appendChild(el("td", {}, zeige(z[k]))); });
        var weg = el("button", { type: "button", class: "link-knopf", "aria-label": "Messwert " + (i + 1) + " löschen", title: "Diesen Messwert löschen" }, "×");
        weg.addEventListener("click", function () { var neu = Daten.lesen(id); neu.splice(i, 1); Daten.schreiben(id, neu); });
        var td = el("td", { class: "messwerte-weg" }); td.appendChild(weg); tr.appendChild(td);
        tbody.appendChild(tr);
      });
      alle.hidden = !zeilen.length;
    }

    var alle = el("button", { type: "button", class: "link-knopf" }, "Alle Messwerte löschen");
    alle.addEventListener("click", function () {
      if (window.confirm("Alle Messwerte dieser Tabelle löschen?")) Daten.schreiben(id, []);
    });

    function felderLesen() {
      var zeilen = Array.prototype.map.call(tbody.children, function (tr) {
        return Array.prototype.map.call(tr.querySelectorAll("input"), function (f) { return f.value.trim(); });
      });
      while (zeilen.length && zeilen[zeilen.length - 1].every(function (v) { return v === ""; })) zeilen.pop();
      return zeilen;
    }
    function zeileBauen(werte, nr) {
      var tr = el("tr");
      tr.appendChild(el("td", { class: "messwerte-nr" }, String(nr)));
      spalten.forEach(function (s, k) {
        var f = el("input", { type: "text", inputmode: "decimal", class: "luecke-feld messwerte-feld", autocomplete: "off", "aria-label": s + ", Zeile " + nr });
        f.value = werte && werte[k] != null ? werte[k] : "";
        f.addEventListener("input", function () { Daten.schreiben(id, felderLesen(), kasten); });
        var td = el("td"); td.appendChild(f); tr.appendChild(td);
      });
      return tr;
    }
    function zeichneOffen() {
      var zeilen = Daten.lesen(id), n = Math.max(minZeilen, zeilen.length);
      tbody.textContent = "";
      for (var i = 0; i < n; i++) tbody.appendChild(zeileBauen(zeilen[i], i + 1));
    }

    if (fest) {
      leiste.appendChild(alle);
      zeichneFest();
    } else {
      var mehr = el("button", { type: "button", class: "link-knopf" }, "Zeile hinzufügen");
      mehr.addEventListener("click", function () { tbody.appendChild(zeileBauen(null, tbody.children.length + 1)); });
      leiste.appendChild(mehr);
      if (kasten.hasAttribute("data-teilen")) teilenKnopf(kasten, id, leiste, felderLesen);
      zeichneOffen();
    }
    document.addEventListener("sim:daten", function (ev) {
      if (ev.detail.id !== id || ev.detail.quelle === kasten) return;
      if (fest) zeichneFest(); else zeichneOffen();
    });
  }

  // ------------------------------------------------------------ Messwerte teilen
  // Die Werte stehen im Link hinter dem #: «#werte=essig:1,5_40;2_55» – Zeilen
  // mit ; getrennt, Spalten mit _ (das Komma bleibt für Dezimalzahlen frei). Dieser
  // Teil der Adresse wird nicht an den Server geschickt.
  var MARKE = "#werte=";
  function sauber(v) { return String(v == null ? "" : v).replace(/[^0-9.,\-]/g, "").slice(0, 12); }
  function teilenKnopf(kasten, id, leiste, zeilenLesen) {
    var knopf = el("button", { type: "button", class: "link-knopf" }, "Link mit diesen Messwerten kopieren");
    var meldung = el("span", { class: "sim-hinweis", "aria-live": "polite" });
    var feld = el("input", { type: "text", class: "luecke-feld sim-linkfeld", readonly: "readonly", "aria-label": "Link mit den Messwerten", hidden: "hidden" });
    knopf.addEventListener("click", function () {
      var zeilen = zeilenLesen().filter(function (z) { return z.some(function (v) { return sauber(v) !== ""; }); });
      if (!zeilen.length) { meldung.textContent = "Die Tabelle ist noch leer."; return; }
      var link = location.origin + location.pathname + MARKE + id + ":" +
        zeilen.map(function (z) { return z.map(sauber).join("_"); }).join(";");
      function zeigen(kopiert) {
        feld.value = link; feld.hidden = false;
        meldung.textContent = kopiert ? "Link kopiert (" + zeilen.length + " Zeilen). Wer ihn öffnet, erhält diese Messwerte."
          : "Link markieren und kopieren:";
        if (!kopiert) { feld.focus(); feld.select(); }
      }
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(link).then(function () { zeigen(true); }, function () { zeigen(false); });
      else zeigen(false);
    });
    leiste.append(" · ", knopf, " ", meldung);
    leiste.after(feld);
  }
  // Beim Laden: Stehen Messwerte im Link, übernehmen – nach Rückfrage, falls
  // auf dem Gerät schon andere stehen.
  function geteilteWerteLaden() {
    if (location.hash.indexOf(MARKE) !== 0) return null;
    var roh; try { roh = decodeURIComponent(location.hash.slice(MARKE.length)); } catch (e) { return null; }
    var m = roh.match(/^([a-z0-9-]{1,30}):(.*)$/);
    try { history.replaceState(null, "", location.pathname + location.search); } catch (e) { /* bleibt stehen */ }
    if (!m) return null;
    var zeilen = m[2].split(";").slice(0, 200).map(function (z) { return z.split("_").slice(0, 8).map(sauber); })
      .filter(function (z) { return z.some(function (v) { return v !== ""; }); });
    if (!zeilen.length) return null;
    var alt = Daten.lesen(m[1]);
    if (alt.length && JSON.stringify(alt) !== JSON.stringify(zeilen) &&
        !window.confirm("Auf diesem Gerät sind schon Messwerte gespeichert. Durch die geteilten Messwerte ersetzen?")) return null;
    Daten.schreiben(m[1], zeilen);
    return { id: m[1], anzahl: zeilen.length };
  }

  // ------------------------------------------------------------ Schaubild
  // Schöne Achsenteilung: höchstens etwa sechs Striche bei 1, 2 oder 5 mal 10^n
  function teilung(max) {
    if (!(max > 0)) return { max: 1, schritt: 0.2 };
    var roh = max / 5, p = Math.pow(10, Math.floor(Math.log10(roh))), m = roh / p;
    var schritt = (m <= 1 ? 1 : m <= 2 ? 2 : m <= 5 ? 5 : 10) * p;
    return { max: Math.ceil(max / schritt - 1e-9) * schritt, schritt: schritt };
  }
  // Vergleichskurven durch den Nullpunkt, nach der Methode der kleinsten Quadrate
  var KURVEN = {
    linear: {
      name: "linear: y = a · x", strich: "6 5",
      faktor: function (p) { var o = 0, u = 0; p.forEach(function (q) { o += q[0] * q[1]; u += q[0] * q[0]; }); return u ? o / u : 0; },
      wert: function (c, x) { return c * x; }
    },
    quadratisch: {
      name: "quadratisch: y = c · x²", strich: "",
      faktor: function (p) { var o = 0, u = 0; p.forEach(function (q) { o += q[0] * q[0] * q[1]; u += Math.pow(q[0], 4); }); return u ? o / u : 0; },
      wert: function (c, x) { return c * x * x; }
    }
  };
  // Mittelwerte pro x-Wert (mehrere Durchgänge beim selben Abstand)
  function mittel(punkte) {
    var gruppen = {};
    punkte.forEach(function (p) { (gruppen[p[0]] = gruppen[p[0]] || []).push(p[1]); });
    return Object.keys(gruppen).map(function (x) {
      var g = gruppen[x];
      return [parseFloat(x), g.reduce(function (a, b) { return a + b; }, 0) / g.length, g.length];
    }).sort(function (a, b) { return a[0] - b[0]; });
  }

  function schaubild(kasten) {
    var quelle = kasten.dataset.quelle;
    var kurven = (kasten.dataset.kurven || "").split(";").filter(function (k) { return KURVEN[k]; });
    var an = {};
    var B = 560, H = 330, L = 62, R = 16, O = 14, U = 46;   // Fläche und Ränder

    var figur = el("figure", { class: "schaubild-figur" });
    var bild = svg("svg", { viewBox: "0 0 " + B + " " + H, role: "img" });
    var wahl = el("div", { class: "schaubild-wahl" });
    figur.appendChild(bild);
    kasten.append(figur, wahl);

    kurven.forEach(function (k) {
      var id = "kurve-" + quelle + "-" + k;
      var box = el("input", { type: "checkbox", id: id });
      box.addEventListener("change", function () { an[k] = box.checked; zeichne(); });
      var lab = el("label", { for: id, class: "schaubild-kurve" });
      var muster = svg("svg", { viewBox: "0 0 34 10", class: "schaubild-muster", "aria-hidden": "true" });
      muster.appendChild(svg("line", { x1: 1, y1: 5, x2: 33, y2: 5, class: "kurve", "stroke-dasharray": KURVEN[k].strich }));
      lab.append(box, muster, el("span", {}, "Vergleichskurve " + KURVEN[k].name), el("span", { class: "schaubild-abw", "data-kurve": k }));
      wahl.appendChild(lab);
    });

    function zeichne() {
      var punkte = Daten.punkte(quelle);
      var tx = kasten.dataset.x, ty = kasten.dataset.y;
      bild.textContent = "";
      bild.setAttribute("aria-label", punkte.length
        ? "Schaubild mit " + punkte.length + " Messwerten: " + (ty || "y") + " in Abhängigkeit von " + (tx || "x") + "."
        : "Schaubild, noch ohne Messwerte.");
      var ax = teilung(Math.max.apply(null, punkte.map(function (p) { return p[0]; }).concat([0])));
      var ay = teilung(Math.max.apply(null, punkte.map(function (p) { return p[1]; }).concat([0])));
      function X(x) { return L + (x / ax.max) * (B - L - R); }
      function Y(y) { return H - U - (y / ay.max) * (H - O - U); }

      // Raster und Achsenbeschriftung
      for (var x = 0; x <= ax.max + 1e-9; x += ax.schritt) {
        bild.appendChild(svg("line", { x1: X(x), y1: Y(0), x2: X(x), y2: Y(ay.max), class: x === 0 ? "achse" : "raster" }));
        bild.appendChild(svg("text", { x: X(x), y: H - U + 16, class: "marke", "text-anchor": "middle" }, zeige(x)));
      }
      for (var y = 0; y <= ay.max + 1e-9; y += ay.schritt) {
        bild.appendChild(svg("line", { x1: X(0), y1: Y(y), x2: X(ax.max), y2: Y(y), class: y === 0 ? "achse" : "raster" }));
        bild.appendChild(svg("text", { x: L - 8, y: Y(y) + 4, class: "marke", "text-anchor": "end" }, zeige(y)));
      }
      bild.appendChild(svg("text", { x: (L + B - R) / 2, y: H - 6, class: "titel", "text-anchor": "middle" }, tx || ""));
      var t = svg("text", { x: 14, y: (O + H - U) / 2, class: "titel", "text-anchor": "middle", transform: "rotate(-90 14 " + (O + H - U) / 2 + ")" }, ty || "");
      bild.appendChild(t);

      if (!punkte.length) {
        bild.appendChild(svg("text", { x: (L + B - R) / 2, y: (O + H - U) / 2, class: "leer", "text-anchor": "middle" },
          kasten.dataset.leer || "Noch keine Messwerte"));
      }

      // Vergleichskurven
      var m = mittel(punkte);
      kurven.forEach(function (k) {
        var abw = wahl.querySelector('.schaubild-abw[data-kurve="' + k + '"]');
        abw.textContent = "";
        if (!an[k] || punkte.length < 2) return;
        var c = KURVEN[k].faktor(punkte), d = "";
        for (var i = 0; i <= 60; i++) {
          var xx = ax.max * i / 60, yy = Math.min(KURVEN[k].wert(c, xx), ay.max * 1.5);
          d += (i ? "L" : "M") + X(xx).toFixed(1) + " " + Y(yy).toFixed(1);
        }
        var clip = "clip-" + quelle;
        if (!bild.querySelector("#" + clip)) {
          var cp = svg("clipPath", { id: clip });
          cp.appendChild(svg("rect", { x: L, y: O, width: B - L - R, height: H - O - U }));
          bild.appendChild(cp);
        }
        bild.appendChild(svg("path", { d: d, class: "kurve", "stroke-dasharray": KURVEN[k].strich, "clip-path": "url(#" + clip + ")" }));
        // Wie gut passt die Kurve? Mittlere Abweichung von den Mittelwerten in Prozent.
        var s = 0, n = 0;
        m.forEach(function (q) { if (q[1] > 0) { s += Math.abs(KURVEN[k].wert(c, q[0]) - q[1]) / q[1]; n++; } });
        if (n) abw.textContent = "– weicht im Mittel um " + Math.round(100 * s / n) + " % von den Messwerten ab";
      });

      // Messwerte und, wo es mehrere pro x-Wert gibt, ihr Mittelwert
      punkte.forEach(function (p) { bild.appendChild(svg("circle", { cx: X(p[0]), cy: Y(p[1]), r: 4, class: "punkt" })); });
      m.forEach(function (q) {
        if (q[2] < 2) return;
        bild.appendChild(svg("line", { x1: X(q[0]) - 9, y1: Y(q[1]), x2: X(q[0]) + 9, y2: Y(q[1]), class: "mittel" }));
      });
      hinweis.hidden = !m.some(function (q) { return q[2] >= 2; });
    }

    var hinweis = el("p", { class: "schaubild-hinweis" }, "Punkt: ein Durchgang. Strich: Mittelwert der Durchgänge beim selben Abstand.");
    figur.appendChild(hinweis);
    if (!kasten.dataset.x || !kasten.dataset.y) {
      // Achsentitel aus der Messtabelle derselben Seite übernehmen
      var tab = document.querySelector('.messtabelle[data-id="' + quelle + '"]');
      var sp = tab && tab.dataset.spalten ? tab.dataset.spalten.split(";") : [];
      if (!kasten.dataset.x && sp[0]) kasten.dataset.x = sp[0];
      if (!kasten.dataset.y && sp[1]) kasten.dataset.y = sp[1];
    }
    document.addEventListener("sim:daten", function (ev) { if (ev.detail.id === quelle) zeichne(); });
    zeichne();
  }

  // ------------------------------------------------------------ Bausteine für Modelle
  // Farben aus den Gestaltungsvariablen – die Leinwand kennt kein CSS.
  var farbCache = null;
  function farben() {
    if (farbCache) return farbCache;
    var s = getComputedStyle(document.documentElement);
    function f(n, ersatz) { return (s.getPropertyValue(n) || "").trim() || ersatz; }
    farbCache = {
      text: f("--text", "#14161a"), gedaempft: f("--text-muted", "#5d6067"), grund: f("--bg-elev", "#ffffff"),
      linie: f("--border-strong", "#8e9096"), marker: f("--marker", "#ffd83a"), aufMarker: f("--on-marker", "#14161a")
    };
    return farbCache;
  }
  if (window.matchMedia) {
    var dunkel = window.matchMedia("(prefers-color-scheme: dark)");
    var neu = function () { farbCache = null; document.dispatchEvent(new CustomEvent("sim:farben")); };
    if (dunkel.addEventListener) dunkel.addEventListener("change", neu); else if (dunkel.addListener) dunkel.addListener(neu);
  }

  // Schieberegler mit Beschriftung und laufender Anzeige des Werts
  var reglerNr = 0;
  function regler(opt) {
    var id = "sim-regler-" + (reglerNr++);
    var box = el("div", { class: "sim-regler" });
    var lab = el("label", { for: id }, opt.titel);
    var feld = el("input", { type: "range", id: id, min: opt.min, max: opt.max, step: opt.schritt || 1, value: opt.wert });
    var aus = el("output", { for: id });
    function zeig() { aus.textContent = (opt.format ? opt.format(parseFloat(feld.value)) : feld.value) + (opt.einheit ? " " + opt.einheit : ""); }
    feld.addEventListener("input", function () { zeig(); if (opt.beiAenderung) opt.beiAenderung(parseFloat(feld.value)); });
    zeig();
    box.append(lab, feld, aus);
    return { element: box, wert: function () { return parseFloat(feld.value); }, setzen: function (v) { feld.value = v; zeig(); } };
  }
  function knopf(text, klick, klasse) {
    var b = el("button", { type: "button", class: "sim-knopf" + (klasse ? " " + klasse : "") }, text);
    b.addEventListener("click", klick);
    return b;
  }
  // Leinwand mit fester innerer Grösse (bw × bh Bildpunkte bei Faktor 1); sie
  // füllt die Breite des Kastens und bleibt auf dichten Bildschirmen scharf.
  function leinwand(bw, bh, beschreibung) {
    var c = el("canvas", { class: "sim-leinwand", role: "img", "aria-label": beschreibung || "Simulation" });
    var f = Math.min(3, Math.max(1, Math.round(window.devicePixelRatio || 1)));
    c.width = bw * f; c.height = bh * f;
    c.style.aspectRatio = bw + " / " + bh;
    var ctx = c.getContext("2d");
    ctx.scale(f, f);
    return { element: c, ctx: ctx, breite: bw, hoehe: bh };
  }

  var hilfen = { el: el, regler: regler, knopf: knopf, leinwand: leinwand, farben: farben, Daten: Daten, zeige: zeige };

  // ------------------------------------------------------------ Start
  var modelle = {};
  function start(wurzel) {
    wurzel = wurzel || document;
    Array.prototype.forEach.call(wurzel.querySelectorAll(".messtabelle, .schaubild, .simulation"), function (k) {
      if (k.dataset.simBereit) return;
      if (k.classList.contains("simulation")) {
        var bauen = modelle[k.dataset.modell];
        if (!bauen) return;                       // Modell noch nicht geladen
        k.dataset.simBereit = "1";
        bauen(k, hilfen);
      } else {
        k.dataset.simBereit = "1";
        if (k.classList.contains("messtabelle")) messtabelle(k); else schaubild(k);
      }
    });
  }
  function geteiltMelden(geteilt) {
    if (!geteilt) return;
    var t = document.querySelector('.messtabelle[data-id="' + geteilt.id + '"] .sim-leiste');
    if (t) t.appendChild(el("span", { class: "sim-hinweis ok" }, " · Geteilte Messwerte geladen (" + geteilt.anzahl + " Zeilen)."));
  }
  function startSeite() {
    var geteilt = geteilteWerteLaden();
    start(document);
    geteiltMelden(geteilt);
  }
  // Ist die Seite schon offen und der Link wird in dieselbe Registerkarte
  // eingefügt, lädt der Browser nicht neu – nur der Teil hinter dem # ändert.
  window.addEventListener("hashchange", function () { geteiltMelden(geteilteWerteLaden()); });
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", startSeite);
  else startSeite();

  window.Simulation = {
    start: start,
    modell: function (name, bauen) { modelle[name] = bauen; if (document.readyState !== "loading") start(document); },
    // «Alle Eingaben auf dieser Seite löschen» (uebungen.js) leert auch die Messtabellen der Seite.
    allesZuruecksetzen: function (kasten) {
      Array.prototype.forEach.call((kasten || document).querySelectorAll(".messtabelle[data-id]"), function (t) { Daten.schreiben(t.dataset.id, []); });
    },
    Daten: Daten
  };
})();
