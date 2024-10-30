"use client";
import { useState, useEffect, useCallback } from 'react';
import styles from './globals.css';

const Ejercicio4 = () => {
  const [query, setQuery] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = useCallback(async (query) => {
    setIsFetching(true);
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users?name_like=${query}`);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  }, []);

  // useEffect con debounce para controlar la solicitud a la API
  useEffect(() => {
    const handler = setTimeout(() => {
      if (query) fetchData(query);
    }, 500); // Espera de 500ms antes de hacer la solicitud

    return () => clearTimeout(handler); // Limpiamos el timeout si el query cambia
  }, [query, fetchData]);

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar usuarios"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {isFetching ? <p>Cargando...</p> : null}
      <ul>
        {data.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Ejercicio4;
