import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Login";
import Dashboard from "./Dashboard";
import React = require("react");
import { Routes, Route } from "react-router-dom";
import Favorites from "./Favorites";

export const code = new URLSearchParams(window.location.search).get("code");

function App() {
  if (code) {
    return (
      <Routes>
        <Route path="/" element={<Dashboard code={code} />}/>
        <Route path="/favorites" element={<Favorites />}/>
      </Routes>
      ); 
  }
  else{
    return (
      <Login />
      );
  }
  // return code ? <Dashboard code={code} /> : <Login />;
}

export default App;
