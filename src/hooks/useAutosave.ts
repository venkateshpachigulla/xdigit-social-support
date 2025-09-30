import { useEffect } from "react";
import type { UseFormReset, FieldValues, UseFormWatch } from "react-hook-form";
import { loadDraft, saveDraft } from "../services/api";

export default function useAutosave<T extends FieldValues>(
  reset: UseFormReset<T>,
  watch: UseFormWatch<T>
) {
  useEffect(() => {
    const d = loadDraft();
    if (d && typeof d === "object") {
      reset(d as T);
    }
  }, [reset]);

  useEffect(() => {
    watch((value) => {
      saveDraft(value as unknown as Record<string, unknown>);
    });
  }, [watch]);
}
