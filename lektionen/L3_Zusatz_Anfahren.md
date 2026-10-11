---
lektion: 3
zielgruppe: sus
art: zusatz
titel: "Zusatz: Träges Anfahren"
kurz: "Freiwillig: das Modell um eine fünfte Regel erweitern und prüfen, was sie verändert"
reihenfolge: 60
---

# Zusatz: Träges Anfahren

**Ziel:** Sie können beurteilen, wie eine zusätzliche Regel das Verhalten eines Modells
verändert.

Diese Etappe ist freiwillig.

## Eine fünfte Regel

Wer im Stau steht, fährt nicht sofort los, wenn vor ihm eine Zelle frei wird. Diese Erfahrung
fehlt im Grundmodell. Sie lässt sich als Zusatzregel einbauen:

> **Träges Anfahren:** Ein Auto, das steht und höchstens eine freie Zelle vor sich hat, bleibt
> mit einer bestimmten Wahrscheinlichkeit stehen.

<details class="regeln" markdown="1">
<summary>Die Regeln des Modells als Programmcode</summary>

So berechnet das Programm in jedem Zeitschritt das neue Tempo eines Autos (Python,
vereinfacht). Die Zeile mit `anfahren` ist die Zusatzregel.

```python
tempo_alt = auto.tempo
tempo = min(tempo_alt + 1, hoechsttempo)        # 1. Beschleunigen
tempo = min(tempo, luecke)                       # 2. Bremsen

if tempo_alt == 0 and luecke < 2 and tempo > 0:  # Zusatz: träges Anfahren
    if random.random() < anfahren:
        tempo = tempo - 1

if tempo > 0 and random.random() < troedeln:     # 3. Trödeln
    tempo = tempo - 1

auto.tempo = tempo
# 4. Fahren: erst wenn alle Autos ihr neues Tempo haben, rücken alle vor
```

</details>

## Aufgabe 1 – Vorhersage

Mit trägem Anfahren werden die Staus
<span class="wahl" data-optionen="kürzer;gleich lang;länger und zäher"></span>

## Aufgabe 2 – Ausprobieren

Stellen Sie 25 Autos ein und vergleichen Sie «Träges Anfahren» bei 0 % und bei 90 %.

<div class="simulation" data-modell="stau" data-anfahren="90"></div>

Was verändert sich im Raum-Zeit-Diagramm?

<div class="antwort" data-zeilen="3" data-loesung="Mit trägem Anfahren lösen sich Staus viel langsamer auf: Die dunklen Streifen werden breiter und halten länger an. Vorne im Stau fahren die Autos nur zögernd weg, während hinten weiter Autos auflaufen."></div>

## Aufgabe 3 – Lohnt sich die Erweiterung?

Eine zusätzliche Regel macht das Modell wirklichkeitsnäher, aber auch komplizierter. Wann
lohnt sie sich? Denken Sie an Ockhams Rasiermesser.

<div class="antwort" data-zeilen="3" data-loesung="Sie lohnt sich, wenn das Modell damit etwas erklärt oder genauer vorhersagt, was es vorher nicht konnte – zum Beispiel, wie lange ein Stau anhält. Erklärt das einfachere Modell die Beobachtungen ebenso gut, ist es vorzuziehen."></div>
