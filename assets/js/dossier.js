/* ==========================================================================
   Dossier: sammelt die Unterlagen aller Lektionen auf einer Seite, damit man
   sie in einem Durchgang drucken oder als PDF speichern kann.

   Die Liste der Seiten erzeugt Jekyll beim Bauen als JSON im Element
   <script type="application/json" id="dossier-daten">. Dieses Skript lädt die
   Seiten im Browser nach und übernimmt jeweils nur den Inhalt (article.prose
   bzw. den Ablauf der Lektionsseite) – Navigation und Fusszeile bleiben weg.
   ========================================================================== */

(function () {
  "use strict";

  var datenEl = document.getElementById("dossier-daten");
  var ziel = document.getElementById("dossier-inhalt");
  var auswahl = document.getElementById("dossier-auswahl");
  var status = document.getElementById("dossier-status");
  if (!datenEl || !ziel) return;

  var lektionen;
  try { lektionen = JSON.parse(datenEl.textContent); } catch (e) { status.textContent = "Fehler beim Lesen der Seitenliste."; return; }

  // Auswahl: eine Checkbox pro Lektion
  lektionen.forEach(function (l) {
    var id = "dossier-l" + l.lektion;
    var cb = document.createElement("input");
    cb.type = "checkbox"; cb.id = id; cb.checked = true;
    cb.addEventListener("change", function () {
      var sek = document.getElementById("dossier-sektion-" + l.lektion);
      if (sek) sek.hidden = !cb.checked;
    });
    var lab = document.createElement("label");
    lab.htmlFor = id;
    lab.append(cb, " Lektion " + l.lektion);
    auswahl.appendChild(lab);
  });

  // Wie im Layout: vier oder mehr Unterstriche werden zur Schreiblinie. Das
  // Layout-Skript ist beim Laden der Dossierseite schon gelaufen, darum hier
  // nochmals für die nachgeladenen Inhalte.
  function schreiblinien(root) {
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null), nodes = [], n;
    while ((n = walker.nextNode())) { if (/_{4,}/.test(n.nodeValue)) nodes.push(n); }
    nodes.forEach(function (node) {
      var frag = document.createDocumentFragment();
      node.nodeValue.split(/(_{4,})/).forEach(function (p) {
        if (/^_{4,}$/.test(p)) { var s = document.createElement("span"); s.className = "fill-line"; frag.appendChild(s); }
        else if (p) frag.appendChild(document.createTextNode(p));
      });
      node.parentNode.replaceChild(frag, node);
    });
  }

  var neueSeite = document.getElementById("dossier-neue-seite");
  if (neueSeite) neueSeite.addEventListener("change", function () { ziel.classList.toggle("dossier-neue-seite", neueSeite.checked); });

  // Gedruckt wird eine leere Vorlage, ausser die eigenen Eingaben sind gewünscht.
  var eingaben = document.getElementById("dossier-eingaben");
  function eingabenSetzen() { ziel.classList.toggle("dossier-leer", !(eingaben && eingaben.checked)); }
  if (eingaben) eingaben.addEventListener("change", eingabenSetzen);
  eingabenSetzen();

  function laden(url) {
    return fetch(url, { credentials: "same-origin", cache: "no-cache" }).then(function (r) {
      if (!r.ok) throw new Error(r.status);
      return r.text();
    }).then(function (html) {
      return new DOMParser().parseFromString(html, "text/html");
    });
  }

  var gesamt = lektionen.reduce(function (s, l) { return s + 1 + l.seiten.length; }, 0), fertig = 0;
  function fortschritt() { fertig++; status.textContent = "Lade Unterlagen … " + fertig + " / " + gesamt; }

  Promise.all(lektionen.map(function (l) {
    var sektion = document.createElement("section");
    sektion.id = "dossier-sektion-" + l.lektion;
    ziel.appendChild(sektion);

    var auftraege = [laden(l.url).then(function (doc) {
      fortschritt();
      var teil = document.createElement("div");
      teil.className = "dossier-teil dossier-lektion";
      var h = document.createElement("h1");
      h.textContent = "Lektion " + l.lektion + ": " + l.titel;
      teil.appendChild(h);
      var ablauf = doc.querySelector(".ablauf");
      if (ablauf) {
        var h2 = document.createElement("h2"); h2.textContent = "Ablauf";
        teil.appendChild(h2);
        teil.insertAdjacentHTML("beforeend", ablauf.innerHTML);
      }
      return teil;
    })].concat(l.seiten.map(function (s) {
      return laden(s.url).then(function (doc) {
        fortschritt();
        var teil = document.createElement("div");
        teil.className = "dossier-teil";
        teil.dataset.quelle = new URL(s.url, location.href).pathname;
        var art = doc.querySelector(".prose");
        teil.innerHTML = art ? art.innerHTML : "<p>(Inhalt von " + s.titel + " nicht gefunden.)</p>";
        return teil;
      });
    }));

    return Promise.all(auftraege).then(function (teile) {
      teile.forEach(function (t) { sektion.appendChild(t); });
    });
  })).then(function () {
    schreiblinien(ziel);
    if (window.Uebungen) Array.prototype.forEach.call(ziel.querySelectorAll(".dossier-teil[data-quelle]"), function (t) { window.Uebungen.start(t, t.dataset.quelle); });
    status.textContent = "Alle " + gesamt + " Seiten geladen. Wählen Sie oben die Lektionen und drucken Sie mit dem Knopf «Drucken» (oder Ctrl/Cmd + P → «Als PDF speichern»).";
    if (window.Simulation && window.Simulation.start) window.Simulation.start();
  }).catch(function (err) {
    status.textContent = "Beim Laden ist ein Fehler aufgetreten (" + err.message + "). Bitte Seite neu laden.";
  });
})();
