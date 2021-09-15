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
        <div className="container">
          <Collapse onChange={changePanel}>
            {faqs.map((element, index) => (
              <>
                <Panel
                  header={getTitle(element.title, index)}
                  key={getTitle(element.title, index)}
                  className="faq-panel"
                  showArrow={false}
                  extra={<ArrowButton />}
                >
                  <p className="w-3/4">{element.description}</p>
                </Panel>
                <br />
              </>
            ))}
          </Collapse>
        </div>
      </div>
    </div>
  );
};

export default Faq;
