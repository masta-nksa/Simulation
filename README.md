# Simulationen – Unterrichtseinheit (8 Lektionen)

Materialien zur Unterrichtseinheit «Simulationen».
Die Website wird von GitHub Pages direkt aus diesem Repository mit Jekyll gebaut –
**die Markdown-Dateien sind die Quelle, generiertes HTML wird nie eingecheckt.**

## Aufbau

```
├── _config.yml            Konfiguration (Titel, baseurl, Badge-Beschriftungen, Signet, Kopfzeile)
├── index.md               Startseite
├── lektion-1.md …         Lektionsseiten: Metadaten + Ablauf als Aufträge für die SuS
├── lektionen/             Arbeitsblätter (SuS) und Ablaufpläne (Lehrperson)
├── lsg/                   Musterlösungen  →  /lsg/
├── lp.md                  Bereich für die Lehrperson  →  /LP/
├── konzept.md             didaktisches Gesamtkonzept
├── steckbriefe.md         Steckbriefe der vier Modelle  →  /steckbriefe.html
├── theorie.md             Lerndossier: alle Erkenntnisse der Lektionen 1–6 nach Lernzielen  →  /theorie.html
├── dossier.md             alle Unterlagen auf einer Seite zum Drucken
├── lp-dossier.md          dasselbe mit Ablaufplänen und Lösungen  →  /LP/dossier.html
├── quellen/               ursprüngliche Python-Programme und Prüfungen (nur lokal, nie ins Repository)
├── _layouts/              HTML-Gerüst (default / startseite / lektion / material)
├── assets/fonts/          Schriften (Inter, IBM Plex Mono), lokal statt von fremden Servern
├── assets/css/unterricht.css   Gestaltung inkl. Dark Mode und Druckansicht
└── assets/js/             uebungen.js (Eingabefelder mit Kontrolle), simulation.js
                           (Simulationen, Messtabellen, Schaubilder), sim-*.js (je ein
                           Modell), dossier.js, fortschritt.js (Farbe nach Fortschritt),
                           feier.js (Effekte bei richtigen Antworten), design.js
                           (Umschalter Klassisch/Blüte)
```

## Simulationen, Messtabellen, Schaubilder

Die Einheit ist ein Selbstlernmodul: Die Simulationen laufen direkt auf der Seite. Im
Markdown stehen dafür leere Platzhalter, die `assets/js/simulation.js` beim Laden füllt:

```html
<div class="simulation" data-modell="brown" data-ziel="brown"></div>
<div class="messtabelle" data-id="brown" data-spalten="Abstand (Zellen);Zeit (Zeitschritte)" data-fest></div>
<div class="schaubild" data-quelle="brown" data-kurven="linear;quadratisch"></div>
```

Alle Attribute sind im Kopf von `simulation.js` beschrieben, die modelleigenen im Kopf der
jeweiligen `sim-*.js` – etwa `data-vergleich` für zwei Stau-Strecken A und B mit gemeinsamem
Start (L3, Etappe 3 und Zusatz «Träges Anfahren») oder `data-regler`, `data-start` und
`data-messen` für die Erweiterungen des Segregationsmodells (L5, Zusatz-Etappen) oder
`data-laender` für die Parametersätze Eswatini 2011/2016 und Südafrika 2024 im HIV-Modell (L6,
Etappe 2). Ein neues Modell ist eine Datei
`assets/js/sim-<name>.js`, die sich mit `Simulation.modell("<name>", …)` anmeldet und in
`_layouts/default.html` geladen wird. Eingabefelder (`span.luecke`, `span.wahl`,
`div.antwort`, Multiple Choice) sind im Kopf von `uebungen.js` beschrieben.

Messwerte und Eingaben liegen im Browser (localStorage), nur auf dem jeweiligen Gerät. Eine
Messtabelle gilt über ihre `data-id` für die ganze Einheit: Die Werte des Experiments aus
Lektion 1 erscheinen in Lektion 2 wieder.

| Modell | Datei | Lektion | Stand |
|---|---|---|---|
| Brownsche Bewegung | `sim-brown.js` | 2 | fertig |
| Stau (Nagel-Schreckenberg) | `sim-stau.js` (Modelle `stau` und `stau-regeln`) | 3, 4 | fertig |
| Segregation (Schelling) | `sim-segregation.js` (Modelle `segregation` und `segregation-hand`) | 5 | fertig |
| Krankheitsübertragung (HIV) | `sim-hiv.js` (Modell `hiv`, nach NetLogo «HIV», CC BY-NC-SA 3.0) | 6 | fertig |

