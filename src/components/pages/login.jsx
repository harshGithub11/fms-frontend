import { 
    Box, 
    Button, 
    Container, 
    FormControl, 
    FormHelperText, 
    Grid, 
    InputLabel, 
    makeStyles, 
    MenuItem, 
    Paper, 
    Select, 
    TextField, 
    Typography 
} from '@material-ui/core';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../../redux/actions/userAction';

import customTheme from '../../util/theme';
import { Link, Redirect } from 'react-router-dom';

import Joi from 'joi';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
    paper: {
        backgroundColor: '#fff',
        color: '#fff',
        padding: theme.spacing(2),
    },
    ...customTheme.spreadThis
}));

const Login = (props) => {

    const classes = useStyles();

    //Fetching state from redux store
    const state = useSelector(state => state);
    //Fetching login details from state object
    const login = state.login

    const[user, setUser] = useState({
        email: '',
        password: '',
        role: ''
    });

    //For validating the form fields
    const [errors, setErrors] = useState()

    const dispatch = useDispatch();

    const handleChange = (event) => {
        event.preventDefault()
        const {name, value} = event.target
        setUser(prevValue => ({
            ...prevValue,
            [name]: value
        }))
    }
    
    const handleSubmit = (event) => {
        event.preventDefault()
    
        //Checking if there are errors
        const errors = validate();
        setErrors(errors);

        //If errors exists then don't dispatch the action
        if(errors) 
            return;

        dispatch(loginAction(user))
        if(login.loggedIn) {
            props.history.push("/user/welcome")
        }
    }

    //Schema for form field validation
    const schema = Joi.object({
        email: Joi.string().email({ tlds: { allow: false } }).required(),
        password: Joi.string().required(),
        role: Joi.string().required()
    })

    //Now writing a separate validate function which would be called later.
    const validate = () => {
        
        //Creating errors object, which would be returned
        const errors ={}

        const result = schema.validate(user, {
            abortEarly: false
        })

        console.log(result);
        
        //Populating the errors object if errors exists.
        if(result.error != null){
            for(let error of result.error.details) {
                errors[error.path[0]] = error.message
            }
        }

        return Object.keys(errors).length === 0 ? null : errors
    }
    

    return (
        <Container>
            {
                login.loggedIn ? (
                    <Redirect to="/user/welcome" />
                ) : (
                    <Box>
                        <Box my={1} className="text-center">
                            <Typography variant="h4">Login</Typography>
                        </Box>
                        <Grid 
                            item xs={12}
                            sm={6}
                            style={{ marginLeft: "auto", marginRight: "auto" }}
                        >
                            {login.message && <Alert severity="error">{login.message}</Alert>}
                            <Paper elevation={3} className={classes.paper}>
                            <form onSubmit={handleSubmit}>
                            <Box my={2}>
                                <TextField 
                                    label="Email" 
                                    type="email" 
                                    fullWidth 
                                    error={errors && errors.email ? true : false}
                                    helperText={errors && errors.email}
                                    name="email" 
                                    value={user.email}
                                    onChange={handleChange}
                                />
                            </Box>
                            <Box my={2}>
                                <TextField 
                                    label="Password" 
                                    type="password" 
                                    fullWidth 
                                    error={errors && errors.password ? true : false}
                                    helperText={errors && errors.password}
                                    name="password"
                                    value={user.password}
                                    onChange={handleChange}
                                />
                            </Box>
                            <FormControl fullWidth error={errors && errors.role ? true : false}>
                                <InputLabel>
                                    Role
                                </InputLabel>
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
                            <Box mt={3} className="text-center">
                                <Button
                                    className={classes.button}
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                >
                                    Login
                                </Button>
                            </Box>
                            <Box my={1} className="text-center">
                                <Typography variant="outline1" style={{color: '#000'}}>Not a user?
                                    <Link to="/register"> Sign Up</Link>
                                </Typography>
                            </Box>
                        </form>
                        </Paper>
                        </Grid>
                    </Box>
                )
            }
        </Container>
    )
}

export default Login;