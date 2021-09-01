import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import {
  TextField,
  Container,
  Typography,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  Grid,
  Paper,
  Button,
  Box,
} from "@material-ui/core";

import {loginAction} from "../../redux/actions/userAction";
import Login1 from "./login";
import Test from "./Test";

const Login1 = (props) => {
  
  const [user, setUser] = useState({
    email: "",
    password: "",
    role: "",
  });

  const dispatch = useDispatch();
  const login = useSelector((state) => state.login);
  
  const handleChange = (event) => {
    console.log("HandleChange");
    const usr = { ...user };
    usr[event.target.name] = event.target.value;
    //this.setState({ user: user });
    setUser(usr);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Handle submit");
    dispatch(loginAction(user));
    if (login.loggedIn) {
      props.history.push("/product");
    }
  };
  return (
    <Container>
      <Box my={2}>
        <Typography variant="h4">Login Form</Typography>
      </Box>
      <Grid
        item
        xs={12}
        sm={6}
        style={{ marginLeft: "auto", marginRight: "auto" }}
      >
        {login.errMsg && <h1>{login.errMsg}</h1>}
        <Paper elevation={3} style={{ padding: "15px" }}>
          <form
            onSubmit={handleSubmit}
            noValidate
            autoComplete="off"
          >
            <Box mb={3}>
              <TextField
                id="outlined-basic"
                fullWidth
                label="Email"
                type="email"
                variant="outlined"
                name="email"
                value={user.email}
                onChange={handleChange}
              />
            </Box>
            <Box mb={3}>
              <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                fullWidth
                name="password"
                value={user.password}
                onChange={handleChange}
              />
            </Box>
            <FormControl
              variant="outlined"
              fullWidth
              
            >
              <InputLabel id="demo-simple-select-outlined-label">
                Role
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                onChange={handleChange}
                name="role"
                value={user.role}
                label="Role"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="customer">Customer</MenuItem>
              </Select>
            </FormControl>
            <Box mt={3}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
              >
                Login
              </Button>
            </Box>
          </form>
        </Paper>
      </Grid>
      <Login1 />
    </Container>
  );
};

export default Login1;