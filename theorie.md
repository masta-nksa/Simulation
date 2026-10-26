---
layout: material
art: lerndossier
titel: "Lerndossier: Simulationen"
kurz: "Alle Erkenntnisse der Lektionen 1–6 kompakt auf einer Seite – zum Lernen für die Prüfung"
permalink: /theorie.html
---

<!--
  Stand: 26.10.2026. Fasst die Seiten «Das Wichtigste» der Lektionen 1–6, die Etappen und die
  Steckbriefe zusammen. Alle Zahlen stammen aus diesen Unterlagen (Quellen dort). Ändert sich
  eine Lektion, hier nachführen.
-->

# Lerndossier: Simulationen

Diese Seite fasst zusammen, was Sie in den Lektionen 1 bis 6 erarbeitet haben – geordnet nach den
Lernzielen der Prüfung. Die Einzelheiten stehen auf den Seiten «Das Wichtigste» jeder Lektion und
in Ihren [Steckbriefen]({{ '/steckbriefe.html' | relative_url }}).

## Lernziele

Haken Sie ab, was Sie sicher können. Die Zahl in Klammern nennt den Abschnitt dieser Seite.

**Wissenschaft und Simulation** – Sie können …

- [ ] die Rolle von Simulationen in der Wissenschaft und den Zusammenhang von Theorie, Evidenz und Simulation erklären (1)
- [ ] anekdotische Evidenz und ein kontrolliertes Experiment unterscheiden und Schwachstellen eines Experiments nennen (1)
- [ ] die Minimalanforderungen an eine Theorie nennen: explizit, widerspruchsfrei, überprüfbar (2)
- [ ] mit Ockhams Rasiermesser und dem Gegenstandsbereich zwischen zwei Theorien wählen (2)
- [ ] erklären, wann Simulationen Vorteile gegenüber Experimenten haben (3)
- [ ] erklären, wie Simulationen helfen, Komplexität zu bewältigen und Vorhersagen zu machen (3)

**Modellieren, Simulieren, Validieren** – Sie können …

- [ ] Modell und Wirklichkeit unterscheiden und erklären, warum ein Modell vereinfacht (4)
- [ ] ein konzeptuelles von einem funktionalen Modell unterscheiden und die zwei Schritte des Modellierens beschreiben (4)
- [ ] Parameter, Parametrisierung, Durchgang und Masszahl erklären (5)
- [ ] erklären, was Validieren heisst, wie man vorgeht und warum es manchmal sehr schwierig ist (6)
- [ ] typische Fehlerquellen beim Validieren nennen (6)

**Die vier Modelle** – Sie können …

- [ ] beschreiben, wie man mit der Simulation die Ausbreitung eines Gases untersucht (7)
- [ ] die vier Regeln des Stau-Modells anwenden und den Verkehrsfluss erklären (8)
- [ ] beschreiben, wie man mit der Simulation den Einfluss des Wohlfühlfaktors auf die Segregation untersucht (9)
- [ ] das HIV-Modell beschreiben und erklären, was die Prüfung an Eswatini ergeben hat (10)
- [ ] zu jedem Modell angeben, welche Teile der Wirklichkeit es wie abbildet und was es weglässt (7–10)

## 1 Drei Standbeine der Wissenschaft {#standbeine}

Theorie, Experiment und Simulation untersuchen dieselbe Frage auf drei Arten. Die Simulation gilt
als **drittes Standbein** neben Theorie und Experiment.

