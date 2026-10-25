---
lektion: 6
zielgruppe: sus
art: etappe
titel: "Etappe 2: Zwei Länder"
kurz: "Das Modell an echten Daten aus Eswatini prüfen und daraus eine Empfehlung für Südafrika ableiten"
reihenfolge: 20
---

# Etappe 2: Zwei Länder

**Ziel:** Sie können beschreiben, wie man ein Modell an echten Daten prüft, und mit der Simulation
begründen, welche Massnahme in einem Land am meisten bringt.

## Echte Daten statt Standardwerte

Bisher galten Werte für ein Land, das es nicht gibt. Jetzt werden die Werte zweier echter Länder
im südlichen Afrika eingesetzt:

- **Eswatini**, ein kleines Land zwischen Südafrika und Mosambik, hat einen der höchsten Anteile
  HIV-positiver Erwachsener der Welt. 2011 und 2016 wurde dort landesweit gemessen, wie viele sich
  neu anstecken. Dazwischen wurden Tests und Therapie stark ausgebaut.
- In **Südafrika** leben rund 7,8 Millionen Menschen mit HIV (2024) – fast so viele, wie die
  Schweiz Einwohnerinnen und Einwohner hat.

Ein **Parametersatz** enthält die gemessenen Werte eines Landes:

| | Eswatini 2011 | Eswatini 2016 | Südafrika 2024 |
|---|---|---|---|
| Erwachsene HIV-positiv | 32 % | 30 % | 17 % |
| davon wissen es | 62 % | 84 % | 95 % |
| davon wirksam behandelt | 56 % | 85 % | 78 % |
| Kondom | 32 % | 40 % | 32 % (2022) |
| **gemessene Neuansteckungen** pro 100 HIV-negative Erwachsene und Jahr | **2,48** | **1,30** | keine vergleichbare Messung |

Weil sich in einem Land mit vielen HIV-Positiven die Zahl der Neuansteckungen schnell ändert,
gilt hier eine neue **Masszahl**: **Neuansteckungen pro 100 HIV-negative Personen und Jahr.**
Ein Durchgang dauert 2 Jahre, und das Feld hat 1000 Personen, damit genug geschieht, um etwas
zu messen. Die Werte für Paarbildung, Dauer und Ansteckung bleiben wie in Etappe 1.

<div class="simulation" data-modell="hiv" data-ziel="hiv-laender" data-laender="eswatini-2011;eswatini-2016;suedafrika-2024" data-regler="kondom;test;therapie"></div>

<div class="messtabelle" data-id="hiv-laender" data-spalten="Parametersatz;Kondom (%);Test (pro Jahr);Therapie (%);Neuansteckungen pro 100 und Jahr" data-fest></div>

## Aufgabe 1 – Eswatini 2011

Laden Sie den Parametersatz **Eswatini 2011** und messen Sie **dreimal**.

Im Durchschnitt Ihrer Messungen stecken sich pro Jahr etwa
<span class="luecke" data-typ="groesse" data-toleranz="0.1" data-antwort="2,7" data-breite="4"></span>
von 100 HIV-negativen Personen an. Gemessen wurden in Eswatini 2,48.

Die Ansteckung von 0,75 % pro Woche ist so gewählt, dass das Modell Eswatini 2011 ungefähr trifft.
Ist das schon eine Validierung?

<span class="luecke" data-optionen="Ja, das Modell stimmt mit den Daten überein.;Nein, das Modell wurde an diese Daten angepasst." data-antwort="Nein, das Modell wurde an diese Daten angepasst."></span>

## Aufgabe 2 – Vorhersage für 2016

Bis 2016 wussten in Eswatini mehr Menschen von ihrer Infektion, mehr wurden wirksam behandelt,
und es wurden etwas häufiger Kondome benutzt. Laden Sie **Eswatini 2016**. Das Modell bleibt
dasselbe, nur die gemessenen Werte des Landes ändern sich. Messen Sie **dreimal**.

1. Das Modell sagt für 2016 etwa
   <span class="luecke" data-typ="groesse" data-toleranz="0.15" data-antwort="1,0" data-breite="4"></span>
   Neuansteckungen pro 100 und Jahr voraus. Gemessen wurden 1,30.
2. Das Modell sagt
   <span class="luecke" data-optionen="eine Zunahme;keine Veränderung;eine Abnahme" data-antwort="eine Abnahme"></span>
   voraus, und zwar eine
   <span class="luecke" data-optionen="zu kleine;zu grosse;genau richtige" data-antwort="zu grosse"></span>.

