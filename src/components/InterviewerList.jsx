import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

const InterviewerList = (props) => {
  

  const interviewerArr = props.interviewers.map((item) => (
    <InterviewerListItem 
    key={item.id}
    name={item.name}
    avatar={item.avatar} 
    setInterviewer={() => props.onChange(item.id)} 
    selected={item.id === props.value} 
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