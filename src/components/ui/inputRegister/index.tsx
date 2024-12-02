import React, { forwardRef } from "react";
import styles from "./inputRegister.module.css";

interface InputProps {
  id?: string;
  label: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  type?: string;
}

interface SelectProps {
  id?: string;
  label: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  options: string[];
}

export const TextInput = forwardRef<HTMLInputElement, InputProps>(
  ({ id, label, value, onChange, type = "text", ...rest }, ref) => (
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

export const SelectInput = forwardRef<HTMLSelectElement, SelectProps>(
  ({ id, label, value, onChange, options, ...rest }, ref) => (
    <div className={styles.Input}>
      <span>{label}</span>
      <select
        id={id}
        value={value}
        onChange={onChange}
        ref={ref}
        className={styles.select}
        {...rest}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
);