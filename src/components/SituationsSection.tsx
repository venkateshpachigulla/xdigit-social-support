import Field from "./FormFields";
import Button from "../ui/Button";
import type { UseFormRegister } from "react-hook-form";
import type { FormValues } from "../types/formTypes";

type Props = {
  register: UseFormRegister<FormValues>;
  t: (key: string) => string;
  setModalField: (field: string | null) => void;
};

export default function SituationsSection({
  register,
  t,
  setModalField,
}: Props) {
  return (
    <section aria-labelledby="situations">
      <h2 id="situations" className="font-semibold mb-2">
        3. {t("situation_descriptions")}
      </h2>
      <div className="flex flex-col gap-3">
        <Field label={t("situation_1")}>
          <textarea
            {...register("situation1")}
            className="border p-2 min-h-[80px] w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-300 mt-1"
          />
          <div className="mt-2">
            <Button
              type="button"
              onClick={() => setModalField("situation1")}
              variant="primary"
              className="help-btn"
            >
              {t("help_me_write")}
            </Button>
          </div>
        </Field>

        <Field label={t("employment_circumstances")}>
          <textarea
            {...register("situation2")}
            className="border p-2 min-h-[80px] w-full"
          />
          <div className="mt-2">
            <Button
              type="button"
              onClick={() => setModalField("situation2")}
              variant="primary"
              className="help-btn"
            >
              {t("help_me_write")}
            </Button>
          </div>
        </Field>

        <Field label={t("reason_for_applying")}>
          <textarea
            {...register("situation3")}
            className="border p-2 min-h-[80px] w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-300 mt-1"
          />
          <div className="mt-2">
            <Button
              type="button"
              onClick={() => setModalField("situation3")}
              variant="primary"
              className="help-btn"
            >
              {t("help_me_write")}
            </Button>
          </div>
        </Field>
      </div>
    </section>
  );
}
