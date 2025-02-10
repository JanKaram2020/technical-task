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
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Items List</h2>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : Array.isArray(items) && items.length ? (
        <ul className="space-y-2">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center p-2 border rounded-lg shadow-sm"
            >
              <p className="text-gray-800">{item.title}</p>
              <span
                className={`px-2 py-1 text-xs font-semibold rounded-lg w-20 text-center ${
                  item.completed
                    ? "bg-green-500 text-white"
                    : "bg-gray-300 text-gray-700"
                }`}
              >
                {item.completed ? "Completed" : "Pending"}
              </span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default ItemsList;
