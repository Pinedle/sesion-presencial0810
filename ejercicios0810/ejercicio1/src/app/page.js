"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import "./globals.css";

const Ejercicio1 = () => {
  const [count, setCount] = useState(0);
  const [delay, setDelay] = useState(500);
  const [title, setTitle] = useState("Count: 0");

  const incrementCount = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
  }, []);

  const updatedTitle = useMemo(() => {
    return `Count: ${count}`;
  }, [count]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      document.title = updatedTitle;
      setTitle(updatedTitle);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [count, delay, updatedTitle]);

  const resetCount = useCallback(() => {
    setCount(0);
  }, []);

  return (
    <div>
      <h1>{title}</h1>
      <button onClick={incrementCount}>Incrementar</button>
      <button onClick={resetCount}>Resetear</button>
      <input
        type="number"
        value={delay}
        onChange={(e) => setDelay(Number(e.target.value))}
        placeholder="Retraso (ms)"
      />
    </div>
  );
};
export default Ejercicio1;