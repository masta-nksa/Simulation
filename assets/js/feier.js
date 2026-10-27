/* ==========================================================================
   Feiern: kleine Belohnungen für richtige Antworten und Fortschritt

   Wann                                          Was
   Abschnitt geprüft, alles richtig              kleiner Effekt am Knopf «Prüfen»
   ganze Unterlage geprüft, alles richtig        grosser Effekt und Meldung
   Unterlage vollständig bearbeitet (Stufe 4)    Meldung mit Link zur nächsten Unterlage
   Stufe gestiegen (begonnen → … → fast fertig)  Glitzer an der Fortschrittsleiste
   alle Unterlagen einer Lektion fertig          Feuerwerk mit Konfetti und Meldung

   Die grossen Momente gibt es je Unterlage bzw. Lektion nur einmal (bis
   «Alle Eingaben löschen»); danach bleibt es beim kleinen Effekt.

   Die Effekte wechseln ab, nie zweimal derselbe hintereinander:
     klein   Konfetti, Herzen, Glitzer, Blüten, Seifenblasen
     gross   Feuerwerk, Konfettiregen, Herz- und Blütenregen

   Effekte gibt es in den Designs «Blüte» (Konfetti, Herzen, Glitzer, Blüten,
   Seifenblasen) und «Grusel» (Fledermäuse, Geister, Kürbisse, Spinnen, Funken;
   gross: Fledermausschwarm, Kürbisregen). Im Design «Klassisch» erscheinen nur
   die Meldungen, ebenso bei «Bewegung reduzieren» im Betriebssystem. Die Auslöser
   kommen als Ereignisse aus uebungen.js und fortschritt.js.
   ========================================================================== */

