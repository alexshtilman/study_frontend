import React from "react";
import { CELL_PROPS, COLORS } from "../configuration/config";
import "./cell.css";
export default function FieldCell(props) {
  function getRandomNumber(min, max) {
    return min + Math.round(Math.random() * (max - min));
  }
  return (
    <div
      style={{
        ...CELL_PROPS,
        background:
          props.cell === 1
            ? COLORS[getRandomNumber(0, COLORS.length - 1)]
            : "white",
        cursor: props.started ? "auto" : "pointer",
      }}
      onClick={() =>
        props.started ? null : props.setFieldCell(props.indexX, props.indexY)
      }
    ></div>
  );
}
