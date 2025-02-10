"use client";
import React, { useState } from "react";

const InnerCounter = () => {
  const [count, setCount] = useState(0);
  return (
    <>
      <h2>Counter: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </>
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
    />
  );
};

function Counter() {
  console.log("Counter component rendered");
  return (
    <div>
      <InnerCounter />
      <br />
      <TextInput />
    </div>
  );
}

export default Counter;
