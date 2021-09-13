import React, { useState } from "react";
import { Collapse, Button, Col } from "antd";
import ArrowButton from "./ArrowButton";

import "./Faq.css";

import panelArrowUp from "../../assets/panel-arrow-up.svg";
import panelArrowDown from "../../assets/panel-arrow-down.svg";

const { Panel } = Collapse;

const getTitle = (title, index) => {
  const num = index + 1;
  return `#${num} ${title}  `;
};

const Faq = ({ sectionTitle, faqs }) => {
  const [isOpen, setIsOpen] = useState(false);

  const changePanel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="faq">
      <div className="overlap-group7">
        <Col span={12} offset={6}>
          <h1 className="faq-title">{sectionTitle}</h1>
        </Col>
        <Col span={12} offset={6}>
          <Collapse onChange={changePanel}>
            {faqs.map((element, index) => (
              <>
                <Panel
                  header={getTitle(element.title, index)}
                  key={getTitle(element.title, index)}
                  className={isOpen ? "faq-panel-white" : "faq-panel-emrald"}
                  showArrow={false}
                  extra={<ArrowButton />}
                >
                  <p>{element.description}</p>
                </Panel>
                <br />
              </>
            ))}
          </Collapse>
        </Col>
      </div>
    </div>
  );
};

export default Faq;
