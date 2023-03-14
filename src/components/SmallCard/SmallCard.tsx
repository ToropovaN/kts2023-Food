import { memo } from "react";

import classNames from "classnames";

import styles from "./SmallCard.module.scss";

export type SmallCardProps = {
  path?: string;
  image: string;
  title: string;
  amount?: string;
};

const SmallCard = ({ path, image, title, amount }: SmallCardProps) => {
  return (
    <div className={styles.smallCard}>
      <div
        className={classNames(
          styles.smallCard_card,
          amount && styles["smallCard_card-extended"]
        )}
        title={title}
      >
        <div className={styles.smallCard_imgBlock}>
          <img
            src={path ? path + image : image}
            alt={title?.toString()}
            className={styles.smallCard_img}
          />
        </div>
        <div className={styles.smallCard_title}>{title}</div>
      </div>
      {amount && (
        <div className={styles.smallCard_amount} title={amount}>
          {amount}
        </div>
      )}
    </div>
  );
};

export default memo(SmallCard);
