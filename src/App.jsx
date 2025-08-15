import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
