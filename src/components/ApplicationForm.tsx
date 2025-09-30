import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import ProgressBar from "./ProgressBar";
import HelpMeWriteModal from "./HelpMeWriteModal";
import FooterNav from "./FooterNav";
import useAutosave from "../hooks/useAutosave";
import { submitApplication, saveSubmission, clearDraft } from "../services/api";
import PersonalInfoSection from "./PersonalInfoSection";
import FamilyFinancialSection from "./FamilyFinancialSection";
import SituationsSection from "./SituationsSection";
import type { FormValues } from "../types/formTypes";

export default function ApplicationForm() {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [modalField, setModalField] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const defaultValues: FormValues = {
    name: "",
    nationalId: "",
    dob: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    country: "",
    phone: "",
    email: "",
    maritalStatus: "",
    dependents: 0,
    employmentStatus: "",
    monthlyIncome: 0,
    housingStatus: "",
    situation1: "",
    situation2: "",
    situation3: "",
  };

  const { register, handleSubmit, watch, setValue, reset, formState, trigger } =
    useForm<FormValues>({
      defaultValues,
    });

  useAutosave(reset, watch);

  const acceptSuggestion = (text: string) => {
    if (!modalField) return;
    setValue(
      modalField as keyof FormValues,
      text as unknown as FormValues[keyof FormValues]
    );
    setModalField(null);
  };

  const handleNext = async () => {
    if (step === 1) {
      const ok = await trigger(["name", "nationalId", "dob", "email"]);
      if (!ok) return;
    }
    if (step === 2) {
      const ok = await trigger([
        "maritalStatus",
        "dependents",
        "employmentStatus",
        "monthlyIncome",
        "housingStatus",
      ]);
      if (!ok) return;
    }
    setStep((s) => s + 1);
  };

  const onSubmit = async (data: FormValues) => {
    setSubmitting(true);
    try {
      const res = await submitApplication(data);

      saveSubmission(data as unknown as Record<string, unknown>);

      clearDraft();

      clearDraft();
      reset(defaultValues);
      setStep(1);
      alert(`${t("submit")} ${t("successful")} — id: ${res.id}`);
    } catch (err: unknown) {
      const e = err as Error;
      alert((e && e.message) || t("submit_failed"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ProgressBar step={step} />
      {step === 1 && (
        <PersonalInfoSection register={register} formState={formState} t={t} />
      )}

      {step === 2 && (
        <FamilyFinancialSection
          register={register}
          formState={formState}
          t={t}
        />
      )}

      {step === 3 && (
        <SituationsSection
          register={register}
          t={t}
          setModalField={setModalField}
        />
      )}

      <br />
      <br />

      <FooterNav
        step={step}
        onBack={() => setStep((s) => s - 1)}
        onNext={handleNext}
        isLast={step === 3}
        submitting={submitting}
      />

      {modalField && (
        <HelpMeWriteModal
          field={modalField}
          onClose={() => setModalField(null)}
          onAccept={acceptSuggestion}
        />
      )}
    </form>
  );
}
