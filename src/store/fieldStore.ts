import { create } from "zustand";
import { initialFieldObjects } from "../data/objectDefinitions";
import type { FieldObject } from "../types/field";

interface FieldState {
  objects: FieldObject[];
  observeMode: boolean;
  moveObject: (id: string, x: number, y: number) => void;
  tickAging: (seconds: number) => void;
  toggleObserveMode: () => void;
}

export const useFieldStore = create<FieldState>((set) => ({
  objects: initialFieldObjects,
  observeMode: false,
  moveObject: (id, x, y) =>
    set((state) => ({
      objects: state.objects.map((object) =>
        object.id === id ? { ...object, x, y } : object,
      ),
    })),
  tickAging: (seconds) =>
    set((state) => ({
      objects: state.objects.map((object) => ({
        ...object,
        age: object.age + seconds,
      })),
    })),
  toggleObserveMode: () =>
    set((state) => ({
      observeMode: !state.observeMode,
    })),
}));
