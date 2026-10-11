---
lektion: 4
zielgruppe: sus
art: etappe
titel: "Etappe 2: Abgleich mit der Wirklichkeit"
kurz: "Das Verhalten des Modells mit Versuchen und Messungen auf echten Strassen vergleichen – und sehen, wo dabei Fehler entstehen"
reihenfolge: 20
---

# Etappe 2: Abgleich mit der Wirklichkeit

**Ziel:** Sie können erklären, was Validieren bedeutet, an Beispielen zeigen, warum es
schwierig ist, und typische Fehlerquellen nennen.

## Was Validieren heisst

**Validieren** heisst: das Verhalten des Modells auswerten und mit dem Verhalten des echten
Systems vergleichen. Die Frage lautet: Verhalten sich Abbild und Wirklichkeit gleich?

Der erste Teil ist erledigt – Sie haben das Modell mit einer Masszahl ausgewertet. Jetzt folgt
der Vergleich.

## Aufgabe 1 – Vergleich mit Versuchen

**Versuch 1.** Ein japanisches Forschungsteam um Yuki Sugiyama veröffentlichte 2008 einen
Versuch mit 22 Autos auf einer Kreisbahn. Alle sollten gleichmässig Tempo 30 halten. Es gab
kein Hindernis – und doch bildete sich ein Stau, der rückwärts um die Bahn wanderte.

**Versuch 2.** 2024 wiederholten die ETH Zürich und SRF den Versuch mit einem guten Dutzend
Freiwilligen auf einer Teststrecke des TCS. Der Auftrag: Tempo und Abstand halten. Nach
wenigen Minuten stand die Kolonne praktisch still.

Zeigt das Modell dasselbe?

1. Im Modell entstehen Staus ohne Hindernis:
   <span class="luecke" data-optionen="ja;nein" data-antwort="ja"></span>
2. Im Modell wandern Staus gegen die Fahrtrichtung:
   <span class="luecke" data-optionen="ja;nein" data-antwort="ja"></span>
3. Im Modell entsteht der Stau, weil die Fahrenden Tempo und Abstand nicht genau halten:
   <span class="luecke" data-optionen="ja;nein" data-antwort="ja"></span>

Im Versuch der ETH blieb der Stau aus, sobald einige Autos einen automatischen Abstandshalter
einschalteten. Welchem Eingriff im Modell entspricht das?

<div class="antwort" data-zeilen="2" data-loesung="Einer tieferen Trödelwahrscheinlichkeit: Ein Abstandshalter reagiert gleichmässig und bremst nicht grundlos. Im Modell verschwinden die Staus, wenn niemand mehr trödelt."></div>

## Aufgabe 2 – Vergleich mit Messungen

Auf Autobahnen wird der Verkehrsfluss laufend gemessen. Das Bundesamt für Strassen hält fest:
Ein Autobahnabschnitt erreicht seine grösste Leistung, wenn die Fahrzeuge mit etwa **85 km/h**
fahren.

Suchen Sie in Ihrer Messtabelle aus Etappe 1 die Zeile mit dem grössten Fluss (Höchsttempo 5).

<div class="messtabelle" data-id="stau" data-spalten="Dichte (Fz/km);Fluss (Fz/h);Tempo (km/h);Höchsttempo;Trödeln (%)" data-fest data-leer="Noch keine Messwerte – nehmen Sie zuerst die Messreihe in Etappe 1 auf."></div>

Im Modell liegt der grösste Fluss bei einem mittleren Tempo von etwa
<span class="luecke" data-breite="5"></span> km/h.

Stimmt das Modell mit der Wirklichkeit überein?

- [ ] Ja, genau.
- [ ] Der Verlauf stimmt (ein Maximum bei mittlerer Dichte), die Zahlen stimmen nicht genau.
- [ ] Nein, das Modell verhält sich ganz anders.
{: .mc data-antwort="2"}

## Aufgabe 3 – Was dem Modell fehlt

Was davon bildet das Modell **nicht** ab? Wählen Sie alles Zutreffende.

<span class="wahl" data-optionen="Spurwechsel;Sicherheitsabstand;Auffahrten und Ausfahrten;Unaufmerksamkeit;Lastwagen und Autos;Reaktionszeit;Steigungen und Kurven" data-antwort="Spurwechsel+Auffahrten und Ausfahrten+Lastwagen und Autos+Steigungen und Kurven"></span>

