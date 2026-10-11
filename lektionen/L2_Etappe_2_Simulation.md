---
lektion: 2
zielgruppe: sus
art: etappe
titel: "Etappe 2: Brownsche Bewegung simulieren"
kurz: "Detektorabstand verändern, Zeit messen, Schaubild erstellen und mit dem Experiment vergleichen"
reihenfolge: 20
---

# Etappe 2: Brownsche Bewegung simulieren

**Ziel:** Sie können beschreiben, wie man mit einer Simulation untersucht, wie sich ein Gas
ausbreitet, und Sie können angeben, was das Modell von der Wirklichkeit abbildet.

## Das Modell

Im Experiment liess sich vieles nicht kontrollieren. Im Computer geht das: Man baut den
Vorgang als **Modell** nach und lässt ihn ablaufen. Ein Modell ist ein vereinfachtes Abbild –
es enthält nur, was man für wesentlich hält.

| In der Wirklichkeit | Im Modell |
|---|---|
| Moleküle der Essigessenz | Teilchen, dargestellt als Punkte |
| das Schulzimmer | ein flaches Rechteck aus 120 × 80 Zellen |
| Stösse mit den Molekülen der Luft | pro Zeitschritt ein zufälliger Schritt nach links, rechts, oben oder unten |
| die Schale | die Quelle am linken Rand |
| eine Nase, die ab einer gewissen Menge etwas riecht | ein Detektor, der anschlägt, sobald genügend Teilchen ihn erreicht haben |
| die Zeit in Sekunden | Zeitschritte |

<details class="regeln" markdown="1">
<summary>Die Regel des Modells als Programmcode</summary>

So bewegt das Programm die Teilchen in jedem Zeitschritt (Python, vereinfacht):

```python
for teilchen in alle_teilchen:
    richtung = random.choice(["links", "rechts", "oben", "unten"])
    x, y = teilchen.x, teilchen.y
    if richtung == "links":
        x = x - 1
    elif richtung == "rechts":
        x = x + 1
    elif richtung == "oben":
        y = y - 1
    else:
        y = y + 1

    if im_raum(x, y):              # an der Wand bleibt das Teilchen stehen
        teilchen.x, teilchen.y = x, y

    if detektor.enthaelt(teilchen) and not teilchen.gezaehlt:
        teilchen.gezaehlt = True   # jedes Teilchen zählt nur einmal
        detektor.angekommen += 1

zeit = zeit + 1
```

Mehr steckt nicht dahinter: Kein Teilchen «weiss», wo der Detektor ist.

</details>

## Aufgabe 1 – Vorhersage

Sie verdoppeln den Abstand des Detektors von 20 auf 40 Zellen. Die Zeit, bis er anschlägt, …

<span class="wahl" data-optionen="bleibt etwa gleich;verdoppelt sich etwa;wird etwa viermal so lang;wird mehr als zehnmal so lang"></span>

## Aufgabe 2 – Messreihe

Ein Ablauf der Simulation mit festen Einstellungen heisst **Durchgang**. Die Werte, die Sie
einstellen können, heissen **Parameter**.

Messen Sie bei den Abständen **20, 40, 60 und 80 Zellen** je **drei Durchgänge**. Lassen Sie die
übrigen Parameter unverändert. Mit dem Tempo «sehr schnell» dauert ein Durchgang wenige
Sekunden.

<div class="simulation" data-modell="brown" data-ziel="brown"></div>

<div class="messtabelle" data-id="brown" data-spalten="Abstand (Zellen);Zeit (Zeitschritte)" data-fest></div>

<div class="schaubild" data-quelle="brown" data-x="Abstand (Zellen)" data-y="Zeit (Zeitschritte)" data-kurven="linear;quadratisch"></div>

## Aufgabe 3 – Auswerten

1. Lesen Sie im Schaubild die Mittelwerte ab (die Striche). Bei 40 Zellen dauert es etwa
   <span class="luecke" data-breite="5"></span>-mal so lang wie bei 20 Zellen.
2. Blenden Sie beide Vergleichskurven ein. Besser zu den Messwerten passt die Kurve
   <span class="luecke" data-optionen="linear;quadratisch" data-antwort="quadratisch"></span>.
3. Stimmt das mit Ihrer Vorhersage aus Aufgabe 1 überein?
   <span class="wahl" data-optionen="ja;teilweise;nein"></span>

Bei gleichem Abstand liefern die drei Durchgänge verschiedene Zeiten. Woran liegt das, und was
folgt daraus für die Messung?

<div class="antwort" data-zeilen="3" data-loesung="Jedes Teilchen bewegt sich zufällig, und auch die Startpositionen sind zufällig. Deshalb läuft kein Durchgang gleich ab wie der andere. Ein einzelner Durchgang sagt wenig aus: Man braucht mehrere Durchgänge mit denselben Einstellungen und vergleicht die Mittelwerte."></div>

Wie haben Sie untersucht, wie die Zeit vom Abstand abhängt? Beschreiben Sie Ihr Vorgehen in
zwei bis drei Sätzen, so dass jemand anderes es wiederholen könnte.

<div class="antwort" data-zeilen="3" data-loesung="Zum Beispiel: Ich habe nur einen Parameter verändert, den Abstand des Detektors, und alle anderen gleich gelassen. Bei jedem Abstand habe ich mehrere Durchgänge gemacht und die Zeit bis zum Anschlag gemessen. Aus den Messwerten entstand ein Schaubild der Zeit in Abhängigkeit vom Abstand."></div>

## Aufgabe 4 – Vergleich mit dem Experiment

Hier stehen die Messwerte aus dem Experiment von Lektion 1. Fehlen sie auf diesem Gerät,
tragen Sie die Werte von der Tafel ein.

<div class="messtabelle" data-id="essig" data-spalten="Abstand (m);Zeit (s)" data-zeilen="5"></div>

<div class="schaubild" data-quelle="essig" data-x="Abstand (m)" data-y="Zeit (s)" data-kurven="linear;quadratisch" data-leer="Noch keine Messwerte aus dem Experiment"></div>

Die Simulation misst in Zellen und Zeitschritten, das Experiment in Metern und Sekunden. Die
Zahlen lassen sich deshalb nicht direkt vergleichen – wohl aber die **Form** der beiden
Schaubilder.

Zeigen Experiment und Simulation denselben Zusammenhang? Was spricht dafür, was dagegen?

<div class="antwort" data-zeilen="4" data-vergleich="spaeter" data-loesung="In der Simulation wächst die Zeit ungefähr mit dem Quadrat des Abstands. Im Experiment nimmt die Zeit mit dem Abstand ebenfalls zu, die Werte streuen aber stark, und der Geruch kommt viel schneller an, als reine Diffusion es erlauben würde: Im Zimmer transportiert vor allem die Luftströmung den Geruch. Das Modell bildet diese Strömung nicht ab."></div>

Diese Frage besprechen Sie am Schluss gemeinsam.
