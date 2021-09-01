import React, { useEffect } from "react";
import { Typography } from "@material-ui/core";
import {logoutAction} from "../../redux/actions/userAction";
import { useSelector, useDispatch } from "react-redux";

const Logout = () => {
  const dispatch = useDispatch();
  const login = useSelector((state) => state.login);
  useEffect(() => {
    dispatch(logoutAction(login.email));
  });
  return <Typography variant="h4">Logged out succussfully!</Typography>;
};

export default Logout;