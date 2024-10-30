"use client";
import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './globals.css';

const Ejercicio3 = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null); // Usamos useRef para el intervalo

  const startTimer = useCallback(() => {
    if (!isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
      setIsRunning(true);
    }
  }, [isRunning]);

  const pauseTimer = useCallback(() => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  }, []);

  const resetTimer = useCallback(() => {
    clearInterval(intervalRef.current);
    setTime(0);
    setIsRunning(false);
  }, []);

  
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div>
      <h1>Tiempo: {time} segundos</h1>
      <button onClick={startTimer} disabled={isRunning}>
        Iniciar
      </button>
      <button onClick={pauseTimer} disabled={!isRunning}>
        Pausar
      </button>
      <button onClick={resetTimer}>Reiniciar</button>
    </div>
  );
};

export default Ejercicio3;
