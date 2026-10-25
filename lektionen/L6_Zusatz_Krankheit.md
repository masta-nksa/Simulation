---
lektion: 6
zielgruppe: sus
art: zusatz
titel: "Zusatz: Eine andere Krankheit"
kurz: "Freiwillig: Was geschieht, wenn eine Krankheit ansteckender ist oder man sie früher bemerkt? Und was müsste man für eine Grippe ändern?"
reihenfolge: 60
drucken: false
---

# Zusatz: Eine andere Krankheit

**Ziel:** Sie können angeben, welche Teile des Modells für HIV typisch sind, und begründen, warum
dieselbe Massnahme bei einer anderen Krankheit anders wirkt.

Diese Etappe ist freiwillig.

Hier lassen sich zwei Werte verändern, die zur **Krankheit** gehören und nicht zum Verhalten der
Menschen: wie ansteckend sie ist und wann man sie bemerkt. Damit es schneller geht, dauert ein
Durchgang 10 statt 30 Jahre. Paarbildung, Kondom und Test bleiben auf den Standardwerten (5, 0 %,
0).

<div class="simulation" data-modell="hiv" data-ziel="hiv-krankheit" data-regler="ansteckung;symptome;dauer" data-werte="jahre=10" data-messen="ansteckung;symptome;dauer;positiv"></div>

<div class="messtabelle" data-id="hiv-krankheit" data-spalten="Ansteckung (% pro Woche);Symptome nach (Wochen);Dauer (Wochen);HIV-positiv nach 10 Jahren (%)" data-fest></div>

## Aufgabe 1 – Ansteckender

Messen Sie je zweimal mit einer Ansteckung von **0,75 %**, **5 %** und **50 %** pro Woche
(Symptome nach 520 Wochen, Dauer 50 Wochen). 50 % ist der Wert im ursprünglichen NetLogo-Modell.

Nach 10 Jahren sind bei 0,75 % etwa
<span class="luecke" data-typ="groesse" data-toleranz="0.2" data-antwort="9" data-breite="4"></span> %
HIV-positiv, bei 50 % etwa
<span class="luecke" data-typ="groesse" data-toleranz="0.1" data-antwort="80" data-breite="4"></span> %.

## Aufgabe 2 – Früher bemerken

Stellen Sie die Ansteckung auf **5 %** und messen Sie je zweimal mit Symptomen nach **520** und
nach **100** Wochen.

Was ändert sich, und warum? Denken Sie an die Regel 5 (Test).

<div class="antwort" data-zeilen="3" data-loesung="Mit Symptomen nach 100 Wochen sind nach 10 Jahren nur etwa 10 % HIV-positiv statt etwa 63 %. Wer nach zwei Jahren Symptome bekommt, lässt sich testen, wird behandelt und steckt danach niemanden mehr an. Bei HIV dauert es ohne Test etwa zehn Jahre – so lange kann man das Virus unbemerkt weitergeben. Das macht HIV so tückisch."></div>

## Aufgabe 3 – Kurze Beziehungen

Stellen Sie die Ansteckung auf **50 %** und die Symptome wieder auf 520 Wochen. Messen Sie je
zweimal mit einer Dauer von **5** und von **200** Wochen.

Bei einer sehr ansteckenden Krankheit führen viele kurze Beziehungen dazu, dass
<span class="luecke" data-optionen="fast niemand;etwa die Hälfte;alle" data-antwort="alle"></span>
angesteckt werden, lange Beziehungen dazu, dass es nach 10 Jahren nur etwa
<span class="luecke" data-typ="groesse" data-toleranz="0.15" data-antwort="13" data-breite="4"></span> % sind.

Erklären Sie: Warum genügt bei 50 % pro Woche eine kurze Beziehung, um anzustecken?

<div class="antwort" data-zeilen="2" data-loesung="Bei 50 % pro Woche steckt man sich in einer Beziehung von 5 Wochen fast sicher an (zu 97 %). Wer oft wechselt, gibt die Krankheit also schnell an viele weiter. Bei 0,75 % pro Woche ist das Risiko in 5 Wochen dagegen klein (knapp 4 %)."></div>

## Aufgabe 4 – Und eine Grippe?

Was müsste man am Modell ändern, damit es eine Grippe abbildet? Nennen Sie mindestens drei
Änderungen. Welche davon sind andere **Werte**, welche andere **Regeln**?

<div class="antwort" data-zeilen="4" data-loesung="Andere Regeln: Die Grippe wird bei jeder Begegnung übertragen (Tröpfchen), nicht nur in einer Partnerschaft. Man wird nach etwa einer Woche wieder gesund und ist danach eine Zeit lang geschützt – das kennt das HIV-Modell nicht. Andere Werte: Ein Zeitschritt wäre ein Tag statt einer Woche, die Ansteckung pro Begegnung wäre viel höher, und Symptome kämen nach ein bis drei Tagen statt nach zehn Jahren. Gleich bleibt die Methode: Akteure, Regeln, Parameter, Masszahl, Prüfung an Daten."></div>
