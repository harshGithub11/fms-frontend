import axios from 'axios';

export const createBookingAction = (newBooking) => (dispatch) => {

    axios.post("http://localhost:8081/api/booking", newBooking)
        .then(response => {
            console.log(response.data);
            dispatch({
                type: "POST_BOOKING",
                payload: response.data
            })
        })
        .catch(error => {
            console.log(error.response.data);
        })

}