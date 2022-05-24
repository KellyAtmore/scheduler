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
      // .catch((err) => {
      //   throw err
      // })
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
    .then((response) => {
      setState((state) => ({ ...state, appointments }));
    })
    .catch((error) => {
      throw error;
    })
  };

  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.delete(`/api/appointments/${id}`, appointment)
    .then(() => {
     setState((state) => ({ ...state, appointments }));
    })
    .catch((error) => {
      throw error;
    })
}
return {state, setDay, bookInterview, cancelInterview}
};

export default useApplicationData;
