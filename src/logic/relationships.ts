import type { FieldObject, Relationship } from "../types/field";

const relationshipKind = (
  from: FieldObject,
  to: FieldObject,
): Relationship["kind"] => {
  if (from.family === "motion" || to.family === "motion") {
    return "modulation";
  }

  if (
    (from.family === "source" && to.family === "time") ||
    (from.family === "time" && to.family === "source")
  ) {
    return "audio";
  }

  return "hybrid";
};

export const getRelationships = (objects: FieldObject[]): Relationship[] => {
  const relationships: Relationship[] = [];

  for (let index = 0; index < objects.length; index += 1) {
    for (let nextIndex = index + 1; nextIndex < objects.length; nextIndex += 1) {
      const from = objects[index];
      const to = objects[nextIndex];
      const dx = to.x - from.x;
      const dy = to.y - from.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const combinedFieldRadius = from.fieldRadius + to.fieldRadius;
      const strength = Math.max(0, 1 - distance / combinedFieldRadius);

      if (strength > 0) {
        relationships.push({
          id: `${from.id}-${to.id}`,
          fromId: from.id,
          toId: to.id,
          strength,
          distance,
          kind: relationshipKind(from, to),
          age: Math.min(from.age, to.age),
        });
      }
    }
  }

  return relationships.sort((a, b) => b.strength - a.strength);
};
