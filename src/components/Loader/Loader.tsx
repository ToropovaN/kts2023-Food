import classNames from "classnames";

import styles from "./Loader.module.scss";

/** Возможные значения размера лоадера */
export enum LoaderSize {
  s = "s",
  m = "m",
  l = "l",
}

/** Пропсы, которые принимает компонент Loader */
export type LoaderProps = {
  /**
   * Идет ли загрузка.
   * По умолчанию - true, для удобства использования
   * Если false, то лоадер не должен отображаться
   */
  loading?: boolean;
  /**
   * Размер лоадера.
   * По умолчанию - LoaderSize.m
   */
  size?: LoaderSize;
  /**
   * Дополнительный класс лоадера.
   */
  className?: string;
};

const Loader = ({
  loading = true,
  size = LoaderSize.m,
  className,
}: LoaderProps) => (
  <>
    {loading && (
      <div
        className={classNames(
          className && styles[className],
          styles.loader,
          styles["loader-" + size]
        )}
      ></div>
    )}
  </>
);

export default Loader;
