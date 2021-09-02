const initialState = {
    bookings: [],
    booking: {}
}

const BookingReducer = (state = initialState, action) => {
    switch(action.type) {
        case "POST_BOOKING":
            return {
                ...state,
                booking: action.payload,
            
            }
        case "SET_BOOKINGS": 
            return {
                ...state, 
                bookings: action.payload
            }
        case "SET_BOOKING":
            return {
                ...state,
                booking: action.payload
            }
        
        case "DELETE_BOOKING": 
            return {

            }
        
        case "CLEAR_BOOKING": {
            return initialState            
        }
        default: 
            return state
    }
}

export default BookingReducer;