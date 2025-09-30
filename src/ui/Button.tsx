import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "secondary";
};

export default function Button({
  variant = "primary",
  className = "",
  type = "button",
  ...rest
}: Props) {
  const base =
    "inline-flex items-center justify-center rounded px-3 py-1 font-medium";
  const variantClass =
    variant === "primary"
      ? "btn-primary"
      : variant === "secondary"
      ? "btn-secondary"
      : "btn-ghost";
  return (
    <button
      type={type}
      className={`${base} ${variantClass} ${className}`}
      {...rest}
    />
  );
}
