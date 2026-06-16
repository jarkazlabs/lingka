import { useEffect, useMemo, useRef } from "react";
import { getRelationships } from "../logic/relationships";
import { useFieldStore } from "../store/fieldStore";
import { FieldObject } from "./FieldObject";
import { ObserveOverlay } from "./ObserveOverlay";

export function FieldCanvas() {
  const fieldRef = useRef<HTMLDivElement>(null);
  const objects = useFieldStore((state) => state.objects);
  const observeMode = useFieldStore((state) => state.observeMode);
  const tickAging = useFieldStore((state) => state.tickAging);
  const relationships = useMemo(() => getRelationships(objects), [objects]);

  useEffect(() => {
    const intervalId = window.setInterval(() => tickAging(1), 1000);
    return () => window.clearInterval(intervalId);
  }, [tickAging]);

  return (
    <section className="field" ref={fieldRef} aria-label="Lingka field surface">
      <div className="field-grid" />
      {observeMode ? (
        <ObserveOverlay objects={objects} relationships={relationships} />
      ) : null}
      {objects.map((object) => (
        <FieldObject key={object.id} object={object} fieldRef={fieldRef} />
      ))}
    </section>
  );
}
