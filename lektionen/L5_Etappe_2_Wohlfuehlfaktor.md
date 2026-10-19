---
lektion: 5
zielgruppe: sus
art: etappe
titel: "Etappe 2: Wohlfühlfaktor untersuchen"
kurz: "Den Wohlfühlfaktor verändern, den Anteil gleicher Nachbarn messen und das Ergebnis als Schaubild darstellen"
reihenfolge: 20
---

# Etappe 2: Wohlfühlfaktor untersuchen

**Ziel:** Sie können beschreiben, wie sich mit der Simulation der Einfluss des
Wohlfühlfaktors auf die Segregation untersuchen lässt, und das Ergebnis erklären.

## Die Masszahl

Ob eine Stadt getrennt ist, soll nicht nach Augenschein entschieden werden. Die Masszahl dieses
Modells ist der **Anteil gleicher Nachbarn**:

- Für jede Person wird ausgerechnet, welcher Anteil ihrer Nachbarn zur eigenen Gruppe gehört.
- Davon wird der Durchschnitt über alle Personen gebildet.

**50 %** heisst: Die Stadt ist so durchmischt wie bei einer zufälligen Verteilung. **100 %**
heisst: Niemand hat einen Nachbarn aus der anderen Gruppe – die Stadt ist vollständig getrennt.

## Aufgabe 1 – Vorhersage

Alle in der Stadt haben einen Wohlfühlfaktor von **33 %**: Jede Person möchte, dass mindestens
ein Drittel ihrer Nachbarn so ist wie sie. Mit zwei Dritteln anderen kann sie also gut leben.

Wie hoch ist der Anteil gleicher Nachbarn, wenn alle zufrieden sind?

<span class="wahl" data-optionen="etwa 33 %;etwa 50 %;etwa 75 %;etwa 100 %"></span>

## Aufgabe 2 – Zuschauen

Klicken Sie auf **Start** und beobachten Sie die Stadt und den Verlauf rechts. Die gestrichelte
Linie zeigt den Wohlfühlfaktor, die durchgezogene den Anteil gleicher Nachbarn. Mit **Neu
verteilen** beginnt ein neuer Durchgang.

<div class="simulation" data-modell="segregation" data-ziel="segregation"></div>

Stimmte Ihre Vorhersage? Beschreiben Sie, wie sich die Stadt verändert.

<div class="antwort" data-zeilen="3" data-loesung="Zuerst ziehen viele um, dann immer weniger. Es bilden sich Flecken aus Dreiecken und Flecken aus Quadraten, die wachsen und zusammenwachsen. Wenn alle zufrieden sind, liegt der Anteil gleicher Nachbarn bei etwa 75 % – weit über den 33 %, die jede Person verlangt."></div>

## Aufgabe 3 – Messreihe

Der Knopf **Messen** spielt einen ganzen Durchgang im Hintergrund durch: Er verteilt neu, lässt
umziehen, bis alle zufrieden sind, und schreibt das Ergebnis in die Tabelle. Kommt die Stadt nach
100 000 Umzügen nicht zur Ruhe, bricht er ab.

Messen Sie bei einem Wohlfühlfaktor von **0, 10, 20, 30, 40, 50, 60, 70, 80 und 90 %** je
**zweimal**. Der Regler lässt sich mit den Pfeiltasten in Einerschritten verstellen.

<div class="messtabelle" data-id="segregation" data-spalten="Wohlfühlfaktor (%);gleiche Nachbarn (%);Umzüge;zur Ruhe gekommen" data-fest></div>

<div class="schaubild" data-quelle="segregation" data-x="Wohlfühlfaktor (%)" data-y="gleiche Nachbarn (%)"></div>

## Aufgabe 4 – Auswerten

1. Bei einem Wohlfühlfaktor von 30 % liegt der Anteil gleicher Nachbarn am Ende bei etwa
   <span class="luecke" data-typ="groesse" data-toleranz="0.08" data-antwort="75" data-breite="4"></span> %.
2. Am stärksten steigt der Anteil gleicher Nachbarn zwischen
   <span class="luecke" data-optionen="0 und 10 %;20 und 30 %;50 und 60 %;70 und 80 %" data-antwort="20 und 30 %"></span>.
3. Bis 80 % gilt: Je höher der Wohlfühlfaktor, desto
   <span class="luecke" data-optionen="weniger;mehr" data-antwort="mehr"></span>
   Umzüge braucht es, bis alle zufrieden sind.

Wie kann eine Stadt, in der jede Person nur eine **geringe** Vorliebe für Gleiche hat, dennoch
stark getrennt werden?

<div class="antwort" data-zeilen="4" data-loesung="Jeder Umzug verändert die Nachbarschaft anderer. Zieht ein Dreieck weg, hat das Quadrat daneben einen gleichen Nachbarn weniger und wird vielleicht selbst unzufrieden. So entstehen Kettenreaktionen. Zur Ruhe kommt die Stadt erst, wenn sich Flecken aus Gleichen gebildet haben, in denen alle mit Abstand genug gleiche Nachbarn haben. Niemand will die Trennung – sie entsteht aus dem Zusammenspiel vieler kleiner Entscheidungen."></div>

Was zeigt die Simulation über die Wirkung kleiner individueller Vorlieben auf die Gesellschaft
insgesamt?

<div class="antwort" data-zeilen="3" data-loesung="Das Ganze ist nicht einfach die Summe der Einzelnen: Aus einer schwachen Vorliebe jeder Person (ein Drittel gleiche Nachbarn genügt) wird eine starke Trennung der ganzen Stadt (etwa drei Viertel gleiche Nachbarn). Man kann also nicht vom Ergebnis – getrennte Quartiere – auf die Haltung der Einzelnen schliessen."></div>

## Aufgabe 5 – Ein seltsames Ergebnis

Bei einem Wohlfühlfaktor von 90 % geschieht etwas Unerwartetes. Was, und wie erklären Sie es?

<div class="antwort" data-zeilen="3" data-loesung="Die Stadt kommt nicht zur Ruhe und bleibt durchmischt (Anteil gleicher Nachbarn etwa 50 bis 55 %). Wer 90 % Gleiche verlangt, braucht praktisch nur Gleiche um sich. Solche Plätze gibt es in einer gemischten Stadt kaum, und weil jeder Umzug in ein zufälliges Feld führt, findet fast niemand einen. Alle ziehen ständig um, keine Gruppe kann sich festsetzen."></div>

Zwei Messungen mit demselben Wohlfühlfaktor liefern nicht genau denselben Wert, weil
<span class="luecke" data-optionen="die Seite falsch rechnet;der Zufall mitspielt;der Wohlfühlfaktor schwankt" data-antwort="der Zufall mitspielt"></span>:
Startverteilung, die Wahl der Person und das neue Feld sind zufällig.

Weiter mit
[Etappe 3: Und die Wirklichkeit?]({{ '/lektionen/L5_Etappe_3_Wirklichkeit.html' | relative_url }}).
{: .nur-online}
