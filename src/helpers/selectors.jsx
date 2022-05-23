export function getAppointmentsForDay(state, day) {
  
  const filteredDays = state.days.filter((checkDay) => checkDay.name === day);
  if (filteredDays.length === 0) return [];

  const appointments = filteredDays[0].appointments.map((id) => {
    return state.appointments[id];
  });
  return appointments;
}

export function getInterview(state, interview) {
if (!interview) {
  return null;
};
const interviewerId = interview.interviewer;
  const student = interview.student;
  return {
    student,
    interviewer: state.interviewers[interviewerId]
  };  
}

export function getInterviewersForDay(state, day) {
  let appointmentArray = state.days.find(dayObject => dayObject.name === day);
  if (state.days.length === 0 || appointmentArray === undefined) {
    return []
  };
  
  return appointmentArray.interviewers.map(key => state.interviewers[key]);
  }