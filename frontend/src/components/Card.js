import React from "react";

function Card(props) {
  function classes() {
    const bg = props.bgcolor ? " bg-" + props.bgcolor : " ";
    const txt = props.txtcolor ? " text-" + props.txtcolor : " text-black";
    return "card mb-3 " + bg + txt;
  }

  return (
    <div
      className={classes() + " " + props.className}
      style={{
        width: "18rem",
        height: "600",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        margin: "auto",
        marginTop: 50,
      }}
    >
      <div className="card-header">{props.header}</div>
      <div className="card-body">
        {props.title && <h5 className="card-title">{props.title}</h5>}
        {props.text && <p className="card-text">{props.text}</p>}
        {props.text2 && <p className="card-text">{props.text2}</p>}
        {props.body}
        <br />
        {props.body2}
      </div>
    </div>
  );
}

export default Card;
