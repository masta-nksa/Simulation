/* ==========================================================================
   Lektionsuhr

   Zeigt auf jeder Seite der Einheit, bei welchem Schritt der Lektion man nach
   Plan steht und wann man spätestens zum nächsten wechselt – damit sich
   niemand in einer Unterlage verliert.

   WOHER DIE ZEITEN KOMMEN
   Aus dem Ablauf der Lektionsseite (lektion-N.md): Jeder Schritt der
   nummerierten Liste trägt seine Richtzeit, «*(ca. 13 Min., zu zweit)*», und –
   falls es eine Unterlage dazu gibt – den Link darauf. Es gibt keine zweite
   Stelle, an der Zeiten zu pflegen wären.

   WANN DIE UHR LÄUFT
   Sie startet von selbst, wenn die Lektionsseite geöffnet wird, und läuft bis
   zum Ende der Richtzeiten (plus NACHLAUF). Wer die Lektionsseite in dieser
   Zeit nochmals öffnet, lässt die Uhr weiterlaufen. Läuft noch die Uhr einer
   anderen Lektion, startet nichts von selbst – die Zeile über dem Ablauf
   bietet den Wechsel an. Dort lässt sich die Uhr auch neu starten oder
   ausblenden.

   Der Stand liegt im Browser (localStorage), pro Einheit ein Eintrag – nur auf
   diesem Gerät, es wird nichts übertragen. Jedes Gerät hat darum seine eigene
   Uhr: Die Zeiten sind Richtzeiten, den Takt gibt die Lehrperson an.

   Eingeschaltet wird die Uhr mit «lektionsuhr: true» in _config.yml.
   ========================================================================== */

