const initialState = {
    email: "",
    role: "",
    loggedIn: false,
    errMsg: ""
};

const UserReducer = (state = initialState, action) => {
    
    switch(action.type) {
        case "LOGIN": 
            return {
                ...state, 
                ...action.payload
            }
        case "LOGOUT":
            return {
                ...state,
                ...action.payload
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