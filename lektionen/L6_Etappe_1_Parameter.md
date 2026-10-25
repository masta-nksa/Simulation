---
lektion: 6
zielgruppe: sus
art: etappe
titel: "Etappe 1: Das Modell und seine Parameter"
kurz: "Die Regeln des HIV-Modells kennenlernen und untersuchen, wie stark Paarbildung, Dauer der Beziehung, Kondom und Test die Ausbreitung bremsen"
reihenfolge: 10
---

# Etappe 1: Das Modell und seine Parameter

**Ziel:** Sie können das HIV-Modell beschreiben und mit der Simulation untersuchen, wie die
einzelnen Parameter die Ausbreitung beeinflussen.

## HIV in Kürze

**HIV** (humanes Immunschwäche-Virus) schwächt die körpereigene Abwehr. Übertragen wird es vor
allem bei ungeschütztem Sex, daneben über gemeinsam benutzte Spritzen und von der Mutter auf das
Kind. Ohne Behandlung bricht nach durchschnittlich etwa zehn Jahren die Krankheit **Aids** aus.
Bis dahin merken viele nichts von ihrer Infektion – und können das Virus unbemerkt weitergeben.

Heute gibt es Medikamente, die das Virus im Körper unterdrücken. Wer **wirksam behandelt** ist,
steckt beim Sex niemanden mehr an. Das hielt die Eidgenössische Kommission für Aids-Fragen
schon 2008 fest («Swiss Statement»).

## Das Modell

Das Modell bildet nur einen Übertragungsweg ab: Sex in einer Partnerschaft.

| In der Wirklichkeit | Im Modell |
|---|---|
| eine Bevölkerung | 300 Personen auf einem Feld aus 25 × 25 Plätzen |
| Leute kennenlernen | Wer allein ist, geht pro Woche einen Schritt in zufälliger Richtung. |
| eine Partnerschaft | zwei Personen auf benachbarten Plätzen, durch einen Strich verbunden |
| Ansteckung beim Sex ohne Schutz | 0,75 % pro Woche, wenn das Gegenüber ansteckend ist |
| Infektion bemerken | durch einen Test oder nach etwa 10 Jahren durch Symptome |
| Behandlung | Wer von der Infektion erfährt, wird wirksam behandelt und steckt niemanden mehr an. |

Zu Beginn sind 2,5 % HIV-positiv (8 Personen), und keine davon weiss es. Ein Zeitschritt ist
eine Woche. In jeder Woche gelten fünf Regeln:

> 1. **Bewegen:** Wer allein ist, geht einen Schritt in zufälliger Richtung.
> 2. **Paarbildung:** Treffen sich zwei Freie auf benachbarten Plätzen, werden sie ein Paar,
>    wenn beide wollen.
> 3. **Trennung:** Ein Paar trennt sich, sobald es länger zusammen ist, als einer der beiden
>    bleiben will.
> 4. **Ansteckung:** Ein Kondom gibt es nur, wenn beide es wollen. Ohne Kondom steckt eine
>    ansteckende Person ihr Gegenüber mit 0,75 % pro Woche an.
> 5. **Test:** Wer sich testen lässt oder nach 10 Jahren Symptome bekommt, erfährt von der
>    Infektion und wird behandelt.

Vier **Parameter** lassen sich einstellen. Jede Person hat ihre eigene Neigung, die leicht um
den eingestellten Wert streut.

| Parameter | Bedeutung | Standardwert |
|---|---|---|
| Paarbildung | wie gern jemand eine Partnerschaft eingeht (0 = nie, 10 = bei jeder Begegnung) | 5 |
| Dauer einer Beziehung | wie lange jemand in einer Partnerschaft bleiben will | 50 Wochen |
| Kondom | in wie viel Prozent der Wochen ein Paar ein Kondom benutzt | 0 % |
| Test | wie oft sich eine Person pro Jahr testen lässt | 0 |

