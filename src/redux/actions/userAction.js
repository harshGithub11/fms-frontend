import axios from "axios";

export const loginAction = (user) => (dispatch) => {
    axios
        .post("http://localhost:8081/login", user)
        .then(response => {
            dispatch({
                type: "LOGIN",
                payload: response.data
            })
        })
        .catch(error => {
            console.log(error.response.data);
            dispatch({
                type: "ERROR",
                payload: error.response.data
            })
        })
}

export const logoutAction = (email) => async (dispatch) => {
    
    const result = await axios.patch(`http://localhost:8081/logout/${email}`);
    console.log(result);
    const response = result.data;
    response.errors = "";
    
    dispatch({
        type: "LOGOUT",
        payload: response,
    })
}