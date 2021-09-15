import React, { useState } from "react";
import { Collapse, Col } from "antd";
import ArrowButton from "./ArrowButton";

import "./Faq.css";

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
    <div className="min-w-full bg-green-050">
      <div className="overlap-group7 grid grid-flow-row auto-rows-max md:auto-rows-min">
        <h1 className="faq-title text-center">{sectionTitle}</h1>
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
                  <p className="w-3/4">{element.description}</p>
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
