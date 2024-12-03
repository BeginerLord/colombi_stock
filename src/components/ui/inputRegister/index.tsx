import React, { forwardRef } from "react";
import styles from "./inputRegister.module.css";
interface InputProps {
  id?: string;
  label: string;
  value: number | string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  type?: string;
  disabled?: boolean;
  min?: number;
  max?: number;
}
export const TextInput = forwardRef<HTMLInputElement, InputProps>(
  (
    { id, label, value, onChange, disabled, type = "text", min, max, ...rest },
    ref
  ) => (
    <div className={styles.Input}>
      <span>{label}</span>
      <input
        disabled={disabled}
        id={id}
        value={value}
        onChange={onChange}
        type={type}
        ref={ref}
        min={min}
        max={max}
        {...rest}
      />
    </div>
  )
);

export const EmailInput = forwardRef<HTMLInputElement, InputProps>(
  ({ id, label, value, onChange, type = "email", ...rest }, ref) => (
    <div className={styles.Input}>
      <span>{label}</span>
      <input
        id={id}
        value={value}
        onChange={onChange}
        type={type}
        ref={ref}
        {...rest}
      />
    </div>
  )
);

interface Option {
  value: string;
  label: string;
}

interface SelectInputProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: Option[];
}

export const SelectInput = forwardRef<HTMLSelectElement, SelectInputProps>(
  ({ label, options, ...rest }, ref) => {
    return (
      <div className={styles.Input}>
        <label>{label}</label>
        <select ref={ref} {...rest}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
);
