//EXTERNAL
import React from "react";

//INTERNAL DOCS
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";


//HOOKS
import useVisualMode from "../../hooks/useVisualMode";

import "components/Appointment/styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE"

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
      props.interview ? SHOW : EMPTY
    );
  return (
      <article className="appointment">
        <Header time={props.time}></Header>
        {mode === EMPTY && 
          <Empty 
            onAdd={() => transition(CREATE)} 
          />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer.name}
            onEdit={props.onEdit}
            onDelete={props.onDelete}
          />
        )}
        {mode === CREATE &&
          <Form
            interviewers={[]}
            onSave={props.onSave}
            onCancel={() => back()}
          />}
        
        
      </article>
  )
}