/* ==========================================================================
   Modell «brown»: Brownsche Bewegung mit Detektor

   Teilchen starten in einer kleinen Quelle am linken Rand eines Raums aus
   Zellen. In jedem Zeitschritt geht jedes Teilchen zufällig eine Zelle nach
   links, rechts, oben oder unten; an der Wand bleibt es stehen. Ein Detektor
   in wählbarem Abstand schlägt an, sobald genügend verschiedene Teilchen ihn
   erreicht haben. Ergebnis eines Durchgangs: Abstand und Zeit bis zum Anschlag.

   Das Modell beruht auf dem bisherigen Python-Programm (quellen/brownsche.py).
   Was anders ist und warum:
   - Die Zeit wird in Zeitschritten gezählt statt in Sekunden auf der Uhr. So
     hängt das Ergebnis nicht davon ab, wie schnell das Gerät rechnet.
   - Der Abstand des Detektors wird eingestellt statt ausgelost. So lässt er
     sich gezielt verändern.
   - Der Detektor zählt verschiedene Teilchen. Im alten Programm zählte ein
     Teilchen, das im Detektor blieb, in jedem Schritt erneut.

     <div class="simulation" data-modell="brown" data-ziel="brown"></div>
   ========================================================================== */

(function () {
  "use strict";

  var BREITE = 120, HOEHE = 80;      // Raum in Zellen
  var QUELLE_B = 4, QUELLE_H = 10;   // Quelle am linken Rand, in der Mitte
  var DET_B = 4, DET_H = 8;          // Detektor
  var ZELLE = 5;                     // Bildpunkte pro Zelle
  var HOECHSTENS = 200000;           // Abbruch, falls der Detektor nie anschlägt

  function bauen(kasten, h) {
    var ziel = kasten.dataset.ziel || "brown";
    var bild = h.leinwand(BREITE * ZELLE, HOEHE * ZELLE,
      "Raum mit Teilchen, die sich zufällig bewegen. Links die Quelle, rechts davon der Detektor.");
    var ctx = bild.ctx;

    var xs, ys, da, n, zeit, angekommen, zustand, rahmen = null;
    var mitte = HOEHE >> 1;

    // ---------------------------------------------------------- Regler
    var abstand = h.regler({ titel: "Abstand des Detektors", min: 10, max: 100, schritt: 5, wert: 30, einheit: "Zellen", beiAenderung: neu });
    var anzahl = h.regler({ titel: "Anzahl Teilchen", min: 100, max: 800, schritt: 50, wert: 400, beiAenderung: neu });
    var schwelle = h.regler({ titel: "Schwelle des Detektors", min: 1, max: 10, wert: 3, einheit: "Teilchen", beiAenderung: neu });
    var TEMPI = [1, 5, 50], TEMPO_NAME = ["langsam", "schnell", "sehr schnell"];
    var tempo = h.regler({ titel: "Tempo der Anzeige", min: 0, max: 2, wert: 1, format: function (v) { return TEMPO_NAME[v]; } });

    var status = h.el("p", { class: "sim-status", "aria-live": "polite" });
    var knopfStart = h.knopf("Quelle öffnen", function () {
      if (zustand === "bereit" || zustand === "pause") { zustand = "laeuft"; schleife(); }
      else if (zustand === "laeuft") { zustand = "pause"; }
      else { neu(); zustand = "laeuft"; schleife(); }
      beschriften();
    }, "haupt");
    var knopfNeu = h.knopf("Neuer Durchgang", function () { neu(); });

    var reglerBox = h.el("div", { class: "sim-reglerfeld" });
    reglerBox.append(abstand.element, anzahl.element, schwelle.element, tempo.element);
    var leiste = h.el("div", { class: "sim-knoepfe" });
    leiste.append(knopfStart, knopfNeu);
    kasten.append(bild.element, status, leiste, reglerBox);

    // ---------------------------------------------------------- Modell
    function neu() {
      if (rahmen) { cancelAnimationFrame(rahmen); rahmen = null; }
      n = anzahl.wert();
      xs = new Int16Array(n); ys = new Int16Array(n); da = new Uint8Array(n);
      for (var i = 0; i < n; i++) {
        xs[i] = Math.floor(Math.random() * QUELLE_B);
        ys[i] = mitte - (QUELLE_H >> 1) + Math.floor(Math.random() * QUELLE_H);
      }
      zeit = 0; angekommen = 0; zustand = "bereit";
      beschriften(); zeichne();
    }

    // Ein Zeitschritt: Jedes Teilchen geht zufällig eine Zelle weit.
    function schritt() {
      var d = abstand.wert(), k = schwelle.wert();
      var x0 = d, x1 = d + DET_B - 1, y0 = mitte - (DET_H >> 1), y1 = y0 + DET_H - 1;
      zeit++;
      for (var i = 0; i < n; i++) {
        var richtung = Math.floor(Math.random() * 4), x = xs[i], y = ys[i];
        if (richtung === 0) x--; else if (richtung === 1) x++; else if (richtung === 2) y--; else y++;
        if (x >= 0 && x < BREITE && y >= 0 && y < HOEHE) { xs[i] = x; ys[i] = y; }   // an der Wand: stehen bleiben
        if (!da[i] && xs[i] >= x0 && xs[i] <= x1 && ys[i] >= y0 && ys[i] <= y1) {
          da[i] = 1; angekommen++;
          if (angekommen >= k) return true;
        }
      }
      return false;
    }

    function schleife() {
      if (rahmen) cancelAnimationFrame(rahmen);
      rahmen = requestAnimationFrame(function takt() {
        rahmen = null;
        if (zustand !== "laeuft") return;
        var schritte = TEMPI[tempo.wert()];
        for (var s = 0; s < schritte; s++) {
          if (schritt()) {
            zustand = "fertig";
            h.Daten.anhaengen(ziel, [abstand.wert(), zeit, anzahl.wert(), schwelle.wert()]);
            break;
          }
          if (zeit >= HOECHSTENS) { zustand = "abbruch"; break; }
        }
        zeichne(); beschriften();
        if (zustand === "laeuft") rahmen = requestAnimationFrame(takt);
      });
    }

    // ---------------------------------------------------------- Anzeige
    function beschriften() {
      var k = schwelle.wert();
      knopfStart.textContent = zustand === "bereit" ? "Quelle öffnen" : zustand === "laeuft" ? "Pause"
        : zustand === "pause" ? "Weiter" : "Nochmals mit gleichen Werten";
      if (zustand === "bereit") status.textContent = "Bereit. Die Teilchen sind in der Quelle eingeschlossen.";
      else if (zustand === "fertig") status.textContent = "Der Detektor hat nach " + zeit + " Zeitschritten angeschlagen. Der Messwert steht in der Tabelle.";
      else if (zustand === "abbruch") status.textContent = "Abgebrochen: Nach " + zeit + " Zeitschritten hat der Detektor noch nicht angeschlagen.";
      else status.textContent = "Zeit: " + zeit + " Zeitschritte · im Detektor angekommen: " + angekommen + " von " + k + (zustand === "pause" ? " · angehalten" : "");
    }

    function zeichne() {
      var f = h.farben(), d = abstand.wert(), k = schwelle.wert();
      ctx.fillStyle = f.grund;
      ctx.fillRect(0, 0, bild.breite, bild.hoehe);

      // Detektor: gelb, sobald er angeschlagen hat
      var dx = d * ZELLE, dy = (mitte - (DET_H >> 1)) * ZELLE, dw = DET_B * ZELLE, dh = DET_H * ZELLE;
      if (zustand === "fertig") { ctx.fillStyle = f.marker; ctx.fillRect(dx, dy, dw, dh); }

      // Teilchen
      ctx.fillStyle = f.text;
      for (var i = 0; i < n; i++) ctx.fillRect(xs[i] * ZELLE + 1, ys[i] * ZELLE + 1, ZELLE - 2, ZELLE - 2);

      ctx.lineWidth = 2; ctx.strokeStyle = f.text;
      ctx.strokeRect(dx - 1, dy - 1, dw + 2, dh + 2);
      ctx.font = "500 12px " + (getComputedStyle(document.documentElement).getPropertyValue("--font-mono") || "monospace");
      // Beschriftung auf einem Schild, damit sie über den Teilchen lesbar bleibt
      function schild(text, x, y) {
        var b = ctx.measureText(text).width + 10;
        x = Math.min(Math.max(x, b / 2 + 3), bild.breite - b / 2 - 3);
        ctx.fillStyle = f.grund; ctx.fillRect(x - b / 2, y - 12, b, 17);
        ctx.lineWidth = 1; ctx.strokeStyle = f.text; ctx.strokeRect(x - b / 2 + .5, y - 11.5, b - 1, 16);
        ctx.fillStyle = f.text; ctx.textAlign = "center"; ctx.fillText(text, x, y);
      }
      schild("Detektor " + angekommen + "/" + k, dx + dw / 2, dy - 10);

      // Quelle: geschlossen, solange der Durchgang nicht läuft
      var qy = (mitte - (QUELLE_H >> 1)) * ZELLE;
      if (zustand === "bereit") {
        ctx.lineWidth = 2; ctx.strokeStyle = f.text;
        ctx.strokeRect(1, qy - 1, QUELLE_B * ZELLE + 1, QUELLE_H * ZELLE + 2);
        schild("Quelle", 30, qy - 10);
      }
      // Abstand als Masslinie unter dem Detektor
      var my = dy + dh + 12;
      ctx.lineWidth = 1.5; ctx.strokeStyle = f.text;
      ctx.beginPath();
      ctx.moveTo(1, my); ctx.lineTo(dx, my);
      ctx.moveTo(dx, my - 5); ctx.lineTo(dx, my + 5);
      ctx.stroke();
      schild(d + " Zellen", dx / 2, my + 22);

      // Rahmen des Raums
      ctx.lineWidth = 2; ctx.strokeStyle = f.text;
      ctx.strokeRect(1, 1, bild.breite - 2, bild.hoehe - 2);
    }

    document.addEventListener("sim:farben", zeichne);
    neu();
  }

  if (window.Simulation) window.Simulation.modell("brown", bauen);
})();
