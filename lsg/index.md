---
layout: default
typ: uebersicht
zielgruppe: uebersicht
art: ""
titel: "Musterlösungen"
kurz: "Lösungen und Zusammenfassungen zu den Aufträgen"
permalink: /lsg/
noindex: true
sitemap: false
---

<div class="wrap wrap-narrow">

<nav class="breadcrumb" aria-label="Sie sind hier">
  <a href="{{ '/' | relative_url }}">Übersicht</a> <span aria-hidden="true">/</span> Musterlösungen
</nav>

<div class="prose" markdown="1">

# Musterlösungen

Hier liegen die Lösungen und Zusammenfassungen zu den Aufträgen. Diese Seite ist von
den Lektionsseiten aus **nicht verlinkt** – Sie haben den Link von Ihrer Lehrperson
erhalten.

Nutzen Sie die Lösungen, um Ihre eigenen Antworten zu kontrollieren oder um eine
verpasste Lektion nachzuholen. Zuerst selbst versuchen lohnt sich: Beim blossen
Durchlesen bleibt erfahrungsgemäss deutlich weniger hängen.

</div>

{%- assign loesungen = site.pages | where: "zielgruppe", "loesung" | sort: "lektion" %}
<ul class="card-list card-list-breit">
  {%- for m in loesungen %}
  <li class="card">
    <a href="{{ m.url | relative_url }}">
      <span class="badge badge-musterloesung">Lektion {{ m.lektion }}</span>
      <strong>{{ m.titel }}</strong>
      <span class="card-kurz">{{ m.kurz }}</span>
    </a>
  </li>
  {%- endfor %}
</ul>

<nav class="pager">
  <a class="pager-prev" href="{{ '/' | relative_url }}"><span>&larr; Zurück</span>Zur Übersicht</a>
</nav>

</div>
