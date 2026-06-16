import { FieldCanvas } from "./components/FieldCanvas";
import { Toolbar } from "./components/Toolbar";
import { useFieldStore } from "./store/fieldStore";

export default function App() {
  const objects = useFieldStore((state) => state.objects);
  const oldestObject = objects.reduce((oldest, object) =>
    object.age > oldest.age ? object : oldest,
  );

  return (
    <main className="app-shell">
      <aside className="side-panel side-panel--left" aria-label="Lingka objects">
        <div className="brand-mark" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="brand-block">
          <p className="brand-block__name">Lingka</p>
          <p className="brand-block__subtitle">A sound garden</p>
        </div>
        <div className="panel-section">
          <p className="panel-heading">Objekte</p>
          <div className="object-list">
            {objects.map((object) => (
              <div className="object-row" key={object.id}>
                <span className={`object-row__sigil object-row__sigil--${object.type}`} />
                <span>
                  <strong>{object.label}</strong>
                  <small>{object.family} · Alter {Math.floor(object.age)}s</small>
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="panel-section">
          <p className="panel-heading">Entdeckungen</p>
          <div className="discovery-grid" aria-hidden="true">
            {Array.from({ length: 9 }, (_, index) => (
              <span key={index} />
            ))}
          </div>
        </div>
      </aside>
      <FieldCanvas />
      <aside className="side-panel side-panel--right" aria-label="Field information">
        <div className="panel-section">
          <p className="panel-heading">Feld-Information</p>
          <p className="panel-copy">
            Objekte beeinflussen sich durch Entfernung, Alter und Feldstärke.
          </p>
          <div className="influence-legend">
            <span><i className="influence-legend__line influence-legend__line--strong" />Starker Einfluss</span>
            <span><i className="influence-legend__line influence-legend__line--medium" />Mittlerer Einfluss</span>
            <span><i className="influence-legend__line influence-legend__line--soft" />Schwacher Einfluss</span>
          </div>
        </div>
        <div className="panel-section">
          <p className="panel-heading">Aktiver Knoten</p>
          <div className="detail-object">
            <span className={`object-row__sigil object-row__sigil--${oldestObject.type}`} />
            <span>
              <strong>{oldestObject.label}</strong>
              <small>{oldestObject.family}</small>
            </span>
          </div>
          <dl className="field-metrics">
            <div><dt>Feldradius</dt><dd>{oldestObject.fieldRadius}px</dd></div>
            <div><dt>Dichte</dt><dd>{oldestObject.traits.dense.toFixed(2)}</dd></div>
            <div><dt>Resonanz</dt><dd>{oldestObject.traits.calm.toFixed(2)}</dd></div>
            <div><dt>Zustand</dt><dd>Stabil</dd></div>
          </dl>
        </div>
      </aside>
      <Toolbar />
      <div className="garden-timeline" aria-label="Garden timeline">
        <span>Garten-Zeitachse</span>
        <div className="timeline-thread">
          {objects.map((object) => (
            <i
              key={object.id}
              className={`timeline-thread__node timeline-thread__node--${object.type}`}
              style={{ left: `${18 + object.x * 0.64}%` }}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
