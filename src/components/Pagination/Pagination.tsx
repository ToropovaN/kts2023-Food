import { memo } from "react";

import classNames from "classnames";
import Button from "components/Button/Button";
import IconBack from "components/Icons/IconBack";
import InputNumber from "components/InputNumber/InputNumber";

import styles from "./Pagination.module.scss";

export type PaginationProps = {
  current: number;
  total: number;
  onChange: (num: number) => void;
};

const Pagination = ({ current, total, onChange }: PaginationProps) => (
  <div className={styles.pagination}>
    <Button
      onClick={(e) => onChange(current - 2)}
      disabled={current === 1}
      className={styles.pagination_button}
    >
      <IconBack />
    </Button>
    <div className={styles.pagination_inputBlock}>
      <InputNumber
        max={total}
        placeholder={current}
        label={`of ${total}`}
        enter={(page: number) => onChange(page - 1)}
      ></InputNumber>
    </div>
    <Button
      onClick={(e) => onChange(current)}
      disabled={current === total}
      className={classNames(
        styles.pagination_button,
        styles["pagination_button-forward"]
      )}
    >
      <IconBack />
    </Button>
  </div>
);

export default memo(Pagination);
