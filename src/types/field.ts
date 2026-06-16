export type FieldObjectType = "drone" | "tape" | "drift";

export type ObjectFamily = "source" | "time" | "motion";

export type TraitName = "calm" | "wild" | "ancient" | "dense" | "fragile";

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
