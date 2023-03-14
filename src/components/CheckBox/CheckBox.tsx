import IconCheckBox from "components/Icons/IconCheckBox";

import styles from "./CheckBox.module.scss";
export type CheckBoxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  /** Вызывается при клике на чекбокс */
  onChange: (value: boolean) => void;
};

const CheckBox = ({ onChange, disabled, ...rest }: CheckBoxProps) => (
  <div className={styles.checkbox}>
    <input
      type="checkbox"
      id="checkbox1"
      className={styles.checkbox_input}
      {...rest}
      disabled={disabled}
      onChange={(e) => {
        if (!disabled) onChange(e.target.checked);
      }}
    ></input>
    <label htmlFor="checkbox1" className={styles.checkbox_label}>
      <IconCheckBox className={styles.checkbox_mark} />
    </label>
  </div>
);

export default CheckBox;
