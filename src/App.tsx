import React from "react";
import "./App.css";
import TodoList from "./components/TodoList";

function App() {
  return (
    <>
      <div style={{ width: "fit-content", margin: "0 auto" }}>
        <TodoList />
      </div>
    </>
  );
}

export default App;