(function () {
  "use strict";

  function design() { return document.documentElement.getAttribute("data-design") || "klassisch"; }
  var ruhig = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : { matches: false };
  function effekte() { return design() !== "klassisch" && !ruhig.matches; }

  var FARBEN_BLUETE = ["#ff6fae", "#b18cff", "#6fd6bd", "#ffd166", "#ff9f80", "#7cc4ff", "#ffffff"];
  var FARBEN_GRUSEL = ["#ff7a1a", "#ffb02e", "#8bea5a", "#b44cff", "#ff4d4d", "#f2ecf8", "#ff7a1a"];
  function palette() { return design() === "grusel" ? FARBEN_GRUSEL : FARBEN_BLUETE; }
  function zufall(a, b) { return a + Math.random() * (b - a); }
  function eine(liste) { return liste[Math.floor(Math.random() * liste.length)]; }
  // Nie zweimal dasselbe hintereinander
  var zuletzt = {};
  function abwechselnd(gruppe, liste) {
    var auswahl = liste.filter(function (x) { return x !== zuletzt[gruppe]; });
    var x = eine(auswahl.length ? auswahl : liste);
    zuletzt[gruppe] = x;
    return x;
  }

  function merken(k) { try { return localStorage.getItem("feier:" + k) === "1"; } catch (e) { return false; } }
  function gemerkt(k, an) { try { if (an) localStorage.setItem("feier:" + k, "1"); else localStorage.removeItem("feier:" + k); } catch (e) { /* gesperrt */ } }

  // ------------------------------------------------------------ Leinwand
  var leinwand = null, ctx = null, teile = [], laeuft = false, vorher = 0;
  var imSchritt = false, nachgereicht = [];   // Funken, die während eines Schritts entstehen
  function bereit() {
    if (leinwand) return;
    leinwand = document.createElement("canvas");
    leinwand.className = "feier-leinwand";
    leinwand.setAttribute("aria-hidden", "true");
    document.body.appendChild(leinwand);
    ctx = leinwand.getContext("2d");
    groesse();
    window.addEventListener("resize", groesse);
  }
  function groesse() {
    if (!leinwand) return;
    var f = window.devicePixelRatio || 1;
    leinwand.width = Math.round(innerWidth * f); leinwand.height = Math.round(innerHeight * f);
    ctx.setTransform(f, 0, 0, f, 0, 0);
  }
  function los(neue) {
    bereit();
    if (imSchritt) { nachgereicht = nachgereicht.concat(neue); return; }
    teile = teile.concat(neue).slice(-900);
    if (!laeuft) { laeuft = true; vorher = performance.now(); requestAnimationFrame(schritt); }
  }
  function schritt(jetzt) {
    var dt = Math.min(0.05, (jetzt - vorher) / 1000);
    vorher = jetzt;
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    var neu = [];
    imSchritt = true;
    teile.forEach(function (t) {
      t.alter += dt;
      if (t.verzoegerung > 0) { t.verzoegerung -= dt; t.alter = 0; neu.push(t); return; }
      if (t.alter >= t.leben) { if (t.amEnde) t.amEnde(); return; }
      t.vx *= Math.pow(t.luft, dt * 60); t.vy *= Math.pow(t.luft, dt * 60);
      t.vy += t.schwere * dt;
      t.x += t.vx * dt; t.y += t.vy * dt;
      t.dreh += t.drall * dt;
      if (t.y > innerHeight + 60 && t.vy > 0) return;
      t.zeichne(ctx, t, t.alter / t.leben);
      neu.push(t);
    });
    imSchritt = false;
    teile = neu.concat(nachgereicht).slice(-900);
    nachgereicht = [];
    if (teile.length) requestAnimationFrame(schritt);
    else { laeuft = false; ctx.clearRect(0, 0, innerWidth, innerHeight); }
  }
  function teil(o) {
    return Object.assign({ x: 0, y: 0, vx: 0, vy: 0, schwere: 0, luft: 1, dreh: 0, drall: 0, alter: 0, leben: 2, verzoegerung: 0, groesse: 8, farbe: eine(palette()) }, o);
  }

  // ------------------------------------------------------------ Formen
  function konfettiForm(c, t, z) {
    c.save(); c.translate(t.x, t.y); c.rotate(t.dreh);
    c.scale(1, Math.cos(t.alter * t.flatter));
    c.globalAlpha = z > .8 ? (1 - z) * 5 : 1;
    c.fillStyle = t.farbe;
    if (t.rund) { c.beginPath(); c.arc(0, 0, t.groesse / 2, 0, 6.283); c.fill(); }
    else c.fillRect(-t.groesse / 2, -t.groesse / 4, t.groesse, t.groesse / 2);
    c.restore();
  }
  function herzForm(c, t, z) {
    var s = t.groesse / 16;
    c.save(); c.translate(t.x + Math.sin(t.alter * 3 + t.phase) * 10, t.y); c.rotate(Math.sin(t.alter * 2 + t.phase) * .25); c.scale(s, s);
    c.globalAlpha = z < .15 ? z / .15 : z > .7 ? (1 - z) / .3 : 1;
    c.fillStyle = t.farbe;
    c.beginPath();
    c.moveTo(0, 5);
    c.bezierCurveTo(-1, 3, -8, -1, -8, -5); c.bezierCurveTo(-8, -10, -2, -11, 0, -6);
    c.bezierCurveTo(2, -11, 8, -10, 8, -5); c.bezierCurveTo(8, -1, 1, 3, 0, 5);
    c.fill(); c.restore();
  }
  function sternForm(c, t, z) {
    var r = t.groesse * (0.4 + 0.6 * Math.abs(Math.sin(z * Math.PI * t.funkeln)));
    c.save(); c.translate(t.x, t.y); c.rotate(t.dreh);
    c.globalAlpha = 1 - z * z;
    c.fillStyle = t.farbe;
    c.beginPath();
    for (var i = 0; i < 8; i++) {
      var w = i * Math.PI / 4, l = i % 2 ? r * .28 : r;
      c.lineTo(Math.cos(w) * l, Math.sin(w) * l);
    }
    c.closePath(); c.fill(); c.restore();
  }
  function bluetenForm(c, t, z) {
    var r = t.groesse / 2;
    c.save(); c.translate(t.x, t.y); c.rotate(t.dreh);
    c.globalAlpha = z > .75 ? (1 - z) * 4 : 1;
    c.fillStyle = t.farbe;
    for (var i = 0; i < 5; i++) {
      var w = i * 2 * Math.PI / 5;
      c.beginPath(); c.ellipse(Math.cos(w) * r * .55, Math.sin(w) * r * .55, r * .5, r * .32, w, 0, 6.283); c.fill();
    }
    c.fillStyle = "#ffe08a";
    c.beginPath(); c.arc(0, 0, r * .28, 0, 6.283); c.fill();
    c.restore();
  }
  function blasenForm(c, t, z) {
    var r = t.groesse * (z > .9 ? 1 + (z - .9) * 4 : 1);
    c.save(); c.translate(t.x + Math.sin(t.alter * 2.2 + t.phase) * 12, t.y);
    c.globalAlpha = z > .9 ? (1 - z) * 10 : .85;
    c.strokeStyle = t.farbe; c.lineWidth = 1.6;
    c.fillStyle = "rgba(255,255,255,.12)";
    c.beginPath(); c.arc(0, 0, r, 0, 6.283); c.fill(); c.stroke();
    c.fillStyle = "rgba(255,255,255,.75)";
    c.beginPath(); c.ellipse(-r * .35, -r * .4, r * .22, r * .12, -.6, 0, 6.283); c.fill();
    c.restore();
  }
  function funkenForm(c, t, z) {
    c.save();
    c.globalAlpha = (1 - z) * (z > .6 ? .6 + .4 * Math.random() : 1);
    c.strokeStyle = t.farbe; c.lineWidth = t.groesse; c.lineCap = "round";
    c.beginPath(); c.moveTo(t.x, t.y); c.lineTo(t.x - t.vx * .045, t.y - t.vy * .045); c.stroke();
    c.restore();
  }

  // ------------------------------------------------------------ Kleine Effekte (am Knopf)
  var KLEIN = {
    konfetti: function (x, y) {
      var l = [];
      for (var i = 0; i < 70; i++) {
        var w = -Math.PI / 2 + zufall(-1.1, 1.1), v = zufall(280, 650);
        l.push(teil({ x: x, y: y, vx: Math.cos(w) * v, vy: Math.sin(w) * v, schwere: 900, luft: .965, drall: zufall(-8, 8), flatter: zufall(6, 14), rund: Math.random() < .3, groesse: zufall(6, 11), leben: zufall(1.6, 2.4), zeichne: konfettiForm }));
      }
      return l;
    },
    herzen: function (x, y) {
      var l = [];
      for (var i = 0; i < 16; i++) {
        l.push(teil({ x: x + zufall(-50, 50), y: y + zufall(-10, 10), vy: zufall(-160, -80), farbe: eine(["#ff6fae", "#ff8fc2", "#e64d97", "#b18cff"]), groesse: zufall(14, 28), phase: zufall(0, 6), leben: zufall(1.6, 2.6), verzoegerung: zufall(0, .4), zeichne: herzForm }));
      }
      return l;
    },
    glitzer: function (x, y) {
      var l = [];
      for (var i = 0; i < 26; i++) {
        var w = zufall(0, 6.283), r = zufall(20, 150);
        l.push(teil({ x: x + Math.cos(w) * r, y: y + Math.sin(w) * r * .6, vy: zufall(-30, -5), groesse: zufall(7, 16), funkeln: zufall(1.5, 3), drall: zufall(-2, 2), farbe: eine(["#ffd166", "#fff3b0", "#ff9fd0", "#c7b3ff", "#ffffff"]), leben: zufall(.8, 1.5), verzoegerung: zufall(0, .5), zeichne: sternForm }));
      }
      return l;
    },
    blueten: function (x, y) {
      var l = [];
      for (var i = 0; i < 18; i++) {
        var w = -Math.PI / 2 + zufall(-1.3, 1.3), v = zufall(180, 420);
        l.push(teil({ x: x, y: y, vx: Math.cos(w) * v, vy: Math.sin(w) * v, schwere: 380, luft: .96, drall: zufall(-4, 4), groesse: zufall(14, 24), farbe: eine(["#ff8fc2", "#ffb3d6", "#c7b3ff", "#ffffff", "#ff9f80"]), leben: zufall(1.8, 2.6), zeichne: bluetenForm }));
      }
      return l;
    },
    blasen: function (x, y) {
      var l = [];
      for (var i = 0; i < 16; i++) {
        l.push(teil({ x: x + zufall(-70, 70), y: y + zufall(-5, 15), vy: zufall(-120, -50), groesse: zufall(7, 18), phase: zufall(0, 6), farbe: eine(["#7cc4ff", "#b18cff", "#ff8fc2", "#6fd6bd"]), leben: zufall(1.6, 2.8), verzoegerung: zufall(0, .6), zeichne: blasenForm }));
      }
      return l;
    }
  };

  // ------------------------------------------------------------ Grosse Effekte (ganzer Bildschirm)
  function rakete(x, zielY, verzoegerung, farbe) {
    var funken = [], hoehe = innerHeight + 10;
    var r = teil({ x: x, y: hoehe, vy: -(hoehe - zielY) / .9, leben: .9, verzoegerung: verzoegerung, groesse: 3, farbe: "#fff3b0", zeichne: funkenForm });
    r.amEnde = function () {
      var n = 70, zweite = eine(palette());
      for (var i = 0; i < n; i++) {
        var w = i / n * 6.283 + zufall(-.05, .05), v = zufall(150, 330);
        funken.push(teil({ x: r.x, y: r.y, vx: Math.cos(w) * v, vy: Math.sin(w) * v, schwere: 160, luft: .955, groesse: zufall(1.8, 3.2), farbe: Math.random() < .75 ? farbe : zweite, leben: zufall(1.1, 1.8), zeichne: funkenForm }));
      }
      for (var j = 0; j < 12; j++) {
        funken.push(teil({ x: r.x + zufall(-60, 60), y: r.y + zufall(-60, 60), groesse: zufall(6, 12), funkeln: 3, farbe: "#fff3b0", leben: zufall(.6, 1.1), verzoegerung: zufall(.2, .6), zeichne: sternForm }));
      }
      los(funken);
    };
    return r;
  }
  var GROSS = {
    feuerwerk: function (anzahl) {
      var l = [];
      for (var i = 0; i < (anzahl || 6); i++) l.push(rakete(zufall(.12, .88) * innerWidth, zufall(.12, .42) * innerHeight, i * zufall(.25, .45), eine(palette().slice(0, 6))));
      return l;
    },
    konfettiregen: function () {
      var l = [];
      for (var i = 0; i < 170; i++) {
        l.push(teil({ x: zufall(0, innerWidth), y: zufall(-120, -10), vx: zufall(-40, 40), vy: zufall(60, 200), schwere: 120, luft: .99, drall: zufall(-6, 6), flatter: zufall(5, 12), rund: Math.random() < .25, groesse: zufall(7, 12), leben: 6, verzoegerung: zufall(0, 1.2), zeichne: konfettiForm }));
      }
      return l;
    },
    herzregen: function () {
      var l = [];
      for (var i = 0; i < 60; i++) {
        var herz = Math.random() < .55;
        l.push(teil({ x: zufall(0, innerWidth), y: zufall(-80, -10), vy: zufall(70, 160), schwere: 20, drall: zufall(-2, 2), phase: zufall(0, 6), groesse: zufall(16, 30), farbe: eine(herz ? ["#ff6fae", "#ff8fc2", "#e64d97", "#b18cff"] : ["#ffb3d6", "#ffffff", "#c7b3ff", "#ff9f80"]), leben: 7, verzoegerung: zufall(0, 1.8), zeichne: herz ? herzForm : bluetenForm }));
      }
      return l;
    }
  };

  // ------------------------------------------------------------ Grusel-Effekte (Design «Grusel»)
  // Die Figuren sind Emoji, die auf die Leinwand geschrieben werden.
  function emojiForm(c, t, z) {
    c.save();
    c.translate(t.x + (t.wackel ? Math.sin(t.alter * t.wackel + t.phase) * (t.weite || 10) : 0), t.y);
    c.rotate(t.dreh);
    if (t.schlag) c.scale(.55 + .45 * Math.abs(Math.cos(t.alter * t.schlag)), 1);
    c.globalAlpha = z < .12 ? z / .12 : z > .7 ? (1 - z) / .3 : 1;
    c.font = t.groesse + "px serif"; c.textAlign = "center"; c.textBaseline = "middle";
    c.fillText(t.zeichen, 0, 0);
    c.restore();
  }
  // Spinne am Faden: Der Faden hängt am oberen Fensterrand, die Spinne seilt sich ab und wieder auf.
  function spinneForm(c, t, z) {
    t.y = t.ziel * Math.sin(Math.PI * Math.min(1, z * 1.1));
    c.save();
    c.globalAlpha = z > .85 ? (1 - z) / .15 : 1;
    c.strokeStyle = "rgba(235,225,245,.75)"; c.lineWidth = 1;
    c.beginPath(); c.moveTo(t.x, 0); c.lineTo(t.x, t.y); c.stroke();
    c.font = t.groesse + "px serif"; c.textAlign = "center"; c.textBaseline = "middle";
    c.fillText(t.zeichen, t.x, t.y);
    c.restore();
  }
  function figuren(zeichen, n, x, y, o) {
    var l = [];
    for (var i = 0; i < n; i++) l.push(teil(Object.assign({ x: x + zufall(-40, 40), y: y + zufall(-10, 10), zeichen: zeichen, phase: zufall(0, 6), zeichne: emojiForm }, o(i))));
    return l;
  }
  var KLEIN_GRUSEL = {
    fledermaeuse: function (x, y) {
      return figuren("🦇", 10, x, y, function () {
        var w = -Math.PI / 2 + zufall(-1.2, 1.2), v = zufall(220, 420);
        return { vx: Math.cos(w) * v, vy: Math.sin(w) * v, luft: .975, groesse: zufall(22, 36), schlag: zufall(14, 22), drall: zufall(-.6, .6), leben: zufall(1.5, 2.4), verzoegerung: zufall(0, .25) };
      });
    },
    geister: function (x, y) {
      return figuren("👻", 8, x, y, function () {
        return { vy: zufall(-130, -60), wackel: zufall(2, 3.5), weite: 14, groesse: zufall(24, 38), leben: zufall(1.8, 2.8), verzoegerung: zufall(0, .6) };
      });
    },
    kuerbisse: function (x, y) {
      return figuren("🎃", 9, x, y, function () {
        var w = -Math.PI / 2 + zufall(-.9, .9), v = zufall(300, 600);
        return { vx: Math.cos(w) * v, vy: Math.sin(w) * v, schwere: 900, luft: .97, drall: zufall(-5, 5), groesse: zufall(22, 34), leben: zufall(1.5, 2.2) };
      });
    },
    spinnen: function (x, y) {
      var l = [];
      for (var i = 0; i < 5; i++) {
        l.push(teil({ x: x + (i - 2) * zufall(38, 70), y: 0, ziel: Math.max(80, y) + zufall(-40, 40), zeichen: "🕷️", groesse: zufall(20, 28), leben: zufall(2.2, 3), verzoegerung: i * .12, zeichne: spinneForm }));
      }
      return l;
    },
    funken: KLEIN.konfetti
  };
  var GROSS_GRUSEL = {
    feuerwerk: GROSS.feuerwerk,
    konfettiregen: GROSS.konfettiregen,
    fledermausschwarm: function () {
      var l = [];
      for (var i = 0; i < 34; i++) {
        var richtung = Math.random() < .5 ? 1 : -1;
        l.push(teil({ x: richtung > 0 ? -40 : innerWidth + 40, y: zufall(.05, .75) * innerHeight, vx: richtung * zufall(260, 520), vy: zufall(-60, 60), zeichen: "🦇", groesse: zufall(24, 44), schlag: zufall(14, 24), leben: 4, verzoegerung: zufall(0, 1.6), zeichne: emojiForm }));
      }
      return l;
    },
    kuerbisregen: function () {
      var l = [];
      for (var i = 0; i < 40; i++) {
        l.push(teil({ x: zufall(0, innerWidth), y: zufall(-80, -10), vy: zufall(80, 200), schwere: 60, drall: zufall(-2, 2), zeichen: Math.random() < .7 ? "🎃" : "👻", groesse: zufall(24, 40), leben: 7, verzoegerung: zufall(0, 1.8), zeichne: emojiForm }));
      }
      return l;
    }
  };

  // Je nach Design andere Figuren und andere Worte
  var SAETZE = {
    bluete: {
      klein: KLEIN, gross: GROSS, grossListe: ["feuerwerk", "konfettiregen", "herzregen"], fertigListe: ["glitzer", "blueten", "herzen"], spitze: "glitzer",
      seite: ["Alles richtig – die ganze Unterlage!", "Fehlerfrei! Stark.", "Volltreffer auf der ganzen Seite!", "Wow – alles richtig!", "Bravo, keine einzige Lücke daneben!"],
      fertig: ["Alles bearbeitet ✓", "Unterlage fertig ✓", "Geschafft – alles ausgefüllt ✓"],
      lektion: "Lektion {n} geschafft! Alle Unterlagen sind bearbeitet."
    },
    grusel: {
      klein: KLEIN_GRUSEL, gross: GROSS_GRUSEL, grossListe: ["feuerwerk", "fledermausschwarm", "kuerbisregen"], fertigListe: ["geister", "fledermaeuse", "kuerbisse"], spitze: "funken",
      seite: ["Alles richtig – selbst die Geister klatschen!", "Kein einziger Fehler … unheimlich gut!", "Zum Gruseln fehlerfrei!", "Die Fledermäuse sind beeindruckt.", "Nicht ein Fehler – das ist ja nicht normal!"],
      fertig: ["Alles ausgefüllt – kein Geist bleibt übrig ✓", "Unterlage erlöst ✓", "Geschafft – nichts spukt mehr ✓"],
      lektion: "Lektion {n} überlebt! Alle Unterlagen sind bearbeitet."
    }
  };
  function satz() { return SAETZE[design()] || SAETZE.bluete; }

  // ------------------------------------------------------------ Meldungen
  var schlange = [], sichtbar = false;
  function melden(text, link, gross) {
    schlange.push({ text: text, link: link, gross: gross });
    if (!sichtbar) naechste();
  }
  function naechste() {
    var m = schlange.shift();
    if (!m) { sichtbar = false; return; }
    sichtbar = true;
    var box = document.createElement("div");
    box.className = "feier-meldung" + (m.gross ? " gross" : "");
    box.setAttribute("role", "status");
    box.appendChild(document.createTextNode(m.text));
    if (m.link) {
      var a = document.createElement("a");
      a.href = m.link.href; a.textContent = m.link.text;
      box.appendChild(a);
    }
    document.body.appendChild(box);
    requestAnimationFrame(function () { box.classList.add("da"); });
    setTimeout(function () {
      box.classList.remove("da");
      setTimeout(function () { box.remove(); naechste(); }, 400);
    }, m.link ? 5200 : 3400);
  }

  // Zentrum eines Elements im Fenster
  function mitte(e) {
    var r = e.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  }
  var grossZuletzt = 0;
  function gross(welche) {
    grossZuletzt = Date.now();
    if (!effekte()) return;
    welche.forEach(function (w) { los(satz().gross[w](w === "feuerwerk" ? 7 : 0)); });
  }
  function seiteUrl() { return document.body.dataset.fsSeite || location.pathname; }

  // ------------------------------------------------------------ Auslöser
  document.addEventListener("uebungen:geprueft", function (ev) {
    var d = ev.detail;
    if (!d.alleRichtig || d.container.closest(".dossier-teil")) return;
    var k = "seite-richtig:" + seiteUrl();
    if (d.seiteRichtig && !merken(k)) {
      gemerkt(k, true);
      gross([abwechselnd("gross", satz().grossListe)]);
      melden(eine(satz().seite), null, true);
      return;
    }
    if (!effekte()) return;
    var p = mitte(d.knopf);
    los(satz().klein[abwechselnd("klein", Object.keys(satz().klein))](p.x, p.y));
  });

  document.addEventListener("fortschritt:stufe", function (ev) {
    var d = ev.detail;
    var l = d.lektion;
    if (l && l.anteil >= 1 && !merken("lektion:" + l.url)) {
      gemerkt("lektion:" + l.url, true);
      gross(["feuerwerk", "konfettiregen"]);
      melden(satz().lektion.replace("{n}", l.nr), null, true);
      return;
    }
    if (d.stufe === 4 && !merken("fertig:" + d.seite)) {
      gemerkt("fertig:" + d.seite, true);
      var weiter = document.querySelector(".pager-next");
      melden(eine(satz().fertig), weiter ? { href: weiter.href, text: "Weiter: " + weiter.lastChild.textContent.trim() + " →" } : null);
      if (effekte() && Date.now() - grossZuletzt > 3000) los(satz().klein[abwechselnd("klein", satz().fertigListe)](innerWidth / 2, innerHeight * .35));
      return;
    }
    // Zwischenstufen: etwas Glitzer an der Spitze der Fortschrittsleiste
    var leiste = document.querySelector(".fs-leiste");
    if (leiste && effekte() && Date.now() - grossZuletzt > 3000) {
      var r = leiste.getBoundingClientRect();
      los(satz().klein[satz().spitze](r.left + r.width * d.anteil, r.top + r.height / 2).slice(0, 14));
    }
  });

  document.addEventListener("uebungen:geloescht", function () {
    var u = seiteUrl();
    gemerkt("seite-richtig:" + u, false);
    gemerkt("fertig:" + u, false);
  });

  window.Feier = { klein: KLEIN, gross: GROSS, kleinGrusel: KLEIN_GRUSEL, grossGrusel: GROSS_GRUSEL, los: los, melden: melden };
})();
