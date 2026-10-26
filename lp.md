---
layout: default
typ: uebersicht
titel: "Bereich für die Lehrperson"
kurz: "Konzept, Ablaufpläne und die vollständige Struktur der Website"
permalink: /LP/
noindex: true
sitemap: false
---

{%- assign lektionen = site.pages | where: "layout", "lektion" | sort: "lektion" -%}
{%- assign konzept = site.pages | where: "typ", "konzept" | first -%}

<div class="wrap">

<nav class="breadcrumb" aria-label="Sie sind hier">
  <a href="{{ '/' | relative_url }}">Übersicht</a> <span aria-hidden="true">/</span> Lehrperson
</nav>

<div class="prose" markdown="1">

# Bereich für die Lehrperson

Diese Seite bündelt alles, was auf den öffentlichen Lektionsseiten bewusst nicht
auftaucht: das didaktische Gesamtkonzept, die Ablaufpläne und die Musterlösungen.
Sie ist nirgends verlinkt und für Suchmaschinen gesperrt – erreichbar bleibt sie
über die Adresse `/LP/`. Setzen Sie am besten ein Lesezeichen.

## Wie die Website aufgebaut ist

| Bereich | Adresse | Inhalt |
|---|---|---|
| Startseite | `/` | Einstieg und Liste der Lektionen – das sehen die SuS |
| Lektion 1–8 | `/lektion-1.html` … | Ablauf als Aufträge mit Richtzeiten + Unterlagen der Lektion |
| Musterlösungen | `/lsg/` | alle Lösungen, nicht verlinkt – Link selbst weitergeben |
| Lehrperson | `/LP/` | diese Seite |

Die Inhalte stammen aus Markdown-Dateien im Repository: `lektionen/` enthält alle
Unterlagen, `lsg/` die Lösungen, `lektion-1.md` bis `lektion-8.md` die
Lektionsseiten samt Ablauf für die SuS. Änderungen an einer `.md`-Datei erscheinen
ein bis zwei Minuten nach dem Push automatisch auf der Website.

## So arbeitet die Klasse

Die Einheit ist ein Selbstlernmodul. Jede Lektion beginnt mit einem kurzen Input und endet
mit einer Phase, in der die Klasse ihre Erfahrungen festhält; dazwischen arbeiten die SuS in
ihrem Tempo durch die Etappen.

**Was die Seite selbst prüft:** Lücken, Auswahlfelder und Multiple Choice kontrolliert der Knopf
«Prüfen». Bei offenen Fragen können die SuS ihre Antwort mit der Musterlösung vergleichen,
sobald sie selbst etwas geschrieben haben, und schätzen sie danach selbst ein. Ausgenommen sind
Fragen, deren Auflösung in die gemeinsame Sicherung gehört.

**Lösungen direkt in der Unterlage:** Auf einer Unterlage «ockham» tippen (nicht in einem
Eingabefeld) oder fünfmal schnell auf den Seitentitel klicken. Dann erscheinen alle Lösungen;
nochmals auslösen blendet sie aus. Ob und wann Sie den Trick der Klasse verraten, entscheiden
Sie.

**Eingaben und Messwerte** bleiben im Browser des Geräts gespeichert – es wird nichts
übertragen. Wer das Gerät oder den Browser wechselt, beginnt leer. Die Messwerte des
Experiments aus Lektion 1 deshalb an der Tafel festhalten.

**Rückblick:** Ab Lektion 2 beginnt eine Lektion mit drei Fragen zur vorangehenden – gedacht
fürs Ankommen oder als Hausaufgabe, ohne eigene Zeit im Ablauf.

## Fortschritt auf einen Blick

Jede Unterlage färbt sich, je mehr Aufgaben darauf bearbeitet sind: ein Rahmen um den ganzen
Bildschirm, ein leichter Grundton und eine Leiste unter der Kopfzeile. So sehen Sie im
Vorbeigehen, wie weit jemand gekommen ist – auch von hinten und auf Distanz. Die Lektionsseite
zeigt den Stand der ganzen Lektion und jeder Unterlage, die Startseite den Stand jeder Lektion,
und in der Kopfzeile trägt jede Lektionsnummer einen Strich in ihrer Farbe.

<ul class="fs-legende">
  <li data-fs-stufe="0"><span class="fs-muster"></span><span><strong>keine Farbe</strong> – noch nicht begonnen</span></li>
  <li data-fs-stufe="1"><span class="fs-muster"></span><span><strong>Orange</strong> – begonnen (unter einem Drittel)</span></li>
  <li data-fs-stufe="2"><span class="fs-muster"></span><span><strong>Gelb</strong> – gut unterwegs (ab einem Drittel)</span></li>
  <li data-fs-stufe="3"><span class="fs-muster"></span><span><strong>Hellgrün</strong> – fast fertig (ab zwei Dritteln)</span></li>
  <li data-fs-stufe="4"><span class="fs-muster"></span><span><strong>Grün</strong> – alles bearbeitet</span></li>
</ul>

