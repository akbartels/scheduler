import React, { useState, useEffect } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  const transition = (newMode) => {
    setMode(newMode);
    setHistory(newMode);
  }

  const back = (prevMode) => {
    setMode(history);
  }
  

  return {mode, transition};






};