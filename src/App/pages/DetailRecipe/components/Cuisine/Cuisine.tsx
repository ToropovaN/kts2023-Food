import classNames from "classnames";
import Button from "components/Button/Button";
import IconSearch from "components/Icons/IconSearch";
import Cuisines from "config/cuisineConfig";
import { Option } from "config/types";

import styles from "./Cuisine.module.scss";

type CuisineProns = {
  name: string;
  onClick: (cuisine: Option) => void;
};

const Cuisine = ({ name, onClick }: CuisineProns) => {
  const index = Cuisines.findIndex((item) => item.key === name);
  const fromList = index >= 0;
  return (
    <Button
      scaleble={false}
      onClick={() => {
        if (fromList) onClick(Cuisines[index]);
      }}
      disabled={!fromList}
      className={classNames(
        styles.cuisine,
        !fromList && styles.cuisine_disabled
      )}
    >
      <div className={styles.cuisine_children}>
        <span>{name}</span>
        <IconSearch
          className={styles.cuisine_icon}
          stroke={"rgba(59, 59, 59, 0.5)"}
        />
      </div>
    </Button>
  );
};

export default Cuisine;
