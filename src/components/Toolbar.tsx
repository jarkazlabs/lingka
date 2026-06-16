import { useFieldStore } from "../store/fieldStore";

export function Toolbar() {
  const observeMode = useFieldStore((state) => state.observeMode);
  const toggleObserveMode = useFieldStore((state) => state.toggleObserveMode);

  return (
    <aside className="toolbar" aria-label="Field controls">
      <div>
        <p className="toolbar__eyebrow">Lingka</p>
        <h1 className="toolbar__title">Field</h1>
      </div>
      <button
        className="observe-toggle"
        type="button"
        aria-pressed={observeMode}
        onClick={toggleObserveMode}
      >
        <span className="observe-toggle__dot" />
        Observe
      </button>
    </aside>
  );
}
