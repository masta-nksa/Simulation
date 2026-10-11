---
layout: material
art: dossier
zielgruppe: lehrperson
titel: "Dossier für die Lehrperson"
kurz: "Ablaufpläne, alle Unterlagen und Musterlösungen der Einheit in einem Dokument"
permalink: /LP/dossier.html
noindex: true
sitemap: false
---

# Dossier für die Lehrperson

<p class="dossier-intro">Pro Lektion: Ablauf der SuS-Seite, Ablaufplan, alle Unterlagen der Klasse und die
Musterlösungen – zum Ausdrucken als Unterrichtsordner. Diese Seite ist wie <code>/LP/</code> nirgends
verlinkt.</p>

<div class="kasten dossier-steuerung" markdown="1">

**Lektionen auswählen:** <span id="dossier-auswahl" class="dossier-auswahl"></span>

<label class="dossier-option"><input type="checkbox" id="dossier-neue-seite"> Jede Unterlage auf einer neuen Seite beginnen (sonst wird Papier gespart)</label>

<span id="dossier-status" class="dossier-status">Unterlagen werden geladen …</span>

</div>

<div id="dossier-inhalt"></div>

{%- assign lektionen = site.pages | where: "layout", "lektion" | sort: "lektion" %}
<script type="application/json" id="dossier-daten">
[{%- for l in lektionen -%}
{%- assign material = site.pages | where: "typ", "material" | where: "lektion", l.lektion | sort: "reihenfolge" -%}
{%- assign fuer_lp = material | where: "zielgruppe", "lehrperson" -%}
{%- assign fuer_sus = material | where: "zielgruppe", "sus" -%}
{%- assign loesungen = material | where: "zielgruppe", "loesung" -%}
{%- assign alle = fuer_lp | concat: fuer_sus | concat: loesungen -%}
{"lektion": {{ l.lektion }}, "titel": {{ l.titel | jsonify }}, "url": {{ l.url | relative_url | jsonify }}, "seiten": [{%- for m in alle -%}{"url": {{ m.url | relative_url | jsonify }}, "titel": {{ m.titel | jsonify }}}{%- unless forloop.last -%},{%- endunless -%}{%- endfor -%}]}{%- unless forloop.last -%},{%- endunless -%}
{%- endfor -%}]
</script>
<script src="{{ '/assets/js/dossier.js' | relative_url }}" defer></script>
