import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
export default function SortOrder(props) {
  const [pressedDown, setPressedDown] = React.useState(false);
  const [pressedUp, setPressedUp] = React.useState(false);

  useEffect(() => {
    let sort = props.sortUsed.split("_");

    if (sort[0] !== props.currentSort) {
      setPressedDown(false);
      setPressedUp(false);
    }
  }, [props.currentSort, props.sortUsed]);
  const handlePressDown = () => {
    setPressedDown(true);
    setPressedUp(false);
    props.useSort(props.currentSort, "desc");
  };
  const handlePressUp = () => {
    setPressedDown(false);
    setPressedUp(true);
    props.useSort(props.currentSort, "asc");
  };
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div className="pt-1">{props.title}</div>
      <div className="btn-group btn-group-sm" role="group">
        <button
          type="button"
          className={
            pressedDown ? "btn btn-primary" : "btn btn-outline-secondary"
          }
          onClick={handlePressDown}
        >
          <FontAwesomeIcon icon={faChevronDown} size="1x" />
        </button>
        <button
          type="button"
          className={
            pressedUp ? "btn btn-primary" : "btn btn-outline-secondary"
          }
          onClick={handlePressUp}
        >
          <FontAwesomeIcon icon={faChevronUp} size="1x" />
        </button>
      </div>
    </div>
  );
}
