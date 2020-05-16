//EXTERNAL
import React, { useState, useEffect } from "react";
import axios from "axios";

//INTERNAL
import Appointment from "components/Appointment/index";
import DayList from "components/DayList";
import {getAppointmentsForDay, getInterview} from "../helpers/selectors";


import "components/Application.scss";


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = day => setState({ ...state, day });

  useEffect(() => {   
    Promise.all([
      Promise.resolve(axios.get("http://localhost:8001/api/days")),
      Promise.resolve(axios.get("http://localhost:8001/api/appointments")),
      Promise.resolve(axios.get("http://localhost:8001/api/interviewers")),
      
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    })
  },[]);

  function bookInterview(id, interview) {
    console.log(id, interview)
  };

  

  const appointments = getAppointmentsForDay(state, state.day);
  
  const appointmentsList = appointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment 
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        onBookInterview={bookInterview(appointment.id, appointment.interview)}
        onSave={function save(name, interviewer) {
          const interview = {
            student: name,
            interviewer
          }
        }}
        // {...appointment}
      />
    )
  })
  

  //Application returns:
  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        <DayList
          days={state.days}
          day={state.day}
          setDay={setDay}
        />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        {appointmentsList}
        <Appointment 
          id="last" 
          time="6pm" 
          // bookInterview={bookInterview}
        />
      </section>
    </main>
  );
}