## Wer sieht was

| Adresse | Inhalt | verlinkt von |
|---|---|---|
| `/` und `/lektion-N.html` | Ablauf und Unterlagen für die SuS | Navigation |
| `/lsg/` | alle Musterlösungen | nirgends – Link selbst weitergeben |
| `/LP/` | Konzept, Ablaufpläne, Gesamtstruktur | nirgends – Lesezeichen setzen |

`/lsg/` und `/LP/` sind öffentlich erreichbar, aber weder verlinkt noch für
Suchmaschinen freigegeben (`noindex` + kein Eintrag in der `sitemap.xml`). Beides
steht als `noindex: true` / `sitemap: false` im Frontmatter bzw. in den `defaults`
von `_config.yml`. **Achtung:** GitHub Pages unterscheidet Gross- und Kleinschreibung –
`/LP/` funktioniert, `/lp/` nicht.

## Inhalte bearbeiten

Text ändern: einfach die `.md`-Datei bearbeiten (lokal oder direkt auf github.com über
den Stift-Button) und committen. Ein paar Minuten später ist die Seite aktualisiert.

Jede Inhaltsdatei beginnt mit einem kleinen YAML-Block, aus dem sich Navigation und
Einordnung ergeben – der Rest der Datei ist normales Markdown:

```yaml
---
lektion: 3              # zu welcher Lektion gehört die Datei
zielgruppe: sus         # sus | lehrperson  → bestimmt den Bereich auf der Lektionsseite
art: arbeitsblatt       # Badge; mögliche Werte siehe art_labels in _config.yml
titel: "Gruppenpuzzle: Schutzmassnahmen"   # Titel in Navigation und Browser-Tab
kurz: "Sechs Pakete zu den 11 Schutzmassnahmen"   # Kurzbeschrieb auf der Lektionsseite
reihenfolge: 2          # Sortierung innerhalb des Bereichs
---
```

Für `zielgruppe` gilt: `sus` erscheint auf der Lektionsseite, `lehrperson` nur unter
`/LP/`. Musterlösungen brauchen kein `zielgruppe` – dafür genügt es, die Datei in
`lsg/` abzulegen, den Rest setzen die `defaults` in `_config.yml`.

**Neues Material hinzufügen:** Datei in `lektionen/` (bzw. `lsg/`) anlegen, obigen
Block anpassen, committen – sie erscheint automatisch an der richtigen Stelle. Es muss
kein HTML und keine Navigation angefasst werden.

**Ablauf einer Lektion ändern:** Der Ablauf steht als nummerierte Liste im Textteil von
`lektion-N.md` – die Nummerierung und die Zeitangaben (`*(ca. 15 Min.)*`) werden
automatisch formatiert.

**Externe Links** als normale Markdown-Links schreiben. Sie öffnen von selbst in einem
neuen Tab (Skript in `_layouts/default.html`), interne Links bleiben im selben Tab.

## Gestaltung

Es gibt zwei Designs, umschaltbar über den Knopf rechts in der Kopfzeile:

- **Klassisch** (Standard) ist als gemeinsames Design aller Unterrichtseinheiten gedacht und
  steckt so auch im Gerüst für neue Einheiten: Tinte auf Papier, Schreibmaschinenschrift
  (IBM Plex Mono) für Titel, Nummern und Etiketten, Inter für den Lesetext, Leuchtstift-Gelb
  als einzige Farbe.
- **Blüte** richtet sich an eine verspieltere Lesart, vor allem an Schülerinnen: Pastell
  (Rosé, Lavendel, Mint), runde Karten mit weichen Schatten, Verläufe in Titeln und Knöpfen,
  Blüten als Schmuckzeichen. Dazu kommen Feier-Effekte (`feier.js`): Ist ein geprüfter Abschnitt
  ganz richtig, gibt es abwechselnd Konfetti, Herzen, Glitzer, Blüten oder Seifenblasen – nie
  zweimal dasselbe hintereinander. Eine fehlerfrei geprüfte Unterlage und eine fertige Lektion
  feiern mit Feuerwerk, Konfetti- oder Herzregen und einer Meldung (je einmal). Im Design
  «Klassisch» und bei «Bewegung reduzieren» im Betriebssystem erscheinen nur die Meldungen.

