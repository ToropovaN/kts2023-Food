import { memo } from "react";

import classNames from "classnames";

import styles from "./Input.module.scss";
/** Пропсы, которые принимает компонент Input */
export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  enter: () => void;
};

const Input = ({ value, onChange, className, enter, ...rest }: InputProps) => (
  <input
    className={classNames(
      className,
      styles.input,
      rest.disabled && styles.input_disabled
    )}
    type="text"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    onKeyUp={(e) => {
      if (e.key === "Enter") {
        enter();
      }
    }}
    {...rest}
  ></input>
);

export default memo(Input);
