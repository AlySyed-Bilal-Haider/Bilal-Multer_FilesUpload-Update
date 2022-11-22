import "./App.css";
import MuiltipleImage from "./components/MuiltipleImage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter>
        <MuiltipleImage />
      </BrowserRouter>
    </>
  );
}

export default App;
