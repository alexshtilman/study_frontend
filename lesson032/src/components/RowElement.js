import React from "react";
import FieldCell from "./FieldCell";
export default function RowElement(props) {
  return (
    <React.Fragment>
      {props.row.map((cell, indexY) => {
        return (
          <React.Fragment key={`ind${props.indexX}${indexY}`}>
            <FieldCell
              cell={cell}
              indexY={indexY}
              indexX={props.indexX}
              setFieldCell={props.setFieldCell}
              started={props.started}
            />
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
}
