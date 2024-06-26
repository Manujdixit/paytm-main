import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Protected(props) {
  const { Component } = props;
  const navigate = useNavigate();
  useEffect(() => {
    let login = localStorage.getItem("token");
    if (!login) {
      navigate("/");
    }
    if (login) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <>
      <Component />
    </>
  );
}

export default Protected;
