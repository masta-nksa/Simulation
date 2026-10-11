---
lektion: 3
zielgruppe: sus
art: etappe
titel: "Etappe 1: Was gehört ins Modell?"
kurz: "Massgebliches von Vernachlässigbarem trennen – und sehen, wie aus einer Idee ein funktionales Modell wird"
reihenfolge: 10
---

# Etappe 1: Was gehört ins Modell?

**Ziel:** Sie können erklären, wie man beim Modellieren vorgeht, und ein konzeptuelles von
einem funktionalen Modell unterscheiden.

Um Staus zu untersuchen, modelliert man nicht den Stau, sondern den Verkehr: einzelne
Fahrzeuge, die einfachen Regeln folgen. Ob und wo ein Stau entsteht, ergibt sich dann aus
ihrem Zusammenspiel.

## Aufgabe 1 – Abstrahieren und reduzieren

Ein Modell lässt weg, was für die Frage unwichtig ist. Die Frage lautet hier: **Wie entsteht
ein Stau auf einer Strasse ohne Hindernis?**

Was ist dafür massgeblich, was können Sie weglassen?

| Eigenschaft | Ihre Einschätzung |
|---|---|
| Abstand zum Auto davor | <span class="luecke" data-optionen="massgeblich;vernachlässigbar" data-antwort="massgeblich"></span> |
| Farbe und Marke des Autos | <span class="luecke" data-optionen="massgeblich;vernachlässigbar" data-antwort="vernachlässigbar"></span> |
| aktuelles Tempo | <span class="luecke" data-optionen="massgeblich;vernachlässigbar" data-antwort="massgeblich"></span> |
| erlaubtes Höchsttempo | <span class="luecke" data-optionen="massgeblich;vernachlässigbar" data-antwort="massgeblich"></span> |
| Musik im Autoradio | <span class="luecke" data-optionen="massgeblich;vernachlässigbar" data-antwort="vernachlässigbar"></span> |
| Unaufmerksamkeit der Fahrerinnen und Fahrer | <span class="luecke" data-optionen="massgeblich;vernachlässigbar" data-antwort="massgeblich"></span> |
| Anzahl Autos auf der Strasse | <span class="luecke" data-optionen="massgeblich;vernachlässigbar" data-antwort="massgeblich"></span> |

Welchen Regeln sollte jedes Auto folgen, damit der Verkehr im Modell ähnlich abläuft wie auf
der Strasse? Notieren Sie zwei bis vier Regeln in eigenen Worten.

<div class="antwort" data-zeilen="4" data-loesung="Zum Beispiel: Wer langsamer fährt als erlaubt, beschleunigt. Wer dem Auto davor zu nahe kommt, bremst. Ab und zu fährt jemand grundlos etwas langsamer. Jedes Auto fährt so weit, wie sein Tempo es erlaubt. – Genau diese vier Regeln bilden das Modell, mit dem Sie in Etappe 2 arbeiten."></div>

## Aufgabe 2 – Konkretisieren und umsetzen

Regeln in Worten genügen dem Computer nicht. Er braucht genaue Angaben: Wie lang ist die
Strasse? Was heisst «zu nahe»? Wie oft ist «ab und zu»? Die Physiker Kai Nagel und Michael
Schreckenberg haben 1992 diese Festlegungen getroffen:

| In der Wirklichkeit | Im Modell von Nagel und Schreckenberg |
|---|---|
| die Strasse | eine Reihe von Zellen, jede 7,5 m lang; als Ring geschlossen |
| ein Auto | eine besetzte Zelle |
| das Tempo | eine ganze Zahl von 0 bis 5 Zellen pro Sekunde (5 entspricht 135 km/h) |
| die Zeit | Zeitschritte von einer Sekunde |
| das Verhalten am Steuer | vier Regeln, für alle Autos dieselben |
| Unaufmerksamkeit | Trödeln mit einer festen Wahrscheinlichkeit |

Rechnen Sie nach.

1. Ein Auto mit Tempo 3 legt pro Sekunde 3 Zellen zurück. Das sind
   <span class="luecke" data-typ="zahl" data-antwort="22,5;22.5" data-breite="6"></span> Meter pro Sekunde
   oder <span class="luecke" data-typ="zahl" data-antwort="81" data-breite="5"></span> km/h.
2. In einem stehenden Stau belegt jedes Auto eine Zelle. Auf einem Kilometer stehen dann etwa
   <span class="luecke" data-typ="zahl" data-antwort="133;133,3;134" data-breite="5"></span> Autos.

## Aufgabe 3 – Zwei Arten von Modell

- Ein **konzeptuelles Modell** beschreibt das Abbild klar und eindeutig: als Text, Skizze oder
  Formel. Was daraus folgt, muss ein Mensch sich überlegen oder ausrechnen.
- Ein **funktionales Modell** setzt das Abbild in ein künstliches System um, zum Beispiel in
  ein Programm. Man kann es mit Werten füttern und zusehen, was geschieht.

Ordnen Sie zu.

1. Die vier Verkehrsregeln, als Sätze auf Papier notiert:
   <span class="luecke" data-optionen="konzeptuelles Modell;funktionales Modell" data-antwort="konzeptuelles Modell"></span>
2. Das Programm, das die Teilchen der Brownschen Bewegung bewegt:
   <span class="luecke" data-optionen="konzeptuelles Modell;funktionales Modell" data-antwort="funktionales Modell"></span>
3. Die Formel t ≈ x² / (2 · D) für die Diffusion:
   <span class="luecke" data-optionen="konzeptuelles Modell;funktionales Modell" data-antwort="konzeptuelles Modell"></span>

Weiter mit
[Etappe 2: Regeln von Hand]({{ '/lektionen/L3_Etappe_2_Regeln.html' | relative_url }}).
{: .nur-online}

<p class="quellen"><strong>Quelle:</strong>
<a href="https://de.wikipedia.org/wiki/Nagel-Schreckenberg-Modell">Nagel-Schreckenberg-Modell (Wikipedia)</a></p>
