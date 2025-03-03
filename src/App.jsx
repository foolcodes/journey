import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Overview from "./components/Overview";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/overview" element={<Overview />} />
    </Routes>
  </BrowserRouter>
);
export default App;
