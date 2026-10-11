---
lektion: 3
zielgruppe: sus
art: etappe
titel: "Etappe 2: Regeln von Hand"
kurz: "Die vier Regeln des Verkehrsmodells Schritt für Schritt selbst anwenden – die Seite würfelt und kontrolliert"
reihenfolge: 20
---

# Etappe 2: Regeln von Hand

**Ziel:** Sie können die vier Regeln des Nagel-Schreckenberg-Modells auf jedes Auto anwenden.

## Die vier Regeln

In jedem Zeitschritt gelten für **alle Autos gleichzeitig** diese Regeln, in dieser
Reihenfolge:

| Regel | Was geschieht |
|---|---|
| **1. Beschleunigen** | Ist das Tempo kleiner als das Höchsttempo, steigt es um 1. |
| **2. Bremsen** | Ist das Tempo grösser als die Lücke zum Auto davor, sinkt es auf die Grösse der Lücke. |
| **3. Trödeln** | Mit einer festen Wahrscheinlichkeit sinkt das Tempo um 1 (aber nicht unter 0). |
| **4. Fahren** | Jedes Auto rückt um sein Tempo vor. |

Die **Lücke** ist die Anzahl freier Zellen bis zum nächsten Auto. Das Höchsttempo ist hier 5.

## Aufgabe 1 – Zwei Runden von Hand

Die Strasse hat 20 Zellen und ist ein Ring: Wer rechts hinausfährt, kommt links wieder
herein. Jede Ziffer ist ein Auto und zeigt sein Tempo. Gefahren wird nach rechts.

Tragen Sie für das markierte Auto das Tempo nach den Regeln 1, 2 und 3 ein. Fürs Trödeln
würfelt die Seite: Bei 1 oder 2 trödelt das Auto. Spielen Sie zwei Runden.

<div class="simulation" data-modell="stau-regeln"></div>

## Aufgabe 2 – Sicher?

Ein Auto fährt mit Tempo 3. Die Lücke zum Auto davor beträgt 1 Zelle. Es trödelt nicht. Wie
gross ist sein neues Tempo?

- [ ] 4
- [ ] 3
- [ ] 1
- [ ] 0
{: .mc .kurz data-antwort="3"}

Ein Auto steht (Tempo 0). Vor ihm sind 4 Zellen frei. Es trödelt. Wie gross ist sein neues
Tempo?

- [ ] 0
- [ ] 1
- [ ] 2
- [ ] 4
{: .mc .kurz data-antwort="1"}

Ein Auto bremst nur, wenn die Lücke zu klein ist – und trotzdem entstehen in diesem Modell
Staus. Welche Regel ist dafür verantwortlich? Was vermuten Sie?

<div class="antwort" data-zeilen="2" data-loesung="Das Trödeln (Regel 3). Bremst ein Auto bei dichtem Verkehr grundlos ab, muss das Auto dahinter ebenfalls bremsen, das nächste noch stärker – die Störung wandert nach hinten und wächst zum Stau. Ob das stimmt, prüfen Sie in Etappe 3."></div>

Weiter mit
[Etappe 3: Parameter verändern]({{ '/lektionen/L3_Etappe_3_Parameter.html' | relative_url }}).
{: .nur-online}