(function () {
  "use strict";

  var NACHLAUF = 10;   // Minuten, in denen «Richtzeit ist um» noch stehen bleibt
  var MIN = 60000;

  // Pro Einheit ein Eintrag: Mehrere Einheiten teilen sich auf GitHub Pages
  // dieselbe Herkunft und unterscheiden sich nur im Pfad (baseurl).
  var skript = document.currentScript;
  var basis = skript ? new URL(skript.src).pathname.replace(/\/assets\/js\/[^/]*$/, "") : "";
  var KEY = "lektionsuhr:" + basis;

  // ------------------------------------------------------------ Speicher
  function laden() {
    try {
      var u = JSON.parse(localStorage.getItem(KEY));
      return u && u.start && u.schritte && u.schritte.length ? u : null;
    } catch (e) { return null; }
  }
  function speichern(u) {
    try { if (u) localStorage.setItem(KEY, JSON.stringify(u)); else localStorage.removeItem(KEY); } catch (e) { /* gesperrt */ }
  }

  // ------------------------------------------------------------ Hilfen
  function el(tag, attrs, text) {
    var e = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { e.setAttribute(k, attrs[k]); });
    if (text != null) e.textContent = text;
    return e;
  }
  // Zum Vergleichen: GitHub Pages liefert jede Seite auch ohne «.html» aus.
  function pfad(p) { return String(p || "").replace(/\.html$/, "").replace(/\/index$/, "/"); }
  function uhrzeit(ms) {
    var d = new Date(ms), m = d.getMinutes();
    return d.getHours() + ":" + (m < 10 ? "0" : "") + m;
  }
  function gesamt(u) { return u.schritte.reduce(function (s, x) { return s + x.min; }, 0); }
  function vergangen(u) { return (Date.now() - u.start) / MIN; }
  // Ende von Schritt i als Zeitpunkt
  function ende(u, i) {
    var s = 0;
    for (var k = 0; k <= i; k++) s += u.schritte[k].min;
    return u.start + s * MIN;
  }
  // Schritt, der nach Plan gerade dran ist (-1: Richtzeit der Lektion ist um)
  function dran(u) {
    var jetzt = Date.now();
    for (var i = 0; i < u.schritte.length; i++) if (jetzt < ende(u, i)) return i;
    return -1;
  }
  function sichtbar(u) { return !!u && !u.aus && vergangen(u) < gesamt(u) + NACHLAUF; }

  // ------------------------------------------------------------ Lektionsseite
  var ablauf = document.querySelector(".ablauf[data-lektion]");
  var liste = ablauf && ablauf.querySelector(":scope > ol");
  var hier = pfad(location.pathname);

  // Schritte aus der Liste lesen: fetter Name, Richtzeit, Link zur Unterlage.
  function ablaufLesen() {
    return Array.prototype.map.call(liste.children, function (li) {
      var name = li.querySelector("strong"), zeit = li.querySelector("strong + em");
      var m = zeit && zeit.textContent.match(/(\d+)\s*Min/);
      var a = Array.prototype.filter.call(li.querySelectorAll("a[href]"), function (x) { return x.host === location.host; })[0];
      return { titel: name ? name.textContent.trim() : "", min: m ? parseInt(m[1], 10) : 0, url: a ? a.pathname : "" };
    });
  }
  function neueUhr() {
    return {
      lektion: ablauf.dataset.lektion, url: location.pathname, schritte: ablaufLesen(),
      // Auf die volle Minute zurück, damit «bis 10:18» und «noch 3 Min.» zusammenpassen.
      start: Math.floor(Date.now() / MIN) * MIN
    };
  }

  if (liste) {
    var plan = ablaufLesen();
    if (plan.some(function (s) { return s.min > 0; })) {
      var alt = laden(), gleiche = alt && alt.lektion === ablauf.dataset.lektion;
      // Die eigene Lektion beginnt erst nach dem Nachlauf von vorn, eine andere
      // macht Platz, sobald ihre Richtzeit um ist (Doppellektion).
      if (!alt || vergangen(alt) >= gesamt(alt) + (gleiche ? NACHLAUF : 0)) speichern(neueUhr());
      else if (gleiche) { alt.schritte = plan; alt.url = location.pathname; speichern(alt); }
    } else {
      liste = null;   // Ablauf ohne Richtzeiten: keine Uhr
    }
  }

  // ------------------------------------------------------------ Leiste
  var leiste = null;

  function zeichneLeiste(u) {
    if (!sichtbar(u)) {
      if (leiste) { leiste.remove(); leiste = null; }
      document.documentElement.classList.remove("hat-lektionsuhr");
      return;
    }
    if (!leiste) {
      leiste = el("aside", { class: "lektionsuhr", "aria-label": "Lektionsuhr" });
      leiste.appendChild(el("div", { class: "lu-innen" }));
      document.body.appendChild(leiste);
      document.documentElement.classList.add("hat-lektionsuhr");
    }
    var innen = leiste.firstChild, n = u.schritte.length, jetzt = dran(u);
    var marke = "Lektion " + u.lektion, teile = [], ziel = null, um = false;

    function rest(i) {
      var r = Math.ceil((ende(u, i) - Date.now()) / MIN);
      return el("span", { class: "lu-rest" }, "(noch " + r + " Min.)");
    }

    if (jetzt === -1) {
      teile = ["Die Richtzeit dieser Lektion ist um (seit " + uhrzeit(ende(u, n - 1)) + ")."];
    } else {
      // Schritte, zu denen diese Seite gehört. Ist der aktuelle darunter, zählt
      // er; sonst der nächste, der noch kommt.
      var eigene = [];
      u.schritte.forEach(function (s, i) { if (s.url && pfad(s.url) === hier) eigene.push(i); });
      var i = eigene.indexOf(jetzt) !== -1 ? jetzt : eigene.filter(function (k) { return k > jetzt; })[0];
      var s = u.schritte[jetzt];

      if (i === jetzt) {
        // Auf der Unterlage des Schritts, der gerade dran ist
        marke += " · Schritt " + (i + 1) + "/" + n;
        teile = [s.titel + (i === n - 1 ? " – bis " : " – weiter spätestens um "), el("strong", null, uhrzeit(ende(u, i))), " ", rest(i)];
      } else if (i !== undefined) {
        // Voraus: Der Schritt dieser Unterlage kommt erst noch
        marke += " · Schritt " + (i + 1) + "/" + n;
        teile = [u.schritte[i].titel + " – geplant ", el("strong", null, uhrzeit(ende(u, i - 1)) + "–" + uhrzeit(ende(u, i)))];
      } else if (eigene.length && s.url) {
        // Auf der Unterlage eines Schritts, dessen Zeit um ist – und der
        // aktuelle Schritt hat eine eigene Unterlage, zu der man wechseln kann.
        um = true;
        marke = "Zeit um";
        teile = ["Jetzt Schritt " + (jetzt + 1) + "/" + n + ": " + s.titel + " (bis " + uhrzeit(ende(u, jetzt)) + ")"];
        ziel = { url: s.url, text: "Zur Unterlage" };
      } else {
        // Lektionsseite, Rückblick, Glossar, Werkzeuge …: was ist gerade dran?
        marke += " · Schritt " + (jetzt + 1) + "/" + n;
        teile = ["Jetzt: " + s.titel + " – bis ", el("strong", null, uhrzeit(ende(u, jetzt))), " ", rest(jetzt)];
        if (s.url && pfad(s.url) !== hier) ziel = { url: s.url, text: "Zur Unterlage" };
        else if (!s.url && pfad(u.url) !== hier) ziel = { url: u.url, text: "Zum Ablauf" };
      }
    }

    leiste.classList.toggle("um", um);
    innen.textContent = "";
    var m = el("a", { class: "lu-marke", href: u.url, title: "Zum Ablauf der Lektion" }, marke);
    var text = el("span", { class: "lu-text" });
    teile.forEach(function (t) { text.append(t); });
    innen.append(m, text);
    if (ziel) innen.appendChild(el("a", { class: "lu-weiter", href: ziel.url }, ziel.text + " →"));
    var zu = el("button", { type: "button", class: "lu-zu", "aria-label": "Lektionsuhr ausblenden", title: "Lektionsuhr ausblenden (einblenden: auf der Lektionsseite)" }, "×");
    zu.addEventListener("click", function () {
      var a = laden();
      if (a) { a.aus = true; speichern(a); }
      zeichne();
    });
    innen.appendChild(zu);
  }

  // ------------------------------------------------------------ Ablauf mit Uhrzeiten
  var steuerung = null;

  function knopf(text, tun) {
    var b = el("button", { type: "button", class: "lu-knopf" }, text);
    b.addEventListener("click", function () { tun(); zeichne(); });
    return b;
  }

  function zeichneAblauf(u) {
    if (!liste) return;
    var meine = u && u.lektion === ablauf.dataset.lektion && vergangen(u) < gesamt(u) + NACHLAUF;
    var an = meine && !u.aus, jetzt = an ? dran(u) : -2;

    // Uhrzeit hinter jeder Richtzeit, aktueller Schritt markiert
    Array.prototype.forEach.call(liste.children, function (li, i) {
      var z = li.querySelector(".lu-zeit");
      if (!an || !u.schritte[i] || !u.schritte[i].min) { if (z) z.remove(); }
      else {
        if (!z) {
          z = el("span", { class: "lu-zeit" });
          (li.querySelector("strong + em") || li.querySelector("strong") || li.firstChild).after(z);
        }
        z.textContent = "bis " + uhrzeit(ende(u, i));
      }
      li.classList.toggle("lu-jetzt", i === jetzt);
      li.classList.toggle("lu-vorbei", an && (jetzt === -1 || i < jetzt));
    });

    // Zeile über dem Ablauf: Stand der Uhr und die Knöpfe dazu
    if (!steuerung) {
      steuerung = el("p", { class: "lu-steuerung" });
      liste.before(steuerung);
    }
    steuerung.textContent = "";
    var titel = el("span", { class: "lu-titel", title: "Die Uhr startet, wenn Sie diese Seite öffnen, und zeigt auf jeder Unterlage, wann Sie spätestens zum nächsten Schritt wechseln. Sie läuft nur in Ihrem Browser – den Takt gibt die Lehrperson an." }, "Lektionsuhr");
    var starten = function () { speichern(neueUhr()); };
    if (an) {
      steuerung.append(titel, " Start " + uhrzeit(u.start) + ", Richtzeit bis " + uhrzeit(ende(u, u.schritte.length - 1)) + " · ",
        knopf("neu starten", starten), " · ",
        knopf("ausblenden", function () { u.aus = true; speichern(u); }));
    } else if (meine) {
      steuerung.append(titel, " ausgeblendet · ",
        knopf("einblenden", function () { delete u.aus; speichern(u); }), " · ",
        knopf("neu starten", starten));
    } else if (u && vergangen(u) < gesamt(u)) {
      steuerung.append(titel, " Es läuft noch Lektion " + u.lektion + " (bis " + uhrzeit(ende(u, u.schritte.length - 1)) + ") · ",
        knopf("stattdessen diese Lektion starten", starten));
    } else {
      steuerung.append(titel, " ", knopf("starten", starten));
    }
  }

  // ------------------------------------------------------------ Takt
  function zeichne() {
    var u = laden();
    zeichneLeiste(u);
    zeichneAblauf(u);
  }
  zeichne();
  setInterval(zeichne, 15000);
  // Zurück im Tab oder aus dem Seitencache: sofort nachführen. Ändert ein
  // anderer Tab den Stand (neu starten, ausblenden), zieht dieser mit.
  document.addEventListener("visibilitychange", function () { if (!document.hidden) zeichne(); });
  window.addEventListener("pageshow", zeichne);
  window.addEventListener("storage", function (ev) { if (ev.key === KEY) zeichne(); });
})();
