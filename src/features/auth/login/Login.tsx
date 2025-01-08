import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { login, RegisterPayload, RootState } from "../store/auth.store";
import { useEffect, useState } from "react";

const Login = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const [loginPayload, setLoginPayload] = useState<RegisterPayload>({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginPayload({
      ...loginPayload,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login(loginPayload) as any);
  };

  const isDesabled = () => {
    return loginPayload.email === "" || loginPayload.password === "";
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-200">
      <form
        className="bg-white rounded shadow-md w-96 max-w-[1100px] p-6"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-semibold uppercase text-left">Login</h2>
        <h3 className="text-xl font-normal uppercase mt-4">
          Already registred ?
        </h3>
        <p className="italic opacity-70 mt-2">
          Don't have an account ?
          <Link
            className="text-blue-500 hover:underline cursor-pointer pl-1"
            to="/register"
          >
            Sign up
          </Link>
        </p>
        <div className="flex items-center gap-2 p-2 border rounded-md mt-4 font-thin border-gray-400">
          <MdOutlineEmail className="text-xl" />
          <input
            className="w-[100%] border-none focus:outline-none"
            type="email"
            name="email"
            placeholder="Email address *"
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center gap-2 p-2 border rounded-md mt-4 font-thin border-gray-400">
          <RiLockPasswordLine className="text-2xl" />
          <input
            className="w-[100%] border-none focus:outline-none"
            type="password"
            name="password"
            placeholder="Password *"
            onChange={handleChange}
          />
        </div>
        <p className="text-blue-500 hover:underline cursor-pointer mt-2">
          Forget password ?
        </p>
        <p>email: eve.holt@reqres.in - password: cityslicka</p>
        <button
          disabled={isDesabled()}
          type="submit"
          className="text-white bg-blue-500 w-[100%] p-2 rounded-md hover:shadow-md hover:bg-blue-700 mt-4 font-semibold uppercase"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
