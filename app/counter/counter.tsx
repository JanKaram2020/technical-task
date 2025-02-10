import React, { useState } from "react";
function Counter() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");
  console.log("Counter component rendered");
  return (
    <div>
      <h2>Counter: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <br />
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something..."
      />
    </div>
  );
}
export default Counter;
