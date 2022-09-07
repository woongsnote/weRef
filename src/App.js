import React from "react";
import Router from "../src/shared/Router";

function App() {
  if (process.env.NODE_ENV === "production") {
    console.log = function no_console() {};
  }
  console.log("확인용 콘솔입니다.");
  return <Router />;
}

export default App;
