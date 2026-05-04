import React from "react";
import { useState } from "react";

function SearchBar({ onSearch }) {
  const [userInput, setUserInput] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting:", userInput);
    onSearch(userInput);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={userInput}
        placeholder="Enter stock ticker"
        onChange={(e) => setUserInput(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default SearchBar;
