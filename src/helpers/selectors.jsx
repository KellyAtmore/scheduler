export function getAppointmentsForDay(state, day) {
  
  const filteredDays = state.days.filter((checkDay) => checkDay.name === day);
  if (filteredDays.length === 0) return [];

  const appointments = filteredDays[0].appointments.map((id) => {
    return state.appointments[id];
  });
  return appointments;
}