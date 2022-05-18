import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";



const InterviewerList = ({ interviewers, interviewer, setInterviewer }) => {
  

  const interviewerArr = interviewers.map((i) => (
    <InterviewerListItem 
    name={i.name} 
    avatar={i.avatar} 
    setInterviewer={() => setInterviewer(i.id)} 
    selected={i.id === interviewer} 
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