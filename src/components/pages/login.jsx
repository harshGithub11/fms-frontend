import { 
    Box, 
    Button, 
    Container, 
    FormControl, 
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
import { Link } from 'react-router-dom';

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

    const[user, setUser] = useState({
        email: '',
        password: '',
        role: ''
    });

    const dispatch = useDispatch();

    const login = useSelector(state => state.login)

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
        dispatch(loginAction(user))
        if(login.loggedIn) {
            props.history.push("/user/welcome")
        }
    }
    
    console.log(user);
    return (
        <Container>
            <Box my={1}>
                <Typography variant="h4" align="center">Login</Typography>
            </Box>
            {login.message && <p style={{color: 'red'}}>{login.message}</p>}
            <Grid item xs={12}
                sm={6}
                style={{ marginLeft: "auto", marginRight: "auto" }}
            >
                <Paper elevation={3} className={classes.paper}>
                    <form onSubmit={handleSubmit} noValidate autoComplete="off">
                        <Box my={2}>
                            <TextField 
                                label="Email" 
                                type="email" 
                                fullWidth 
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
                                name="password"
                                value={user.password}
                                onChange={handleChange}
                            />
                        </Box>
                        <FormControl fullWidth>
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
        </Container>
    )
}

export default Login;