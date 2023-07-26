import React from "react";
import { useState } from "react";
const App = () => {
  const [tweet, setTweet] = useState("");
  const [time, setTime] = useState(0);
  return (
    <>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          console.log(tweet);
          fetch("http://localhost:8080/", {
            method: "post",
            headers: { "content-Type": "application/json" },
            body: JSON.stringify({ Tweet: tweet, Time: time }),
          });
        }}
      >
        <div>
          <p>content: </p>
          <input
            type="text"
            onChange={(e) => {
              setTweet(e.target.value);
            }}
          />
        </div>
        <div>
          <p>time</p>
          <input
            type="text"
            onChange={(e) => {
              setTime(e.target.value);
            }}
          />
        </div>
        <button type="submit">tweet</button>
      </form>
    </>
  );
};

export default App;
