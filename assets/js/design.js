/* ==========================================================================
   Design umschalten

   Drei Designs für dieselben Inhalte:
     klassisch  Tinte auf Papier, Leuchtstift-Gelb (Standard)
     bluete     pastell, rund und verspielt, mit Feier-Effekten (feier.js)
     grusel     Halloween: nachtviolett mit Kürbis-Orange, Spinnweben,
                Fledermäuse und Geister als Feier-Effekte

   Der Knopf in der Kopfzeile wechselt zum jeweils nächsten Design (im Kreis). Die Wahl
   bleibt im Browser gespeichert («unterricht:design») und gilt für alle
   Einheiten auf derselben Website. Gesetzt wird sie schon im <head>
   (_layouts/default.html), damit die Seite nicht kurz im falschen Design
   aufblitzt; dieses Skript baut nur den Knopf. Gedruckt wird immer klassisch.

   Ein weiteres Design: Eintrag in DESIGNS, Variablen und Regeln unter
   html[data-design="…"] im Stylesheet (Abschnitt 9 als Vorlage).
   ========================================================================== */

(function () {
  "use strict";

  var SCHLUESSEL = "unterricht:design";
  var DESIGNS = [
    { id: "klassisch", name: "Klassisch" },
    { id: "bluete", name: "Blüte" },
    { id: "grusel", name: "Grusel" }
  ];

  function aktuell() { return document.documentElement.getAttribute("data-design") || "klassisch"; }
  function setzen(id) {
    if (id === "klassisch") document.documentElement.removeAttribute("data-design");
    else document.documentElement.setAttribute("data-design", id);
    try { localStorage.setItem(SCHLUESSEL, id); } catch (e) { /* gesperrt */ }
    document.dispatchEvent(new CustomEvent("design:gewechselt", { detail: { design: id } }));
  }

  var knopf = document.querySelector(".design-knopf");
  if (!knopf) return;
  function beschriften() {
    var i = DESIGNS.map(function (d) { return d.id; }).indexOf(aktuell());
    var naechstes = DESIGNS[(i + 1) % DESIGNS.length];
    knopf.dataset.ziel = naechstes.id;
    knopf.querySelector(".design-name").textContent = naechstes.name;
    knopf.title = "Zum Design «" + naechstes.name + "» wechseln";
    knopf.setAttribute("aria-label", "Design wechseln, jetzt: " + DESIGNS[Math.max(0, i)].name);
  }
  knopf.addEventListener("click", function () { setzen(knopf.dataset.ziel); beschriften(); });
  knopf.hidden = false;
  beschriften();

  // Wechsel in einer anderen Registerkarte übernehmen
  window.addEventListener("storage", function (ev) {
    if (ev.key === SCHLUESSEL && ev.newValue && ev.newValue !== aktuell()) {
      if (ev.newValue === "klassisch") document.documentElement.removeAttribute("data-design");
      else document.documentElement.setAttribute("data-design", ev.newValue);
      document.dispatchEvent(new CustomEvent("design:gewechselt", { detail: { design: ev.newValue } }));
      beschriften();
    }
  });
})();
