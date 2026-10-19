/* ==========================================================================
   Modelle «stau» und «stau-regeln»: Verkehrsfluss nach Nagel und Schreckenberg

   Die Strasse ist ein Ring aus 100 Zellen. Eine Zelle ist 7,5 m lang und leer
   oder von genau einem Auto besetzt, ein Zeitschritt dauert eine Sekunde. Jedes
   Auto hat ein Tempo von 0 bis 5 Zellen pro Sekunde (5 entspricht 135 km/h). In
   jedem Zeitschritt gelten für alle Autos gleichzeitig vier Regeln:

     1. Beschleunigen  Tempo + 1, höchstens bis zum Höchsttempo
     2. Bremsen        Tempo höchstens so gross wie die Lücke zum Auto davor
     3. Trödeln        mit Wahrscheinlichkeit p: Tempo − 1 (nicht unter 0)
     4. Fahren         jedes Auto rückt um sein Tempo vor

   Das Modell beruht auf dem bisherigen Python-Programm (quellen/stau.py). Was
   anders ist und warum:
   - Der Ring hat 100 statt 28 Zellen, damit sich Stauwellen ausbilden können.
   - Das mittlere Tempo wird nach dem Trödeln gemessen (vorher davor).
   - Die Zusatzregel für stehende Autos («träges Anfahren») ist nicht Teil des
     Grundmodells, sondern lässt sich mit data-anfahren zuschalten.
   - Neben dem Ring zeigt ein Raum-Zeit-Diagramm, wie Staus rückwärts wandern.

     <div class="simulation" data-modell="stau" data-ziel="stau"></div>
     data-ziel      Messtabelle für den Knopf «Messen»: Dichte (Fz/km), Fluss
                    (Fz/h), mittleres Tempo (km/h), Höchsttempo, Trödeln (%).
                    Ohne data-ziel gibt es weder Knopf noch Zahlen – die Klasse
                    soll dann nach Augenschein urteilen.
     data-anfahren  Regler «Träges Anfahren» mit diesem Startwert in Prozent

     <div class="simulation" data-modell="stau" data-vergleich
          data-a="autos=15;vmax=5;troedeln=25" data-b="autos=30;vmax=3;troedeln=25"></div>
     Vergleich: zwei Strecken A und B in zwei Spalten nebeneinander (auf dem
     Handy untereinander), jede mit Ring, Diagramm und eigenen Reglern,
     aber mit einem gemeinsamen Start und derselben Startverteilung – bei gleich
     vielen Autos stehen sie anfangs gleich. Ohne data-a/data-b beginnen beide
     mit den Ausgangswerten (20 Autos, Höchsttempo 5, Trödeln 25 %). Mit
     «name=…» erhält eine Seite eine eigene Überschrift. Keine Messung.

     <div class="simulation" data-modell="stau-regeln"></div>
     Regel-Trainer: die vier Regeln von Hand anwenden, die Seite würfelt und
     kontrolliert.
   ========================================================================== */

