---
lektion: 5
zielgruppe: sus
art: etappe
titel: "Etappe 1: Das Modell"
kurz: "Die Regel kennenlernen, nach der eine Person zufrieden ist oder umzieht – und sie von Hand anwenden"
reihenfolge: 10
---

# Etappe 1: Das Modell

**Ziel:** Sie können beschreiben, welche Teile der Wirklichkeit das Segregationsmodell wie
abbildet, und die Regel des Modells von Hand anwenden.

## Was ist Segregation?

**Segregation** heisst Entmischung: Verschiedene Gruppen verteilen sich ungleich über ein
Gebiet. In einer Stadt zeigt sich das an Quartieren, in denen bestimmte Bevölkerungsgruppen
gehäuft wohnen – etwa Familien mit wenig Geld, ältere Menschen oder Zugewanderte –, während sie
in anderen Quartieren kaum vorkommen. Je stärker eine Stadt entmischt ist, desto weniger
begegnen sich die Gruppen im Alltag.

Kleiner geht es auch: An einer Party bilden sich oft von selbst Grüppchen, die sich in einem
Merkmal gleichen.

## Das Modell

Wo jemand wohnt, hängt von vielen Dingen ab: Miete, Arbeitsweg, Familie, Schule, Zufall. Das
Modell greift einen einzigen Grund heraus: **Niemand möchte sich in der eigenen Nachbarschaft
völlig fremd fühlen.**

| In der Wirklichkeit | Im Modell |
|---|---|
| die Stadt | ein Raster aus 20 × 20 quadratischen Feldern |
| eine Wohnung | ein Feld, bewohnt von höchstens einer Person |
| zwei Bevölkerungsgruppen | Dreiecke und Quadrate, je gleich viele |
| die Nachbarschaft | die bis zu acht angrenzenden Felder |
| leerstehende Wohnungen | leere Felder (20 %) |
| «Ich möchte nicht ganz fremd sein» | der **Wohlfühlfaktor**: so viel Prozent der Nachbarn müssen gleich sein |
| ein Umzug | in ein zufällig gewähltes freies Feld |

Daraus ergibt sich die einzige Regel des Modells:

> Wer weniger gleiche Nachbarn hat, als der Wohlfühlfaktor verlangt, ist **unzufrieden** und
> zieht um – in ein zufälliges freies Feld, auch wenn es dort nicht besser ist. Wer keine
> Nachbarn hat, ist zufrieden.

Zu Beginn sind Dreiecke und Quadrate zufällig verteilt: eine vollständig durchmischte Stadt.

## Aufgabe 1 – Die Regel anwenden

Der Wohlfühlfaktor beträgt **ein Drittel** (33 %). Zufrieden oder unzufrieden?

1. Ein Dreieck hat 6 Nachbarn, davon 2 Dreiecke. Anteil gleicher Nachbarn:
   <span class="luecke" data-typ="groesse" data-toleranz="0.05" data-antwort="33" data-breite="4"></span> % –
   <span class="luecke" data-optionen="zufrieden;unzufrieden" data-antwort="zufrieden"></span>
2. Ein Quadrat hat 8 Nachbarn, davon 2 Quadrate. Anteil gleicher Nachbarn:
   <span class="luecke" data-typ="zahl" data-antwort="25" data-breite="4"></span> % –
   <span class="luecke" data-optionen="zufrieden;unzufrieden" data-antwort="unzufrieden"></span>
3. Ein Dreieck am Stadtrand hat 3 Nachbarn, alles Quadrate:
   <span class="luecke" data-optionen="zufrieden;unzufrieden" data-antwort="unzufrieden"></span>
4. Ein Quadrat hat ringsum nur leere Felder:
   <span class="luecke" data-optionen="zufrieden;unzufrieden" data-antwort="zufrieden"></span>

## Aufgabe 2 – Von Hand umziehen

Die kleine Stadt unten hat 48 Felder. Gelb hinterlegt sind alle, die unzufrieden sind.
Klicken Sie eine unzufriedene Person an – die Seite zeigt ihre Nachbarschaft und rechnet nach.
Klicken Sie dann auf ein freies Feld, um sie dorthin umziehen zu lassen. (Mit der Maus geht
auch Ziehen.)

Machen Sie weiter, bis **alle zufrieden** sind.

<div class="simulation" data-modell="segregation-hand"></div>

Was beobachten Sie? Achten Sie auf den Anteil gleicher Nachbarn vorher und nachher und darauf,
was ein Umzug bei den bisherigen Nachbarn auslöst.

<div class="antwort" data-zeilen="3" data-loesung="Ein Umzug verändert zwei Nachbarschaften: Am alten Ort fehlt jemand, am neuen Ort kommt jemand dazu. Dadurch werden oft andere unzufrieden, die vorher zufrieden waren – es kommt zu Kettenreaktionen. Am Ende sind alle zufrieden, aber der Anteil gleicher Nachbarn ist von etwa 50 % deutlich gestiegen, meist auf 70 bis 78 %: Es haben sich kleine Gruppen von Gleichen gebildet."></div>

Welche einfache Regel bestimmt, ob eine Person zufrieden ist? Beschreiben Sie sie in einem Satz
in eigenen Worten.

<div class="antwort" data-zeilen="2" data-loesung="Eine Person ist zufrieden, wenn mindestens so viele ihrer Nachbarn zur eigenen Gruppe gehören, wie der Wohlfühlfaktor verlangt (hier ein Drittel). Sonst zieht sie in ein zufälliges freies Feld."></div>

<details class="regeln" markdown="1">
<summary>Die Regel des Modells als Programmcode</summary>

So arbeitet das Programm (Python, vereinfacht):

```python
def ist_unzufrieden(person):
    nachbarn = bewohnte_nachbarfelder(person)        # höchstens 8
    if len(nachbarn) == 0:
        return False                                 # allein: zufrieden
    gleich = anzahl_gleicher(nachbarn, person.gruppe)
    return gleich / len(nachbarn) < wohlfuehlfaktor

while es_gibt_unzufriedene():
    person = random.choice(alle_unzufriedenen())     # eine zufällig auswählen
    feld = random.choice(alle_freien_felder())       # ein zufälliges freies Feld
    person.ziehe_um(feld)
    umzuege = umzuege + 1
```

Niemand im Modell plant ein getrenntes Quartier. Jede Person schaut nur auf ihre acht Nachbarn.

</details>

## Hintergrund

Das Modell stammt vom Ökonomen **Thomas Schelling**. Er veröffentlichte es 1971 und spielte es
noch ganz ohne Computer durch: mit zwei Sorten Münzen auf einem Schachbrett, die er von Hand
verschob – so wie Sie eben. 2005 erhielt Schelling den Nobelpreis für Wirtschaftswissenschaften
(für seine Arbeiten zur Spieltheorie).

Die Simulation auf dieser Seite folgt der «Parabel der Polygone» von Vi Hart und Nicky Case
(2014), einer spielbaren Geschichte zum selben Modell.

Weiter mit
[Etappe 2: Wohlfühlfaktor untersuchen]({{ '/lektionen/L5_Etappe_2_Wohlfuehlfaktor.html' | relative_url }}).
{: .nur-online}

<p class="quellen"><strong>Quellen:</strong>
<a href="https://de.wikipedia.org/wiki/Segregation_(Soziologie)">Wikipedia: Segregation (Soziologie)</a> ·
Thomas C. Schelling: Dynamic Models of Segregation. Journal of Mathematical Sociology 1 (1971), S. 143–186 ·
<a href="https://ncase.me/polygons-de/">Vi Hart, Nicky Case: Parabel der Polygone</a></p>
