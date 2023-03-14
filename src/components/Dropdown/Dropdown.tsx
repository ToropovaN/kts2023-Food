import classNames from "classnames";
import { Option } from "config/types";
import { observer } from "mobx-react-lite";

import styles from "./Dropdown.module.scss";

export type DropdownProps = {
  value: Option;
  options: Option[];
  onChange: (value: Option) => void;
  disabled?: boolean;
  pluralizeOptions: (value: Option) => string;
};

const Dropdown = ({
  value,
  options,
  onChange,
  disabled,
  pluralizeOptions,
}: DropdownProps) => {
  const optionNodes = options.map((option) => (
    <div
      className={classNames(
        styles.dropdown_option,
        option.key === value.key && styles["dropdown_option-chacked"]
      )}
      key={option.key}
      onClick={(e) => {
        onChange(option);
      }}
    >
      {option.value}
    </div>
  ));
  return (
    <div className={styles.dropdown}>
      <div
        className={classNames(
          styles.dropdown_label,
          disabled === true && styles["dropdown_label-disabled"]
        )}
      >
        <div className={styles.dropdown_labelText}>
          {pluralizeOptions(value)}
        </div>
      </div>
      {!disabled && (
        <div className={styles.dropdown_list}>
          <div className={styles.dropdown_scroll}>{optionNodes}</div>
        </div>
      )}
    </div>
  );
};

export default observer(Dropdown);
