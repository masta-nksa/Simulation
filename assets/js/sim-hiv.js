/* ==========================================================================
   Modell «hiv»: Ausbreitung von HIV durch Partnerschaften

   300 Personen bewegen sich auf einem Feld aus 25 × 25 Plätzen (der Rand ist
   verbunden: Wer rechts hinausgeht, kommt links wieder herein). Ein Schritt
   ist eine Woche. Jede Person hat vier persönliche Neigungen, die leicht um
   den eingestellten Wert streuen (etwa ± 9 %): wie gern sie eine Partnerschaft
   eingeht, wie lange sie bleibt, wie oft sie ein Kondom will und wie oft sie
   sich testen lässt. In jeder Woche gilt:

     1. Bewegen      Wer allein ist, geht einen Schritt in zufälliger Richtung.
     2. Paarbildung  Treffen sich zwei Freie auf benachbarten Plätzen, werden
                     sie ein Paar, wenn beide wollen (je Paarbildung / 10).
     3. Trennung     Ein Paar trennt sich, sobald es länger zusammen ist, als
                     einer der beiden bleiben will.
     4. Ansteckung   Ein Kondom gibt es, wenn beide es wollen; wer keines will,
                     setzt sich durch. Ohne Kondom steckt eine Person, die
                     ansteckend ist, ihr Gegenüber mit der eingestellten
                     Wahrscheinlichkeit pro Woche an.
     5. Test         Pro Woche lässt sich jede Person mit Wahrscheinlichkeit
                     Test / 52 testen; nach der Zeit bis zu den Symptomen kommen
                     5 % pro Woche dazu. Wer davon erfährt, wird mit der
                     Wahrscheinlichkeit «Therapie» wirksam behandelt und steckt
                     danach niemanden mehr an.

   Das Modell folgt dem NetLogo-Modell «HIV» von Uri Wilensky (1997), Models
   Library, Sample Models/Biology, ccl.northwestern.edu/netlogo/models/HIV,
   Lizenz CC BY-NC-SA 3.0. Was anders ist und warum:
   - Ansteckung 0,75 % pro Woche ohne Schutz statt 50 %: Mit diesem Wert trifft
     das Modell die Zahl der Neuansteckungen in Eswatini 2011. Die CDC geben
     pro ungeschütztem Vaginalverkehr 4 bis 8 Ansteckungen auf 10 000 an.
   - Symptome nach 520 Wochen (10 Jahre, Median ohne Therapie) statt 200.
   - Test und Therapie sind getrennt. Im Original schützt sich jede Person,
     die von ihrer Infektion weiss; hier nur der eingestellte Anteil
     (Therapie 100 % entspricht dem Original).
   - Kondom in Prozent der Paarwochen statt als Neigung von 0 bis 10.
   - Vor dem Start bilden sich 100 Wochen lang Paare (ohne Ansteckung), damit
     die Partnerschaften schon bestehen, wenn die Messung beginnt.
   - Wer startet, ist zufällig; die beiden Figurenformen des Originals, die
     nur die Paarbildung regeln, werden nicht gezeigt.

     <div class="simulation" data-modell="hiv" data-ziel="hiv"></div>
     data-ziel     Messtabelle für den Knopf «Messen». Ohne data-ziel kein Knopf.
     data-regler   Welche Regler erscheinen, mit ; getrennt
                   (Standard: paare;dauer;kondom;test):
                     paare       Paarbildung, Neigung 0 bis 10
                     dauer       Dauer einer Beziehung in Wochen
                     kondom      Kondom: Anteil der Paarwochen in %
                     test        Tests pro Person und Jahr
                     therapie    Anteil der Diagnostizierten, die wirksam
                                 behandelt werden und nicht mehr anstecken
                     ansteckung  Ansteckung pro Woche ohne Schutz in %
                     symptome    Wochen bis zu den Symptomen
     data-werte    Startwerte, z. B. "paare=5;dauer=50;kondom=0;test=0", dazu
                   start (Anteil HIV-positiv zu Beginn, %), wissen (Anteil
                   davon, der es weiss, %), personen, jahre (Laufzeit)
     data-messen   Was «Messen» in die Tabelle schreibt, mit ; getrennt
                   (Standard: paare;dauer;kondom;test;positiv, mit Ländern
                   land;kondom;test;therapie;neu):
                     land, paare, dauer, kondom, test, therapie, ansteckung,
                     symptome     die Einstellungen
                     positiv      Anteil HIV-positiv am Ende in %
                     neu          Neuansteckungen pro 100 HIV-negative
                                  Personen und Jahr
                     unwissend    Anteil der HIV-Positiven, die es nicht wissen, %
                     partner      Partnerschaften pro Person
     data-laender  Parametersätze zum Laden, mit ; getrennt, z. B.
                   "eswatini-2011;eswatini-2016;suedafrika-2024". Dann läuft
                   jeder Durchgang 2 Jahre, und die Masszahl ist die Zahl der
                   Neuansteckungen pro Jahr.

   Laufzeit ohne Länder: 30 Jahre. Mit 0,75 % pro Woche braucht HIV Jahrzehnte,
   um sich auszubreiten.
   ========================================================================== */

