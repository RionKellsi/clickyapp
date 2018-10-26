import React from "react";
import "./Nav.css";

const Navtab = props => (
    <div>
        <ul className="nav nav-tab nav-justified">
            <li><a href="/">Music Artist Clicky Game</a></li>
            <li>Score: <span style={{color: "yellow"}}> { props.score } </span></li>
            <li>|</li>
            <li>Top Score: <span style={{color: "yellow"}}> { props.topScore } </span></li>
        </ul>
    </div>
);

export default Navtab;