## Aufgabe 1 – Die Regeln verstehen

1. Zwei Personen werden ein Paar, wenn
   <span class="luecke" data-optionen="eine von beiden;beide" data-antwort="beide"></span> wollen.
2. Eine HIV-positive Person, die wirksam behandelt wird, steckt
   <span class="luecke" data-optionen="weiterhin;niemanden mehr" data-antwort="niemanden mehr"></span> an.
3. Wer nur allein umhergeht, kann sich im Modell
   <span class="luecke" data-optionen="anstecken;nicht anstecken" data-antwort="nicht anstecken"></span>.
4. Jemand lebt ein Jahr (52 Wochen) ohne Kondom mit einer ansteckenden Person zusammen. Wie gross
   ist die Wahrscheinlichkeit, dass er oder sie sich ansteckt?
   <span class="luecke" data-optionen="etwa 1 %;etwa 30 %;etwa 75 %;fast 100 %" data-antwort="etwa 30 %"></span>

## Aufgabe 2 – Zuschauen

Was erwarten Sie: Wie viele sind nach 30 Jahren HIV-positiv, wenn niemand etwas dagegen tut?

<span class="wahl" data-optionen="unter 10 %;etwa ein Drittel;über zwei Drittel"></span>

Klicken Sie auf **Start** und beobachten Sie das Feld und den Verlauf rechts. Mit dem Regler
«Tempo» geht es schneller. Die durchgezogene Linie zeigt den Anteil HIV-Positiver, die
gestrichelte den Anteil, der nichts von seiner Infektion weiss.

<div class="simulation" data-modell="hiv" data-ziel="hiv"></div>

Beschreiben Sie den Verlauf. Was fällt Ihnen an der gestrichelten Linie auf?

<div class="antwort" data-zeilen="3" data-loesung="Lange geschieht wenig, dann steigt der Anteil HIV-Positiver immer schneller: Je mehr angesteckt sind, desto mehr können weiter anstecken. Nach 30 Jahren ist etwa ein Drittel HIV-positiv, bei einzelnen Durchgängen zwischen 20 und 50 %. Zu Beginn weiss niemand von seiner Infektion – die gestrichelte Linie liegt auf der durchgezogenen. Erst wenn nach Jahren Symptome auftreten, erfahren die ersten davon. Am Ende weiss knapp die Hälfte der HIV-Positiven nichts von ihrer Infektion."></div>

## Aufgabe 3 – Je ein Parameter

Der Knopf **Messen** spielt einen ganzen Durchgang von 30 Jahren im Hintergrund durch und schreibt
das Ergebnis in die Tabelle.

Messen Sie **je zweimal**: zuerst mit den Standardwerten, dann mit je **einem** veränderten Wert.
Stellen Sie den Regler danach wieder auf den Standardwert zurück.

| Messung | Paarbildung | Dauer | Kondom | Test |
|---|---|---|---|---|
| Standard | 5 | 50 Wochen | 0 % | 0 |
| weniger Partnerschaften | **2** | 50 Wochen | 0 % | 0 |
| längere Beziehungen | 5 | **200 Wochen** | 0 % | 0 |
| Kondom in der Hälfte der Wochen | 5 | 50 Wochen | **50 %** | 0 |
| Test alle zwei Jahre | 5 | 50 Wochen | 0 % | **0,5** |

<div class="messtabelle" data-id="hiv" data-spalten="Paarbildung;Dauer (Wochen);Kondom (%);Test (pro Jahr);HIV-positiv nach 30 Jahren (%)" data-fest></div>

## Aufgabe 4 – Auswerten

1. Mit den Standardwerten sind nach 30 Jahren etwa
   <span class="luecke" data-typ="groesse" data-toleranz="0.15" data-antwort="35" data-breite="4"></span> % HIV-positiv.
