import { useNavigate } from "react-router";

export default function Home() {
  const navigate = useNavigate();

  const goToRegister = () => {
    localStorage.removeItem("tokenReqres");
    navigate("/register");
  };

  return (
    <>
      <div>Home</div>
      <button onClick={goToRegister}>Login</button>
    </>
  );
}
