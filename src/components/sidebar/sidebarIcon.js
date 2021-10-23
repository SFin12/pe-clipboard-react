import "./sidebarIcon.scss";
import { FaBars } from "react-icons/fa";
import React, { Component } from "react";

function sidebarIcon(props){

  function handleClick() {
    props.onclick()
  }

  return <FaBars className="large-font" color="white" onClick={handleClick()}/>
    
  }

export default sidebarIcon;