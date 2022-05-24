import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";

//Options for 
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const EDIT = "EDITING";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
 const { mode, transition, back} = useVisualMode(
  
  //on initial load, an appointment is either empty or not (ie. the appointment is shown or there is an 'add' button)
  props.interview ? SHOW : EMPTY
);

console.log("mode", mode);
//user saves an appointment and the SHOW component is rendered
 const save = (name, interviewer) => {
  const interview = {
    student: name,
    interviewer
    };
  transition(SAVING); 
  props.bookInterview(props.id, interview)
  .then(() => { //a promise is returned from the axios call
    transition(SHOW);
  })
  .catch(() => {
    transition(ERROR_SAVE, true)});
}

//if delete is selected, confirm this is what they want as it is a destructive action
const onDelete = () => {
  transition(CONFIRM)
}

//delete an appointment and render the EMPTY view
function confirmDelete() {
  
  transition(DELETING, true);
  props
    .cancelInterview(props.id)
    .then((res) => {
      transition(EMPTY)
      
     })
      .catch(() => transition(ERROR_DELETE, true));
    }

//components are rendered below based on what has been selected and their state 
return (
  <article className="appointment">

<Header time={props.time} 
  id={props.id} 
/>

{mode === EMPTY && 
<Empty onAdd={() => transition(CREATE)} 
 />
  }

{mode === SHOW && 
  <Show
    student={props.interview.student}
    interviewer={props.interview.interviewer}
    onDelete={onDelete}
    onEdit={() => transition(EDIT)}
  />
}

{mode === CREATE && 
  <Form
   interviewers={props.interviewers}
   onCancel={() => back()}
   onSave={save}
  />
} 
{mode === EDIT && (
  <Form
    interviewers={props.interviewers}
    onCancel={() => back()}
    onSave={save}
    student={props.interview.student}
    interviewer={props.interview.interviewer.id}
    status={true}
    />
  )}
  
  {mode === CONFIRM && 
  <Confirm message={"Are you should you want to delete this?"} 
  onConfirm={() => confirmDelete(props.id)} 
  onCancel={()=>transition(SHOW)}
  />}

{mode === ERROR_DELETE && 
  <Error
  message={"Could not cancel appointment."}
  onClose={() => back()}
    />
  }
{mode === ERROR_SAVE && 
   <Error
   message={"Could not save appointment."}
   onClose={() => back()}
  />
  }

{mode === DELETING && 
<Status message={"Deleting"} 
/>}

{mode === SAVING && 
<Status message={"Saving"} 
/>}
</article>
)
}


