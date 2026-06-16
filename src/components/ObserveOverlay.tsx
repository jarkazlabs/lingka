import type { FieldObject, Relationship } from "../types/field";

interface ObserveOverlayProps {
  objects: FieldObject[];
  relationships: Relationship[];
}

export function ObserveOverlay({ objects, relationships }: ObserveOverlayProps) {
  const strongestRelationships = relationships.slice(0, 4);

  return (
    <svg className="observe-overlay" viewBox="0 0 100 100" preserveAspectRatio="none">
      {objects.map((object) => (
        <circle
          key={object.id}
          className={`observe-overlay__field observe-overlay__field--${object.type}`}
          cx={object.x}
          cy={object.y}
          r={object.fieldRadius / 18}
        />
      ))}
      {strongestRelationships.map((relationship) => {
        const from = objects.find((object) => object.id === relationship.fromId);
        const to = objects.find((object) => object.id === relationship.toId);

        if (!from || !to) {
          return null;
        }

        return (
          <line
            key={relationship.id}
            className={`observe-overlay__line observe-overlay__line--${relationship.kind}`}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            strokeWidth={0.12 + relationship.strength * 0.24}
          />
        );
      })}
    </svg>
  );
}
