//EXTERNAL
import React from "react";

//INTERNAL DOCS
import Appointment from "components/Appointment/index";
import DayList from "components/DayList";
import useApplicationData from "hooks/useApplicationData";

//SELECTORS
import {getAppointmentsForDay, getInterview, getInterviewerForDay} from "../helpers/selectors";

//CSS
import "components/Application.scss";


export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();


  const appointments = getAppointmentsForDay(state, state.day).map(appointment => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment 
        key={appointment.id}
        id={appointment.id}
        interview={interview}
        interviewers={getInterviewerForDay(state, state.day)}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });
  

  //Application Component returns:
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
        {appointments}
        <Appointment 
          id="last" 
          time="6pm" 
        />
      </section>
    </main>
  );
};


