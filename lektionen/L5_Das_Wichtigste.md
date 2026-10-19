---
lektion: 5
zielgruppe: sus
art: zusammenfassung
titel: "Das Wichtigste: Segregation"
kurz: "Besprechung am Ende der Lektion und Lernzusammenfassung: Modell, Wohlfühlfaktor, Grenzen der Validierung"
reihenfolge: 80
---

# Das Wichtigste: Segregation

## Lernziele dieser Lektion

Sie können …

- [ ] das Segregationsmodell beschreiben: Akteure, Regel, Parameter, Masszahl
- [ ] angeben, welche Teile der Wirklichkeit das Modell wie abbildet und was es weglässt
- [ ] beschreiben, wie sich mit der Simulation der Einfluss des Wohlfühlfaktors auf die
      Segregation untersuchen lässt
- [ ] erklären, warum schon eine schwache Vorliebe zu einer stark getrennten Stadt führt
- [ ] an diesem Modell begründen, warum Validieren manchmal sehr schwierig ist

Haken Sie ab, was Sie sicher können. Wo es noch hapert, hilft die Zusammenfassung unten.

<div class="nur-online" markdown="1">

## Zum Besprechen

1. Getrennte Quartiere – braucht es dafür Ablehnung? Was antworten Sie jetzt?
2. Bei einem Wohlfühlfaktor von 90 % bleibt die Stadt durchmischt. Spricht das gegen das Modell?
3. Ein Modell, das sich kaum validieren lässt: Wofür taugt es – und wofür nicht?

</div>

## Alle drei Schritte in einer Lektion

<figure class="grafik">
<img src="{{ '/assets/img/wissenschaft-und-simulationen.webp' | relative_url }}" width="2000" height="1473" alt="Schema der drei Standbeine: In der Wirklichkeit wird ein Realitätsausschnitt experimentell untersucht und liefert Evidenz und Daten. Im Abbild wird eine Theorie bzw. ein konzeptuelles Modell gedanklich untersucht und liefert eine Vorhersage. In der Simulation wird ein funktionales Modell durchgespielt und liefert Ergebnisse und Daten. Alle drei führen zum Validieren: Verhalten sich Abbild und Realität gleich? Bei Ja neue Vorhersagen ableiten, bei Nein Theorie oder Modell ändern.">
<figcaption>In dieser Lektion: das ganze Schema. Aus der Wirklichkeit gibt es Daten zur Entmischung von Städten, aber kein Experiment. Grafik: <a href="https://oinf.ch/kurs/vernetzung-und-systeme/simulationen/">oinf.ch</a></figcaption>
</figure>

| Schritt | Beim Stau (Lektionen 3 und 4) | Bei der Segregation |
|---|---|---|
| **Modellieren** | Autos auf einem Ring, vier Regeln | Personen auf einem Raster, eine Regel |
| **Simulieren** | Dichte verändern, Verkehrsfluss messen | Wohlfühlfaktor verändern, Anteil gleicher Nachbarn messen |
| **Validieren** | Ringversuche, Zähldaten – gut möglich | Entmischung messbar, Ursache kaum – sehr schwierig |

## Das Modell

| In der Wirklichkeit | Im Modell |
|---|---|
| Stadt, Wohnungen, Nachbarschaft | Raster aus 20 × 20 Feldern, die bis zu acht angrenzenden Felder |
| zwei Bevölkerungsgruppen | Dreiecke und Quadrate |
| «Ich möchte nicht ganz fremd sein» | **Wohlfühlfaktor**: so viel Prozent der Nachbarn müssen gleich sein |
| Umzug | in ein zufälliges freies Feld |

**Regel:** Wer weniger gleiche Nachbarn hat, als der Wohlfühlfaktor verlangt, zieht um.

**Masszahl:** Anteil gleicher Nachbarn, gemittelt über alle Personen. 50 % heisst
durchmischt, 100 % vollständig getrennt.

**Zufall:** Startverteilung, die Wahl der Person, die umzieht, und das neue Feld. Darum misst
man mehrmals.

**Weggelassen:** Mieten und Einkommen, Diskriminierung, Arbeitsweg, Familie, Stadtplanung –
und dass Umzüge teuer und selten sind.

## Was das Modell zeigt

| Wohlfühlfaktor | 0 % | 10 % | 20 % | 30 % | 40 % | 50 % | 60 % | 70 % | 80 % | 90 % |
|---|---|---|---|---|---|---|---|---|---|---|
| gleiche Nachbarn am Ende, etwa | 50 % | 53 % | 59 % | 75 % | 82 % | 88 % | 96 % | 99 % | 100 % | 52 % |

- Wer nur ein Drittel Gleiche verlangt, lebt am Ende mit etwa drei Vierteln Gleichen.
- Grund sind Kettenreaktionen: Jeder Umzug verändert die Nachbarschaft anderer.
- Bei sehr hohen Ansprüchen (ab etwa 85 %) findet kaum jemand einen passenden Platz – die Stadt
  kommt nicht zur Ruhe und bleibt durchmischt.

**Merksatz:** Aus kleinen Vorlieben der Einzelnen kann eine grosse Wirkung für das Ganze
entstehen. Vom Ergebnis – getrennten Quartieren – lässt sich deshalb nicht auf die Haltung der
Einzelnen schliessen.

## Aus den Zusatz-Etappen

- Eine getrennte Stadt bleibt getrennt, auch wenn alle ihre Vorlieben ablegen: Wer zufrieden
  ist, zieht nicht um.
- Verlangen die Menschen ein wenig Vielfalt (höchstens 90 % Gleiche), durchmischt sich die Stadt.
- Ist eine Gruppe in der Minderheit, zieht fast nur sie um – bei derselben Regel für alle.
- Der Anteil leerer Wohnungen ändert das Ergebnis kaum, nur die Zahl der Umzüge.

## Warum Validieren hier so schwierig ist

- Ein Experiment ist unmöglich: Niemand kann eine Stadt neu besiedeln.
- Der Wohlfühlfaktor lässt sich nicht messen.
- In der Wirklichkeit wirken viele weitere Gründe mit.
- Dasselbe Muster kann auf verschiedenen Wegen entstehen: Dass Modell und Stadt gleich
  aussehen, beweist nicht, dass die Ursache dieselbe ist.

**Merksatz:** Ein Modell, das sich nicht validieren lässt, kann trotzdem zeigen, dass etwas
möglich ist. Vorhersagen für eine bestimmte Stadt kann es nicht.
