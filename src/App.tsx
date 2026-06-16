import { FieldCanvas } from "./components/FieldCanvas";
import { Toolbar } from "./components/Toolbar";

export default function App() {
  return (
    <main className="app-shell">
      <FieldCanvas />
      <Toolbar />
    </main>
  );
}
