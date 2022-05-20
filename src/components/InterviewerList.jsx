import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";



const InterviewerList = ({ interviewers, value, onChange }) => {
  

  const interviewerArr = interviewers.map((item) => (
    <InterviewerListItem 
    key={item.id}
    name={item.name} 
    avatar={item.avatar} 
    setInterviewer={() => onChange(item.id)} 
    selected={item.id === value} 
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