<figure class="grafik">
<img src="{{ '/assets/img/wissenschaft-und-simulationen.webp' | relative_url }}" width="2000" height="1473" alt="Schema in drei Zeilen. Oben, Wirklichkeit: Ein Realitätsausschnitt (reales System) wird experimentell untersucht und liefert Evidenz und Daten. Mitte, Abbild: Durch Abstrahieren und Reduzieren entsteht aus dem Realitätsausschnitt eine Theorie bzw. ein konzeptuelles Modell; gedanklich untersucht, liefert sie eine Vorhersage. Unten, Simulation: Durch Konkretisieren und Umsetzen entsteht aus der Theorie ein funktionales Modell (künstliches System); durchgespielt und simuliert, liefert es Ergebnisse und Daten. Alle drei Ergebnisse führen zum Kasten Validieren: Sind die Vorhersagen plausibel? Verhalten sich Abbild und Realität gleich? Bei Ja werden neue Vorhersagen abgeleitet und experimentell untersucht, bei Nein (oder nur teilweise) werden Theorie und Modell geändert oder optimiert.">
<figcaption>Wissenschaft und Simulationen. Diese Grafik sollten Sie vollständig beschriften können. Grafik: <a href="https://oinf.ch/kurs/vernetzung-und-systeme/simulationen/">oinf.ch</a></figcaption>
</figure>

| Zeile | Was wird untersucht? | Wie? | Was kommt heraus? |
|---|---|---|---|
| **Wirklichkeit** | Realitätsausschnitt (reales System) | experimentell untersuchen | Evidenz, Daten |
| **Abbild** | Theorie bzw. konzeptuelles Modell | gedanklich untersuchen | Vorhersage |
| **Simulation** | funktionales Modell (künstliches System) | durchspielen, simulieren | Ergebnisse, Daten |

- Von der Wirklichkeit zum Abbild: **abstrahieren, reduzieren**. Vom Abbild zur Simulation:
  **konkretisieren, umsetzen**.
- Alles mündet ins **Validieren**: Verhalten sich Abbild und Wirklichkeit gleich?
  **Ja** → neue Vorhersagen ableiten und experimentell untersuchen. **Nein** (oder nur teilweise)
  → Theorie oder Modell anpassen.

| Begriff | Bedeutung | Beispiel aus Lektion 1 |
|---|---|---|
| **Theorie** | begründete, aber nicht bewiesene Erklärung für einen Ausschnitt der Wirklichkeit | Die Teilchen des Geruchs verteilen sich von selbst. |
| **Vorhersage** | was nach der Theorie zu beobachten sein müsste | Weiter weg riecht man es später. |
| **Experiment** | geplante Untersuchung an der Wirklichkeit, die Daten liefert | Schale mit Essigessenz, Abstand und Zeit messen |
| **Evidenz** | verlässliche Beobachtungen und Daten über die Wirklichkeit – das, was eine Theorie erklären soll; sie bestätigt oder widerlegt die Theorie | die Messwerte der Klasse |

**Anekdotische Evidenz** ist ein einzelner Bericht («Ich habe es sofort gerochen»): wenig
verlässlich, weil sich die Person täuschen kann und niemand die Bedingungen kennt. Ein
**kontrolliertes Experiment** ist geplant, dokumentiert und wiederholbar: Man verändert gezielt
eine Grösse und hält alles andere gleich.

**Schwachstellen eines Experiments** (Essig-Experiment): Messgerät (Nasen riechen verschieden,
Erwartung), Störgrössen (Luftzug, Heizung, Bewegung), Genauigkeit (geschätzte Abstände,
Reaktionszeit), Wiederholung (ein einziger Durchgang), Dokumentation (Temperatur, Menge nicht
notiert).

## 2 Theorien beurteilen {#theorien}

| Minimalanforderung | Bedeutung | verletzt durch … |
|---|---|---|
| **explizit** | Es ist klar, was genau behauptet wird. | «Gerüche verhalten sich irgendwie je nach Umständen.» |
| **widerspruchsfrei** | Die Aussagen passen zueinander (sind in sich konsistent). | «Alle Richtungen gleich schnell – aber links immer zuerst.» |
| **überprüfbar** | Die Theorie lässt sich an Evidenz bestätigen und vor allem **widerlegen**. | «Ein Geist trägt den Geruch, nachweisen lässt er sich nicht.» |

