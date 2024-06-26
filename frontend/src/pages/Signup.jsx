import React from "react";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function Signup() {
  const [firstName, setfirstName] = useState();
  const [lastName, setlastName] = useState();
  const [username, setusername] = useState();
  const [password, setpassword] = useState();
  const navigate = useNavigate();

  const onclickhandler = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/user/signup`, {
        firstName,
        lastName,
        username,
        password,
      });
      console.log("Signup successful. Response:", response.data);
      toast.success("Signup Successful");
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      toast.error("Failed to sign up. Please check credentials.");
    }
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter information to create an account"} />
          <InputBox
            onChange={(e) => {
              setfirstName(e.target.value);
            }}
            placeholder={"John"}
            label={"First Name"}
          />
          <InputBox
            onChange={(e) => {
              setlastName(e.target.value);
            }}
            placeholder={"Doe"}
            label={"Last Name"}
          />
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
            placeholder={"12345678"}
            label={"Password"}
          />
          <div className="pt-4">
            <Button onClick={onclickhandler} label={"Sign up"} />
          </div>
          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/"}
          />
        </div>
      </div>
    </div>
  );
}
