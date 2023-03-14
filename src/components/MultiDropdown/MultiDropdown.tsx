import classNames from "classnames";
import { Option } from "config/types";
import { observer } from "mobx-react-lite";

import styles from "./MultiDropdown.module.scss";

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Преобразовать выбранные значения в строку. Отображается в дропдауне в качестве выбранного значения */
  pluralizeOptions: (value: Option[]) => string;
};

const MultiDropdown = ({
  options,
  value,
  onChange,
  disabled,
  pluralizeOptions,
}: MultiDropdownProps) => {
  const checkedOptions = [...value];
  const optionNodes = options.map((option) => {
    let indexInChacked = checkedOptions.findIndex(
      (opt) => opt.key === option.key
    );
    return (
      <div className={styles["multi-dropdown_option"]} key={option.key}>
        <input
          type="checkbox"
          className={classNames(styles["multi-dropdown_optionCheckbox"])}
          id={option.key + "input"}
          checked={indexInChacked >= 0}
          onChange={() => {
            if (indexInChacked >= 0) {
              checkedOptions.splice(indexInChacked, 1);
            } else checkedOptions.push(option);
            onChange(checkedOptions);
          }}
        ></input>
        <label
          htmlFor={option.key + "input"}
          className={styles["multi-dropdown_optionCheckboxLabel"]}
        >
          {option.value}
        </label>
      </div>
    );
  });

  return (
    <div className={styles["multi-dropdown"]}>
      <div
        className={classNames(
          styles["multi-dropdown_label"],
          disabled === true && styles["multi-dropdown_label-disabled"]
        )}
      >
        <div
          className={classNames(
            styles["multi-dropdown_labelText"],
            value.length === 0 && styles["multi-dropdown_labelPlaceholder"]
          )}
        >
          {pluralizeOptions(checkedOptions)}
        </div>
      </div>

      {!disabled && (
        <div className={classNames(styles["multi-dropdown_list"])}>
          <div className={classNames(styles["multi-dropdown_scroll"])}>
            {optionNodes}
          </div>
        </div>
      )}
    </div>
  );
};

export default observer(MultiDropdown);