Erklären zwei Theorien dieselbe Evidenz gleich gut, ist diejenige vorzuziehen, …

- die mit **weniger Annahmen** auskommt – **Einfachheit, Ockhams Rasiermesser** (auch
  Sparsamkeitsprinzip);
- die **mehr verschiedene Vorgänge** erklärt – grösserer **Gegenstandsbereich** (Diffusion erklärt
  Essig in der Luft, Zucker im Tee und Tinte im Wasser).

## 3 Warum Simulationen? {#warum}

| Grund | Beispiel |
|---|---|
| **billiger und schneller** als ein Experiment | Modell im Windkanal statt Prototyp, Probebohrung |
| Experiment **unmöglich** | Galaxien, Klima, Urknall, eine Stadt neu besiedeln |
| Experiment **ethisch nicht vertretbar** | Ausbreitung einer Krankheit (HIV) |
| Experiment **schwierig**: Messung stört, Vorgang zu schnell oder zu langsam | Verbrennung im Motor, Fliessen eines Gletschers |
| im Modell lässt sich **alles messen und einstellen**, beliebig oft wiederholen | Position jedes Teilchens, Trödeln auf 0 % |

- **Komplexität bewältigen:** Viele einfache Regeln ergeben zusammen ein Verhalten, das sich kaum
  ausrechnen, aber durchspielen lässt (Stau aus dem Nichts, getrennte Quartiere).
- **Vorhersagen:** Man spielt Fälle durch, die es (noch) nicht gibt – etwa «Was bringt mehr
  Therapie in Südafrika?».
- **Aber:** Eine Simulation ist ein Experiment an einem Modell, nicht an der Wirklichkeit. Sie
  ersetzt das Experiment nicht, sie ergänzt es – ihre Ergebnisse müssen validiert werden.

## 4 Modellieren {#modellieren}

Ein **Modell** ist ein vereinfachtes Abbild eines Ausschnitts der Wirklichkeit. Es enthält die
wesentlichen Einflüsse und lässt alles andere weg. Verhält sich das einfache Modell fast wie die
Wirklichkeit, hat man die wesentlichen Einflüsse gefunden.

| | konzeptuelles Modell | funktionales Modell |
|---|---|---|
| **Form** | Text, Skizze, Formel | künstliches System, zum Beispiel ein Programm |
| **Folgerungen** | muss ein Mensch durchdenken oder ausrechnen | zeigt das Modell selbst, wenn es läuft |
| **Beispiel** | die vier Verkehrsregeln in Worten; t ≈ x² / (2 · D) | die Stausimulation |

| Schritt | Was geschieht | Beim Stau |
|---|---|---|
| **1. Abstrahieren und reduzieren** | Ausschnitt festlegen, Wesentliches von Vernachlässigbarem trennen | Abstand, Tempo, Höchsttempo, Unaufmerksamkeit – nicht Farbe, Marke, Radio |
| **2. Konkretisieren und umsetzen** | alles so genau festlegen, dass es sich programmieren lässt | Zellen von 7,5 m, Zeitschritte von 1 s, Tempo 0 bis 5, vier Regeln |

**Man modelliert nicht das Ergebnis, sondern die Akteure.** Im Stau-Modell steht der Stau in
keiner Regel: Modelliert werden einzelne Autos mit einfachen Regeln, der Stau **entsteht** aus
ihrem Zusammenspiel. Ebenso steht die getrennte Stadt in keiner Regel des Segregationsmodells.

**Merksatz:** Ein Modell ist nicht dann gut, wenn es alles enthält – sondern wenn es mit wenig
auskommt und trotzdem das Wesentliche zeigt.

## 5 Simulieren {#simulieren}

