---
layout: material
art: dossier
titel: "Dossier zum Ausdrucken"
kurz: "Alle Unterlagen der Einheit in einem Dokument – zum Drucken oder als PDF speichern"
permalink: /dossier.html
---

# Dossier: Simulationen

<p class="dossier-intro">Hier sind alle Arbeitsblätter, Aufträge und Inputs der Einheit auf einer Seite gesammelt.
Wählen Sie die Lektionen aus und klicken Sie oben rechts auf <strong>Drucken</strong>. Für eine PDF-Datei
wählen Sie im Druckdialog «Als PDF speichern».</p>

<div class="kasten dossier-steuerung" markdown="1">

**Lektionen auswählen:** <span id="dossier-auswahl" class="dossier-auswahl"></span>

<label class="dossier-option"><input type="checkbox" id="dossier-neue-seite"> Jede Unterlage auf einer neuen Seite beginnen (sonst wird Papier gespart)</label>

<label class="dossier-option"><input type="checkbox" id="dossier-eingaben"> Eigene Eingaben mitdrucken (sonst bleiben Linien und Kästchen leer)</label>

<span id="dossier-status" class="dossier-status">Unterlagen werden geladen …</span>

Tipp für den Druck: Im Druckdialog unter «Weitere Einstellungen» die Kopf- und Fusszeilen
ausschalten. Jede Lektion beginnt auf einer neuen Seite. Simulationen und Knöpfe
erscheinen nicht auf Papier.

</div>

<div id="dossier-inhalt"></div>

{%- assign lektionen = site.pages | where: "layout", "lektion" | sort: "lektion" %}
<script type="application/json" id="dossier-daten">
[{%- for l in lektionen -%}
{%- assign material = site.pages | where: "typ", "material" | where: "lektion", l.lektion | where: "zielgruppe", "sus" | where_exp: "m", "m.drucken != false" | sort: "reihenfolge" -%}
{"lektion": {{ l.lektion }}, "titel": {{ l.titel | jsonify }}, "url": {{ l.url | relative_url | jsonify }}, "seiten": [{%- for m in material -%}{"url": {{ m.url | relative_url | jsonify }}, "titel": {{ m.titel | jsonify }}}{%- unless forloop.last -%},{%- endunless -%}{%- endfor -%}]}{%- unless forloop.last -%},{%- endunless -%}
{%- endfor -%}]
</script>
<script src="{{ '/assets/js/dossier.js' | relative_url }}" defer></script>
