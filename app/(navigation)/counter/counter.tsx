"use client";
import React, { useState } from "react";

const InnerCounter = () => {
  const [count, setCount] = useState(0);
  return (
    <div className="p-4 bg-white shadow-md rounded-lg text-center">
      <h2 className="text-xl font-semibold mb-2">Counter: {count}</h2>
      <button
        onClick={() => setCount(count + 1)}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        Increment
      </button>
    </div>
  );
};

const TextInput = () => {
  const [text, setText] = useState("");
  return (
    <input
      type="text"
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder="Type something..."
      className="w-full p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
    />
  );
};

function Counter() {
  console.log("Counter component rendered");
  return (
    <div className="max-w-md mx-auto p-4 bg-gray-100 shadow-lg rounded-lg space-y-4">
      <InnerCounter />
      <TextInput />
    </div>
  );
}

export default Counter;