| Begriff | Bedeutung |
|---|---|
| **Simulieren** | ein funktionales Modell in Bewegung setzen und beobachten |
| **Parameter** | Stelle, an der das Modell verstellbar gebaut ist (z. B. Anzahl Autos) |
| **Parametrisierung** | Wahl konkreter Werte für alle Parameter – versetzt das Modell in eine bestimmte Situation |
| **Durchgang** | ein Ablauf der Simulation mit festen Werten |
| **stochastische Parameter** | zufällige Einflüsse im Modell (Startverteilung, Trödeln); deshalb fällt jeder Durchgang anders aus |
| **Masszahl** | legt fest, was genau gemessen wird – nur Zahlen lassen sich vergleichen, Eindrücke nicht |

**So untersucht man den Einfluss eines Parameters:** Vorhersage notieren · nur diesen einen
Parameter verändern, alle anderen gleich lassen · pro Einstellung mehrere Durchgänge · Masszahl
messen und Mittelwert bilden · als Schaubild darstellen · mit der Vorhersage vergleichen.

**Merksatz:** Weil der Zufall mitspielt, genügt ein einzelner Durchgang nie.

## 6 Validieren {#validieren}

**Validieren** heisst: das Verhalten des Modells auswerten und mit dem Verhalten des echten
Systems vergleichen.

| Schritt | Was geschieht | Beim Stau |
|---|---|---|
| **1. Ergebnisse auswerten** | Masszahl, mehrere Durchgänge, Schaubild | Verkehrsfluss in Fz/h, Fluss-Dichte-Diagramm |
| **2. Mit der Wirklichkeit abgleichen** | mit Versuchen und Messungen am echten System vergleichen | Ringversuche, Zähldaten von Autobahnen |

- Stimmt es überein, leitet man neue Vorhersagen ab und prüft sie; sonst ändert man das Modell und
  beginnt von vorn. Validieren ist nie abgeschlossen.
- **Anpassen ist nicht Prüfen.** Wer einen Wert so wählt, dass das Modell bekannte Daten trifft,
  hat es noch nicht geprüft. Prüfen heisst: eine Vorhersage machen und mit **neuen** Daten
  vergleichen (HIV: an Eswatini 2011 angepasst, an 2016 geprüft).
- Ein Modell gilt nur für den Ausschnitt der Wirklichkeit, den es abbildet (**Geltungsbereich**).

**Warum Validieren schwierig sein kann:** Daten fehlen, sind ungenau oder teuer · manche
Vorhersagen lassen sich erst nach langer Zeit oder gar nicht prüfen (Klima, Urknall, ganze
Gesellschaften) · ein vereinfachtes Modell stimmt nie zu hundert Prozent – was «gut genug» ist,
hängt von der Frage ab · dasselbe Muster kann auf verschiedenen Wegen entstehen (Segregation).

| Fehlerquelle | Bedeutung |
|---|---|
| **Augenschein statt Masszahl** | nach dem Eindruck urteilen statt messen |
| **zu wenige Durchgänge** | der Zufall spielt mit, man misst aber nur einmal |
| **Fehler in der Umsetzung** | das Programm tut nicht genau, was das Modell beschreibt |
| **ungeeignete Vergleichsdaten** | echte Daten ungenau oder unter anderen Bedingungen entstanden |
| **ausserhalb des Geltungsbereichs** | Vergleich mit einem Vorgang, den das Modell gar nicht abbildet |

## Die vier Modelle

Zu jedem Modell dieselben Fragen wie im Steckbrief. Am besten lässt sich der Stau validieren,
am schwersten die Segregation.

### 7 Brownsche Bewegung (Lektionen 1–2) {#brown}

