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
├── dossier.md             alle Unterlagen auf einer Seite zum Drucken
├── lp-dossier.md          dasselbe mit Ablaufplänen und Lösungen  →  /LP/dossier.html
├── quellen/               ursprüngliche Python-Programme (nur lokal, nicht im Repository)
├── _layouts/              HTML-Gerüst (default / startseite / lektion / material)
├── assets/fonts/          Schriften (Inter, IBM Plex Mono), lokal statt von fremden Servern
├── assets/css/unterricht.css   Gestaltung inkl. Dark Mode und Druckansicht
└── assets/js/             uebungen.js (Eingabefelder mit Kontrolle), simulation.js
                           (Simulationen, Messtabellen, Schaubilder), sim-*.js (je ein
                           Modell), dossier.js
```

## Simulationen, Messtabellen, Schaubilder

Die Einheit ist ein Selbstlernmodul: Die Simulationen laufen direkt auf der Seite. Im
Markdown stehen dafür leere Platzhalter, die `assets/js/simulation.js` beim Laden füllt:

```html
<div class="simulation" data-modell="brown" data-ziel="brown"></div>
<div class="messtabelle" data-id="brown" data-spalten="Abstand (Zellen);Zeit (Zeitschritte)" data-fest></div>
<div class="schaubild" data-quelle="brown" data-kurven="linear;quadratisch"></div>
```

Alle Attribute sind im Kopf von `simulation.js` beschrieben. Ein neues Modell ist eine Datei
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
| Segregation | – | 5 | offen |
| Krankheitsübertragung (HIV) | – | 6 | offen |

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

Es gibt genau ein Design. Es ist als gemeinsames Design aller Unterrichtseinheiten gedacht
und steckt so auch im Gerüst für neue Einheiten: Tinte auf Papier, Schreibmaschinenschrift (IBM Plex Mono) für Titel, Nummern und Etiketten, Inter für
den Lesetext, Leuchtstift-Gelb als einzige Farbe. Dark Mode folgt der Einstellung des Geräts.
Die Schriften liegen in `assets/fonts/`, es wird nichts von fremden Servern geladen.

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
