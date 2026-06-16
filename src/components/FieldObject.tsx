import { useFieldStore } from "../store/fieldStore";
import type { FieldObject as FieldObjectType } from "../types/field";

interface FieldObjectProps {
  object: FieldObjectType;
  fieldRef: React.RefObject<HTMLDivElement | null>;
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export function FieldObject({ object, fieldRef }: FieldObjectProps) {
  const moveObject = useFieldStore((state) => state.moveObject);

  const handlePointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    const field = fieldRef.current;
    if (!field) {
      return;
    }

    const fieldRect = field.getBoundingClientRect();
    const objectX = (object.x / 100) * fieldRect.width;
    const objectY = (object.y / 100) * fieldRect.height;
    const pointerOffset = {
      x: event.clientX - fieldRect.left - objectX,
      y: event.clientY - fieldRect.top - objectY,
    };

    const handlePointerMove = (pointerEvent: PointerEvent) => {
      const nextField = fieldRef.current;
      if (!nextField) {
        return;
      }

      const nextFieldRect = nextField.getBoundingClientRect();
      const nextX =
        ((pointerEvent.clientX - nextFieldRect.left - pointerOffset.x) /
          nextFieldRect.width) *
        100;
      const nextY =
        ((pointerEvent.clientY - nextFieldRect.top - pointerOffset.y) /
          nextFieldRect.height) *
        100;

      moveObject(object.id, clamp(nextX, 3, 97), clamp(nextY, 5, 95));
    };

    const handlePointerUp = () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);
  };

  return (
    <button
      className={`field-object field-object--${object.type}`}
      style={{
        left: `${object.x}%`,
        top: `${object.y}%`,
        width: object.size,
        height: object.size,
      }}
      type="button"
      onPointerDown={handlePointerDown}
    >
      <span className="field-object__aura" />
      <span className="field-object__presence" />
      <span className="field-object__core">
        <span className="field-object__sigil" />
      </span>
      <span className="field-object__label">{object.label}</span>
      <span className="field-object__age">{object.family}</span>
    </button>
  );
}
