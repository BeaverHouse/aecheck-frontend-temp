import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { cleanNumArr } from "../util/arrayUtil";

interface CheckState {
  inven: Array<number>;
  manifest: Array<number>;
  grasta: Array<number>;
  staralign: Array<number>;
  buddy: Array<number>;
  setInven: (inven: Array<number>) => void;
  setManifest: (manifest: Array<number>) => void;
  setGrasta: (grasta: Array<number>) => void;
  setStaralign: (staralign: Array<number>) => void;
  setBuddy: (buddy: Array<number>) => void;
  loadSaveData: (data: CheckStateV4) => void;
}

const useCheckStore = create(
  persist<CheckState>(
    (set) => ({
      inven: [],
      manifest: [],
      grasta: [],
      staralign: [],
      buddy: [],
      setInven: (inven) =>
        set((state) => ({
          ...state,
          inven: cleanNumArr(inven),
        })),
      setManifest: (manifest) =>
        set((state) => ({
          ...state,
          manifest: cleanNumArr(manifest),
        })),
      setGrasta: (grasta) =>
        set((state) => ({
          ...state,
          grasta: cleanNumArr(grasta),
        })),
      setStaralign: (staralign) =>
        set((state) => ({
          ...state,
          staralign: cleanNumArr(staralign),
        })),
      setBuddy: (buddy) =>
        set((state) => ({
          ...state,
          buddy: cleanNumArr(buddy),
        })),
      loadSaveData: (data) => {
        set({
          inven: cleanNumArr(data.inven || []),
          manifest: cleanNumArr(
            (data.manifest || []).filter((i) => i >= 10000)
          ),
          grasta: cleanNumArr((data.grasta || []).filter((i) => i >= 10000)),
          staralign: cleanNumArr(
            (data.staralign || []).filter((i) => i >= 10000)
          ),
          buddy: cleanNumArr((data.buddy || []).filter((i) => i >= 10000)),
        });
      },
    }),
    {
      name: "AE_CHECK",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCheckStore;
