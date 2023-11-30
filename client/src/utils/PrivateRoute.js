import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
        navigate("/");
    }
  }, [token]);
  return children;
};

export default PrivateRoute;
