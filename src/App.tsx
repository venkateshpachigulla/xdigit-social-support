import { useState } from "react";
import { useTranslation } from "react-i18next";
import ApplicationForm from "./components/ApplicationForm";
import Button from "./ui/Button";

export default function App() {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState<"en" | "ar">("en");

  const toggleLang = () => {
    const next = lang === "en" ? "ar" : "en";
    setLang(next);
    i18n.changeLanguage(next);
    document.documentElement.dir = next === "ar" ? "rtl" : "ltr";
  };

  return (
    <div className="min-h-screen p-4 bg-slate-50">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow app-card">
        <header className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">{t("title")}</h1>
          <div>
            <Button
              onClick={toggleLang}
              variant="secondary"
              aria-label={t("change_language")}
              className="text-sm"
            >
              {lang === "en" ? "العربية" : "English"}
            </Button>
          </div>
        </header>

        <ApplicationForm />
      </div>
    </div>
  );
}
