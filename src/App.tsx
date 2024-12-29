import { Route, Routes } from "react-router";
import Register from "./features/auth/register/Register";
import Login from "./features/auth/login/Login";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}