Die Wahl bleibt im Browser gespeichert (`unterricht:design`) und gilt für alle Einheiten auf
derselben Website; gesetzt wird sie schon im `<head>`, damit nichts aufblitzt. Gedruckt wird
immer klassisch. Dark Mode folgt in beiden Designs der Einstellung des Geräts. Die Schriften
liegen in `assets/fonts/`, es wird nichts von fremden Servern geladen. Ein weiteres Design
ist ein Eintrag in `DESIGNS` (`design.js`) und ein Block `html[data-design="…"]` im
Stylesheet (Abschnitt 9 als Vorlage).

Was diese Einheit von anderen unterscheidet, steht nicht im Stylesheet, sondern hier:

| Angabe | Wo | Wirkung |
|---|---|---|
| `signet` | `_config.yml` | Zeichenleiste unter dem Titel der Startseite (ein auskommentiertes Beispiel steht dort) |
| `hauptnav` | `_config.yml` | Zusatzeinträge in der Kopfzeile, hinter den Lektionsnummern |
| `stichwort` | Frontmatter von `lektion-N.md` | ein Wort rechts in der Lektionsliste der Startseite |

Alle drei sind optional; fehlt eine Angabe, entfällt das Element. Fett Gesetztes im
Einstiegstext von `index.md` bekommt den Leuchtstift – gedacht für die Leitfrage.

Farben, Linien und Schriften hängen an den Variablen in Abschnitt 2 von
`assets/css/unterricht.css`. Gedruckt wird in der Systemschrift des Geräts, schwarz auf weiss.

## Fortschritt auf einen Blick

In beiden Designs färbt sich eine Unterlage, je mehr ihrer Aufgaben bearbeitet sind
(`assets/js/fortschritt.js`): Rahmen um den Bildschirm, leichter Grundton und eine Leiste unter
der Kopfzeile. So sieht die Lehrperson im Vorbeigehen, wie weit jemand ist.

| Stufe | Farbe | Anteil bearbeitet |
|---|---|---|
| 0 | keine | noch nicht begonnen |
| 1 | Orange | unter einem Drittel |
| 2 | Gelb | ab einem Drittel |
| 3 | Hellgrün | ab zwei Dritteln |
| 4 | Grün | alles |

Als Aufgabe zählen Lücken, Auswahllisten, Auswahl-Chips, Antwortfelder (ab drei Zeichen),
Multiple Choice, Checklisten (als Ganzes, sobald ein Punkt abgehakt ist) und Messtabellen (sobald
eine Zeile Werte hat) – ob die Antwort stimmt, spielt für die Farbe keine Rolle. Wer eine ganze
Unterlage fehlerfrei prüft, bekommt einen Stern (★). Die Lektionsseite trägt die Farbe der ganzen
Lektion (Durchschnitt ihrer Unterlagen ohne Zusatz-Etappen) und zeigt den Stand jeder Unterlage;
die Startseite zeigt jede Lektion, die Kopfzeile einen Strich unter jeder Lektionsnummer.
Gezählt wird auf allen Unterlagen ausser denen für die Lehrperson, Musterlösungen und dem
Dossier. Welche Unterlagen zu einer Lektion gehören, schreibt Jekyll beim Bauen an die
Lektionsnummern der Kopfzeile (`data-fs-seiten`) – es muss nichts gepflegt werden.

Der Stand liegt wie alle Eingaben nur im Browser des Geräts (`fortschritt:<Adresse>`); eine
Klassenübersicht gibt es darum nicht. Farben und Schwellen stehen im Kopf von `fortschritt.js`
und in Abschnitt 8 des Stylesheets (`--fs-1` … `--fs-4`); die Legende für die Lehrperson steht
unter `/LP/`.

## Lokale Vorschau (optional)

Nicht nötig, um die Seite zu aktualisieren – GitHub baut serverseitig. Wer trotzdem
lokal schauen will, braucht Ruby:

```
gem install bundler
bundle install
bundle exec jekyll serve
```

Anschliessend läuft die Vorschau auf <http://localhost:4000>. Wichtig: `baseurl` in
`_config.yml` muss dem Repository-Namen entsprechen, sonst greifen die Links auf der
veröffentlichten Seite ins Leere.