(function () {
  "use strict";

  var BREIT = 25;               // Plätze pro Seite bei 300 Personen (mehr Personen: grösseres Feld, gleiche Dichte)
  var EINSCHWINGEN = 100;       // Wochen Paarbildung vor dem Start
  var SYMPTOM_TEST = 0.05;      // Testwahrscheinlichkeit pro Woche nach den Symptomen

  var GRUND = { personen: 300, start: 2.5, wissen: 0, paare: 5, dauer: 50, kondom: 0, test: 0,
                therapie: 100, ansteckung: 0.75, symptome: 520, jahre: 30 };

  // Parametersätze. Gemessen: Erwachsene im Land; der Rest wie GRUND.
  // Test pro Jahr ist geschätzt: so, dass der Anteil der Diagnostizierten in
  // zwei Jahren etwa gleich bleibt (die Erhebungen messen ihn nicht direkt).
  var LAENDER = {
    "eswatini-2011": {
      name: "Eswatini 2011", werte: { start: 32, wissen: 62, therapie: 56, kondom: 32, test: 0.1, personen: 1000, jahre: 2 }, gemessen: 2.48,
      text: "32 % der Erwachsenen HIV-positiv, davon wissen es 62 %; 56 % der Diagnostizierten sind wirksam behandelt (35 % aller HIV-Positiven); Kondom 32 %. Gemessen: 2,48 Neuansteckungen pro 100 HIV-negative Erwachsene und Jahr."
    },
    "eswatini-2016": {
      name: "Eswatini 2016", werte: { start: 30, wissen: 84, therapie: 85, kondom: 40, test: 0.1, personen: 1000, jahre: 2 }, gemessen: 1.30,
      text: "30 % der Erwachsenen HIV-positiv, davon wissen es 84 %; 85 % der Diagnostizierten sind wirksam behandelt (71 % aller HIV-Positiven); Kondom 40 %. Gemessen: 1,30 Neuansteckungen pro 100 HIV-negative Erwachsene und Jahr."
    },
    "suedafrika-2024": {
      name: "Südafrika 2024", werte: { start: 17, wissen: 95, therapie: 78, kondom: 32, test: 0.3, personen: 1000, jahre: 2 }, gemessen: null,
      text: "17 % der Erwachsenen (15–49) HIV-positiv, davon wissen es 95 %; 78 % der Diagnostizierten sind wirksam behandelt (74 % aller HIV-Positiven); Kondom 32 % (2022). Nicht validiert: Für diese Altersgruppe gibt es keine vergleichbare Messung der Neuansteckungen."
    }
  };

  var ANSTECKUNG = [0.1, 0.25, 0.5, 0.75, 1, 2, 5, 10, 25, 50];   // Stufen des Reglers in %

  // ------------------------------------------------------------ Das Modell
  // Neigung um einen Mittelwert: Summe vieler kleiner Zufallszahlen (wie im
  // Original) – ergibt ungefähr eine Normalverteilung.
  function nahe(c) { var r = 0; for (var i = 0; i < 40; i++) r += Math.random() * c; return r / 20; }
  function mischen(a) {
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function seite(n) { return Math.round(BREIT * Math.sqrt(n / 300)); }
  function rund(w, v) { return ((v % w.breit) + w.breit) % w.breit; }     // Rand verbunden
  function platz(w, v) { return rund(w, Math.floor(v)); }

  function neigungPaare(p, e) { p.paare = nahe(e.paare); }
  function neigungDauer(p, e) { p.dauer = nahe(e.dauer); }
  function neigungKondom(p, e) { p.kondom = nahe(e.kondom / 100); }
  function neigungTest(p, e) { p.test = nahe(e.test); }

  // Eine Welt nach den Einstellungen e (siehe GRUND)
  function welt(e) {
    var n = Math.round(e.personen), infiziert = Math.round(n * e.start / 100), b = seite(n);
    var w = { e: e, breit: b, leute: [], woche: 0, neu: 0, negWochen: 0, kondomWochen: 0, paarWochen: 0, partnerschaften: 0, verlauf: [] };
    for (var i = 0; i < n; i++) {
      var p = { x: Math.random() * b, y: Math.random() * b, rechts: i % 2 === 0, partner: null, paarZeit: 0,
                inf: false, weiss: false, behandelt: false, infZeit: 0 };
      neigungPaare(p, e); neigungDauer(p, e); neigungKondom(p, e); neigungTest(p, e);
      w.leute.push(p);
    }
    mischen(w.leute);
    // Die ersten «infiziert» Personen sind HIV-positiv, unterschiedlich lange;
    // davon weiss der Anteil «wissen» Bescheid.
    for (i = 0; i < infiziert; i++) {
      var q = w.leute[i];
      q.inf = true; q.infZeit = Math.random() * e.symptome;
      if (Math.random() * 100 < e.wissen) erfahren(w, q);
    }
    for (i = 0; i < EINSCHWINGEN; i++) { bewegen(w); paaren(w); trennen(w); }
    w.partnerschaften = 0;
    notieren(w);
    return w;
  }

  function erfahren(w, p) { p.weiss = true; p.behandelt = Math.random() * 100 < w.e.therapie; }
  function ansteckend(p) { return p.inf && !p.behandelt; }

  function bewegen(w) {
    w.leute.forEach(function (p) {
      if (p.partner) { p.paarZeit++; return; }
      var r = Math.random() * 2 * Math.PI;
      p.x = rund(w, p.x + Math.cos(r)); p.y = rund(w, p.y + Math.sin(r));
    });
  }

  // Freie Personen pro Platz; wer nach rechts schaut, sucht auf dem Platz links
  // neben sich (wie im Original).
  function paaren(w) {
    var frei = {};
    w.leute.forEach(function (p) {
      if (p.partner || p.rechts) return;
      var k = platz(w, p.x) * w.breit + platz(w, p.y);
      (frei[k] = frei[k] || []).push(p);
    });
    mischen(w.leute.slice()).forEach(function (a) {
      if (a.partner || !a.rechts || !(Math.random() * 10 < a.paare)) return;
      var liste = frei[platz(w, a.x - 1) * w.breit + platz(w, a.y)];
      if (!liste) return;
      var kandidaten = liste.filter(function (b) { return !b.partner; });
      if (!kandidaten.length) return;
      var b = kandidaten[Math.floor(Math.random() * kandidaten.length)];
      if (!(Math.random() * 10 < b.paare)) return;
      a.partner = b; b.partner = a; a.paarZeit = b.paarZeit = 0;
      a.x = Math.floor(a.x) + 0.5; a.y = Math.floor(a.y) + 0.5;      // in die Mitte des Platzes
      b.x = Math.floor(b.x) + 0.5; b.y = Math.floor(b.y) + 0.5;
      w.partnerschaften++;
    });
  }

  function trennen(w) {
    w.leute.forEach(function (a) {
      if (!a.partner || !a.rechts) return;
      var b = a.partner;
      if (a.paarZeit > a.dauer || b.paarZeit > b.dauer) { a.partner = b.partner = null; a.paarZeit = b.paarZeit = 0; }
    });
  }

  function anstecken(w) {
    var e = w.e;
    w.leute.forEach(function (a) {
      if (!a.partner || !a.rechts) return;
      var b = a.partner;
      w.paarWochen++;
      if (Math.random() < Math.min(a.kondom, b.kondom)) { w.kondomWochen++; return; }
      if (ansteckend(a) && !b.inf && Math.random() * 100 < e.ansteckung) { b.inf = true; b.infZeit = 0; w.neu++; }
      else if (ansteckend(b) && !a.inf && Math.random() * 100 < e.ansteckung) { a.inf = true; a.infZeit = 0; w.neu++; }
    });
  }

  function testen(w) {
    var e = w.e;
    w.leute.forEach(function (p) {
      if (!p.inf || p.weiss) return;
      if (Math.random() * 52 < p.test || (p.infZeit > e.symptome && Math.random() < SYMPTOM_TEST)) erfahren(w, p);
    });
  }

  function woche(w) {
    w.leute.forEach(function (p) { if (p.inf) p.infZeit++; else w.negWochen++; });
    bewegen(w); paaren(w); trennen(w); anstecken(w); testen(w);
    w.woche++;
    notieren(w);
  }

  function masse(w) {
    var n = w.leute.length, inf = 0, unw = 0, beh = 0, paar = 0;
    w.leute.forEach(function (p) {
      if (p.inf) { inf++; if (!p.weiss) unw++; if (p.behandelt) beh++; }
      if (p.partner) paar++;
    });
    return { positiv: inf / n, unwissend: inf ? unw / inf : 0, behandelt: inf ? beh / inf : 0, inPaaren: paar / n,
             neu: w.negWochen ? 100 * w.neu / (w.negWochen / 52) : 0, partner: 2 * w.partnerschaften / n,
             kondom: w.paarWochen ? w.kondomWochen / w.paarWochen : 0 };
  }
  function notieren(w) {
    var m = masse(w);
    w.verlauf.push([m.positiv, m.positiv * m.unwissend]);
  }

  // Ein ganzer Durchgang (für «Messen» und Testläufe)
  function durchgang(e) {
    var w = welt(e), wochen = Math.round(e.jahre * 52);
    while (w.woche < wochen) woche(w);
    return w;
  }

  // Ein Regler hat sich geändert: die Neigungen aller neu auswürfeln (wie im
  // Original), bei der Therapie die Behandlung der Diagnostizierten.
  function nachstellen(w, k) {
    w.leute.forEach(function (p) {
      if (k === "paare") neigungPaare(p, w.e);
      else if (k === "dauer") neigungDauer(p, w.e);
      else if (k === "kondom") neigungKondom(p, w.e);
      else if (k === "test") neigungTest(p, w.e);
      else if (k === "therapie" && p.weiss) p.behandelt = Math.random() * 100 < w.e.therapie;
    });
  }

  // ------------------------------------------------------------ Hilfen
  function einstellungen(text) {
    var e = {};
    String(text || "").split(";").forEach(function (teil) {
      var k = teil.indexOf("=");
      if (k > 0) e[teil.slice(0, k).trim()] = parseFloat(teil.slice(k + 1));
    });
    return e;
  }
  function kopie(o) { var c = {}; Object.keys(o).forEach(function (k) { c[k] = o[k]; }); return c; }
  function prozent(x) { return Math.round(x * 100); }
  function komma(x, stellen) { return x.toFixed(stellen).replace(".", ","); }
  function stufe(wert) {
    var best = 0;
    ANSTECKUNG.forEach(function (s, i) { if (Math.abs(s - wert) < Math.abs(ANSTECKUNG[best] - wert)) best = i; });
    return best;
  }
  function ansteckungText(v) { return String(v).replace(".", ","); }
  function jahrText(woche) {
    var j = Math.floor(woche / 52), r = woche - 52 * j;
    return "Jahr " + j + ", Woche " + r;
  }

  // ------------------------------------------------------------ Modell «hiv»
  function bauen(kasten, h) {
    var ziel = kasten.dataset.ziel || "";
    var laender = (kasten.dataset.laender || "").split(";").map(function (s) { return s.trim(); }).filter(function (s) { return LAENDER[s]; });
    var mitLaendern = laender.length > 0;
    var messen = (kasten.dataset.messen || (mitLaendern ? "land;kondom;test;therapie;neu" : "paare;dauer;kondom;test;positiv"))
      .split(";").map(function (s) { return s.trim(); });
    var welche = (kasten.dataset.regler || "paare;dauer;kondom;test").split(";").map(function (s) { return s.trim(); });

    var e = kopie(GRUND);
    var vorgabe = einstellungen(kasten.dataset.werte);
    Object.keys(vorgabe).forEach(function (k) { if (!isNaN(vorgabe[k])) e[k] = vorgabe[k]; });
    var land = null;              // geladener Parametersatz
    var veraendert = false;       // seit dem Laden ein Regler verstellt?

    var w = null, laeuft = false, rahmen = null, letzte = 0;

    var feld = h.leinwand(300, 300, "Feld aus 25 × 25 Plätzen mit Personen; Kreise: HIV-negativ, gefüllt: HIV-positiv, Paare sind verbunden.");
    var kurve = h.leinwand(320, 300, "Verlauf: Anteil HIV-positiv und Anteil, der es nicht weiss, in Abhängigkeit von der Zeit.");
    var bilder = h.el("div", { class: "seg-bilder" });
    bilder.append(feld.element, kurve.element);
    var legende = legendeBauen(h);

    // Regler
    var R = {};
    function geaendert(k, v) {
      e[k] = v; veraendert = !!land;
      if (w) { nachstellen(w, k); beschriften(); zeichne(); }
      landZeigen();
    }
    R.paare = h.regler({ titel: "Paarbildung (Neigung)", min: 0, max: 10, wert: e.paare,
      beiAenderung: function (v) { geaendert("paare", v); } });
    R.dauer = h.regler({ titel: "Dauer einer Beziehung", min: 1, max: 200, wert: e.dauer, einheit: "Wochen",
      beiAenderung: function (v) { geaendert("dauer", v); } });
    R.kondom = h.regler({ titel: "Kondom", min: 0, max: 100, schritt: 1, wert: e.kondom, einheit: "% der Wochen",
      beiAenderung: function (v) { geaendert("kondom", v); } });
    R.test = h.regler({ titel: "Test", min: 0, max: 2, schritt: 0.1, wert: e.test, einheit: "pro Jahr",
      format: function (v) { return komma(v, 1); }, beiAenderung: function (v) { geaendert("test", v); } });
    R.therapie = h.regler({ titel: "Therapie: wirksam behandelt", min: 0, max: 100, wert: e.therapie, einheit: "% der Diagnostizierten",
      beiAenderung: function (v) { geaendert("therapie", v); } });
    R.ansteckung = h.regler({ titel: "Ansteckung ohne Schutz", min: 0, max: ANSTECKUNG.length - 1, wert: stufe(e.ansteckung), einheit: "% pro Woche",
      format: function (i) { return ansteckungText(ANSTECKUNG[i]); }, beiAenderung: function (i) { geaendert("ansteckung", ANSTECKUNG[i]); } });
    R.symptome = h.regler({ titel: "Symptome nach", min: 50, max: 1000, schritt: 10, wert: e.symptome,
      format: function (v) { return v + " Wochen (" + komma(v / 52, 1) + " Jahre)"; }, beiAenderung: function (v) { geaendert("symptome", v); } });
    e.ansteckung = ANSTECKUNG[stufe(e.ansteckung)];

    var TAKT = [10, 52, 520], TAKT_NAME = ["langsam", "mittel", "schnell"];   // Wochen pro Sekunde
    var tempo = h.regler({ titel: "Tempo der Anzeige", min: 0, max: 2, wert: 1, format: function (v) { return TAKT_NAME[v]; } });

    // Parametersätze
    var landLeiste = null, landInfo = null;
    if (mitLaendern) {
      landLeiste = h.el("div", { class: "sim-knoepfe hiv-laender", role: "group", "aria-label": "Parametersatz laden" });
      landLeiste.appendChild(h.el("span", { class: "hiv-etikett" }, "Parametersatz:"));
      laender.forEach(function (k) {
        var b = h.knopf(LAENDER[k].name, function () { laden(k); });
        b.dataset.land = k;
        landLeiste.appendChild(b);
      });
      landInfo = h.el("p", { class: "hiv-info", "aria-live": "polite" });
    }

    var status = h.el("p", { class: "sim-status", "aria-live": "off" });
    var meldung = h.el("p", { class: "sim-status sim-meldung", "aria-live": "polite" });
    var knopfStart = h.knopf("Start", function () {
      if (laeuft) { laeuft = false; beschriften(); return; }
      if (fertig()) neu();
      laeuft = true; meldung.textContent = ""; beschriften(); schleife();
    }, "haupt");
    var leiste = h.el("div", { class: "sim-knoepfe" });
    leiste.append(knopfStart, h.knopf("Neu beginnen", function () { neu(); }));
    if (ziel) leiste.appendChild(h.knopf("Messen", messenKlick));

    var reglerBox = h.el("div", { class: "sim-reglerfeld" });
    ["paare", "dauer", "kondom", "test", "therapie", "ansteckung", "symptome"].forEach(function (k) {
      if (welche.indexOf(k) >= 0) reglerBox.appendChild(R[k].element);
    });
    reglerBox.appendChild(tempo.element);
    if (landLeiste) kasten.append(landLeiste, landInfo);
    kasten.append(bilder, legende, status, leiste, meldung, reglerBox);

    function laden(k) {
      land = k; veraendert = false;
      e = kopie(GRUND);
      Object.keys(LAENDER[k].werte).forEach(function (s) { e[s] = LAENDER[k].werte[s]; });
      ["paare", "dauer", "kondom", "test", "therapie", "symptome"].forEach(function (s) { R[s].setzen(e[s]); });
      R.ansteckung.setzen(stufe(e.ansteckung));
      landZeigen();
      neu();
    }
    function landZeigen() {
      if (!landLeiste) return;
      Array.prototype.forEach.call(landLeiste.querySelectorAll("[data-land]"), function (b) {
        b.classList.toggle("gewaehlt", b.dataset.land === land);
        b.setAttribute("aria-pressed", b.dataset.land === land ? "true" : "false");
      });
      landInfo.textContent = land
        ? LAENDER[land].text + (veraendert ? " – Sie haben Werte verändert." : "")
        : "Wählen Sie einen Parametersatz.";
    }
    function landName() { return land ? LAENDER[land].name + (veraendert ? " (verändert)" : "") : "eigene Werte"; }

    function wochen() { return Math.round(e.jahre * 52); }
    function fertig() { return w && w.woche >= wochen(); }

    function neu() {
      laeuft = false;
      w = welt(kopie(e));
      meldung.textContent = "";
      beschriften(); zeichne();
    }

    function ergebnisText() {
      var m = masse(w);
      return mitLaendern
        ? "Nach " + e.jahre + " Jahren: " + komma(m.neu, 1) + " Neuansteckungen pro 100 HIV-negative Personen und Jahr (" + w.neu + " Personen)." +
          (land && !veraendert && LAENDER[land].gemessen != null ? " Gemessen im Land: " + komma(LAENDER[land].gemessen, 2) + "." : "")
        : "Nach " + e.jahre + " Jahren sind " + prozent(m.positiv) + " % HIV-positiv; " + prozent(m.unwissend) + " % von ihnen wissen es nicht.";
    }

    // «Messen»: ein ganzer Durchgang im Hintergrund, Ergebnis in die Tabelle.
    function messenKlick() {
      if (mitLaendern && !land) { meldung.textContent = "Laden Sie zuerst einen Parametersatz."; return; }
      w = durchgang(kopie(e));
      laeuft = false;
      var m = masse(w);
      var werte = {
        land: landName(), paare: e.paare, dauer: e.dauer, kondom: e.kondom, test: komma(e.test, 1), therapie: e.therapie,
        ansteckung: ansteckungText(e.ansteckung), symptome: e.symptome,
        positiv: prozent(m.positiv), neu: komma(m.neu, 1), unwissend: prozent(m.unwissend), partner: komma(m.partner, 1)
      };
      h.Daten.anhaengen(ziel, messen.map(function (k) { return werte[k] == null ? "" : werte[k]; }));
      meldung.textContent = ergebnisText() + " Der Messwert steht in der Tabelle.";
      beschriften(); zeichne();
    }

    function schleife() {
      if (rahmen) cancelAnimationFrame(rahmen);
      letzte = 0;
      rahmen = requestAnimationFrame(function takt(jetzt) {
        rahmen = null;
        if (!laeuft) return;
        var ms = 1000 / TAKT[tempo.wert()];
        if (!letzte) letzte = jetzt - ms;
        var faellig = Math.min(60, Math.floor((jetzt - letzte) / ms));
        if (faellig > 0) {
          letzte = faellig === 60 ? jetzt : letzte + faellig * ms;
          for (var k = 0; k < faellig && !fertig(); k++) woche(w);
          if (fertig()) { laeuft = false; meldung.textContent = ergebnisText(); }
          beschriften(); zeichne();
        }
        if (laeuft) rahmen = requestAnimationFrame(takt);
      });
    }

    function beschriften() {
      knopfStart.textContent = laeuft ? "Pause" : (w && w.woche && !fertig() ? "Weiter" : "Start");
      var m = masse(w), n = w.leute.length;
      var t = jahrText(w.woche) + " · HIV-positiv: " + prozent(m.positiv) + " % (" + Math.round(m.positiv * n) + " von " + n + ")" +
        " · davon wissen es nicht: " + prozent(m.unwissend) + " %";
      if (mitLaendern) t += " · Neuansteckungen: " + w.neu + (w.woche ? " (" + komma(m.neu, 1) + " pro 100 und Jahr)" : "");
      else t += " · in einer Partnerschaft: " + prozent(m.inPaaren) + " %";
      status.textContent = t;
    }

    function zeichne() {
      var f = h.farben();
      zeichneFeld(feld, w, f);
      zeichneVerlauf(kurve, w, f, wochen());
    }

    document.addEventListener("sim:farben", function () { if (w) zeichne(); });
    if (mitLaendern) laden(laender[0]); else neu();
  }

  // ------------------------------------------------------------ Zeichnen
  // Kreis: HIV-negativ · gefüllt: HIV-positiv, weiss es nicht · grau: weiss es,
  // steckt aber noch an · gelb: wirksam behandelt, steckt nicht an.
  function person(ctx, p, x, y, r, f) {
    ctx.beginPath(); ctx.arc(x, y, r, 0, 2 * Math.PI);
    if (!p.inf) { ctx.fillStyle = f.grund; ctx.fill(); ctx.strokeStyle = f.text; ctx.lineWidth = 1.2; ctx.stroke(); return; }
    if (p.behandelt) { ctx.fillStyle = f.marker; ctx.fill(); ctx.strokeStyle = f.aufMarker; ctx.lineWidth = 1.2; ctx.stroke(); return; }
    ctx.fillStyle = p.weiss ? f.linie : f.text; ctx.fill();
  }

  function zeichneFeld(bild, w, f) {
    var ctx = bild.ctx, s = bild.breite / w.breit, r = s * 0.32;
    ctx.fillStyle = f.grund; ctx.fillRect(0, 0, bild.breite, bild.hoehe);
    ctx.strokeStyle = f.linie; ctx.globalAlpha = 0.18; ctx.lineWidth = 1;
    for (var k = 0; k <= w.breit; k++) {
      ctx.beginPath(); ctx.moveTo(k * s + .5, 0); ctx.lineTo(k * s + .5, bild.hoehe); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, k * s + .5); ctx.lineTo(bild.breite, k * s + .5); ctx.stroke();
    }
    ctx.globalAlpha = 1;
    // Paare: ein Strich zwischen beiden (über den Rand hinweg nicht gezeichnet)
    ctx.strokeStyle = f.text; ctx.lineWidth = 2;
    w.leute.forEach(function (a) {
      if (!a.partner || !a.rechts) return;
      var b = a.partner;
      if (Math.abs(a.x - b.x) > 2 || Math.abs(a.y - b.y) > 2) return;
      ctx.beginPath(); ctx.moveTo(a.x * s, a.y * s); ctx.lineTo(b.x * s, b.y * s); ctx.stroke();
    });
    w.leute.forEach(function (p) { person(ctx, p, p.x * s, p.y * s, r, f); });
  }

  function zeichneVerlauf(bild, w, f, wochen) {
    var ctx = bild.ctx, B = bild.breite, H = bild.hoehe;
    var L = 44, Rr = 12, O = 14, U = 40;
    var jahre = wochen / 52;
    var ymax = 0.5;
    w.verlauf.forEach(function (v) { if (v[0] > ymax) ymax = 1; });
    ctx.fillStyle = f.grund; ctx.fillRect(0, 0, B, H);
    ctx.font = "500 11px " + (getComputedStyle(document.documentElement).getPropertyValue("--font-mono") || "monospace");
    function X(t) { return L + t / wochen * (B - L - Rr); }
    function Y(p) { return H - U - p / ymax * (H - O - U); }
    ctx.lineWidth = 1; ctx.textAlign = "right";
    for (var p = 0; p <= ymax + 1e-9; p += ymax / 5) {
      ctx.strokeStyle = p === 0 ? f.text : f.linie; ctx.globalAlpha = p === 0 ? 1 : 0.35;
      ctx.beginPath(); ctx.moveTo(L, Y(p) + .5); ctx.lineTo(B - Rr, Y(p) + .5); ctx.stroke();
      ctx.globalAlpha = 1; ctx.fillStyle = f.gedaempft;
      ctx.fillText(prozent(p) + " %", L - 6, Y(p) + 4);
    }
    ctx.textAlign = "center";
    var schritt = jahre <= 2 ? 0.5 : jahre <= 10 ? 2 : 5;
    for (var j = 0; j <= jahre + 1e-9; j += schritt) ctx.fillText(komma(j, j % 1 ? 1 : 0), X(j * 52), H - U + 15);
    ctx.fillStyle = f.text;
    ctx.fillText("Jahre →", (L + B - Rr) / 2, H - 6);
    ctx.textAlign = "left";
    ctx.fillText("Anteil der Bevölkerung", L, O - 3);

    function linie(idx, strich, breite) {
      ctx.setLineDash(strich); ctx.strokeStyle = f.text; ctx.lineWidth = breite; ctx.beginPath();
      var n = w.verlauf.length, d = Math.max(1, Math.floor(n / 400));
      for (var i = 0; i < n; i += d) { if (i) ctx.lineTo(X(i), Y(w.verlauf[i][idx])); else ctx.moveTo(X(i), Y(w.verlauf[i][idx])); }
      if (n > 1) ctx.lineTo(X(n - 1), Y(w.verlauf[n - 1][idx]));
      ctx.stroke(); ctx.setLineDash([]);
    }
    linie(1, [5, 4], 1.2);
    linie(0, [], 2);
    var letzte = w.verlauf[w.verlauf.length - 1];
    ctx.fillStyle = f.text; ctx.beginPath(); ctx.arc(X(w.verlauf.length - 1), Y(letzte[0]), 3, 0, 2 * Math.PI); ctx.fill();
    // kleine Legende oben rechts
    ctx.textAlign = "right"; ctx.fillStyle = f.gedaempft;
    ctx.fillText("— HIV-positiv", B - Rr - 2, O + 12);
    ctx.fillText("- - weiss es nicht", B - Rr - 2, O + 26);
  }

  function legendeBauen(h) {
    var p = h.el("p", { class: "seg-legende" });
    function zeichen(klasse, text) {
      var eintrag = h.el("span", { class: "hiv-eintrag" });
      eintrag.append(h.el("span", { class: "hiv-zeichen " + klasse, "aria-hidden": "true" }), " " + text);
      p.append(eintrag, "   ");
    }
    zeichen("negativ", "HIV-negativ");
    zeichen("unwissend", "HIV-positiv, weiss es nicht");
    zeichen("ohne", "weiss es, ohne wirksame Therapie");
    zeichen("behandelt", "wirksam behandelt, steckt nicht an");
    zeichen("paar", "Paar");
    return p;
  }

  if (typeof window !== "undefined" && window.Simulation) window.Simulation.modell("hiv", bauen);
  // Für Testläufe ausserhalb des Browsers (Node)
  if (typeof module === "object" && module.exports) {
    module.exports = { GRUND: GRUND, LAENDER: LAENDER, ANSTECKUNG: ANSTECKUNG, welt: welt, woche: woche, durchgang: durchgang, masse: masse, kopie: kopie };
  }
})();
