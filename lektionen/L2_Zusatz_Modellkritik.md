---
lektion: 2
zielgruppe: sus
art: zusatz
titel: "Zusatz: Was fehlt dem Modell?"
kurz: "Freiwillig: die übrigen Parameter untersuchen, nachrechnen, wie schnell reine Diffusion wirklich ist, und im Dauerlauf viele Messwerte sammeln"
reihenfolge: 60
---

# Zusatz: Was fehlt dem Modell?

**Ziel:** Sie können beurteilen, in welcher Hinsicht das Modell der Brownschen Bewegung
unvollständig ist.

Diese Etappe ist freiwillig.

## Aufgabe 1 – Die anderen Parameter

Stellen Sie den Abstand fest auf 40 Zellen ein und verändern Sie je einen der beiden anderen
Parameter. Notieren Sie vorher, was Sie erwarten.

<div class="simulation" data-modell="brown" data-ziel="brown-zusatz"></div>

<div class="messtabelle" data-id="brown-zusatz" data-spalten="Abstand (Zellen);Zeit (Zeitschritte);Teilchen;Schwelle" data-fest></div>

1. Mehr Teilchen: Der Detektor schlägt
   <span class="luecke" data-optionen="früher;später;gleich schnell" data-antwort="früher"></span> an.
2. Höhere Schwelle: Der Detektor schlägt
   <span class="luecke" data-optionen="früher;später;gleich schnell" data-antwort="später"></span> an.

Welcher Eigenschaft des Experiments entsprechen diese beiden Parameter?

<div class="antwort" data-zeilen="2" data-loesung="Die Anzahl Teilchen entspricht der Menge an Essigessenz in der Schale. Die Schwelle entspricht der Empfindlichkeit der Nase: Eine feine Nase riecht schon wenige Moleküle."></div>

## Aufgabe 2 – Wie schnell ist Diffusion wirklich?

Wie schnell ein Stoff diffundiert, beschreibt sein Diffusionskoeffizient D. Für Essigsäure in
Luft beträgt er rund 0,000012 m²/s
([Tabelle der Penn State University](https://www.me.psu.edu/cimbala/me433/Links/Appendix_09.pdf)).
Die Zeit für eine Strecke x lässt sich abschätzen mit

**t ≈ x² / (2 · D)**

Wie lange bräuchte reine Diffusion für **einen Meter** (100 cm)?

- Rechnung: 1 m² / (2 · 0,000012 m²/s) ≈
  <span class="luecke" data-typ="groesse" data-antwort="42000" data-breite="8"></span> Sekunden
- Das sind etwa
  <span class="luecke" data-typ="groesse" data-toleranz="0.1" data-antwort="12" data-breite="5"></span> Stunden.

Im Experiment kam der Geruch nach Sekunden oder Minuten an. Was schliessen Sie daraus?

<div class="antwort" data-zeilen="3" data-loesung="Im Schulzimmer wird der Geruch kaum durch Diffusion transportiert, sondern vor allem durch die Luftströmung (Heizung, Fenster, Bewegung der Personen). Das Experiment und das Modell untersuchen also nicht denselben Vorgang: Das Modell bildet reine Diffusion ab, das Experiment misst vor allem den Luftzug."></div>

## Aufgabe 3 – Das Modell erweitern

Was fehlt dem Modell, und was würden Sie zuerst einbauen? Begründen Sie.

<div class="antwort" data-zeilen="4" data-loesung="Mögliche Antworten: Luftströmung (ein zusätzlicher gemeinsamer Schub in eine Richtung) – sie ist im Zimmer der wichtigste Faktor. Die dritte Dimension. Eine Quelle, die laufend neue Teilchen abgibt. Verschiedene Sorten von Teilchen, die unterschiedlich schnell sind. Hindernisse wie Möbel und Personen. Sinnvoll ist, zuerst das einzubauen, was das Ergebnis am stärksten verändert."></div>

## Aufgabe 4 – Dauerlauf

Im Experiment sass jede Person in einem anderen Abstand und hat genau einmal gemessen. Das
lässt sich nachstellen: Im **Dauerlauf** wählt die Simulation den Abstand selbst zufällig und
reiht Durchgang an Durchgang, bis Sie stoppen.

Lassen Sie den Dauerlauf laufen, bis etwa 40 Messwerte beisammen sind.

<div class="simulation" data-modell="brown" data-ziel="brown-serie" data-dauerlauf></div>

<div class="messtabelle" data-id="brown-serie" data-spalten="Abstand (Zellen);Zeit (Zeitschritte)" data-fest></div>

<div class="schaubild" data-quelle="brown-serie" data-x="Abstand (Zellen)" data-y="Zeit (Zeitschritte)" data-kurven="linear;quadratisch"></div>

Was erkennen Sie in diesem Schaubild besser als mit zwölf Messwerten bei vier Abständen?

<div class="antwort" data-zeilen="2" data-loesung="Die Form der Kurve: Die Punkte liegen auf einem Bogen, der immer steiler wird. Und die Streuung: Bei grossen Abständen liegen die Zeiten viel weiter auseinander als bei kleinen."></div>

Und was geht verloren, wenn man die Abstände dem Zufall überlässt, statt sie gezielt zu wählen?

<div class="antwort" data-zeilen="3" data-loesung="Beim selben Abstand gibt es nur wenige oder gar keine Wiederholungen. Man kann darum schlecht sagen, wie stark die Zeit bei einem festen Abstand streut, und ein einzelner Ausreisser fällt nicht auf. Wer einen Parameter gezielt verändert und jede Einstellung mehrmals misst, sieht beides. Das Experiment im Schulzimmer hatte genau diese Schwäche: jeder Abstand nur einmal."></div>
