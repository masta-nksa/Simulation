---
lektion: 4
zielgruppe: sus
art: etappe
titel: "Etappe 1: Den Verkehrsfluss messen"
kurz: "Eine Masszahl festlegen, eine Messreihe aufnehmen und das Fluss-Dichte-Diagramm erstellen"
reihenfolge: 10
---

# Etappe 1: Den Verkehrsfluss messen

**Ziel:** Sie können erklären, warum es zum Vergleichen eine Masszahl braucht, und Sie können
mit der Simulation untersuchen, wie der Verkehrsfluss von der Dichte abhängt.

## Vom Eindruck zur Masszahl

«Der Verkehr fliesst besser» ist ein Eindruck, und Eindrücke gehen auseinander. Vergleichen
lassen sich nur Zahlen. Eine **Masszahl** legt fest, was genau gemessen wird.

| Masszahl | Bedeutung | Einheit |
|---|---|---|
| **Dichte** | wie viele Fahrzeuge auf einem Kilometer Strasse sind | Fz/km |
| **mittleres Tempo** | wie schnell die Fahrzeuge im Durchschnitt fahren | km/h |
| **Verkehrsfluss** | wie viele Fahrzeuge pro Stunde an einer Messstelle vorbeifahren | Fz/h |

Der Verkehrsfluss ist die Zahl, die auch auf echten Strassen mit Zählstellen gemessen wird.
Er sagt, wie viel eine Strasse leistet.

## Aufgabe 1 – Vorhersage

Sie setzen immer mehr Autos auf die Strasse. Der Verkehrsfluss …

<span class="wahl" data-optionen="wird immer grösser;wird zuerst grösser, dann kleiner;wird immer kleiner;bleibt gleich"></span>

## Aufgabe 2 – Messreihe

Der Knopf **Messen** lässt die Simulation zuerst 300 Sekunden einschwingen und zählt dann 300
Sekunden lang die Autos an der Messstelle.

Messen Sie bei **5, 10, 15, 20, 30, 40, 60 und 80 Autos** je **zweimal**. Lassen Sie Höchsttempo
(5) und Trödeln (25 %) unverändert.

<div class="simulation" data-modell="stau" data-ziel="stau"></div>

<div class="messtabelle" data-id="stau" data-spalten="Dichte (Fz/km);Fluss (Fz/h);Tempo (km/h);Höchsttempo;Trödeln (%)" data-fest></div>

<div class="schaubild" data-quelle="stau" data-x="Dichte (Fz/km)" data-y="Verkehrsfluss (Fz/h)"></div>

Dieses Schaubild heisst **Fluss-Dichte-Diagramm**.

## Aufgabe 3 – Auswerten

1. Der Fluss ist am grössten bei einer Dichte von etwa
   <span class="luecke" data-typ="groesse" data-toleranz="0.2" data-antwort="18" data-breite="5"></span> Fz/km
   und beträgt dort etwa
   <span class="luecke" data-typ="groesse" data-toleranz="0.1" data-antwort="1900" data-breite="6"></span> Fz/h.
2. Links vom Maximum gilt: mehr Autos,
   <span class="luecke" data-optionen="mehr Fluss;weniger Fluss" data-antwort="mehr Fluss"></span>.
   Rechts vom Maximum gilt: mehr Autos,
   <span class="luecke" data-optionen="mehr Fluss;weniger Fluss" data-antwort="weniger Fluss"></span>.

Warum nimmt der Fluss bei hoher Dichte ab, obwohl mehr Autos auf der Strasse sind?

<div class="antwort" data-zeilen="3" data-loesung="Bei hoher Dichte sind die Lücken klein, die Autos müssen ständig bremsen, und jedes Trödeln löst einen Stau aus. Das Tempo sinkt stärker, als die Zahl der Autos steigt – deshalb kommen pro Stunde weniger Autos an der Messstelle vorbei."></div>

Zwei Messungen mit denselben Einstellungen liefern nicht denselben Fluss. Woran liegt das, und
wie gehen Sie damit um?

<div class="antwort" data-zeilen="3" data-loesung="Die Startpositionen sind zufällig, und bei jedem Trödeln entscheidet der Zufall. Solche zufälligen Einflüsse heissen stochastische Parameter. Ein einzelner Durchgang ist deshalb nur bedingt aussagekräftig: Man misst mehrmals mit denselben Einstellungen und vergleicht die Mittelwerte."></div>

## Aufgabe 4 – Tempo 80

Bei viel Verkehr senkt das Bundesamt für Strassen auf Autobahnen das erlaubte Tempo auf 100
oder 80 km/h. Kostet das Fluss?

Stellen Sie **30 Autos** ein und messen Sie je zweimal mit Höchsttempo **5** (135 km/h) und mit
Höchsttempo **3** (81 km/h). Vergleichen Sie die Zeilen in der Tabelle.

Mit dem tieferen Höchsttempo ist der Fluss
<span class="luecke" data-optionen="deutlich kleiner;etwa gleich gross;deutlich grösser" data-antwort="etwa gleich gross"></span>.

Was folgt daraus?

<div class="antwort" data-zeilen="2" data-loesung="Bei dichtem Verkehr bestimmt nicht das Höchsttempo den Fluss, sondern der Abstand zwischen den Autos: Schneller als die Lücke es zulässt, kann ohnehin niemand fahren. Ein tieferes Tempolimit kostet dann keinen Fluss, macht den Verkehr aber gleichmässiger."></div>

Weiter mit
[Etappe 2: Abgleich mit der Wirklichkeit]({{ '/lektionen/L4_Etappe_2_Abgleich.html' | relative_url }}).
{: .nur-online}

<p class="quellen"><strong>Quelle:</strong>
<a href="https://www.astra.admin.ch/de/massnahmen-gegen-stau">Bundesamt für Strassen: Massnahmen gegen Stau</a></p>
