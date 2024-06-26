import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function Signin() {
  const [username, setusername] = useState();
  const [password, setpassword] = useState();
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/user/signin`, {
        password,
        username,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
      toast.success("Signed in successfully");
    } catch (error) {
      toast.error("Failed to sign in. Please check credentials.");
    }
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox
            onChange={(e) => {
              setusername(e.target.value);
            }}
            placeholder={"asdf@gmail.com"}
            label={"Email"}
          />
          <InputBox
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            placeholder={"123456"}
            label={"Password"}
          />
          <div className="pt-4">
            <Button onClick={handleSignIn} label={"Sign in"} />
          </div>
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
}

export default Signin;
