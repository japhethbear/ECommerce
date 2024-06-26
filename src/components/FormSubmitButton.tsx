"use client";

import { ComponentProps } from "react";
import { useFormStatus } from "react-dom";

// Creating a Type instead of Interface to use ComponentProps
type FormSubmitButtonProps = {
  children: React.ReactNode;
  className?: string;
} & ComponentProps<"button">;

export default function FormSubmitButton({
  children,
  className,
  ...props
}: FormSubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      {...props}
      type="submit"
      disabled={pending}
      className={`btn btn-primary ${className}`}
    >
      {pending && <span className="loading loading-spinner" />}
      {children}
    </button>
  );
}
