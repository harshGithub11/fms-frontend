const initialState = {
    email: "",
    role: "",
    loggedIn: false,
    message: ""
};

const UserReducer = (state = initialState, action) => {
    
    switch(action.type) {
        case "LOGIN": 
            return {
                ...action.payload
            }
        case "LOGOUT":
            return {
                ...action.payload,
                message: "Logged out successfully!"
            }
        case "ERROR":
            return {
                ...state,
                ...action.payload
            }
        default: 
            return state
    }
}

export default UserReducer;