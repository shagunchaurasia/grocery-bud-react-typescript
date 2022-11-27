import React from "react";
import "./App.css";
import GroceryList from "./components/GroceryList/GroceryList";

function App() {
  return (
    <div
      className="container"
      style={{ display: "flex", justifyContent: "center", width: "40%", padding:"3%", border:"rgba(0,0,0,.25) solid", borderRadius:"20px", marginTop:"2%" }}
    >
      <GroceryList></GroceryList>
    </div>
  );
}

export default App;
