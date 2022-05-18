import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

const InterviewerListItem = ({ name, avatar, selected, setInterviewer }) => {
  const interviewerClass = classNames('interviewers__item', 
  { 'interviewers__item--selected': selected });

  return (
    <li onClick={setInterviewer} className={interviewerClass}>
      <img className="interviewers__item-image" src={avatar} alt={name} />
      {selected && name}
    </li>
  );
};

export default InterviewerListItem;