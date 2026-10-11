---
lektion: 4
zielgruppe: sus
art: zusammenfassung
titel: "Das Wichtigste: Validieren"
kurz: "Besprechung am Ende der Lektion und Lernzusammenfassung: Masszahl, Zufall, Abgleich mit der Wirklichkeit, Fehlerquellen"
reihenfolge: 80
---

# Das Wichtigste: Validieren

## Lernziele dieser Lektion

Sie können …

- [ ] erklären, was man unter der Validierung einer Simulation versteht
- [ ] begründen, warum es zum Vergleichen eine Masszahl braucht
- [ ] erklären, warum bei Zufall im Modell mehrere Durchgänge nötig sind
- [ ] beschreiben, wie der Verkehrsfluss im Modell von der Dichte abhängt
- [ ] an Beispielen zeigen, warum Validieren schwierig sein kann
- [ ] typische Fehlerquellen bei der Validierung nennen

Haken Sie ab, was Sie sicher können. Wo es noch hapert, hilft die Zusammenfassung unten.

<div class="nur-online" markdown="1">

## Zum Besprechen

1. Das Modell zeigt den grössten Fluss bei über 100 km/h, auf echten Autobahnen liegt er bei
   etwa 85 km/h. Ist das Modell damit widerlegt?
2. Was würden Sie am Modell zuerst ändern – und woran würden Sie merken, ob es besser geworden
   ist?
3. Wann ist ein Modell «gut genug»?

</div>

## Validieren in zwei Schritten

**Validieren** heisst: das Verhalten des Modells auswerten und mit dem Verhalten des echten
Systems vergleichen.

| Schritt | Was geschieht | Beim Stau |
|---|---|---|
| **1. Ergebnisse auswerten** | Masszahl festlegen, messen, mehrere Durchgänge, als Schaubild darstellen | Verkehrsfluss in Fz/h, Fluss-Dichte-Diagramm |
| **2. Mit der Wirklichkeit abgleichen** | mit Versuchen und Messungen am echten System vergleichen | Ringversuche, Zähldaten von Autobahnen |

Stimmen Modell und Wirklichkeit überein, leitet man neue Vorhersagen ab und prüft sie. Stimmen
sie nicht überein, ändert man das Modell – und beginnt von vorn. Validieren ist nie
abgeschlossen: Mit jeder Runde bildet das Modell die Wirklichkeit etwas besser ab.

## Masszahl und Zufall

- Ein Eindruck («fliesst besser») lässt sich nicht vergleichen, eine **Masszahl** schon.
- Der **Verkehrsfluss** gibt an, wie viele Fahrzeuge pro Stunde an einer Messstelle
  vorbeifahren.
- Zufällige Einflüsse im Modell heissen **stochastische Parameter**: hier die Startpositionen
  und das Trödeln. Wegen ihnen fällt jeder Durchgang anders aus.

**Merksatz:** Ein Durchgang ist ein Einzelfall. Erst mehrere Durchgänge mit denselben
Einstellungen zeigen, wie sich das Modell typischerweise verhält.

## Was das Modell zeigt

- Bei geringer Dichte fahren alle frei: mehr Autos, mehr Fluss.
- Ab einer bestimmten Dichte entstehen Staus: mehr Autos, **weniger** Fluss.
- Dazwischen liegt ein Maximum – die Leistungsgrenze der Strasse.
- Bei dichtem Verkehr kostet ein tieferes Höchsttempo kaum Fluss.

## Was der Abgleich ergibt

| Beobachtung in der Wirklichkeit | Im Modell |
|---|---|
| Staus entstehen ohne Hindernis (Ringversuche) | stimmt |
| Staus wandern gegen die Fahrtrichtung | stimmt |
| gleichmässigeres Fahren verhindert Staus | stimmt (weniger Trödeln) |
| grösster Fluss bei etwa 85 km/h | stimmt nur im Verlauf, nicht in der Zahl |
| Spurwechsel, Auffahrten, Lastwagen | fehlen |

**Merksatz:** Ein Modell gilt für den Ausschnitt der Wirklichkeit, den es abbildet – und nur
für diesen.

## Warum Validieren schwierig ist

- Die echten Daten fehlen, sind ungenau oder teuer zu beschaffen.
- Manche Vorhersagen lassen sich erst nach langer Zeit prüfen (Klima) oder gar nicht im
  Experiment (Urknall, ganze Gesellschaften).
- Weil das Modell vereinfacht, stimmt es nie zu hundert Prozent. Was «gut genug» ist, hängt von
  der Frage ab.

## Fehlerquellen beim Validieren

| Fehlerquelle | Bedeutung |
|---|---|
| **Augenschein statt Masszahl** | Man urteilt nach dem Eindruck, statt zu messen. |
| **zu wenige Durchgänge** | Der Zufall spielt mit, aber man misst nur einmal. |
| **Fehler in der Umsetzung** | Das Programm tut nicht genau das, was das Modell beschreibt. |
| **ungeeignete Vergleichsdaten** | Die echten Daten sind ungenau oder unter anderen Bedingungen entstanden. |
| **ausserhalb des Geltungsbereichs** | Man vergleicht das Modell mit einem Vorgang, den es gar nicht abbildet. |
