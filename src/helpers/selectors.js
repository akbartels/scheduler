

export function getAppointmentsForDay(state, day) {
  const [dayName] = state.days.filter(days => days.name === day)
  const appts = state.appointments;

  let results = [];

  if ((state.days).length === 0 || !dayName) {
    return results;
  };
    
  if (dayName.name === day) {
    dayName.appointments.map((appt) => {
      results.push(appts[appt]);
    })
  };
  
  return results;
}