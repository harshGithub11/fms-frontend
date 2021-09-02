import axios from "axios";

const BASE_URL = "http://localhost:8081/api";

class ScheduledFlightService {

    async getAllScheduledFlights() {
        return await axios.get(BASE_URL + "/scheduledFlights");
    }

    async getScheduledFlights(sourceAirport, destinationAirport, scheduledDate) {
        return await axios.get(BASE_URL + `/scheduledFlights/${sourceAirport}/${destinationAirport}/${scheduledDate}`);
    }

}

export default new ScheduledFlightService();