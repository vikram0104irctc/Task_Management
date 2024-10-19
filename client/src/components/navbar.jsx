import { useNavigate } from "react-router-dom";
import { Logo } from "./logo";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginTracker } from "../redux/actions";
import TaskFormModal from "./task";

export const Navbar = () => {
  const islogin = useSelector((state) => state.is_login);

  const [isBlurred, setIsBlurred] = useState(false);

  const [isopen, setIsOpen] = useState(false);

  let dispatch = useDispatch();

  const navigate = useNavigate();

  const handleScroll = () => {
    if (window.scrollY > 10) {
      setIsBlurred(true);
    } else {
      setIsBlurred(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    toast.success("Logout successful 😊", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    dispatch(loginTracker(false));
    navigate("/login");
  }

  return (
    <div>
      {isopen ? <TaskFormModal setIsOpen={setIsOpen} /> : ""}
      <div
        className={`w-full fixed top-0 left-0 z-50 border-b-[1px] border-zinc-600 ${
          isBlurred ? "backdrop-blur-md" : ""
        }`}
      >
        <div className="max-w-[1360px] m-auto px-5 py-2  flex justify-between items-center">
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-1 cursor-pointer"
          >
            <Logo />
            <h1
              id="navbarlogo"
              className="text-transparent cursor-pointer bg-clip-text bg-gradient-to-r from-[#FF0000] via-[#BC00FF] to-[#FCB045] font-bold text-2xl "
            >
              Task Manager
            </h1>
          </div>
          <div className="flex gap-4">
            {islogin ? (
              <>
                <p
                  onClick={() => setIsOpen(!isopen)}
                  className="text-white border py-1 px-4 rounded-lg cursor-pointer"
                >
                  Add Task
                </p>
                <p
                  onClick={handleLogout}
                  className="text-white border py-1 px-4 rounded-lg cursor-pointer"
                >
                  Logout
                </p>
              </>
            ) : (
              <>
                <p
                  onClick={() => navigate("/login")}
                  className="text-white border py-1 px-4 rounded-lg cursor-pointer"
                >
                  Login
                </p>
                <p
                  onClick={() => navigate("/signup")}
                  className="text-white border py-1 px-4 rounded-lg cursor-pointer"
                >
                  Sign Up
                </p>
              </>
            )}
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};
