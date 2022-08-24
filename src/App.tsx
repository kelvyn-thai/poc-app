import React from "react";
import "styles/tailwind.scss";
import logo from "./logo.svg";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="App-text">
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link text-lg text-blue-500"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
