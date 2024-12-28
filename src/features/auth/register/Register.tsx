import { MdOutlineEmail } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";

const Register = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-200">
      <div className="bg-white rounded shadow-md w-96 max-w-[1100px] p-6">
        <h2 className="text-3xl font-semibold uppercase text-left">Register</h2>
        <h3 className="text-xl font-normal uppercase mt-4">
          Already registred ?
        </h3>
        <p className="italic opacity-70 mt-2">
          If you have an account with us please{" "}
          <span className="text-blue-500 hover:underline cursor-pointer">
            login
          </span>
        </p>
        <div className="flex items-center gap-4 p-2 border rounded-md mt-4 font-thin border-gray-400">
          <FaRegUser className="text-xl" />
          <input
            className="w-[100%] border-none focus:outline-none"
            type="text"
            name="username"
            placeholder="Username *"
          />
        </div>
        <div className="flex items-center gap-4 p-2 border rounded-md mt-4 font-thin border-gray-400">
          <MdOutlineEmail className="text-2xl" />
          <input
            className="w-[100%] border-none focus:outline-none"
            type="email"
            name="email"
            placeholder="Email address *"
          />
        </div>
        <div className="flex items-center gap-4 p-2 border rounded-md mt-4 font-thin border-gray-400">
          <RiLockPasswordLine className="text-2xl" />
          <input
            className="w-[100%] border-none focus:outline-none"
            type="password"
            name="password"
            placeholder="Password *"
          />
        </div>
        <p className="text-blue-500 hover:underline cursor-pointer mt-2">
          Forget password ?
        </p>
        <button className="text-white bg-blue-500 w-[100%] p-2 rounded-md hover:shadow-md hover:bg-blue-700 mt-4 font-semibold uppercase">
          Submit
        </button>
      </div>
    </div>
  );
};

export default Register;
