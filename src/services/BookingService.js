import axios from "axios";

const BASE_URL = "http://localhost:8081/api"

class BookingService {
    
    async createBooking(booking) {
        return await axios.post(BASE_URL + "/booking", booking);
    }

    async deleteBooking(bookingId) {
        return await axios.delete(BASE_URL + `/booking/${bookingId}`);
    }

}

export default new BookingService();