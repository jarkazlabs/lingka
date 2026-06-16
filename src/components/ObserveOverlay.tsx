import type { FieldObject, Relationship } from "../types/field";

interface ObserveOverlayProps {
  objects: FieldObject[];
  relationships: Relationship[];
}

export function ObserveOverlay({ objects, relationships }: ObserveOverlayProps) {
  const strongestRelationships = relationships.slice(0, 4);

  return (
    <svg className="observe-overlay" viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <filter id="breath-blur">
          <feGaussianBlur stdDeviation="0.08" />
        </filter>
      </defs>
      {objects.map((object) => {
        const radius = object.fieldRadius / 18;

        return (
          <g
            key={object.id}
            className={`observe-overlay__field observe-overlay__field--${object.type}`}
            filter="url(#breath-blur)"
          >
            <ellipse cx={object.x} cy={object.y} rx={radius * 1.18} ry={radius * 0.82} />
            <circle cx={object.x} cy={object.y} r={radius * 0.72} />
            <circle cx={object.x} cy={object.y} r={radius * 0.46} />
            <circle cx={object.x} cy={object.y} r={radius * 0.27} />
          </g>
        );
      })}
      {strongestRelationships.map((relationship) => {
        const from = objects.find((object) => object.id === relationship.fromId);
        const to = objects.find((object) => object.id === relationship.toId);

        if (!from || !to) {
          return null;
        }

        const controlX = (from.x + to.x) / 2 + (to.y - from.y) * 0.08;
        const controlY = (from.y + to.y) / 2 - (to.x - from.x) * 0.08;

        return (
          <path
            key={relationship.id}
            className={`observe-overlay__line observe-overlay__line--${relationship.kind}`}
            d={`M ${from.x} ${from.y} Q ${controlX} ${controlY} ${to.x} ${to.y}`}
            strokeWidth={0.1 + relationship.strength * 0.22}
          />
        );
      })}
    </svg>
  );
}
