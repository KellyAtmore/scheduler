import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";

export default function Appointment(props) {
 
  
  const { mode, transition, back} = useVisualMode(
  props.interview ? SHOW : EMPTY

 );

 const save = (name, interviewer) => {
  const interview = {
    student: name,
    interviewer
    
  };
  transition(SAVING);
  props.bookInterview(props.id, interview)
  .then(() => {
    transition(SHOW);
  })
}
const onDelete = () => {
  transition(CONFIRM)
}

function confirmDelete() {
  transition(DELETING, true);
  props
    .cancelInterview(props.id)
    .then(() => {
      transition(EMPTY);
    })
    .catch((error) => {
    });
}



return (
  <article className="appointment">
<Header time={props.time} id={props.id} />
{mode === EMPTY && 
<Empty onAdd={() => transition(CREATE)} />
        }
{mode === SHOW && 
  <Show
    student={props.interview.student}
    interviewer={props.interview.interviewer}
    
    onDelete={onDelete}
  />
}
{mode === CREATE && 
  <Form
   interviewers={props.interviewers}
   onCancel={back}
   onSave={save}
  />
}
         {mode === CONFIRM && <Confirm message={"Are you should you want to delete this?"} onConfirm={() => confirmDelete(props.id)} onCancel={()=>transition(SHOW)}/>}
{mode === DELETING && <Status message={"Deleting"} />}
{mode === SAVING && <Status message={"Saving"} />}
</article>
);
}

