import axios from "axios";

const BASE_URL = "http://localhost:8081/api";

class AirportService {

    async getAirports() {
        return await axios.get(BASE_URL + '/airports');
    }

}

export default new AirportService();