Gezählt wird, ob etwas eingetragen, gewählt oder angekreuzt ist – nicht, ob es stimmt. Eine
Checkliste («Das sollten Sie jetzt können») zählt als eine Aufgabe, sobald ein Punkt abgehakt
ist; eine Messtabelle, sobald eine Zeile Werte hat. Zusatz-Etappen zählen für die Lektion nicht
mit. Wer eine ganze Unterlage fehlerfrei geprüft hat, bekommt auf der Lektionsseite einen Stern
(★). Der Stand liegt wie alle Eingaben nur im Browser des Geräts: Eine Klassenübersicht gibt es
nicht, und wer die Eingaben einer Seite löscht, beginnt dort wieder bei null.

**Zwei Designs:** Über den Knopf rechts in der Kopfzeile wechseln die SuS zwischen «Klassisch»
und «Blüte» (pastell, verspielt). Im Design «Blüte» gibt es bei richtig geprüften Abschnitten
abwechselnd Konfetti, Herzen, Glitzer, Blüten oder Seifenblasen, bei einer fehlerfrei geprüften
Unterlage und am Ende einer Lektion ein Feuerwerk. «Klassisch» bleibt ruhig und zeigt nur die
Meldungen. Fortschrittsfarben und Druck sind in beiden Designs gleich.

## Grundlagen

</div>

<ul class="card-list">
  {%- if konzept %}
  <li class="card">
    <a href="{{ konzept.url | relative_url }}">
      <span class="badge badge-konzept">Konzept</span>
      <strong>{{ konzept.titel }}</strong>
      <span class="card-kurz">{{ konzept.kurz }}</span>
    </a>
  </li>
  {%- endif %}
  <li class="card">
    <a href="{{ '/lsg/' | relative_url }}">
      <span class="badge badge-musterloesung">Lösungen</span>
      <strong>Alle Musterlösungen</strong>
      <span class="card-kurz">Sammelseite unter <code>/lsg/</code> – Link nach Bedarf an die Klasse weitergeben</span>
    </a>
  </li>
  <li class="card">
    <a href="{{ '/steckbriefe.html' | relative_url }}">
      <span class="badge badge-steckbrief">Steckbrief</span>
      <strong>Steckbriefe der vier Modelle</strong>
      <span class="card-kurz">Zu jedem Modell dieselben acht Fragen – füllen die SuS nach und nach aus</span>
    </a>
  </li>
  <li class="card">
    <a href="{{ '/theorie.html' | relative_url }}">
      <span class="badge badge-lerndossier">Lerndossier</span>
      <strong>Lerndossier: Simulationen</strong>
      <span class="card-kurz">Alle Erkenntnisse der Lektionen 1–6 nach Lernzielen – Grundlage für die Prüfung</span>
    </a>
  </li>
  <li class="card">
    <a href="{{ '/LP/dossier.html' | relative_url }}">
      <span class="badge badge-dossier">Dossier</span>
      <strong>Dossier für die Lehrperson</strong>
      <span class="card-kurz">Ablaufpläne, Unterlagen und Musterlösungen aller Lektionen zum Ausdrucken</span>
    </a>
  </li>
</ul>

{%- for l in lektionen %}
{%- assign material = site.pages | where: "typ", "material" | where: "lektion", l.lektion | sort: "reihenfolge" -%}
{%- assign fuer_lp = material | where: "zielgruppe", "lehrperson" -%}
{%- assign fuer_sus = material | where: "zielgruppe", "sus" -%}
{%- assign loesungen = site.pages | where: "zielgruppe", "loesung" | where: "lektion", l.lektion -%}

<section class="material-block block-lehrperson">
  <h2><span class="block-icon" aria-hidden="true">&#128218;</span> Lektion {{ l.lektion }}: {{ l.titel }}</h2>
  <p class="block-hint">{{ l.methode }} · {{ l.output }} · <a href="{{ l.url | relative_url }}">Lektionsseite ansehen</a></p>
  <ul class="card-list">
    {%- for m in fuer_lp %}
    <li class="card">
      <a href="{{ m.url | relative_url }}">
        <span class="badge badge-{{ m.art }}">{{ site.art_labels[m.art] }}</span>
        <strong>{{ m.titel }}</strong>
        <span class="card-kurz">{{ m.kurz }}</span>
      </a>
    </li>
    {%- endfor %}
    {%- for m in fuer_sus %}
    <li class="card">
      <a href="{{ m.url | relative_url }}">
        <span class="badge badge-{{ m.art }}">{{ site.art_labels[m.art] }}</span>
        <strong>{{ m.titel }}</strong>
        <span class="card-kurz">{{ m.kurz }}</span>
      </a>
    </li>
    {%- endfor %}
    {%- for m in loesungen %}
    <li class="card">
      <a href="{{ m.url | relative_url }}">
        <span class="badge badge-musterloesung">Musterlösung</span>
        <strong>{{ m.titel }}</strong>
        <span class="card-kurz">{{ m.kurz }}</span>
      </a>
    </li>
    {%- endfor %}
  </ul>
</section>
{%- endfor %}

<nav class="pager">
  <a class="pager-prev" href="{{ '/' | relative_url }}"><span>&larr; Zurück</span>Zur Startseite</a>
</nav>

</div>