| | |
|---|---|
| **Wirklichkeit** | Ausbreitung eines Geruchs (Essigessenz) im Raum durch **Diffusion**: Teilchen bewegen sich zufällig und verteilen sich von hoher zu niedriger Konzentration |
| **Akteure** | Teilchen, ein Detektor (die Nase) |
| **Regel** | pro Zeitschritt ein zufälliger Schritt nach links, rechts, oben oder unten; an der Wand stehen bleiben; Detektor schlägt an, wenn genug Teilchen da waren |
| **Parameter** | Abstand des Detektors, Anzahl Teilchen, Schwelle |
| **Zufall** | Startposition und jeder einzelne Schritt |
| **Masszahl** | Zeit (Zeitschritte), bis der Detektor anschlägt – je Abstand |
| **Weggelassen** | Luftströmung, dritte Dimension, Nachschub aus der Quelle, Hindernisse, Temperatur |
| **Validierung** | mit der Theorie gut (**doppelter Abstand → etwa vierfache Zeit**), mit dem Experiment nur grob |

**Pointe:** Reine Diffusion bräuchte für einen Meter fast zwölf Stunden. Im Schulzimmer bringt die
**Luftströmung** den Geruch – Experiment und Modell untersuchen nicht denselben Vorgang.

### 8 Stau – Nagel-Schreckenberg-Modell (Lektionen 3–4) {#stau}

Kai Nagel und Michael Schreckenberg (1992): Strasse als Ring aus Zellen von 7,5 m, ein Auto pro
Zelle, Tempo 0 bis 5 Zellen pro Sekunde (5 ≙ 135 km/h), Zeitschritte von 1 s. Pro Zeitschritt
gelten für alle Autos gleichzeitig **vier Regeln in dieser Reihenfolge**:

| Regel | Was geschieht |
|---|---|
| **1. Beschleunigen** | Tempo + 1, höchstens bis zum Höchsttempo |
| **2. Bremsen** | Tempo höchstens so gross wie die Lücke zum Auto davor |
| **3. Trödeln** | mit einer festen Wahrscheinlichkeit Tempo − 1 |
| **4. Fahren** | jedes Auto rückt um sein Tempo vor |

| | |
|---|---|
| **Parameter** | Anzahl Autos (Dichte), Höchsttempo, Trödelwahrscheinlichkeit |
| **Zufall** | Startpositionen und Starttempi, Trödeln in jedem Zeitschritt |
| **Masszahl** | Verkehrsfluss in Fahrzeugen pro Stunde an einer Messstelle, dazu Dichte (Fz/km) und mittleres Tempo |
| **Weggelassen** | Spurwechsel, Auffahrten und Ausfahrten, Lastwagen, Steigungen und Kurven, Wetter, verschiedene Fahrstile |

**Was das Modell zeigt:**

- Staus entstehen **aus dem Nichts** (Phantomstau, ohne Hindernis) und wandern **gegen die Fahrtrichtung**.
- Ohne Trödeln entstehen keine neuen Staus: Unregelmässiges Fahren ist die Ursache.
- **Fluss-Dichte-Diagramm:** Bei geringer Dichte gilt «mehr Autos, mehr Fluss», ab etwa 18 Fz/km
  (Maximum rund 1900 Fz/h) gilt «mehr Autos, **weniger** Fluss». Das Maximum ist die
  Leistungsgrenze der Strasse.
- Bei dichtem Verkehr kostet ein tieferes Höchsttempo kaum Fluss (Tempo 80): Den Fluss bestimmt
  dann die Lücke, nicht das Tempolimit – und alle fahren gleichmässiger.

**Abgleich:** Ringversuche (Sugiyama 2008: 22 Autos auf einer Kreisbahn; ETH Zürich und SRF 2024)
zeigen Staus ohne Hindernis, die rückwärts wandern – **stimmt**. Mit automatischem Abstandshalter
blieb der Stau aus – entspricht weniger Trödeln. Grösster Fluss auf Autobahnen bei etwa 85 km/h,
im Modell bei etwa 105 km/h – der **Verlauf stimmt, die Zahl nicht**.

**Massnahmen gegen Stau aus dem Nichts**, die das Modell stützt: gleichmässig fahren und Abstand
halten, Abstandsregeltempomat, bei dichtem Verkehr das Tempo senken.

