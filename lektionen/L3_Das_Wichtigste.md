---
lektion: 3
zielgruppe: sus
art: zusammenfassung
titel: "Das Wichtigste: Modellieren und Simulieren"
kurz: "Besprechung am Ende der Lektion und Lernzusammenfassung: Modell, zwei Schritte des Modellierens, vier Regeln, Parameter"
reihenfolge: 80
---

# Das Wichtigste: Modellieren und Simulieren

## Lernziele dieser Lektion

Sie können …

- [ ] erklären, was ein Modell ist und warum es die Wirklichkeit vereinfacht
- [ ] ein konzeptuelles von einem funktionalen Modell unterscheiden
- [ ] die zwei Schritte des Modellierens beschreiben
- [ ] angeben, was das Verkehrsmodell von Nagel und Schreckenberg wie abbildet
- [ ] die vier Regeln des Modells anwenden
- [ ] erklären, was Parameter, Parametrisierung und Durchgang bedeuten

Haken Sie ab, was Sie sicher können. Wo es noch hapert, hilft die Zusammenfassung unten.

<div class="nur-online" markdown="1">

## Zum Besprechen

1. Bei welcher Einstellung fliesst der Verkehr besser: A (15 Autos, Höchsttempo 5) oder B
   (30 Autos, Höchsttempo 3)?
2. Warum sind Sie sich nicht einig?
3. Das Modell kennt weder Spurwechsel noch Lastwagen. Ist es deshalb unbrauchbar?

</div>

## Was ein Modell ist

Ein **Modell** ist ein vereinfachtes Abbild eines Ausschnitts der Wirklichkeit. Es enthält die
wesentlichen Einflüsse und lässt alles andere weg. Gerade darin liegt der Gewinn: Verhält sich
das einfache Modell fast wie die Wirklichkeit, hat man die wesentlichen Einflüsse gefunden.

| | konzeptuelles Modell | funktionales Modell |
|---|---|---|
| **Form** | Text, Skizze, Formel | künstliches System, zum Beispiel ein Programm |
| **Folgerungen** | muss ein Mensch durchdenken oder ausrechnen | zeigt das Modell selbst, wenn man es laufen lässt |
| **Beispiel** | die vier Verkehrsregeln in Worten | die Stausimulation |

## Modellieren in zwei Schritten

| Schritt | Was geschieht | Beim Stau |
|---|---|---|
| **1. Abstrahieren und reduzieren** | festlegen, welcher Ausschnitt abgebildet wird und was dafür wesentlich ist | Abstand, Tempo, Höchsttempo, Unaufmerksamkeit – nicht Farbe, Marke, Wetter |
| **2. Konkretisieren und umsetzen** | alles so genau festlegen, dass es sich programmieren lässt | Zellen von 7,5 m, Zeitschritte von 1 s, Tempo 0 bis 5, vier Regeln |

**Merksatz:** Ein Modell ist nicht dann gut, wenn es alles enthält – sondern wenn es mit wenig
auskommt und trotzdem das Wesentliche zeigt.

## Das Modell von Nagel und Schreckenberg

| Regel | Was geschieht |
|---|---|
| **1. Beschleunigen** | Tempo + 1, höchstens bis zum Höchsttempo |
| **2. Bremsen** | Tempo höchstens so gross wie die Lücke zum Auto davor |
| **3. Trödeln** | mit einer festen Wahrscheinlichkeit Tempo − 1 |
| **4. Fahren** | jedes Auto rückt um sein Tempo vor |

Der Stau steht in keiner dieser Regeln. Er **entsteht** aus dem Zusammenspiel vieler Autos –
und wandert gegen die Fahrtrichtung.

## Simulieren

- **Simulieren:** ein funktionales Modell in Bewegung setzen und beobachten.
- **Parameter:** die Stellen, an denen das Modell verstellbar gebaut wurde – hier Anzahl Autos,
  Höchsttempo, Trödelwahrscheinlichkeit.
- **Parametrisierung:** die Wahl konkreter Werte für alle Parameter.
- **Durchgang:** ein Ablauf der Simulation mit festen Werten.

**Merksatz:** Wer den Einfluss eines Parameters untersucht, verändert nur diesen einen und
lässt alle anderen gleich.

## Wo wir stehen

<figure class="grafik">
<img src="{{ '/assets/img/wissenschaft-und-simulationen.webp' | relative_url }}" width="2000" height="1473" alt="Schema der drei Standbeine: In der Wirklichkeit wird ein Realitätsausschnitt experimentell untersucht und liefert Evidenz und Daten. Im Abbild wird eine Theorie bzw. ein konzeptuelles Modell gedanklich untersucht und liefert eine Vorhersage. In der Simulation wird ein funktionales Modell durchgespielt und liefert Ergebnisse und Daten. Alle drei führen zum Validieren: Verhalten sich Abbild und Realität gleich? Bei Ja neue Vorhersagen ableiten, bei Nein Theorie oder Modell ändern.">
<figcaption>In dieser Lektion: die linke Spalte von oben nach unten (modellieren) und die unterste Zeile (simulieren). Grafik: <a href="https://oinf.ch/kurs/vernetzung-und-systeme/simulationen/">oinf.ch</a></figcaption>
</figure>

| Standbein | Was wird untersucht? | Wie? | Was kommt heraus? |
|---|---|---|---|
| Experiment | ein Ausschnitt der Wirklichkeit | experimentell untersuchen | Evidenz, Daten |
| Theorie | konzeptuelles Modell | durchdenken, berechnen | Vorhersage |
| **Simulation** | **funktionales Modell** | **durchspielen, simulieren** | **Ergebnisse, Daten** |

Modellieren führt von der Wirklichkeit zum funktionalen Modell, Simulieren vom Modell zu den
Ergebnissen. Offen ist noch der dritte Schritt: das **Validieren**.
