import React from "react";
import './Header.scss';

export function Header(props){
    console.log(props)
    return (
        <div className="container-fluid">
            <h1 className="header">{props.header}</h1>
            <hr/>
        </div>
    )
}