### 9 Segregation – nach Schelling (Lektion 5) {#segregation}

**Segregation** heisst Entmischung: Gruppen verteilen sich ungleich über ein Gebiet. Die Simulation
folgt der «Parabel der Polygone» (Vi Hart, Nicky Case) nach Thomas Schellings Modell von 1971.

| | |
|---|---|
| **Wirklichkeit** | Stadt, Wohnungen, Nachbarschaft; zwei Bevölkerungsgruppen |
| **Im Modell** | Raster 20 × 20, Dreiecke und Quadrate, Nachbarschaft = bis zu acht angrenzende Felder, 20 % leer |
| **Regel** | Wer weniger gleiche Nachbarn hat, als der **Wohlfühlfaktor** verlangt, ist unzufrieden und zieht in ein zufälliges freies Feld. Wer keine Nachbarn hat, ist zufrieden. |
| **Parameter** | **Wohlfühlfaktor**: so viel Prozent der Nachbarn müssen gleich sein (Zusatz: Vielfalt, Anteil der Gruppen, Leerstand) |
| **Zufall** | Startverteilung, wer umzieht, das neue Feld |
| **Masszahl** | Anteil gleicher Nachbarn, gemittelt über alle: 50 % durchmischt, 100 % vollständig getrennt |
| **Weggelassen** | Mieten und Einkommen, Diskriminierung, Arbeitsweg, Familie, Schule, Stadtplanung; Umzüge sind teuer und selten; alle haben dieselbe Vorliebe |

| Wohlfühlfaktor | 0 % | 10 % | 20 % | 30 % | 40 % | 50 % | 60 % | 70 % | 80 % | 90 % |
|---|---|---|---|---|---|---|---|---|---|---|
| gleiche Nachbarn am Ende, etwa | 50 % | 53 % | 59 % | 75 % | 82 % | 88 % | 96 % | 99 % | 100 % | 52 % |

- **Kernaussage:** Schon eine **schwache Vorliebe** führt zu einer stark getrennten Stadt. Wer nur
  ein Drittel Gleiche verlangt, lebt am Ende mit etwa drei Vierteln Gleichen.
- Grund sind **Kettenreaktionen**: Jeder Umzug verändert die Nachbarschaft anderer.
- Ab etwa 85 % findet kaum jemand einen Platz – die Stadt kommt nicht zur Ruhe und bleibt durchmischt.
- Zusatz: Eine getrennte Stadt bleibt getrennt, wenn alle ihre Vorliebe ablegen (Zufriedene
  ziehen nicht um). Verlangen alle ein wenig Vielfalt (höchstens 90 % Gleiche), durchmischt sie
  sich. Ist eine Gruppe in der Minderheit, zieht fast nur sie um – bei derselben Regel für alle.
- Vom Ergebnis (getrennte Quartiere) lässt sich **nicht** auf die Haltung der Einzelnen schliessen.

**Validierung sehr schwierig:** Die Entmischung echter Städte ist messbar (Segregationsindex), die
Ursache kaum: kein Experiment möglich, der Wohlfühlfaktor ist nicht messbar, viele andere Gründe
wirken mit, und dasselbe Muster kann anders entstehen. Das Modell zeigt, **was möglich ist** –
eine Vorhersage für eine bestimmte Stadt macht es nicht.

### 10 Krankheitsübertragung – HIV (Lektion 6) {#hiv}

Nach dem NetLogo-Modell «HIV» (Wilensky 1997), mit realistischer Ansteckung. Bildet nur einen
Übertragungsweg ab: Sex in einer Partnerschaft. Ein Zeitschritt ist eine Woche.

