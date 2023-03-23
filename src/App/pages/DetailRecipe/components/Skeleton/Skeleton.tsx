import classNames from "classnames";
import IconLike from "components/Icons/IconLike";
import IconRecipeMark from "components/Icons/IconRecipeMark";
import IconTime from "components/Icons/IconTime";

import globalStyles from "../../DetailRecipe.module.scss";
import styles from "./Skeleton.module.scss";

const Skeleton = () => (
  <>
    <div className={styles.skeleton_title} />
    <div className={globalStyles.detailRecipe_marks}>
      <IconRecipeMark />
      <IconRecipeMark />
      <IconRecipeMark />
      <IconRecipeMark />
      <IconRecipeMark />
      <IconRecipeMark />
    </div>

    <div className={globalStyles.detailRecipe_stats}>
      <div className={globalStyles.detailRecipe_statsItem}>
        <IconTime stroke="#d9d9d9" />
        <div className={styles.skeleton_stats}></div>
      </div>
      <div className={globalStyles.detailRecipe_statsItem}>
        <IconLike stroke="#d9d9d9" fill="#d9d9d9" />
        <div className={styles.skeleton_stats}></div>
      </div>
    </div>

    <div
      className={classNames(
        globalStyles.detailRecipe_text,
        styles.skeleton_textBlock
      )}
    >
      <div className={styles.skeleton_text}></div>
      <div className={styles.skeleton_text}></div>
      <div className={styles.skeleton_text}></div>
      <div className={styles.skeleton_text}></div>
      <div className={styles.skeleton_text}></div>
      <div className={styles.skeleton_text}></div>
    </div>
  </>
);

export default Skeleton;
