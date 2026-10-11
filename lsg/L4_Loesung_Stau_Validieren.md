---
lektion: 4
titel: "Lösung: Stau – validieren"
kurz: "Lösungen zu Etappe 1, Etappe 2 und zur Zusatz-Etappe"
reihenfolge: 10
---

# Lösung: Stau – validieren

## Etappe 1 – Den Verkehrsfluss messen

**Aufgabe 2 – Messreihe.** Ihre Werte weichen ab, weil der Zufall mitspielt. Typische Werte
mit Höchsttempo 5 und Trödeln 25 %:

| Autos | Dichte (Fz/km) | Fluss (Fz/h), etwa | Tempo (km/h), etwa |
|---|---|---|---|
| 5 | 7 | 850 | 128 |
| 10 | 13 | 1700 | 127 |
| 15 | 20 | 1900 | 94 |
| 20 | 27 | 1700 | 64 |
| 30 | 40 | 1550 | 39 |
| 40 | 53 | 1400 | 26 |
| 60 | 80 | 950 | 12 |
| 80 | 107 | 500 | 5 |

**Aufgabe 3 – Auswerten**

1. Der grösste Fluss liegt bei etwa 13 bis 20 Fz/km und beträgt rund 1700 bis 2000 Fz/h.
2. Links vom Maximum: mehr Autos, **mehr Fluss**. Rechts davon: mehr Autos, **weniger Fluss**.

*Warum der Fluss abnimmt:* Bei hoher Dichte sind die Lücken klein, die Autos bremsen ständig,
und jedes Trödeln löst einen Stau aus. Das Tempo sinkt stärker, als die Zahl der Autos steigt.

*Warum zwei Messungen verschieden ausfallen:* Startpositionen und Trödeln sind zufällig
(stochastische Parameter). Man misst deshalb mehrmals und vergleicht die Mittelwerte.

**Aufgabe 4 – Tempo 80.** Der Fluss ist **etwa gleich gross** (rund 1550 Fz/h). Bei dichtem
Verkehr bestimmt der Abstand den Fluss, nicht das Höchsttempo.

## Etappe 2 – Abgleich mit der Wirklichkeit

**Aufgabe 1.** Dreimal **ja**. Der Abstandshalter entspricht einer tieferen
Trödelwahrscheinlichkeit.

**Aufgabe 2.** Im Modell liegt der grösste Fluss bei einem mittleren Tempo von etwa 95 bis
125 km/h, in der Wirklichkeit bei etwa 85 km/h. Richtig ist die zweite Antwort: Der Verlauf
stimmt, die Zahlen stimmen nicht genau.

**Aufgabe 3.** Nicht abgebildet sind **Spurwechsel**, **Auffahrten und Ausfahrten**,
**Lastwagen und Autos** (alle Fahrzeuge sind gleich) sowie **Steigungen und Kurven**.
Sicherheitsabstand (Regel 2), Unaufmerksamkeit (Regel 3) und Reaktionszeit (ein Zeitschritt
von einer Sekunde) sind enthalten.

Unbrauchbar ist das Modell deshalb nicht: Für die Frage, wie ein Stau ohne Hindernis entsteht,
genügt es. Für andere Fragen muss es erweitert werden.

**Aufgabe 4**

1. zu wenige Durchgänge
2. Fehler in der Umsetzung
3. ausserhalb des Geltungsbereichs
4. Augenschein statt Masszahl
5. ungeeignete Vergleichsdaten – ebenso richtig: ausserhalb des Geltungsbereichs

## Zusatz – Ein erweitertes Verkehrsmodell

**Aufgabe 1.** Mit wachsendem Zufluss finden die einfahrenden Fahrzeuge keine Lücke mehr; auf
der Hauptfahrbahn wird gebremst, und der Stau beginnt bei der Auffahrt und wächst nach hinten.

**Aufgabe 2.** Die erweiterte Simulation hat deutlich mehr Parameter (Zuflüsse, Anteil
Lastwagen, Wunschtempo, Zeitlücke, Beschleunigung, Verhalten beim Spurwechsel). Parameter
können sich gegenseitig beeinflussen; alle Kombinationen zu untersuchen wird rasch unmöglich.

**Aufgabe 3**

1. das einfache
2. das erweiterte
3. das erweiterte
