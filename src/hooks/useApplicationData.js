import {useState, useEffect} from "react";
import axios from "axios";

const useApplicationData = () => {

  const setDay = day => setState({ ...state, day });
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`)
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }));
    })
  }, []);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.put(`/api/appointments/${id}`, appointment)
    .then(() => {
      const days = updateSpots(state, appointments);
      setState((state) => ({ ...state, appointments, days }));

    })
  };

  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.delete(`/api/appointments/${id}`, id)
    .then(() => {
      const days = updateSpots(state, appointments);
     setState((state) => ({ ...state, appointments, days }));
    })
}

function updateSpots(state, appointments) {
  const dayAppointments = state.days.find(day => day.name === state.day).appointments;
  const daySpots = dayAppointments.filter(id => !appointments[id].interview).length;

  const dayIndex = state.days.findIndex(day => day.name === state.day);

  const updatedDay = { ...state.days[dayIndex] };

  updatedDay.spots = daySpots;

  const updatedDays = [...state.days];
  updatedDays[dayIndex] = updatedDay;

  return updatedDays;
};


return {state, setDay, bookInterview, cancelInterview}
};

export default useApplicationData;
