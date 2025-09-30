import React from "react";
import { useTranslation } from "react-i18next";
import type { FieldError } from "react-hook-form";

type Props = {
  label?: string;
  name?: string;
  children: React.ReactNode;
  error?: FieldError | undefined;
  errorMessage?: string;
  className?: string;
};

export function Field({
  label,
  children,
  error,
  errorMessage,
  className = "",
}: Props) {
  const { t } = useTranslation();
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      {children}
      {error && (
        <div className="text-red-600 text-sm">
          {errorMessage || t("required")}
        </div>
      )}
    </div>
  );
}

export default Field;
