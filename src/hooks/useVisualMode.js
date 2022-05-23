import { useState } from "react";


const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);


    const transition = (newMode, replace = false) => {
      if(replace) { 
        setHistory([...history.slice(0, history.length-1), newMode]);
        return setMode(newMode);
      } 
      setHistory([...history, newMode]);
      setMode(newMode);
    }
    
  

  const back = () => {
    setHistory((prev) => {
      if (history.length === 1) {
        return;
      }

      const arrayWithItemRemoved = prev.slice(1)
      setMode(arrayWithItemRemoved[0]);
      return arrayWithItemRemoved
    })
  }

  return {mode, transition, back};
};

export default useVisualMode