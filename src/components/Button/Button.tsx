import { memo } from "react";

import classNames from "classnames";

import Loader, { LoaderSize } from "../Loader/Loader";
import styles from "./Button.module.scss";

/** Пропсы, который принимает компонент Button */
export type ButtonProps = React.PropsWithChildren<{
  /**
   * Если true, то внутри кнопки вместе с children отображается компонент Loader
   * Также кнопка должна переходить в состояние disabled
   */
  loading?: boolean;
  className?: string;
  scaleble?: boolean;
}> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  loading,
  children,
  className,
  scaleble = true,
  ...rest
}: ButtonProps) => {
  return (
    <button
      {...rest}
      disabled={rest.disabled || loading}
      className={classNames(
        className,
        styles.button,
        loading || rest.disabled === true ? styles.button_disabled : ""
      )}
    >
      {loading && <Loader size={LoaderSize.s} className={styles.white} />}
      <span
        className={classNames(
          styles.button_children,
          scaleble ? styles.button_scaleble : ""
        )}
      >
        {children}
      </span>
    </button>
  );
};

export default memo(Button);
