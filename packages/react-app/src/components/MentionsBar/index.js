import React from "react";

import "./MentionsBar.css";

import botFigure from "../../assets/layer-2-1@2x.png";
import mentionsimg from "../../assets/mentionsimg.svg";

const MentionsBar = () => {
  return (
		<div className="group-33969 ">
		<div className="overlap-group5">
		<div className="overlap-group4">
			<div className="flex flex-row">

			<img className="mentions-img inline" src={mentionsimg} />

			<img className="inline layer-2-1 float-left" src={botFigure} />
		</div>
		</div>
		</div>
	</div>
  );
};

export default MentionsBar;
