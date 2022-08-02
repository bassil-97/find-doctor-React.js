import React from "react";
import "./DataItem.css";

export default function DataItem(props) {
  return (
    <div
      className="data-item"
      style={{ backgroundColor: props.color }}
      data-aos="zoom-in"
    >
      {props.children}
    </div>
  );
}
