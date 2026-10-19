---
lektion: 3
titel: "Lösung: Stau – modellieren und simulieren"
kurz: "Lösungen zu den Etappen 1 bis 3 und zur Zusatz-Etappe"
reihenfolge: 10
---

# Lösung: Stau – modellieren und simulieren

## Etappe 1 – Was gehört ins Modell?

**Aufgabe 1**

| Eigenschaft | Einschätzung |
|---|---|
| Abstand zum Auto davor | massgeblich |
| Farbe und Marke des Autos | vernachlässigbar |
| aktuelles Tempo | massgeblich |
| erlaubtes Höchsttempo | massgeblich |
| Musik im Autoradio | vernachlässigbar |
| Unaufmerksamkeit der Fahrerinnen und Fahrer | massgeblich |
| Anzahl Autos auf der Strasse | massgeblich |

*Regeln in eigenen Worten:* beschleunigen, wenn es geht; bremsen, wenn der Abstand zu klein
wird; ab und zu grundlos langsamer werden; so weit fahren, wie das Tempo erlaubt. Andere
Formulierungen sind ebenso richtig, wenn sie diese Punkte treffen.

**Aufgabe 2**

1. 3 · 7,5 m = **22,5** m pro Sekunde; 22,5 · 3,6 = **81** km/h
2. 1000 m : 7,5 m ≈ **133** Autos

**Aufgabe 3**

1. konzeptuelles Modell
2. funktionales Modell
3. konzeptuelles Modell

## Etappe 2 – Regeln von Hand

**Aufgabe 1.** Die erste Runde beginnt mit fünf Autos (Tempo 2, 1, 0, 0, 4). Ohne Trödeln
ergibt sich:

| Auto | Tempo bisher | Lücke | nach Regel 1 | nach Regel 2 |
|---|---|---|---|---|
| 1 | 2 | 2 | 3 | 2 |
| 2 | 1 | 1 | 2 | 1 |
| 3 | 0 | 0 | 1 | 0 |
| 4 | 0 | 5 | 1 | 1 |
| 5 | 4 | 7 | 5 | 5 |

Zeigt der Würfel 1 oder 2, sinkt das Tempo nach Regel 3 um 1 (ausser es ist schon 0). Die
zweite Runde hängt vom Würfel ab.

**Aufgabe 2**

- Tempo 3, Lücke 1, trödelt nicht: 3 → 4 (Regel 1) → **1** (Regel 2)
- Tempo 0, Lücke 4, trödelt: 0 → 1 (Regel 1) → 1 (Regel 2) → **0** (Regel 3)
- Für die Staus ist das **Trödeln** verantwortlich: Bremst ein Auto grundlos, muss das nächste
  ebenfalls bremsen, und die Störung wächst nach hinten.

## Etappe 3 – Parameter verändern

**Aufgabe 2**

- a) Bei 10 Autos fahren alle frei. Ab etwa 15 bis 20 Autos entstehen Staus; je mehr Autos,
  desto mehr stehen.
- b) Mit Höchsttempo 2 fahren alle langsamer, aber gleichmässiger; es stehen weniger Autos.
- c) Ohne Trödeln entstehen keine neuen Staus. Die Staus vom Anfang lösen sich meist nach
  wenigen Sekunden auf; manchmal bleibt ein kleiner Stau bestehen und wandert endlos
  rückwärts (20 Autos sind für Höchsttempo 5 knapp zu viele). Je mehr getrödelt wird, desto
  häufiger und grösser sind die Staus.
- Der Stau wandert **gegen die Fahrtrichtung**.

**Aufgabe 3.** Hier gibt es keine richtige Antwort. Solange nicht festgelegt ist, was «gut
fliessen» heisst, lässt sich die Frage nicht entscheiden – das ist das Thema von Lektion 4.

## Zusatz – Träges Anfahren

- Mit trägem Anfahren werden die Staus **länger und zäher**: Vorne fahren die Autos nur
  zögernd weg, hinten laufen weiter Autos auf.
- Die Erweiterung lohnt sich, wenn das Modell damit etwas erklärt oder genauer vorhersagt, was
  es vorher nicht konnte. Sonst ist das einfachere Modell vorzuziehen (Ockhams Rasiermesser).
