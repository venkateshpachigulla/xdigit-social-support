import Field from "./FormFields";
import type { UseFormRegister, FormState } from "react-hook-form";
import type { FormValues } from "../types/formTypes";

type Props = {
  register: UseFormRegister<FormValues>;
  formState: FormState<FormValues>;
  t: (key: string) => string;
};

export default function FamilyFinancialSection({
  register,
  formState,
  t,
}: Props) {
  return (
    <section aria-labelledby="family-financial">
      <h2 id="family-financial" className="font-semibold mb-2">
        2. {t("family_financial")}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Field
          label={t("marital_status")}
          error={formState.errors.maritalStatus}
          errorMessage={
            formState.errors.maritalStatus ? t("required") : undefined
          }
        >
          <select
            {...register("maritalStatus")}
            className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value="">{t("select_marital_status")}</option>
            <option value="single">{t("single")}</option>
            <option value="married">{t("married")}</option>
          </select>
        </Field>
        <Field
          label={t("dependents")}
          error={formState.errors.dependents}
          errorMessage={formState.errors.dependents ? t("required") : undefined}
        >
          <input
            type="number"
            {...register("dependents")}
            placeholder={t("dependents")}
            className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </Field>
        <Field
          label={t("employment_status")}
          error={formState.errors.employmentStatus}
          errorMessage={
            formState.errors.employmentStatus ? t("required") : undefined
          }
        >
          <select
            {...register("employmentStatus")}
            className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value="">{t("select_employment_status")}</option>
            <option value="employed">{t("employed")}</option>
            <option value="unemployed">{t("unemployed")}</option>
          </select>
        </Field>
        <Field
          label={t("monthly_income")}
          error={formState.errors.monthlyIncome}
          errorMessage={
            formState.errors.monthlyIncome ? t("required") : undefined
          }
        >
          <input
            type="number"
            {...register("monthlyIncome")}
            placeholder={t("monthly_income")}
            className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </Field>
        <Field
          label={t("housing_status")}
          error={formState.errors.housingStatus}
          errorMessage={
            formState.errors.housingStatus ? t("required") : undefined
          }
        >
          <select
            {...register("housingStatus")}
            className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value="">{t("select_housing_status")}</option>
            <option value="owner">{t("owner")}</option>
            <option value="renter">{t("renter")}</option>
          </select>
        </Field>
      </div>
    </section>
  );
}
