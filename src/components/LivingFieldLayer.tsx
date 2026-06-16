import type { CSSProperties } from "react";
import type { FieldObject, FieldObjectType, Relationship } from "../types/field";

export interface FieldRipple {
  id: string;
  x: number;
  y: number;
  type: FieldObjectType;
}

interface LivingFieldLayerProps {
  objects: FieldObject[];
  relationships: Relationship[];
  ripples: FieldRipple[];
}

const pollen = Array.from({ length: 26 }, (_, index) => ({
  id: index,
  x: (13 + index * 29) % 94,
  y: (19 + index * 37) % 88,
  size: 1.5 + (index % 5) * 0.34,
  duration: 18 + (index % 7) * 3,
  delay: -(index % 11) * 1.9,
}));

const nearestObjectInfluence = (x: number, y: number, objects: FieldObject[]) =>
  objects.reduce(
    (nearest, object) => {
      const distance = Math.hypot(object.x - x, object.y - y);
      const radius = object.fieldRadius / 12;
      const strength = Math.max(0, 1 - distance / radius);

      return strength > nearest.strength
        ? { strength, type: object.type, dx: object.x - x, dy: object.y - y }
        : nearest;
    },
    { strength: 0, type: "drone" as FieldObjectType, dx: 0, dy: 0 },
  );

export function LivingFieldLayer({ objects, relationships, ripples }: LivingFieldLayerProps) {
  const strongestRelationship = relationships[0];

  return (
    <div className="living-field-layer" aria-hidden="true">
      {relationships.slice(0, 5).map((relationship) => {
        const from = objects.find((object) => object.id === relationship.fromId);
        const to = objects.find((object) => object.id === relationship.toId);

        if (!from || !to) {
          return null;
        }

        const x = (from.x + to.x) / 2;
        const y = (from.y + to.y) / 2;
        const width = Math.max(12, relationship.distance * (1.15 + relationship.strength * 0.38));
        const height = Math.max(8, width * (0.32 + relationship.strength * 0.22));
        const angle = Math.atan2(to.y - from.y, to.x - from.x) * (180 / Math.PI);
        const isStrongest = strongestRelationship?.id === relationship.id;

        return (
          <span
            className={`field-distortion ${isStrongest ? "field-distortion--strongest" : ""}`}
            key={relationship.id}
            style={
              {
                "--distortion-x": `${x}%`,
                "--distortion-y": `${y}%`,
                "--distortion-width": `${width}%`,
                "--distortion-height": `${height}%`,
                "--distortion-angle": `${angle}deg`,
                "--distortion-strength": relationship.strength,
              } as CSSProperties
            }
          />
        );
      })}

      {ripples.map((ripple) => (
        <span
          className={`movement-ripple movement-ripple--${ripple.type}`}
          key={ripple.id}
          style={
            {
              "--ripple-x": `${ripple.x}%`,
              "--ripple-y": `${ripple.y}%`,
            } as CSSProperties
          }
        />
      ))}

      <div className="field-pollen">
        {pollen.map((particle) => {
          const influence = nearestObjectInfluence(particle.x, particle.y, objects);

          return (
            <span
              className={`field-pollen__particle field-pollen__particle--${influence.type}`}
              key={particle.id}
              style={
                {
                  "--pollen-x": `${particle.x}%`,
                  "--pollen-y": `${particle.y}%`,
                  "--pollen-size": `${particle.size}px`,
                  "--pollen-duration": `${particle.duration}s`,
                  "--pollen-delay": `${particle.delay}s`,
                  "--pollen-drift-x": `${influence.dx * influence.strength * 0.24}px`,
                  "--pollen-drift-y": `${influence.dy * influence.strength * 0.24}px`,
                  "--pollen-presence": influence.strength,
                } as CSSProperties
              }
            />
          );
        })}
      </div>
    </div>
  );
}
