import React, { useState } from "react";
import { Button } from "antd";

import "./Faq.css";

import panelArrowUp from "../../assets/panel-arrow-up.svg";
import panelArrowDown from "../../assets/panel-arrow-down.svg";

const ArrowButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const changePanel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <a type="button" onClick={changePanel}>
      <img alt="panel arrown down" src={isOpen ? panelArrowDown : panelArrowUp} className="" />
    </a>
  );
};

export default ArrowButton;
