import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const PrivateRoute = (props) => {
  const { Component } = props;
  const islogin = useSelector((state) => state.is_login);
  const navigate = useNavigate();

  useEffect(() => {
    if (!islogin) {
      navigate("/login");
    }
  }, [islogin, navigate]);

  return <Component />;
};
