import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "../auth/store/auth.store";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout() as any);
    navigate("/login");
  };

  return (
    <>
      <div>Home</div>
      <button onClick={handleLogout}>Login</button>
    </>
  );
}
