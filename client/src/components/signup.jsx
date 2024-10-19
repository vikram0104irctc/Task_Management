import React, { useRef } from "react";
import { RiLoginCircleFill } from "react-icons/ri";
import { AiFillGoogleCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const SignupForm = () => {
  const navigate = useNavigate();

  let nameinput = useRef("");
  let emailinput = useRef("");
  let passwordinput = useRef("");

  function handleSignup(e) {
    e.preventDefault();
    let name = nameinput.current.value;
    let email = emailinput.current.value;
    let password = passwordinput.current.value;

    if (!name || !email || !password) {
      toast.error("Please fill all the fields", {
        transition: Bounce,
        autoClose: 2000,
        position: "top-center",
      });
      return;
    }
    if (name.length < 3) {
      toast.error("Name should be at least 3 characters long", {
        transition: Bounce,
        autoClose: 2000,
        position: "top-center",
      });
      return;
    }
    if (!email.includes("@")) {
      toast.error("Invalid email address", {
        transition: Bounce,
        autoClose: 2000,
        position: "top-center",
      });
      return;
    }
    if (password.length < 8) {
      toast.error("Password should be at least 8 characters long", {
        transition: Bounce,
        autoClose: 2000,
        position: "top-center",
      });
      return;
    }
    let specialChar = /[!@#$%^&*(),.?":{}|<>]/;
    let capitalLetter = /[A-Z]/;
    let smallLetter = /[a-z]/;
    let number = /[0-9]/;
    if (
      !specialChar.test(password) ||
      !capitalLetter.test(password) ||
      !smallLetter.test(password) ||
      !number.test(password)
    ) {
      toast.error(
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        {
          transition: Bounce,
          autoClose: 5000,
          position: "top-center",
        }
      );
      return;
    }

    let obj = {
      name: name,
      email: email,
      password: password,
    };
    axios
      .post("http://localhost:8081/api/register", obj)
      .then((res) => {
        toast.success("Signup successful 😀", {
          transition: Bounce,
          autoClose: 2000,
          position: "top-center",
        });
        navigate("/login");
      })
      .catch((err) => {
        toast.error("Signup failed", {
          transition: Bounce,
          autoClose: 2000,
          position: "top-center",
        });
      });
  }

  return (
    <div
      id="loginpagecontainer"
      className="relative h-screen bg-[#080710] font-sans mt-10"
    >
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[530px] w-[430px]">
        <div className="absolute h-[200px] w-[200px] rounded-full top-[-50px] right-[-50px] bg-gradient-to-r from-[#00FF3B] via-[#0012FF] to-[#FCB045]" />
        <div className="absolute h-[200px] w-[200px] rounded-full bottom-[-50px] left-[-50px] bg-gradient-to-r from-[#FF0000] via-[#BC00FF] to-[#FCB045]" />
      </div>
      <form className="absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[540px] w-[340px] z-5 p-5 bg-white bg-opacity-10 shadow-[1px_1px_15px_1px_rgba(0,0,0,0.15)] backdrop-blur-md border-[1px] border-white border-opacity-5 rounded-[10px_50px]">
        <h3 className="text-center text-white text-2xl py-2">Signup here!</h3>

        <label htmlFor="name" className="block pt-5 pb-2 text-white text-lg">
          Name
        </label>
        <input
          ref={nameinput}
          type="text"
          id="name"
          placeholder="Enter Name"
          className="w-full outline-none h-10 px-2 bg-[#ffffff0b] text-white placeholder:text-white placeholder:opacity-75 text-lg rounded-md hover:bg-[#ffffff10] transition-all duration-450"
        />

        <label htmlFor="user" className="block pt-5 pb-2 text-white text-lg">
          Email
        </label>
        <input
          ref={emailinput}
          type="text"
          id="user"
          placeholder="Enter Email"
          className="w-full outline-none h-10 px-2 bg-[#ffffff0b] text-white placeholder:text-white placeholder:opacity-75 text-lg rounded-md hover:bg-[#ffffff10] transition-all duration-450"
        />

        <label htmlFor="psw" className="block pt-5 pb-2 text-white text-lg">
          Password
        </label>
        <input
          ref={passwordinput}
          type="password"
          id="psw"
          placeholder="Enter Password"
          className="w-full h-10 px-2 outline-none bg-[#ffffff0b] text-white placeholder:text-white placeholder:opacity-75 text-lg rounded-md hover:bg-[#ffffff10] transition-all duration-450"
        />

        <button
          onClick={handleSignup}
          className="w-full h-10 mt-10 mb-5 bg-white text-black text-lg font-bold rounded-full hover:bg-[#ffffffc2] transition-all duration-450"
        >
          SignUp Now
        </button>

        <div className="flex justify-evenly items-center gap-2">
          <div className="w-[140px] py-2 bg-[#00000023] text-white text-center flex justify-center items-center gap-4 rounded-md hover:bg-[#00000036] transition-all duration-450 cursor-pointer">
            <i>
              <AiFillGoogleCircle className="text-2xl" />
            </i>{" "}
            Google
          </div>
          <div
            onClick={() => navigate("/login")}
            className="w-[140px] py-2 bg-[#00000023] text-white text-center flex justify-center items-center gap-4 rounded-md hover:bg-[#00000036] transition-all duration-450 cursor-pointer"
          >
            <i>
              <RiLoginCircleFill className="text-2xl" />
            </i>
            Login
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
