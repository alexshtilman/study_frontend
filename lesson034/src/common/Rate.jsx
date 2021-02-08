import React from "react";
import styles from "./Rate.module.css";
import CONFIG from "../config/config.json";
function Rate(props) {
  return (
    <div className={styles.rating}>
      {props.stars.map((star, index) => {
        return (
          <React.Fragment key={`ind_${index}`}>
            {props.readOnly ? (
              <div
                id={`ind_${props.id}_${index}`}
                style={{ color: "gray" }}
                className={
                  star === 1
                    ? "fa fa-star-o fa-lg ml-1"
                    : "fa fa-star fa-lg ml-1"
                }
                aria-hidden="true"
              />
            ) : (
              <span
                id={`ind_${props.id}_${index}`}
                onClick={() =>
                  props.callBack(CONFIG.defaultMaxRate - index, props.id)
                }
                className={
                  star === 1
                    ? "fa fa-star-o fa-lg ml-1 "
                    : "fa fa-star fa-lg ml-1"
                }
                aria-hidden="true"
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
export default Rate;