| | |
|---|---|
| **Akteure** | Personen, die umhergehen, Paare bilden und sich trennen; HIV-negativ oder -positiv, wissen es oder nicht, behandelt oder nicht |
| **Regeln** | allein → ein Schritt in zufälliger Richtung · zwei Freie treffen sich → Paar, wenn **beide** wollen · Trennung, sobald einer nicht mehr bleiben will · ohne Kondom Ansteckung mit **0,75 % pro Woche** · Test oder Symptome (nach etwa 10 Jahren) → man erfährt davon und wird behandelt; **wirksam Behandelte stecken niemanden mehr an** |
| **Parameter** | Paarbildung, Dauer einer Beziehung, Kondom, Test; für die Länder dazu Therapie und Ausgangslage |
| **Zufall** | Begegnungen, Paarbildung, Kondom, Ansteckung, Test, persönliche Neigungen |
| **Masszahl** | Anteil HIV-Positiver nach 30 Jahren; für die Länder Neuansteckungen pro 100 HIV-negative Personen und Jahr |
| **Weggelassen** | andere Übertragungswege, Alter, Geschlecht, Todesfälle und Geburten, mehrere Partner gleichzeitig, frisch Angesteckte besonders ansteckend |

| je ein Parameter verändert | Standard | Paarbildung 2 | Dauer 200 Wochen | Kondom 50 % | Test 0,5 pro Jahr |
|---|---|---|---|---|---|
| HIV-positiv nach 30 Jahren, etwa | 35 % | 6 % | 15 % | 9 % | 4 % |

- Jeder der vier Parameter bremst deutlich. Am stärksten der Test – aber nur, weil im Modell jede
  diagnostizierte Person wirksam behandelt wird. **Ohne Therapie nützt Testen nichts.**
- Lange geschieht wenig, dann geht es immer schneller: Je mehr angesteckt sind, desto mehr stecken an.
- Einzelne Durchgänge streuen stark (20 bis 50 %) – mehrmals messen.

| | Eswatini 2011 | Eswatini 2016 | Südafrika 2024 |
|---|---|---|---|
| gemessen (Neuansteckungen pro 100 und Jahr) | 2,48 | 1,30 | – |
| Modell | etwa 2,7 (**angepasst**) | etwa 1,0 (**vorhergesagt**) | etwa 0,6 (nicht prüfbar) |

- Eswatini 2016: Richtung und Grössenordnung stimmen, die Vorhersage ist zu optimistisch. Den
  Rückgang erklärt vor allem die Therapie.
- Südafrika: Am meisten bringt eine bessere Therapie (95 % statt 78 %: etwa 0,2 statt 0,6). Mehr
  Tests bringen kaum etwas, weil schon 95 % Bescheid wissen. Diese Empfehlung ist **nicht
  validiert**.
- Für eine **Grippe** bräuchte das Modell andere **Regeln**, nicht nur andere Werte: Übertragung bei
  jeder Begegnung, Symptome nach Tagen, Genesung und Schutz danach. Gleich bliebe die Methode.

## Die Merksätze auf einen Blick {#merksaetze}

1. Eine Theorie erklärt, eine Vorhersage lässt sich prüfen, und erst die Evidenz entscheidet.
2. Ein Experiment zeigt die Wirklichkeit unter genau den Bedingungen, die an diesem Tag geherrscht haben.
3. Eine Simulation ist ein Experiment an einem Modell – nicht an der Wirklichkeit.
4. Ein Modell ist gut, wenn es mit wenig auskommt und trotzdem das Wesentliche zeigt.
5. Wer den Einfluss eines Parameters untersucht, verändert nur diesen einen.
6. Weil der Zufall mitspielt, genügt ein einzelner Durchgang nie.
7. Ein Modell gilt für den Ausschnitt der Wirklichkeit, den es abbildet – und nur für diesen.
8. Aus kleinen Vorlieben der Einzelnen kann eine grosse Wirkung für das Ganze entstehen.
9. Ein Modell, das sich nicht validieren lässt, kann zeigen, dass etwas möglich ist – vorhersagen kann es nicht.
10. Ein Modell, das man an Daten angepasst hat, ist noch nicht geprüft.
