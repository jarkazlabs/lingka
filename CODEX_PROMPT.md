# CODEX PROMPT – Startauftrag

Baue einen Browser-MVP für ein experimentelles feldbasiertes Sound-Instrument namens FIELD.

Wichtig: Es soll kein klassischer Modular-Synth, kein VCV-Rack-Klon und keine Plugin-UI werden. Keine Patchkabel. Keine Modul-Frontplatten.

Die Grundidee:

Der Nutzer zieht Klangobjekte auf eine dunkle abstrakte Fläche. Jedes Objekt besitzt ein Einflussfeld. Wenn sich Felder überlappen, entstehen Beziehungen. Diese Beziehungen können Audio, Modulation oder Verhalten erzeugen. Objekte schlafen zunächst und werden erst durch Nähe zu anderen Objekten aktiv.

Baue den MVP mit:

* Vite
* React
* TypeScript
* Web Audio API oder Tone.js
* Zustand für State Management
* SVG oder Canvas für die Field-UI

Erstelle folgende Features:

1. Vollbild-Field-Oberfläche mit dunkler, wissenschaftlich-abstrakter Ästhetik.
2. Toolbar zum Hinzufügen von Objekten.
3. Acht Objekttypen:

   * Noise
   * Drone
   * Filter
   * Resonator
   * Delay
   * Tape
   * Drift
   * Random
4. Objekte sind frei per Maus/Trackpad verschiebbar.
5. Jedes Objekt hat:

   * Position
   * Größe
   * Feldradius
   * Alter
   * Aktivstatus
   * Traits: Calm, Wild, Ancient, Dense, Fragile
   * Needs, Likes, Avoids
6. Nähe erzeugt Beziehungen.
7. Beziehungen haben:

   * Stärke
   * Typ: audio, modulation, behavior oder hybrid
   * Alter
8. Observe Mode:

   * zeigt Einflussfelder
   * zeigt stärkste Beziehungen als Linien
   * zeigt Hinweise wie “Needs movement” oder “Sound missing”
9. Object Panel:

   * Standardansicht: Character View mit Traits, Needs, Likes, Beziehungen
   * Umschaltbar auf Technical View
10. Audio:

* einfacher Drone-Oszillator
* Noise-Generator
* Delay
* Filter
* Tape-artige Instabilität
* Drift/Random modulieren Parameter

11. Master-Safety:

* niedrige Grundlautstärke
* Limiter/Compressor
* Panic/Mute Button
* AudioContext startet erst nach User-Interaktion

Startszene:

Beim Laden sollen bereits drei Objekte vorhanden sein:

* Drone
* Tape
* Drift

Sie sollen nah genug liegen, dass ein ruhiger, bewegter Ambient-Klang entsteht.

Designrichtung:

Mischung aus:

* altem wissenschaftlichem Instrument
* Oszilloskop
* Sternenkarte
* elektromagnetischem Feld
* Boards-of-Canada-artiger Nostalgie
* Soma/Koma-artigem Experimentalgefühl

Nicht:

* Neon-Cyberpunk
* Ableton
* Eurorack
* VCV Rack
* technisches Plugin-Layout

Bitte zuerst saubere Projektstruktur anlegen, danach die Field-Interaktion bauen, danach die einfache Audio-Engine integrieren.
