import Button from "../ui/Button";
import { useTranslation } from "react-i18next";

type Props = {
  step: number;
  onBack: () => void;
  onNext: () => void;
  isLast: boolean;
  submitting: boolean;
};

export default function FooterNav({
  step,
  onBack,
  onNext,
  isLast,
  submitting,
}: Props) {
  const { t } = useTranslation();
  return (
    <div className="footer-nav mt-8 pt-4 border-t border-gray-100">
      <div className="left">
        {step > 1 && (
          <Button
            type="button"
            onClick={onBack}
            variant="ghost"
            className="btn-back"
          >
            {t("back")}
          </Button>
        )}
      </div>

      <div className="right">
        {!isLast && (
          <Button
            type="button"
            onClick={onNext}
            variant="primary"
            className="text-sm"
          >
            {t("next")}
          </Button>
        )}
        {isLast && (
          <Button type="submit" variant="primary" className="text-sm">
            {submitting ? t("submitting") : t("submit_application")}
          </Button>
        )}
      </div>
    </div>
  );
}
