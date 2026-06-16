# FIELD / Signal Garden – Browser MVP

## Kurzbeschreibung

FIELD ist ein feldbasiertes experimentelles Sound-Instrument im Browser. Es ist kein klassischer Modular-Synth mit Patchkabeln, sondern eine Klangumgebung, in der Objekte durch Nähe, Einflussfelder, Bedürfnisse und Alterung miteinander interagieren.

Der Nutzer komponiert nicht direkt. Er kultiviert Bedingungen, aus denen Klangzustände entstehen.

## Leitsatz

> Drop sound objects into a field and discover what emerges.

Oder:

> Du komponierst keine Klänge. Du erschaffst Bedingungen, aus denen Klänge entstehen.

## Grundprinzipien

1. Keine Patchkabel.
2. Keine klassischen Modul-Frontplatten.
3. Objekte erzeugen erst Klang, wenn sie Beziehungen eingehen.
4. Nähe erzeugt Einfluss.
5. Felder können Audio, Modulation oder Verhalten übertragen.
6. Objekte haben Bedürfnisse.
7. Objekte altern und verändern sich.
8. Observe Mode zeigt verborgene Beziehungen.
9. Standardansicht bleibt poetisch und reduziert.
10. Technische Parameter sind optional sichtbar.

## Ziel des MVP

Ein spielbarer Browser-Prototyp mit:

* dunkler abstrakter Field-Oberfläche
* 8 Klangobjekten
* Drag & Drop / Maussteuerung
* Feldüberlappungen
* einfacher Web-Audio-Engine
* Observe Mode
* Objektalterung
* einfachem Bedürfnis-System
* B-Ansicht als Standard: Eigenschaften statt technische Parameter
* A-Ansicht optional: technische Parameter

## Zielästhetik

Mischung aus:

* wissenschaftlichem Instrument
* alter Labortechnik
* Oszilloskop
* Sternenkarte
* elektromagnetischem Feld
* Boards-of-Canada-artiger Nostalgie
* Soma/Koma-artigem Experimentalgefühl

Nicht:

* VCV Rack
* Ableton
* Eurorack-Frontplatten
* Cyberpunk-Neon
* klassisches Plugin-UI

## Erste Objekte

### Sources

* Noise
* Drone

### Shapers

* Filter
* Resonator

### Time

* Delay
* Tape

### Motion

* Drift
* Random

## Eigenschaften

Jedes Objekt besitzt abstrakte Eigenschaften:

* Calm
* Wild
* Ancient
* Dense
* Fragile

Diese Werte beeinflussen intern technische Parameter.

Beispiel:

Tape:

* Ancient erhöht Wow/Flutter, Saturation, Noise
* Wild erhöht Instabilität
* Dense erhöht Feedback/Layering
* Fragile erhöht Dropouts

## Bedürfnisse

Objekte können Bedürfnisse haben.

Beispiele:

Noise:

* sucht Shaper oder Time
* mag Tape, Filter, Delay

Tape:

* braucht Sound
* mag Movement
* meidet zu viel Chaos

Resonator:

* braucht Sound
* mag Drone und Noise

Drift:

* braucht keine Audioquelle
* beeinflusst andere Objekte langsam

Memory:

* speichert Beziehungen und Zustände

## Interaktionsmodell

Der Nutzer kann:

* Objekte hinzufügen
* Objekte verschieben
* Objekte skalieren
* Objekte anklicken
* Observe Mode ein-/ausschalten
* zwischen Character View und Technical View wechseln

Skalierung bedeutet:

* größeres Objekt = lauter/stärker
* größeres Objekt = größeres Einflussfeld
* größeres Objekt dominiert das Ökosystem stärker

## Klanglogik

Wenn sich Felder überlappen:

* Audio kann fließen
* Modulation kann entstehen
* Verhalten kann beeinflusst werden

Die Engine entscheidet abhängig vom Objekttyp:

Noise + Delay:

* Noise wird in Delay gespeist

Drift + Tape:

* Drift moduliert Tape-Wow/Flutter

Random + Filter:

* Random moduliert Cutoff

Drone + Resonator:

* Resonator wird angeregt

Tape + Memory:

* spätere Discovery-Grundlage

## Observe Mode

Normalmodus:

* Objekte sichtbar
* dezente Felder
* keine technischen Linien

Observe Mode:

* Einflussfelder sichtbar
* stärkste Beziehungen sichtbar
* Bedürfnisse sichtbar
* Warnungen sichtbar, z. B. “Movement missing”
* Alter/Patina sichtbar

## Alterung

Objekte besitzen `age`.

Mit der Zeit:

* verändern sich Eigenschaften leicht
* Beziehungen werden stärker
* Patina/Artefakte erscheinen visuell
* Sound wird individueller

Beispiel:

Tape wird mit der Zeit:

* ancient
* instabiler
* wärmer
* verrauschter

## Discovery später

Nicht im MVP 0.1, aber vorbereiten.

Spätere entdeckbare Objekte:

* Ghost
* Archive
* Crystal
* Mist
* Echo

Diese entstehen nicht aus dem Menü, sondern aus langfristigen Beziehungen.
