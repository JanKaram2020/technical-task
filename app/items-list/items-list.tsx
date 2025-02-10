import React, { useState, useEffect } from "react";
function ItemsList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching items:", error);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <h2>Items List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {items.map((item, index) => (
            <li key={index}>{item.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default ItemsList;
