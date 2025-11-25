import { type ReactNode } from "react";
import { type Control, Controller, type FieldPath, type FieldValues } from "react-hook-form";

import { inputBase, inputError, inputFocus, inputNormal } from "@/config/styles";

type FormInputProps<T extends FieldValues> = {
  children?: ReactNode;
  control: Control<T>;
  label: string;
  list?: string;
  name: FieldPath<T>;
  placeholder?: string;
  step?: string;
  type?: "number" | "text" | "textarea";
};

export default function FormInput<T extends FieldValues>({
  children,
  control,
  label,
  list,
  name,
  placeholder,
  step,
  type = "text",
}: FormInputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const { error } = fieldState;
        const hasError = error !== undefined;
        const inputClasses = `${inputBase} ${hasError ? inputError : inputNormal} ${inputFocus}`;

        return (
          <div>
            <label className="mb-1 block text-sm font-medium text-card-foreground" htmlFor={name}>
              {label}
            </label>
            {type === "textarea" ? (
              <textarea {...field} id={name} className={`${inputClasses} resize-none`} placeholder={placeholder} rows={4} />
            ) : (
              <div className={children === undefined ? "" : "flex items-start gap-4"}>
                <input
                  {...field}
                  id={name}
                  className={children === undefined ? inputClasses : `flex-1 ${inputClasses}`}
                  placeholder={placeholder}
                  list={list}
                  step={step}
                  type={type}
                />
                {children}
              </div>
            )}
            {error === undefined ? null : <p className="mt-1 text-sm text-destructive">{error.message}</p>}
          </div>
        );
      }}
    />
  );
}
