import React, { Component } from "react";
import styles from "./Rate.module.css";

export default class Rate extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.rate !== prevProps.rate) {
      console.log("componentDidUpdate");
      this.props.callBack(this.props.rate, this.props.id);
    }
  }

  render() {
    console.log(this.props.rate);
    return (
      <div className={styles.rating} id={`span_${this.props.id}`}>
        {this.props.stars.map((star, index) => {
          return (
            <span
              id={`ind_${this.props.id}_${index}`}
              key={`ind_${index}`}
              onClick={
                this.props.readOnly
                  ? () => alert("cant update because readonly")
                  : () => this.props.callBack(5 - index, this.props.id)
              }
              className={
                star === 1
                  ? "fa fa-star-o fa-lg ml-1 "
                  : "fa fa-star fa-lg ml-1"
              }
              aria-hidden="true"
            ></span>
          );
        })}
      </div>
    );
  }
}
