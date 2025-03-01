import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>
);
export default App;