2. Am stärksten bremst
   <span class="luecke" data-optionen="die Paarbildung 2;die Dauer 200 Wochen;das Kondom 50 %;der Test 0,5 pro Jahr" data-antwort="der Test 0,5 pro Jahr"></span>.
3. Zwei Messungen mit den Standardwerten unterscheiden sich oft stark, weil
   <span class="luecke" data-optionen="die Seite falsch rechnet;der Zufall mitspielt;sich die Parameter ändern" data-antwort="der Zufall mitspielt"></span>.

Warum bremst der Test so stark? Denken Sie an die Regeln des Modells.

<div class="antwort" data-zeilen="3" data-loesung="Ohne Test erfährt man erst nach etwa zehn Jahren von der Infektion, wenn Symptome auftreten. Bis dahin steckt man unbemerkt an. Mit einem Test alle zwei Jahre erfahren die meisten schon nach kurzer Zeit davon – und im Modell wird jede Person, die es weiss, wirksam behandelt und steckt niemanden mehr an. Das ist eine Annahme des Modells: In Wirklichkeit wird nicht jede diagnostizierte Person sofort wirksam behandelt."></div>

Warum bremsen auch längere Beziehungen?

<div class="antwort" data-zeilen="2" data-loesung="Wer lange mit derselben Person zusammen ist, hat weniger verschiedene Partner (in 30 Jahren etwa 6 statt 18). Ist der Partner HIV-negativ, kann man sich nicht anstecken, und das Virus kommt langsamer von Paar zu Paar."></div>

<details class="regeln" markdown="1">
<summary>Die Regeln des Modells als Programmcode</summary>

So arbeitet das Programm in jeder Woche (Python, vereinfacht):

```python
for person in alle_allein:                       # 1. Bewegen
    person.gehe_einen_schritt(zufaellige_richtung())

for a, b in begegnungen_von_freien():            # 2. Paarbildung
    if random.random() < a.paarbildung / 10 and random.random() < b.paarbildung / 10:
        bilde_paar(a, b)

for paar in alle_paare:                          # 3. Trennung
    if paar.wochen > min(paar.a.dauer, paar.b.dauer):
        trenne(paar)

for paar in alle_paare:                          # 4. Ansteckung
    kondom = random.random() < min(paar.a.kondom, paar.b.kondom)
    if not kondom and ansteckend(paar.a) and not paar.b.hiv:
        if random.random() < 0.0075:             # 0,75 % pro Woche
            paar.b.hiv = True                    # (und umgekehrt für b → a)

for person in alle_hiv_positiven:                # 5. Test
    if random.random() < person.test / 52 or person.symptome():
        person.weiss = True
        person.behandelt = True                  # steckt nicht mehr an
```

</details>

## Hintergrund

Das Modell beruht auf dem Modell «HIV», das Uri Wilensky 1997 für die Programmierumgebung
NetLogo geschrieben hat. Dort steckt eine Person ihr Gegenüber ohne Kondom mit **50 %** pro
Woche an – das ist sehr viel zu hoch. Die Simulation auf dieser Seite rechnet mit einem Wert,
der zu echten Daten passt. Woher er kommt, sehen Sie in Etappe 2.

Weiter mit
[Etappe 2: Zwei Länder]({{ '/lektionen/L6_Etappe_2_Laender.html' | relative_url }}).
{: .nur-online}

<p class="quellen"><strong>Quellen:</strong>
<a href="https://ccl.northwestern.edu/netlogo/models/HIV">Uri Wilensky: NetLogo HIV model (1997), CC BY-NC-SA 3.0</a> ·
<a href="https://www.aidsmap.com/news/jan-2008/swiss-experts-say-individuals-undetectable-viral-load-and-no-sti-cannot-transmit-hiv">aidsmap: Swiss Statement (2008)</a> ·
<a href="https://www.cdc.gov/hiv/risk/estimates/riskbehaviors.html">CDC: HIV Risk Behaviors</a></p>
