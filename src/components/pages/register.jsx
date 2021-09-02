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
  FormHelperText,
} from "@material-ui/core";

import axios from "axios";
import Joi from 'joi';

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
    fullName: '',
    email: '',
    mobileNo: '',
    password: '',
    role: '',
  });

  //For validating the form fields
  const [errors, setErrors] = useState()

  const handleFormSubmit = (event) => {
    event.preventDefault();

    //Checking if there are errors
    const errors = validate();
    setErrors(errors);

    //If errors exists then don't dispatch the action
    if(errors) 
      return;

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

  //Schema for form field validation
  const schema = Joi.object({
    fullName: Joi.string().required(),
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    mobileNo: Joi.string().pattern(new RegExp('^[7-9]\\d{9}$')),
    password: Joi.string().required(),
    role: Joi.string().required()
  })

  //Now writing a separate validate function which would be called later.
  const validate = () => {

    //Creating errors object, which would be returned
    const errors = {}

    const result = schema.validate(user, {
      abortEarly: false
    })

    console.log(result);

    //Populating the errors object if errors exists.
    if (result.error != null) {
      for (let error of result.error.details) {
        errors[error.path[0]] = error.message
      }
    }

    return Object.keys(errors).length === 0 ? null : errors
  }

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
          <Typography 
            variant="h4" 
            align="center" 
          >
            Sign Up
          </Typography>
        </Box>

        <Paper elevation={3} className={classes.paper}>
          <form onSubmit={handleFormSubmit}>

            <TextField
              label="Full Name"
              placeholder="Enter your full name"
              error={errors && errors.fullName ? true : false}
              helperText={errors && errors.fullName}
              name="fullName"
              value={user.fullName}
              onChange={handleChange}
              fullWidth
              style={{ marginBottom: 10 }}
            />

            <TextField
              label="Email"
              placeholder="Enter email"
              error={errors && errors.email ? true : false}
              helperText={errors && errors.email}
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
              error={errors && errors.mobileNo ? true : false}
              helperText={errors && errors.mobileNo}
              name="mobileNo"
              value={user.mobileNo}
              onChange={handleChange}
              fullWidth
              style={{ marginBottom: 10 }}
            />

            <TextField
              label="Password"
              placeholder="Enter password"
              error={errors && errors.password ? true : false}
              helperText={errors && errors.password}
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
              error={errors && errors.role ? true : false}
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
              <FormHelperText>{errors && errors.role}</FormHelperText>
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