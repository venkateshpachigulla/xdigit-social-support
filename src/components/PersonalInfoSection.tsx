import type { UseFormRegister, FormState } from "react-hook-form";
import Field from "./FormFields";
import type { FormValues } from "../types/formTypes";

type Props = {
  register: UseFormRegister<FormValues>;
  formState: FormState<FormValues>;
  t: (key: string) => string;
};

export default function PersonalInfoSection({ register, formState, t }: Props) {
  return (
    <section aria-labelledby="personal-info">
      <h2 id="personal-info" className="font-semibold mb-2">
        1. {t("personal_info")}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field
          label={t("name")}
          error={formState.errors.name}
          errorMessage={formState.errors.name ? t("required") : undefined}
          className=""
        >
          <input
            {...register("name", { required: true })}
            placeholder={t("name")}
            className="underline-input w-full"
            aria-invalid={!!formState.errors.name}
          />
        </Field>

        <Field
          label={t("nationalId")}
          error={formState.errors.nationalId}
          errorMessage={formState.errors.nationalId ? t("required") : undefined}
          className=""
        >
          <input
            {...register("nationalId", { required: true })}
            placeholder={t("nationalId")}
            className="underline-input w-full"
            aria-invalid={!!formState.errors.nationalId}
          />
        </Field>

        <Field
          label={t("dob")}
          error={formState.errors.dob}
          errorMessage={formState.errors.dob ? t("required") : undefined}
          className=""
        >
          <input
            type="date"
            {...register("dob", { required: true })}
            className="underline-input w-full"
            aria-invalid={!!formState.errors.dob}
            data-datepicker
          />
        </Field>

        <Field label={t("gender")} className="">
          <select {...register("gender")} className="underline-input w-full">
            <option value="male">{t("male")}</option>
            <option value="female">{t("female")}</option>
          </select>
        </Field>

        <Field label={t("address")} className="md:col-span-2">
          <input
            {...register("address")}
            placeholder={t("address")}
            className="underline-input w-full"
          />
        </Field>

        <Field label={t("city")}>
          <input
            {...register("city")}
            placeholder={t("city")}
            className="underline-input w-full"
          />
        </Field>
        <Field label={t("state")}>
          <input
            {...register("state")}
            placeholder={t("state")}
            className="underline-input w-full"
          />
        </Field>
        <Field label={t("country")}>
          <input
            {...register("country")}
            placeholder={t("country")}
            className="underline-input w-full"
          />
        </Field>
        <Field label={t("phone")}>
          <input
            type="tel"
            inputMode="numeric"
            maxLength={15}
            {...register("phone")}
            placeholder={t("phone")}
            className="underline-input w-full"
            pattern="^\+?\d*$"
            onInput={(e) => {
              const input = e.currentTarget as HTMLInputElement;
              const value = input.value;
              const sanitized = value
                .replace(/[^\d+]/g, "")
                .replace(/(?!^)\+/g, "");
              if (sanitized !== value) input.value = sanitized;
            }}
          />
        </Field>

        <Field
          label={t("email")}
          className="md:col-span-2"
          error={formState.errors.email}
          errorMessage={formState.errors.email ? t("invalidEmail") : undefined}
        >
          <input
            {...register("email", {
              required: false,
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: t("invalidEmail"),
              },
            })}
            placeholder={t("email")}
            className="underline-input w-full"
          />
        </Field>
      </div>
    </section>
  );
}
