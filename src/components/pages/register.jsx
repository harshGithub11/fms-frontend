import React, { useState } from "react";
import {
  Typography,
  TextField,
  InputLabel,
  FormControl,
  Select,
  Grid,
  Paper,
  Button,
  Box,
  makeStyles,
  MenuItem,
} from "@material-ui/core";

import axios from "axios";

import customTheme from '../../util/theme';

const useStyles = makeStyles((theme) => ({
  paper: {
      backgroundColor: '#fff',
      color: '#fff',
      padding: theme.spacing(2),
  },
  ...customTheme.spreadThis
}));

const Register = (props) => {

  const classes = useStyles();

  const [user, setUser] = useState({
    firstName: '',
    email: '',
    mobileNo: '',
    password: '',
    role: '',
  });

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log("handleFormSubmit called");

    const usr = {
      fullName: user.fullName,
      id: 0,
      login: {
        email: user.email,
        password: user.password,
        role: user.role,
      },
      mobileNo: user.mobileNo,
    };
    axios.post("http://localhost:8081/users", usr)
      .then((res) => {
        console.log(res);
        props.history.push("/login");
      })
      .catch(err => {
        console.log(err.response.data)
      })
  };

  const handleChange = (event) => {
    event.preventDefault();
    const usr = { ...user };
    usr[event.target.name] = event.target.value;
    setUser(usr);
  };

  return (
    <div>
      <Grid
        item
        sm={6}
        style={{
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Box my={1}>
          <Typography variant="h4" align="center">
            Sign Up
        </Typography>
        </Box>
        
        <Paper elevation={3} className={classes.paper}>
          <form onSubmit={handleFormSubmit}>
            
            <TextField
              label="Full Name"
              placeholder="Enter your full name"
              name="fullName"
              value={user.fullName}
              onChange={handleChange}
              fullWidth
              style={{ marginBottom: 10 }}
            />

            <TextField
              label="Email"
              placeholder="Enter email"
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              fullWidth
              style={{ marginBottom: 10 }}
            />
            
            <TextField
              label="Mobile No"
              placeholder="Enter mobile number"
              name="mobileNo"
              value={user.mobileNo}
              onChange={handleChange}
              fullWidth
              style={{ marginBottom: 10 }}
            />

            <TextField
              label="Password"
              placeholder="Enter password"
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              fullWidth
              style={{ marginBottom: 10 }}
            />

            <FormControl  
              fullWidth
              style={{ marginBottom: 10 }}
            >
              <InputLabel htmlFor="filled-age-native-simple">Role</InputLabel>
              <Select
                label="Role"
                name="role"
                value={user.role}
                onChange={handleChange}
              >
                <MenuItem value="">
                  <strong>None</strong>
                </MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="user">User</MenuItem>
              </Select>
            </FormControl>
            <Box my={1} className="text-center">
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                type="submit"
              >
                Register
              </Button>
            </Box>
          </form>
        </Paper>
      </Grid>
    </div>
  );
};

export default Register;