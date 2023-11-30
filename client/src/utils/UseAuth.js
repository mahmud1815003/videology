import React, { useEffect, useState } from "react";
import { useVerifyMutation } from "../redux/api/auth";
import { useDispatch, useSelector } from "react-redux";
import { Box, CircularProgress } from "@mui/material";
import { login, logout } from "../redux/slice/auth";

const useAuth = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("auth");
  const  [check, setCheck] = useState(false);
  const [verify, { data, error, isError, isLoading, isSuccess }] = useVerifyMutation();
  useEffect(() => {
    if (token) {
      verify(JSON.parse(token));
    }else{
      setCheck(true);
    }
  }, []);
  useEffect(() => {
    if(!isLoading && isSuccess){
      dispatch(login(data));
      setCheck(true);
    }
    if(!isLoading && isError){
      localStorage.clear('auth');
      setCheck(true);
    }
  }, [isLoading])
  return check;
};

export default useAuth;
