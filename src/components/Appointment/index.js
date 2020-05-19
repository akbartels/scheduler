//EXTERNAL
import React from "react";

//INTERNAL DOCS
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";

//HOOKS
import useVisualMode from "../../hooks/useVisualMode";

import "components/Appointment/styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  function save(name, interviewer) {
    if (name && interviewer) {
      
      const interview = {
        student: name,
        interviewer
      };
      transition(SAVING);

      props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));

    } else {
      transition(ERROR_SAVE);
    }
  };

  function destroy() { 
    transition(DELETING, true);
    const interview = null;

    props.cancelInterview(props.id, interview)
    .then(() => transition(EMPTY))
    .catch(() => transition(ERROR_DELETE, true));
  };


  const { mode, transition, back } = useVisualMode(
      props.interview ? SHOW : EMPTY
    );
  return (
      <article className="appointment" data-testid="appointment">
        <Header time={props.time}></Header>
        {mode === EMPTY && 
          <Empty 
            onAdd={() => transition(CREATE)} 
          />}
        {mode === SHOW && (
          <Show
            student={props.interview && props.interview.student}
            interviewer={props.interview && props.interview.interviewer.name}
            onEdit={() => transition(EDIT)}
            onDelete={() => transition(CONFIRM)}
          />
        )}
        {mode === CREATE &&
          <Form
            interviewers={props.interviewers}
            onSave={save}
            onCancel={() => back()}
          />}
          {mode === SAVING &&
          <Status 
            message="Saving"
          />}
          {mode === DELETING && 
          <Status 
            message="Deleting"
          />}
          {mode === CONFIRM && 
          <Confirm 
            message="Delete this appointment?"
            onConfirm={destroy}
            onCancel={() => back()}
          />}
          {mode === EDIT && 
          <Form
            name={props.interview.student}
            interviewer={props.interview.interviewer.id}
            interviewers={props.interviewers}
            onSave={save}
            onCancel={() => back()}
          />}
          {mode === ERROR_SAVE && 
          <Error
            message="Could not save appointment! Make sure you have entered your name AND selected an interviewer"
            onClose={() => back()}
          />}
          {mode === ERROR_DELETE && 
          <Error
            message="Could not delete appointment"
            onClose={() => back()}
          />}
        
        
      </article>
  )
}