import { useEffect, useMemo, useRef, useState } from "react";
import { getRelationships } from "../logic/relationships";
import { useFieldStore } from "../store/fieldStore";
import { FieldObject } from "./FieldObject";
import { LivingFieldLayer, type FieldRipple } from "./LivingFieldLayer";
import { ObserveOverlay } from "./ObserveOverlay";

export function FieldCanvas() {
  const fieldRef = useRef<HTMLDivElement>(null);
  const previousPositionsRef = useRef(new Map<string, { x: number; y: number }>());
  const lastRippleAtRef = useRef(new Map<string, number>());
  const [ripples, setRipples] = useState<FieldRipple[]>([]);
  const objects = useFieldStore((state) => state.objects);
  const observeMode = useFieldStore((state) => state.observeMode);
  const tickAging = useFieldStore((state) => state.tickAging);
  const relationships = useMemo(() => getRelationships(objects), [objects]);

  useEffect(() => {
    const intervalId = window.setInterval(() => tickAging(1), 1000);
    return () => window.clearInterval(intervalId);
  }, [tickAging]);

  useEffect(() => {
    const now = performance.now();
    const nextPositions = new Map<string, { x: number; y: number }>();
    const nextRipples: FieldRipple[] = [];

    objects.forEach((object) => {
      const previousPosition = previousPositionsRef.current.get(object.id);
      nextPositions.set(object.id, { x: object.x, y: object.y });

      if (!previousPosition) {
        return;
      }

      const movement = Math.hypot(object.x - previousPosition.x, object.y - previousPosition.y);
      const lastRippleAt = lastRippleAtRef.current.get(object.id) ?? 0;

      if (movement > 0.62 && now - lastRippleAt > 260) {
        lastRippleAtRef.current.set(object.id, now);
        nextRipples.push({
          id: `${object.id}-${Math.round(now)}`,
          x: object.x,
          y: object.y,
          type: object.type,
        });
      }
    });

    previousPositionsRef.current = nextPositions;

    if (nextRipples.length > 0) {
      setRipples((currentRipples) => [...currentRipples.slice(-10), ...nextRipples]);
    }
  }, [objects]);

  useEffect(() => {
    if (ripples.length === 0) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setRipples((currentRipples) => currentRipples.slice(1));
    }, 2400);

    return () => window.clearTimeout(timeoutId);
  }, [ripples]);

  return (
    <section className="field" ref={fieldRef} aria-label="Lingka field surface">
      <div className="field-paper" />
      <div className="field-grid" />
      <div className="field-mandala" aria-hidden="true" />
      <LivingFieldLayer objects={objects} relationships={relationships} ripples={ripples} />
      {observeMode ? (
        <ObserveOverlay objects={objects} relationships={relationships} />
      ) : null}
      {objects.map((object) => (
        <FieldObject key={object.id} object={object} fieldRef={fieldRef} />
      ))}
    </section>
  );
}
