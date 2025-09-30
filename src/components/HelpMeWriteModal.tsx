import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { generateSuggestion, isOpenAIConfigured } from "../services/api";
import Button from "../ui/Button";

type Props = {
  field: string;
  onClose: () => void;
  onAccept: (text: string) => void;
};

export default function HelpMeWriteModal({ field, onClose, onAccept }: Props) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState("");
  const [error, setError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleGenerate = async () => {
    setError(null);
    setLoading(true);
    try {
      const text = await generateSuggestion(
        `${t("please_write_prompt")} ${field}`
      );
      setSuggestion(text || "");
      setTimeout(() => textareaRef.current?.focus(), 50);
    } catch (err: unknown) {
      const e = err as Error;
      setError(e?.message || t("failed_fetch_suggestion"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-40"
      onClick={onClose}
    >
      <div
        ref={containerRef}
        className="modal-panel p-4 rounded-lg shadow-lg w-full max-w-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700 }}>
            {t("help_me_write_title")} — {field}
          </h2>
          <Button type="button" onClick={onClose} variant="ghost">
            ✕
          </Button>
        </div>

        <p
          style={{ marginTop: "0.5rem", color: "inherit", fontSize: "0.95rem" }}
        >
          {t("generate_instruction")}
        </p>

        <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem" }}>
          <Button
            type="button"
            onClick={handleGenerate}
            disabled={loading}
            variant="primary"
            aria-disabled={loading}
          >
            {loading ? t("generating") : t("generate_suggestion")}
          </Button>
          <Button
            type="button"
            onClick={() => {
              setSuggestion("");
              setError(null);
            }}
            variant="secondary"
          >
            {t("clear")}
          </Button>
        </div>

        {!isOpenAIConfigured() && (
          <div
            style={{
              fontSize: "0.82rem",
              color: "rgba(15,23,42,0.6)",
              marginTop: "0.5rem",
            }}
          >
            {t("mock_suggestion_notice")}
          </div>
        )}

        {error && (
          <div style={{ color: "#dc2626", marginTop: "0.75rem" }} role="alert">
            {error}
          </div>
        )}

        <label className="sr-only">Suggestion editor</label>
        <textarea
          ref={textareaRef}
          value={suggestion}
          onChange={(e) => setSuggestion(e.target.value)}
          style={{
            width: "100%",
            padding: "0.5rem",
            borderRadius: "6px",
            border: "1px solid rgba(15,23,42,0.06)",
            marginTop: "0.75rem",
            minHeight: 140,
            background: "var(--card-bg)",
            color: "var(--card-fg)",
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "0.5rem",
            marginTop: "1rem",
          }}
        >
          <Button type="button" onClick={onClose} variant="ghost">
            {t("discard")}
          </Button>
          <Button
            type="button"
            onClick={() => onAccept(suggestion || "")}
            variant="primary"
          >
            {t("accept")}
          </Button>
        </div>
      </div>
    </div>
  );
}
