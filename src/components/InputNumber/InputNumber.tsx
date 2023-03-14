import { memo } from "react";

import classNames from "classnames";

import styles from "./InputNumber.module.scss";

type InputNumberProps = {
  min?: number;
  max?: number;
  className?: string;
  placeholder?: number;
  label?: string;
  enter: (num: number) => void;
};

const InputNumber = ({
  className,
  max = 999,
  min = 1,
  placeholder = 1,
  label = "",
  enter,
}: InputNumberProps) => (
  <div className={classNames(styles.inputNumber, className)}>
    <input
      onChange={(e) => {
        if (Number(e.target.value) > max) e.target.value = String(max);
        if (Number(e.target.value) < min && e.target.value !== "")
          e.target.value = String(min);
      }}
      onBlur={(e) => enter(Number(e.target.value))}
      onKeyUp={(e) => {
        if (e.key === "Enter")
          enter(Number((e.target as HTMLInputElement).value));
      }}
      id="inputNumber"
      placeholder={String(placeholder)}
      className={styles.inputNumber_input}
      type="number"
    ></input>
    <label className={styles.inputNumber_label} htmlFor="inputNumber">
      {label}
    </label>
  </div>
);

export default memo(InputNumber);