(function () {
  "use strict";

  var L = 100;                 // Zellen im Ring
  var ZELLE_M = 7.5;           // Länge einer Zelle in Metern
  var KMH = ZELLE_M * 3.6;     // 1 Zelle pro Sekunde = 27 km/h

  function dichteKm(n) { return n / (L * ZELLE_M / 1000); }

  // Ein Zeitschritt. pos ist aufsteigend im Ring geordnet (zyklisch), v die Tempi.
  // Rückgabe: Anzahl Autos, die die Messstelle (Zelle 0) überfahren haben.
  function schritt(z) {
    var n = z.pos.length, neu = new Array(n), i, durch = 0;
    for (i = 0; i < n; i++) {
      var luecke = n > 1 ? (z.pos[(i + 1) % n] - z.pos[i] - 1 + L) % L : L - 1;
      var alt = z.v[i], w = Math.min(alt + 1, z.vmax);          // 1. Beschleunigen
      if (w > luecke) w = luecke;                                // 2. Bremsen
      if (z.anfahren > 0 && alt === 0 && luecke < 2 && w > 0 && Math.random() < z.anfahren) w--;   // Zusatz: träges Anfahren
      if (w > 0 && Math.random() < z.p) w--;                     // 3. Trödeln
      neu[i] = w;
    }
    for (i = 0; i < n; i++) {                                    // 4. Fahren
      if (z.pos[i] + neu[i] >= L) durch++;
      z.pos[i] = (z.pos[i] + neu[i]) % L;
    }
    z.v = neu;
    z.zeit++;
    return durch;
  }

  // Startplan: eine zufällige Reihenfolge der Zellen und pro Zelle eine
  // Zufallszahl fürs Anfangstempo. Im Vergleichsmodus teilen sich beide Seiten
  // denselben Plan – bei gleich vielen Autos starten sie also gleich.
  function startplan() {
    var zellen = [], u = [], i;
    for (i = 0; i < L; i++) { zellen.push(i); u.push(Math.random()); }
    for (i = L - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = zellen[i]; zellen[i] = zellen[j]; zellen[j] = t; }
    return { zellen: zellen, u: u };
  }
  function verteilen(z, n, plan) {
    z.pos = plan.zellen.slice(0, n).sort(function (a, b) { return a - b; });
    z.v = z.pos.map(function (c) { return Math.floor(plan.u[c] * (z.vmax + 1)); });
    z.zeit = 0;
  }

  // Zeichenmasse: breit für eine einzelne Simulation (Ring links, Diagramm
  // rechts), schmal und hoch für eine Spalte im Vergleich (Ring über Diagramm).
  var BREIT = { bw: 600, bh: 250, zeilen: 105, cx: 128, cy: 128, r: 98, x0: 285, y0: 26 };
  var SPALTE = { bw: 324, bh: 390, zeilen: 90, cx: 162, cy: 84, r: 66, x0: 20, y0: 190 };

  // Startwerte aus der Seite, z. B. data-a="autos=15;vmax=5;troedeln=25;name=A"
  function einstellungen(text) {
    var e = {};
    String(text || "").split(";").forEach(function (teil) {
      var k = teil.indexOf("=");
      if (k > 0) e[teil.slice(0, k).trim()] = teil.slice(k + 1).trim();
    });
    return e;
  }

  // ------------------------------------------------------------ Eine Strecke
  // Ring, Raum-Zeit-Diagramm und die Regler für Autos, Höchsttempo, Trödeln
  // (auf Wunsch auch träges Anfahren). Start, Takt und Knöpfe besorgt bauen().
  function strecke(h, m, start, mitAnfahren, beiAutos) {
    var bild = h.leinwand(m.bw, m.bh, "Links ein Ring mit Autos, rechts ein Raum-Zeit-Diagramm: jede Zeile ein Zeitschritt, stehende Autos sind kräftiger gezeichnet als fahrende.");
    var ctx = bild.ctx;
    var z = { pos: [], v: [], vmax: 5, p: 0.25, anfahren: 0, zeit: 0 };
    var verlauf = [];          // letzte Zeilen des Raum-Zeit-Diagramms
    function zahl(k, ersatz) { var x = parseInt(start[k], 10); return isNaN(x) ? ersatz : x; }

    var autos = h.regler({ titel: "Anzahl Autos", min: 5, max: 90, wert: zahl("autos", 20), beiAenderung: function () { beiAutos(); },
      format: function (v) { return v + " (" + Math.round(dichteKm(v)) + " Fz/km)"; } });
    var vmax = h.regler({ titel: "Höchsttempo", min: 1, max: 5, wert: zahl("vmax", 5), beiAenderung: function (v) { z.vmax = v; },
      format: function (v) { return v + " Zellen/s (" + Math.round(v * KMH) + " km/h)"; } });
    var troedeln = h.regler({ titel: "Trödelwahrscheinlichkeit", min: 0, max: 60, schritt: 5, wert: zahl("troedeln", 25), einheit: "%", beiAenderung: function (v) { z.p = v / 100; } });
    var anfahren = mitAnfahren ? h.regler({ titel: "Träges Anfahren", min: 0, max: 100, schritt: 10, wert: zahl("anfahren", 0), einheit: "%", beiAenderung: function (v) { z.anfahren = v / 100; } }) : null;
    z.vmax = vmax.wert(); z.p = troedeln.wert() / 100;
    if (anfahren) z.anfahren = anfahren.wert() / 100;

    var regler = [autos.element, vmax.element, troedeln.element];
    if (anfahren) regler.push(anfahren.element);

    function merken() {
      var zeile = new Int8Array(L).fill(-1);
      for (var i = 0; i < z.pos.length; i++) zeile[z.pos[i]] = z.v[i];
      verlauf.push(zeile);
      if (verlauf.length > m.zeilen) verlauf.shift();
    }

    function zeichne() {
      var f = h.farben(), i;
      ctx.fillStyle = f.grund; ctx.fillRect(0, 0, m.bw, m.bh);
      ctx.font = "500 11px " + (getComputedStyle(document.documentElement).getPropertyValue("--font-mono") || "monospace");

      // Ring: Fahrbahn, Messstelle, Autos (stehende gelb)
      var cx = m.cx, cy = m.cy, r = m.r;
      ctx.lineWidth = 1; ctx.strokeStyle = f.linie;
      ctx.beginPath(); ctx.arc(cx, cy, r + 7, 0, 2 * Math.PI); ctx.stroke();
      ctx.beginPath(); ctx.arc(cx, cy, r - 7, 0, 2 * Math.PI); ctx.stroke();
      ctx.lineWidth = 2; ctx.strokeStyle = f.text;
      ctx.beginPath(); ctx.moveTo(cx, cy - r - 12); ctx.lineTo(cx, cy - r + 12); ctx.stroke();
      ctx.fillStyle = f.text; ctx.textAlign = "center";
      ctx.fillText("Messstelle", cx, cy - r + 26);
      ctx.fillText("Fahrtrichtung ↻", cx, cy + 4);
      for (i = 0; i < z.pos.length; i++) {
        var w = (z.pos[i] + 0.5) / L * 2 * Math.PI - Math.PI / 2;
        var x = cx + r * Math.cos(w), y = cy + r * Math.sin(w);
        ctx.beginPath(); ctx.arc(x, y, 3.6, 0, 2 * Math.PI);
        if (z.v[i] === 0) { ctx.fillStyle = f.marker; ctx.fill(); ctx.lineWidth = 1.2; ctx.strokeStyle = f.text; ctx.stroke(); }
        else { ctx.fillStyle = f.text; ctx.fill(); }
      }

      // Raum-Zeit-Diagramm: jede Zeile ein Zeitschritt, die neuste unten
      var x0 = m.x0, y0 = m.y0, zb = 3, zh = 2;
      ctx.fillStyle = f.text; ctx.textAlign = "left";
      ctx.fillText("Ort entlang der Strasse →", x0, y0 - 12);
      ctx.save(); ctx.translate(x0 - 16, y0); ctx.rotate(Math.PI / 2); ctx.fillText("Zeit → (unten: jetzt)", 0, 0); ctx.restore();
      ctx.lineWidth = 1; ctx.strokeStyle = f.linie;
      ctx.strokeRect(x0 - .5, y0 - .5, L * zb + 1, m.zeilen * zh + 1);
      var versatz = m.zeilen - verlauf.length;
      for (var k = 0; k < verlauf.length; k++) {
        var zeile = verlauf[k], yy = y0 + (versatz + k) * zh;
        for (i = 0; i < L; i++) {
          if (zeile[i] < 0) continue;
          ctx.fillStyle = zeile[i] === 0 ? f.text : f.linie;
          ctx.fillRect(x0 + i * zb, yy, zb - 1, zh);
        }
      }
      // Legende
      var ly = y0 + m.zeilen * zh + 14;
      ctx.fillStyle = f.linie; ctx.fillRect(x0, ly - 8, 9, 6);
      ctx.fillStyle = f.text; ctx.fillText("fährt", x0 + 14, ly - 2);
      ctx.fillRect(x0 + 70, ly - 8, 9, 6); ctx.fillText("steht", x0 + 84, ly - 2);
    }

    return {
      z: z, bild: bild, regler: regler, merken: merken, zeichne: zeichne,
      neu: function (plan) { verteilen(z, autos.wert(), plan); verlauf = []; merken(); },
      schritt: function () { schritt(z); merken(); }
    };
  }

  // ------------------------------------------------------------ Modell «stau»
  //   data-vergleich  zwei Strecken nebeneinander (A und B) mit gemeinsamem
  //                   Start, gemeinsamem «Neu verteilen» und demselben Takt
  //   data-a, data-b  Startwerte der beiden Seiten, z. B.
  //                   "autos=15;vmax=5;troedeln=25;anfahren=0;name=A"
  //                   (name ersetzt die Überschrift «A» bzw. «B»)
  function bauen(kasten, h) {
    var ziel = kasten.dataset.ziel || "";
    var vergleich = kasten.hasAttribute("data-vergleich");
    var mitAnfahren = kasten.hasAttribute("data-anfahren");
    var plan = startplan();
    var laeuft = false, rahmen = null, letzte = 0, zeit = 0;

    // Ändert eine Seite die Anzahl Autos, beginnt nur sie neu (mit demselben
    // Startplan); die andere läuft weiter.
    var seiten = (vergleich ? ["a", "b"] : [""]).map(function (s) {
      var start = einstellungen(s ? kasten.dataset[s] : "");
      if (start.anfahren == null && kasten.dataset.anfahren) start.anfahren = kasten.dataset.anfahren;
      var st = strecke(h, vergleich ? SPALTE : BREIT, start, mitAnfahren, function () {
        st.neu(plan);
        if (seiten.length === 1) zeit = 0;
        fertig();
      });
      st.name = start.name || s.toUpperCase();
      return st;
    });

    var TAKT = [330, 100, 16], TAKT_NAME = ["langsam", "mittel", "schnell"];
    var tempo = h.regler({ titel: "Tempo der Anzeige", min: 0, max: 2, wert: 1, format: function (v) { return TAKT_NAME[v]; } });

    var status = h.el("p", { class: "sim-status", "aria-live": "off" });
    var meldung = h.el("p", { class: "sim-status sim-meldung", "aria-live": "polite" });
    var knopfStart = h.knopf("Start", function () { laeuft = !laeuft; beschriften(); if (laeuft) schleife(); }, "haupt");
    var knopfNeu = h.knopf("Neu verteilen", function () { plan = startplan(); neu(); });
    var leiste = h.el("div", { class: "sim-knoepfe" });
    leiste.append(knopfStart, knopfNeu);
    if (ziel && !vergleich) leiste.appendChild(h.knopf("Messen", messen));

    if (vergleich) {
      // Oben die gemeinsamen Knöpfe, darunter A und B in je einer Spalte mit
      // Ring, Diagramm und Reglern, zuunterst das Tempo der Anzeige.
      kasten.classList.add("sim-vergleich");
      var spalten = h.el("div", { class: "sim-spalten" });
      seiten.forEach(function (st) {
        var spalte = h.el("div", { class: "sim-spalte" });
        spalte.append(h.el("p", { class: "sim-seite" }, st.name), st.bild.element);
        st.regler.forEach(function (r) { spalte.appendChild(r); });
        spalten.appendChild(spalte);
      });
      var allgemein = h.el("div", { class: "sim-reglerfeld" });
      allgemein.appendChild(tempo.element);
      kasten.append(leiste, status, spalten, allgemein);
    } else {
      var reglerBox = h.el("div", { class: "sim-reglerfeld" });
      seiten[0].regler.forEach(function (r) { reglerBox.appendChild(r); });
      reglerBox.appendChild(tempo.element);
      kasten.append(seiten[0].bild.element, status, leiste, meldung, reglerBox);
    }

    function zeichne() { seiten.forEach(function (st) { st.zeichne(); }); }
    function fertig() { meldung.textContent = ""; beschriften(); zeichne(); }
    function neu() {
      seiten.forEach(function (st) { st.neu(plan); });
      zeit = 0; fertig();
    }

    // «Messen»: erst einschwingen lassen, dann über eine feste Dauer zählen.
    function messen() {
      var EINSCHWINGEN = 300, MESSDAUER = 300;
      var st = seiten[0], z = st.z, i, durch = 0, summe = 0;
      for (i = 0; i < EINSCHWINGEN; i++) schritt(z);
      for (i = 0; i < MESSDAUER; i++) {
        durch += schritt(z);
        summe += z.v.reduce(function (a, b) { return a + b; }, 0);
        if (i >= MESSDAUER - BREIT.zeilen) st.merken();
      }
      zeit += EINSCHWINGEN + MESSDAUER;
      var fluss = Math.round(durch / MESSDAUER * 3600);
      var kmh = Math.round(summe / (MESSDAUER * z.pos.length) * KMH);
      h.Daten.anhaengen(ziel, [Math.round(dichteKm(z.pos.length)), fluss, kmh, z.vmax, Math.round(z.p * 100)]);
      meldung.textContent = "Gemessen über " + MESSDAUER + " s (nach " + EINSCHWINGEN + " s Einschwingen): Fluss " + fluss + " Fz/h, mittleres Tempo " + kmh + " km/h. Der Messwert steht in der Tabelle.";
      beschriften(); zeichne();
    }

    function schleife() {
      if (rahmen) cancelAnimationFrame(rahmen);
      letzte = 0;
      rahmen = requestAnimationFrame(function takt(jetzt) {
        rahmen = null;
        if (!laeuft) return;
        // Nach der Uhr rechnen, nicht nach Bildern: Zeichnet der Browser selten
        // (langsames Gerät, Fenster im Hintergrund), holt die Simulation auf.
        var takt_ms = TAKT[tempo.wert()];
        if (!letzte) letzte = jetzt - takt_ms;
        var faellig = Math.min(20, Math.floor((jetzt - letzte) / takt_ms));
        if (faellig > 0) {
          letzte = faellig === 20 ? jetzt : letzte + faellig * takt_ms;
          for (var k = 0; k < faellig; k++) { seiten.forEach(function (st) { st.schritt(); }); zeit++; }
          zeichne(); beschriften();
        }
        rahmen = requestAnimationFrame(takt);
      });
    }

    function beschriften() {
      knopfStart.textContent = laeuft ? "Pause" : (zeit ? "Weiter" : "Start");
      var t = "Zeit: " + zeit + " s";
      if (ziel && !vergleich) {
        var z = seiten[0].z;
        var stehend = z.v.filter(function (x) { return x === 0; }).length;
        var mittel = z.v.reduce(function (a, b) { return a + b; }, 0) / z.pos.length * KMH;
        t += " · mittleres Tempo: " + Math.round(mittel) + " km/h · stehende Autos: " + stehend;
      }
      status.textContent = t;
    }

    document.addEventListener("sim:farben", zeichne);
    neu();
  }

  // ------------------------------------------------------------ Modell «stau-regeln»
  // Regel-Trainer: eine kurze Strasse, wenige Autos. Für jedes Auto trägt man
  // das Tempo nach den Regeln 1 bis 3 ein; Regel 4 führt die Seite aus.
  function trainer(kasten, h) {
    var N = 20, VMAX = 5;
    var START = [[0, 2], [3, 1], [5, 0], [6, 0], [12, 4]];   // Ort, Tempo
    var autos, runde, dran, wuerfel, neuV, fehlversuche;

    var kopf = h.el("p", { class: "rt-kopf" });
    var strasse = h.el("div", { class: "rt-strasse", role: "img" });
    var lage = h.el("p", { class: "rt-lage" });
    var felder = h.el("div", { class: "rt-felder" });
    var eingaben = ["Tempo nach Regel 1 (Beschleunigen)", "nach Regel 2 (Bremsen)", "nach Regel 3 (Trödeln)"].map(function (t, i) {
      var id = "rt-" + i + "-" + Math.random().toString(36).slice(2, 7);
      var f = h.el("input", { type: "text", inputmode: "numeric", class: "luecke-feld rt-feld", id: id, autocomplete: "off", maxlength: "1" });
      var box = h.el("div", { class: "rt-eingabe" });
      box.append(h.el("label", { for: id }, t), f);
      felder.appendChild(box);
      f.addEventListener("input", function () { f.classList.remove("richtig", "falsch"); });
      f.addEventListener("keydown", function (ev) { if (ev.key === "Enter") pruefen(); });
      return f;
    });
    var hinweis = h.el("p", { class: "rt-hinweis", "aria-live": "polite" });
    var knopfPruefen = h.knopf("Prüfen", pruefen, "haupt");
    var knopfFahren = h.knopf("Regel 4: Alle Autos fahren", fahren, "haupt");
    var knopfLoesung = h.knopf("Lösung einsetzen", function () {
      var s = soll(); eingaben.forEach(function (f, i) { f.value = s[i]; f.classList.remove("falsch"); });
      hinweis.textContent = "Lösung eingesetzt. Vergleichen Sie mit den drei Regeln und klicken Sie auf «Prüfen».";
    });
    var knopfNeu = h.knopf("Von vorn", start);
    var leiste = h.el("div", { class: "sim-knoepfe" });
    leiste.append(knopfPruefen, knopfFahren, knopfLoesung, knopfNeu);
    kasten.append(kopf, strasse, lage, felder, leiste, hinweis);

    function luecke(i) { return (autos[(i + 1) % autos.length][0] - autos[i][0] - 1 + N) % N; }
    function soll() {
      var v1 = Math.min(autos[dran][1] + 1, VMAX), v2 = Math.min(v1, luecke(dran));
      var v3 = (wuerfel <= 2 && v2 > 0) ? v2 - 1 : v2;
      return [v1, v2, v3];
    }
    function wuerfeln() { wuerfel = 1 + Math.floor(Math.random() * 6); }

    function start() {
      autos = START.map(function (a) { return a.slice(); });
      runde = 1; dran = 0; neuV = []; fehlversuche = 0;
      wuerfeln(); zeichne();
      hinweis.textContent = "";
    }

    function zeichne() {
      var fertig = dran >= autos.length, i;
      kopf.textContent = "Runde " + runde + (fertig ? " · alle Autos haben ihr neues Tempo" : " · Auto " + (dran + 1) + " von " + autos.length);
      strasse.textContent = "";
      var zeilen = [["jetzt", function (i) { return autos[i][1]; }, function () { return true; }],
                    ["neues Tempo", function (i) { return neuV[i]; }, function (i) { return i < neuV.length; }]];
      zeilen.forEach(function (zl, nr) {
        var reihe = h.el("div", { class: "rt-zeile" });
        reihe.appendChild(h.el("span", { class: "rt-label" }, zl[0]));
        for (var x = 0; x < N; x++) {
          var k = -1;
          for (i = 0; i < autos.length; i++) if (autos[i][0] === x) k = i;
          var zelle = h.el("span", { class: "rt-zelle" + (k >= 0 ? " auto" : "") + (k === dran && !fertig ? " dran" : "") }, k >= 0 && zl[2](k) ? String(zl[1](k)) : (k >= 0 ? "?" : (nr === 0 ? "·" : "")));
          reihe.appendChild(zelle);
        }
        strasse.appendChild(reihe);
      });
      strasse.setAttribute("aria-label", "Strasse aus " + N + " Zellen. " + autos.map(function (a, i) {
        return "Auto " + (i + 1) + " in Zelle " + (a[0] + 1) + " mit Tempo " + a[1];
      }).join(", ") + ".");

      knopfPruefen.hidden = fertig; knopfLoesung.hidden = fertig || fehlversuche < 2; knopfFahren.hidden = !fertig;
      felder.hidden = fertig; lage.hidden = fertig;
      if (!fertig) {
        lage.textContent = "Markiertes Auto – Tempo bisher: " + autos[dran][1] + " · Lücke bis zum nächsten Auto: " + luecke(dran) +
          (luecke(dran) === 1 ? " Zelle" : " Zellen") + " · Würfel: " + wuerfel + (wuerfel <= 2 ? " → das Auto trödelt" : " → das Auto trödelt nicht");
        eingaben.forEach(function (f) { f.value = ""; f.classList.remove("richtig", "falsch"); });
      }
    }

    function pruefen() {
      var s = soll(), ok = true, erster = -1;
      eingaben.forEach(function (f, i) {
        var richtig = f.value.trim() !== "" && parseInt(f.value, 10) === s[i];
        f.classList.toggle("richtig", richtig); f.classList.toggle("falsch", !richtig);
        if (!richtig) { ok = false; if (erster < 0) erster = i; }
      });
      if (!ok) {
        fehlversuche++;
        hinweis.textContent = [
          "Regel 1: Das Tempo steigt um 1 – aber nicht über das Höchsttempo " + VMAX + ".",
          "Regel 2: Das Tempo darf nicht grösser sein als die Lücke (hier " + luecke(dran) + "). Ist es kleiner oder gleich, bleibt es.",
          "Regel 3: Der Würfel zeigt " + wuerfel + ". Bei 1 oder 2 trödelt das Auto: Tempo − 1, aber nicht unter 0. Sonst bleibt das Tempo."
        ][erster];
        knopfLoesung.hidden = fehlversuche < 2;
        return;
      }
      neuV.push(s[2]); dran++; fehlversuche = 0;
      hinweis.textContent = dran < autos.length ? "Richtig. Weiter mit dem nächsten Auto."
        : "Richtig. Alle Autos haben ihr neues Tempo – jetzt gilt Regel 4.";
      if (dran < autos.length) wuerfeln();
      zeichne();
      if (dran < autos.length) eingaben[0].focus();
    }

    function fahren() {
      autos = autos.map(function (a, i) { return [(a[0] + neuV[i]) % N, neuV[i]]; }).sort(function (a, b) { return a[0] - b[0]; });
      hinweis.textContent = runde >= 2
        ? "Geschafft: Sie haben die Regeln in zwei Runden auf alle Autos angewendet. Sie können weiterspielen oder zur nächsten Etappe gehen."
        : "Alle Autos sind um ihr Tempo vorgerückt. Wer rechts hinausfährt, kommt links wieder herein. Weiter mit Runde 2.";
      runde++; dran = 0; neuV = []; fehlversuche = 0;
      wuerfeln(); zeichne();
    }

    start();
  }

  if (window.Simulation) {
    window.Simulation.modell("stau", bauen);
    window.Simulation.modell("stau-regeln", trainer);
  }
})();
