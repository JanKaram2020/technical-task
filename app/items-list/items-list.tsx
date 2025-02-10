"use client";
import React, { useState, useEffect, useRef } from "react";

type Todos = Array<{
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}>;

const useTodos = () => {
  const [items, setItems] = useState<Todos>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      const abortController = new AbortController();
      abortControllerRef.current = abortController;
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/todos", {
          signal: abortController.signal,
        });
        if (!res.ok) {
          setError("Failed to fetch todos");
          return;
        }
        const data: Todos = await res.json();
        setItems(data);
      } catch (e) {
        if (!(e instanceof DOMException && e.name === "AbortError")) {
          setError("An error occurred while fetching todos.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => abortControllerRef.current?.abort();
  }, []);

  return { items, loading, error };
};

const ItemsList = () => {
  const { items, loading, error } = useTodos();

  return (
    <div>
      <h2>Items List</h2>
      {error ? (
        <p>{error}</p>
      ) : loading ? (
        <p>Loading...</p>
      ) : Array.isArray(items) && items.length ? (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <p>{item.title}</p>
              <span>{item.completed ? "Completed" : "Pending"}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default ItemsList;
