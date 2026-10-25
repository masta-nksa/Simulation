---
lektion: 6
zielgruppe: sus
art: zusatz
titel: "Zusatz: Testen allein genügt nicht"
kurz: "Freiwillig: Wie hängt die Wirkung des Tests von der Therapie ab? Zwei Parameter, die sich gegenseitig beeinflussen"
reihenfolge: 65
drucken: false
---

# Zusatz: Testen allein genügt nicht

**Ziel:** Sie können an einem Beispiel erklären, was es heisst, dass sich zwei Parameter
gegenseitig beeinflussen.

Diese Etappe ist freiwillig.

In Etappe 1 bremste der Test die Ausbreitung am stärksten. Dort wurde aber jede Person, die von
ihrer Infektion erfuhr, wirksam behandelt. Hier lässt sich auch die **Therapie** einstellen:
welcher Anteil der Diagnostizierten wirksam behandelt wird und niemanden mehr ansteckt. Alle
anderen Werte sind die Standardwerte aus Etappe 1, ein Durchgang dauert 30 Jahre.

<div class="simulation" data-modell="hiv" data-ziel="hiv-testen" data-regler="test;therapie" data-messen="test;therapie;positiv"></div>

<div class="messtabelle" data-id="hiv-testen" data-spalten="Test (pro Jahr);Therapie (%);HIV-positiv nach 30 Jahren (%)" data-fest></div>

## Aufgabe 1 – Test mit und ohne Therapie

Messen Sie je zweimal:

| Messung | Test | Therapie |
|---|---|---|
| A | 0,5 pro Jahr | 100 % |
| B | 0,5 pro Jahr | 50 % |
| C | 0,5 pro Jahr | 0 % |
| D | 0 | 0 % |

1. Mit Test und voller Therapie (A) sind nach 30 Jahren etwa
   <span class="luecke" data-typ="groesse" data-toleranz="0.2" data-antwort="4" data-breite="4"></span> % HIV-positiv.
2. Ohne Therapie (C) sind es etwa
   <span class="luecke" data-typ="groesse" data-toleranz="0.1" data-antwort="79" data-breite="4"></span> % –
   <span class="luecke" data-optionen="viel weniger als;etwa gleich viel wie;viel mehr als" data-antwort="etwa gleich viel wie"></span>
   ganz ohne Test (D).

## Aufgabe 2 – Gegenseitig beeinflussen

Ergänzen Sie den Satz: Wie stark der Test wirkt, hängt davon ab, …

<div class="antwort" data-zeilen="3" data-loesung="… wie viele der Diagnostizierten wirksam behandelt werden. Im Modell ändert das Wissen um die Infektion allein nichts am Verhalten. Erst die Therapie verhindert, dass jemand weiter ansteckt. Ohne Therapie bringt der Test nichts, mit voller Therapie bremst er die Ausbreitung fast ganz. Die beiden Parameter wirken also nur zusammen."></div>

Im Modell ändert sich nichts, wenn jemand von seiner Infektion erfährt, aber nicht behandelt
wird. Ist das realistisch? Was könnte sich in Wirklichkeit ändern?

<div class="antwort" data-zeilen="3" data-loesung="Nicht ganz. Wer von seiner Infektion weiss, kann seine Partnerin oder seinen Partner informieren und häufiger ein Kondom benutzen – auch ohne Therapie. Andere ändern ihr Verhalten nicht. Das Modell nimmt den ungünstigsten Fall an. Man könnte es erweitern: Wer es weiss, benutzt häufiger ein Kondom."></div>
