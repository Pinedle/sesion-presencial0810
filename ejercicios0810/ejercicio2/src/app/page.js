"use client";

import { useState, useEffect, useCallback } from "react";
import styles from "./globals.css";

const Ejercicio2 = () => {
  const [data, setData] = useState([]); 
  const [currentData, setCurrentData] = useState([]); 
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const itemsPerPage = 5; 

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users`
      );
      if (!response.ok) throw new Error("Error al obtener los datos");
      const result = await response.json();
      setData(result); 
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  
  useEffect(() => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setCurrentData(data.slice(startIndex, endIndex)); 
  }, [page, data]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div>
      <h1>Usuarios</h1>
      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {currentData.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}

      <div>
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Pagina Anterior
        </button>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page * itemsPerPage >= data.length}
        >
          Siguiente Pagina
        </button>
      </div>
    </div>
  );
};

export default Ejercicio2;
