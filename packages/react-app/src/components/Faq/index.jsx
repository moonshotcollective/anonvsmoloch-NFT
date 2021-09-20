import React, { useState } from "react";
import { Collapse } from "antd";

import "./Faq.css";

import ArrowButton from "./ArrowButton";

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
    <div className="min-w-full">
      <div className="faq-group-overlay grid grid-flow-row auto-rows-max md:auto-rows-min">
        <h1 className="faq-title p-6 ml-6">{sectionTitle}</h1>
        <div className="w-full my-4">
          <Collapse>
            {faqs.map((element, index) => (
              <>
                <Panel
                  header={getTitle(element.title, index)}
                  key={getTitle(element.title, index)}
                  className="faq-panel mx-20"
                  onClick={changePanel}
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
