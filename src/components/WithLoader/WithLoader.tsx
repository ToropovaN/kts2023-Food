import Loader, { LoaderProps } from "../Loader/Loader";
import styles from "./WithLoader.module.scss";
/** Пропсы, которые принимает компонент WithLoader */
export type WithLoaderProps = React.PropsWithChildren<{
  loading: boolean;
  loaderProps?: Omit<LoaderProps, "loading">;
}>;

const WithLoader = ({
  loading = false,
  loaderProps,
  children,
}: WithLoaderProps) => (
  <div className={styles.withLoader}>
    <div className={styles.withLoader_loaderLayer}>
      {loading && <Loader loading={loading} {...loaderProps} />}
    </div>
    {children}
  </div>
);

export default WithLoader;
