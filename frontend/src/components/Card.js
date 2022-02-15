import React from "react";
/*
Recommended:
`react-bootstrap`: https://react-bootstrap.github.io/
`reactstrap`: https://reactstrap.github.io/?path=/story/home-installation--page
*/
function Card(props) {

  /*
  This function is a little unsafe for a couple of reasons.
  For one, manually joining text is something I am a little wary of (may be difficult to debug / account for all possibilities)
  Mainly it's not needed, since props will force a re-render, this does get called every time props update but it probably makes better sense to use these values directly in the JSX.
  You can avoid this entirely by using one of the aforementioned react bootstrap libs. In that case, it is very simple, something like <Card bg={props.bgcolor} .../>
  I'd recommend using https://www.npmjs.com/package/clsx to join classes when possible.
  */
  function classes() {
    const bg = props.bgcolor ? " bg-" + props.bgcolor : " ";
    const txt = props.txtcolor ? " text-" + props.txtcolor : " text-black";
    return "card mb-3 " + bg + txt;
  }

  return (
    <div
      className={ classes() + " " + props.className }
      /*
      For these styles, I would recommend trying to use the provided bootstrap classes when possible.
      If it works, it works and I don't have any real basis to oppose this type of styling, but from experience
      I find it's generally safer and easier to use built in styles of a UI library than override with custom values
      I personally only override with css if absolutely necessary
      */
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
        { props.body } { /* Would recommend using props.children here. See https://codeburst.io/a-quick-intro-to-reacts-props-children-cb3d2fce4891 for more.*/}
        <br />
        {props.body2}
      </div>
    </div>
  );
}

export default Card;
