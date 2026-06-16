# Technische Architektur für Codex

## Empfohlener Stack

* Vite
* React
* TypeScript
* Web Audio API oder Tone.js
* Zustand für State Management
* Canvas oder SVG für Field-Visualisierung

Für den ersten MVP reicht SVG oder Canvas. Empfehlung: SVG für schnellere UI-Iteration, später Canvas/WebGL wenn nötig.

## Projektstruktur

```text
src/
  audio/
    audioEngine.ts
    objectAudioNodes.ts
    relationshipAudio.ts

  components/
    FieldCanvas.tsx
    FieldObject.tsx
    ObjectPanel.tsx
    Toolbar.tsx
    ObserveOverlay.tsx

  data/
    objectDefinitions.ts

  logic/
    fieldPhysics.ts
    relationships.ts
    aging.ts
    needs.ts

  store/
    fieldStore.ts

  types/
    field.ts

  styles/
    globals.css

  App.tsx
  main.tsx
```

## Zentrale Datentypen

```ts
export type FieldObjectType =
  | "noise"
  | "drone"
  | "filter"
  | "resonator"
  | "delay"
  | "tape"
  | "drift"
  | "random";

export type ObjectFamily =
  | "source"
  | "shaper"
  | "time"
  | "motion";

export type TraitName =
  | "calm"
  | "wild"
  | "ancient"
  | "dense"
  | "fragile";

export interface FieldObject {
  id: string;
  type: FieldObjectType;
  family: ObjectFamily;
  label: string;
  x: number;
  y: number;
  size: number;
  fieldRadius: number;
  age: number;
  active: boolean;
  traits: Record<TraitName, number>;
  needs: string[];
  likes: FieldObjectType[];
  avoids: FieldObjectType[];
}

export interface Relationship {
  id: string;
  fromId: string;
  toId: string;
  strength: number;
  distance: number;
  kind: "audio" | "modulation" | "behavior" | "hybrid";
  age: number;
}
```

## MVP-Funktionen

### Field Physics

Berechne pro Frame oder Intervall:

* Distanz zwischen Objekten
* Feldüberlappung
* Beziehungsstärke
* Beziehungstyp
* Aktivierungsstatus

Formel grob:

```ts
strength = 1 - distance / combinedFieldRadius
```

Wenn `strength > 0`, entsteht eine Beziehung.

## Beziehungstypen

Regeln:

* source + time = audio
* source + shaper = audio
* motion + anything = modulation
* random + anything = modulation/behavior
* time + motion = modulation
* memory später = behavior
* sonst hybrid

## Audio MVP

Starte pragmatisch.

Noise:

* Noise Buffer Source oder Worklet später
* Gain Node

Drone:

* OscillatorNode
* Gain Node

Filter:

* BiquadFilterNode

Delay:

* DelayNode + Feedback Gain

Tape:

* DelayNode + Filter + Saturation Approximation
* Wow/Flutter durch langsamen LFO

Drift:

* langsamer LFO / random walk

Random:

* Sample & Hold / random interval modulation

## UI MVP

* Vollbildfläche
* dunkler Hintergrund
* Toolbar links oder unten
* Objekte als runde/organische Nodes
* Dragging per Pointer Events
* Scroll/Pinch optional später
* Klick öffnet ObjectPanel
* Observe Mode Button

## Object Panel

Standard: Character View

Zeigt:

* Name
* Familie
* Traits als Balken
* Needs
* Likes
* Avoids
* Beziehungen

Technical View optional:

* Frequenz
* Gain
* Feedback
* Delay Time
* Filter Cutoff
* Modulation Amount

## Sound Safety

Wichtig:

* Master Limiter oder DynamicsCompressor einbauen
* Gain niedrig starten
* Feedback begrenzen
* AudioContext erst nach User-Klick starten
* Panic/Mute Button einbauen

## Erste Startszene

Beim Öffnen sind drei Objekte vorhanden:

* Drone
* Tape
* Drift

Sie liegen nah genug, dass sofort ein ruhiger Klangzustand entsteht.

Zusätzlich kann der Nutzer Noise, Resonator, Delay, Random und Filter hinzufügen.
