import React, { Fragment } from "react";

import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";

export default function Appointment(props) {
  console.log("PROPS:", props)

  return (
    <>
      <Header time={props.time}></Header>
      

       { props.interviewer ? 
        <Show 
          student={props.interviewer.student}
          interviewer={props.interviewer.interviewer.name}
        /> : 
        <Empty 
        
        /> 
       }
      
    
      <article className="appointment">
      </article>
    </>
  )
}