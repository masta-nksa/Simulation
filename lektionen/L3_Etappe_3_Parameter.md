---
lektion: 3
zielgruppe: sus
art: etappe
titel: "Etappe 3: Parameter verändern"
kurz: "Das Modell in Bewegung setzen und beobachten, was Dichte, Höchsttempo und Trödeln bewirken"
reihenfolge: 30
---

# Etappe 3: Parameter verändern

**Ziel:** Sie können erklären, was ein Parameter ist, und beschreiben, wie man den Einfluss
eines Parameters untersucht.

## Parameter und Durchgang

Simulieren heisst: ein funktionales Modell in Bewegung setzen und beobachten, wie es sich
verhält. Die **Parameter** sind die Stellen, an denen das Modell bewusst verstellbar gebaut
wurde. Wer für alle Parameter einen Wert festlegt, versetzt das Modell in eine bestimmte
Situation – das nennt man **Parametrisierung**. Ein Ablauf mit festen Werten ist ein
**Durchgang**.

Ein Plattenspieler ist ein gutes Bild dafür: eine komplizierte Maschine, deren Verhalten im
Wesentlichen von zwei Parametern abhängt – der aufgelegten Platte und der eingestellten
Drehzahl.

Dieses Modell hat drei Parameter: die **Anzahl Autos**, das **Höchsttempo** und die
**Trödelwahrscheinlichkeit**.

## Aufgabe 1 – Vorhersage

Was erwarten Sie?

Mehr Autos auf der Strasse:
<span class="wahl" data-optionen="mehr Staus;gleich viele Staus;weniger Staus"></span>

Niedrigeres Höchsttempo:
<span class="wahl" data-optionen="mehr Staus;gleich viele Staus;weniger Staus"></span>

Niemand trödelt:
<span class="wahl" data-optionen="mehr Staus;gleich viele Staus;keine Staus"></span>

## Aufgabe 2 – Einen Parameter nach dem anderen

Links sehen Sie die Strasse als Ring; stehende Autos sind gelb. Rechts entsteht ein
**Raum-Zeit-Diagramm**: Jede Zeile zeigt die ganze Strasse in einem Zeitschritt, die neuste
Zeile ist unten. Ein Stau erscheint dort als kräftiger Streifen aus stehenden Autos (Legende:
«steht»).

<div class="simulation" data-modell="stau"></div>

Verändern Sie jeweils **nur einen** Parameter und stellen Sie die anderen auf die Ausgangswerte
zurück (20 Autos, Höchsttempo 5, Trödeln 25 %). Klicken Sie nach jeder Änderung auf «Neu
verteilen», damit die Autos wieder zufällig auf der Strasse stehen.

**a) Anzahl Autos:** 10, 20, 40, 60. Was beobachten Sie?

<div class="antwort" data-zeilen="2" data-loesung="Bei 10 Autos fahren alle frei. Ab etwa 15 bis 20 Autos entstehen Staus, die sich wieder auflösen und an anderer Stelle neu bilden. Je mehr Autos, desto mehr von ihnen stehen."></div>

**b) Höchsttempo:** bei 30 Autos von 5 auf 2 senken. Was beobachten Sie?

<div class="antwort" data-zeilen="2" data-loesung="Alle fahren langsamer, aber gleichmässiger: Es stehen weniger Autos, die Staus werden kleiner oder verschwinden."></div>

**c) Trödelwahrscheinlichkeit:** 0 %, 25 %, 50 % – bei 20 Autos und Höchsttempo 5. Was
beobachten Sie?

<div class="antwort" data-zeilen="2" data-loesung="Bei 0 % entstehen keine neuen Staus, und alle fahren gleichmässig. Die Staus vom Anfang lösen sich meist nach wenigen Sekunden auf; manchmal bleibt ein kleiner Stau bestehen und wandert endlos rückwärts. Je mehr getrödelt wird, desto häufiger und grösser werden die Staus: Bei 50 % stehen etwa doppelt so viele Autos wie bei 25 %."></div>

In welche Richtung wandert ein Stau im Raum-Zeit-Diagramm – mit der Fahrtrichtung oder
dagegen?

- [ ] mit der Fahrtrichtung (nach rechts)
- [ ] gegen die Fahrtrichtung (nach links)
- [ ] er bleibt an Ort
{: .mc data-antwort="2"}

## Aufgabe 3 – Wo fliesst der Verkehr besser?

Vergleichen Sie zwei Einstellungen:

| | Anzahl Autos | Höchsttempo | Trödeln |
|---|---|---|---|
| **A** | 15 | 5 | 25 % |
| **B** | 30 | 3 | 25 % |

Der Verkehr fliesst besser bei
<span class="wahl" data-optionen="A;B;beide gleich"></span>

Woran haben Sie das festgemacht?

<div class="antwort" data-zeilen="2" data-vergleich="spaeter" data-loesung="Hier gibt es keine richtige Antwort – und genau das ist der Punkt. Wer auf das Tempo schaut, wählt A. Wer darauf schaut, wie viele Autos vorankommen, kann auch B wählen. Solange nicht festgelegt ist, was «gut fliessen» heisst, lässt sich die Frage nicht entscheiden. Darum geht es in Lektion 4."></div>

Diese Frage besprechen Sie am Schluss gemeinsam.