Ist das Modell deshalb unbrauchbar? Begründen Sie.

<div class="antwort" data-zeilen="3" data-loesung="Nein. Für die Frage, wie ein Stau ohne Hindernis entsteht, genügt es: Es zeigt, dass kleine Unregelmässigkeiten bei dichtem Verkehr ausreichen. Für andere Fragen – etwa wie eine Auffahrt den Verkehr stört oder wie viele Fahrzeuge eine bestimmte Autobahn bewältigt – muss das Modell erweitert werden. Ein Modell gilt nur für den Ausschnitt der Wirklichkeit, den es abbildet."></div>

## Aufgabe 4 – Wo beim Validieren Fehler entstehen

| Fehlerquelle | Bedeutung |
|---|---|
| **Augenschein statt Masszahl** | Man urteilt nach dem Eindruck, statt zu messen. |
| **zu wenige Durchgänge** | Der Zufall spielt mit, aber man misst nur einmal. |
| **Fehler in der Umsetzung** | Das Programm tut nicht genau das, was das Modell beschreibt. |
| **ungeeignete Vergleichsdaten** | Die echten Daten sind ungenau oder unter anderen Bedingungen entstanden. |
| **ausserhalb des Geltungsbereichs** | Man vergleicht das Modell mit einem Vorgang, den es gar nicht abbildet. |

Welche Fehlerquelle liegt vor?

1. Eine Gruppe lässt die Simulation einmal laufen und notiert den Fluss als Ergebnis.
   <span class="luecke" data-optionen="Augenschein statt Masszahl;zu wenige Durchgänge;Fehler in der Umsetzung;ungeeignete Vergleichsdaten;ausserhalb des Geltungsbereichs" data-antwort="zu wenige Durchgänge"></span>
2. Ein Programm misst das mittlere Tempo, bevor die Autos trödeln, und zeigt deshalb zu hohe
   Werte an.
   <span class="luecke" data-optionen="Augenschein statt Masszahl;zu wenige Durchgänge;Fehler in der Umsetzung;ungeeignete Vergleichsdaten;ausserhalb des Geltungsbereichs" data-antwort="Fehler in der Umsetzung"></span>
3. Das Modell der Diffusion wird mit einem Schulzimmer voller Luftzug verglichen.
   <span class="luecke" data-optionen="Augenschein statt Masszahl;zu wenige Durchgänge;Fehler in der Umsetzung;ungeeignete Vergleichsdaten;ausserhalb des Geltungsbereichs" data-antwort="ausserhalb des Geltungsbereichs"></span>
4. «Bei Einstellung A sieht der Verkehr flüssiger aus.»
   <span class="luecke" data-optionen="Augenschein statt Masszahl;zu wenige Durchgänge;Fehler in der Umsetzung;ungeeignete Vergleichsdaten;ausserhalb des Geltungsbereichs" data-antwort="Augenschein statt Masszahl"></span>
5. Das Modell einer einspurigen Strasse wird mit Zähldaten einer dreispurigen Autobahn bei
   Regen verglichen.
   <span class="luecke" data-optionen="Augenschein statt Masszahl;zu wenige Durchgänge;Fehler in der Umsetzung;ungeeignete Vergleichsdaten;ausserhalb des Geltungsbereichs" data-antwort="ungeeignete Vergleichsdaten;ausserhalb des Geltungsbereichs"></span>

Füllen Sie danach den [Steckbrief zum Stau]({{ '/steckbriefe.html' | relative_url }}) aus.
{: .nur-online}

<p class="quellen"><strong>Quellen:</strong>
<a href="https://iopscience.iop.org/article/10.1088/1367-2630/10/3/033001">Sugiyama u. a.: Traffic jams without bottlenecks (New Journal of Physics, 2008)</a> ·
<a href="https://www.srf.ch/wissen/mobilitaet/39-863-staustunden-stau-im-schweizer-verkehr-wie-er-entsteht-und-was-dagegen-hilft">SRF Wissen: Stau im Schweizer Verkehr (6.5.2024)</a> ·
<a href="https://www.astra.admin.ch/de/massnahmen-gegen-stau">Bundesamt für Strassen: Massnahmen gegen Stau</a></p>