Was hat den Rückgang vor allem bewirkt? Laden Sie wieder **Eswatini 2011** und ändern Sie nur
**einen** Wert auf den Stand von 2016: zuerst die Therapie auf **85 %** (zweimal messen), dann
– nach erneutem Laden – das Kondom auf **40 %** (zweimal messen).

3. Den grösseren Teil des Rückgangs erklärt
   <span class="luecke" data-optionen="die Therapie;das Kondom" data-antwort="die Therapie"></span>.

Hat das Modell die Prüfung bestanden? Was könnte der Grund sein, dass es zu optimistisch ist?

<div class="antwort" data-zeilen="4" data-loesung="Zum Teil: Das Modell sagt eine Abnahme voraus, und die Grössenordnung stimmt (etwa 1,0 statt 1,30). Die Abnahme ist aber zu gross. Mögliche Gründe: Das Modell behandelt alle gleich. In Wirklichkeit waren gerade junge Menschen, bei denen sich viele neu anstecken, viel seltener wirksam behandelt als der Durchschnitt. Das Modell kennt auch kein Alter, keine Todesfälle, keine Menschen mit mehreren Partnern gleichzeitig und keine frisch Angesteckten, die besonders ansteckend sind."></div>

## Aufgabe 3 – Beratung für Südafrika

Sie beraten das Gesundheitsministerium Südafrikas. Laden Sie **Südafrika 2024** und messen Sie
zweimal. Probieren Sie dann je **eine** Massnahme aus (jeweils neu laden, zweimal messen):

- Therapie auf **95 %** – so viele der Diagnostizierten sind in der Schweiz wirksam behandelt
- Kondom auf **50 %**
- Test **1-mal pro Jahr**

**Achtung:** Für Südafrika gibt es keine vergleichbare Messung der Neuansteckungen. Die Vorhersage
lässt sich also nicht prüfen. Das Modell ist nur an Eswatini getestet.

Am meisten bringt
<span class="luecke" data-optionen="die Therapie 95 %;das Kondom 50 %;der Test 1-mal pro Jahr" data-antwort="die Therapie 95 %"></span>.

Formulieren Sie Ihre Empfehlung an das Ministerium in zwei bis drei Sätzen. Begründen Sie mit
Ihren Messwerten. Warum bringt mehr Testen in Südafrika so wenig?

<div class="antwort" data-zeilen="4" data-loesung="Empfehlung: Mehr Diagnostizierte wirksam behandeln. Mit 95 % statt 78 % sinken die Neuansteckungen im Modell von etwa 0,6 auf etwa 0,2 pro 100 und Jahr, also auf einen Drittel. Mehr Kondome (50 %) bringen etwas weniger, etwa 0,5. Mehr Tests bringen kaum etwas, weil schon 95 % der HIV-Positiven von ihrer Infektion wissen. Die Lücke liegt bei der Behandlung: Fast ein Viertel der Diagnostizierten ist nicht wirksam behandelt und kann weiter anstecken. Vorbehalt: Das Modell ist für Südafrika nicht geprüft."></div>

<div class="kasten" markdown="1">

**Und die Schweiz?** 2023 konnten in der Schweiz nach Schätzung des Bundesamts für Gesundheit
rund **2180 Personen** HIV übertragen – bei 8,8 Millionen Einwohnerinnen und Einwohnern. Auf
1000 Personen im Modell wäre das ein Viertel einer Person. Im Modell sähe man also nichts: Ein
Modell mit 1000 Personen kann eine so seltene Infektion nicht abbilden. Auch das gehört zum
Gegenstandsbereich eines Modells.

</div>

Weiter mit
[Das Wichtigste: Krankheitsübertragung]({{ '/lektionen/L6_Das_Wichtigste.html' | relative_url }}).
{: .nur-online}

<p class="quellen"><strong>Quellen:</strong>
<a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC8639055">Nkambule u. a.: HIV incidence, viremia, and the national response in Eswatini. PLoS One 16 (2021), e0260892</a> ·
<a href="https://www.unaids.org/en/regionscountries/countries/southafrica">UNAIDS: South Africa, Fact Sheet 2025</a> ·
<a href="https://hsrc.ac.za/news/phsb/sabssm-vi-an-evolving-epidemic-with-persistent-challenges/">HSRC: SABSSM VI (2022)</a> ·
<a href="https://so.ch/fileadmin/internet/ddi/ddi-gesa/PDF/Erkrankungen_und_Impfungen/Krankheiten/sexuell-uebertragene-infektionen-hepbc-2023.pdf">BAG-Bulletin 48/2024: HIV und STI in der Schweiz 2023</a></p>
