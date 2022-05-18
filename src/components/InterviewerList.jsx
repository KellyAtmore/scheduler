import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";



const InterviewerList = ({ interviewers, value, onChange }) => {
  

  const interviewerArr = interviewers.map((i) => (
    <InterviewerListItem 
    key={i.id}
    name={i.name} 
    avatar={i.avatar} 
    setInterviewer={() => onChange(i.id)} 
    selected={i.id === value} 
    />
  ));

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerArr}</ul>
    </section>
  );
};

export default InterviewerList;