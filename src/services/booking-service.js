const axios = require('axios');
const { BookingRepository } = require('../repository/index');
const { ValidationError, AppError, ServiceError } = require('../utils/errors/index');
const { FLIGHT_SERVICE_PATH } = require('../config/serverConfig');
class BookingService {
    constructor() {
        this.bookingRepository = new BookingRepository();
    }
    async createBooking(data) {
        try {
            const flightId = data.flightId;
            const getFlightURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`;
            const response = await axios.get(getFlightURL);
            // console.log(flight.data.data);
            const flightData = response.data.data;
            const priceOfTheFlight = flightData.price;

            if (data.noOfSeats > flightData.totalSeats) {
                throw new ServiceError("Something went wrong in the booking process", "InSufficient Seats available");
            }
            const totalCost = priceOfTheFlight * data.noOfSeats;
            const bookingPayLoad = { ...data, totalCost };
            const booking = await this.bookingRepository.create(bookingPayLoad);
            const updateFlightRequestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${booking.flightId}`;
            await axios.patch(updateFlightRequestURL, { totalSeats: flightData.totalSeats - data.noOfSeats });
            const finalBooking = await this.bookingRepository.update(booking.id, { status: "Booked" });
            return finalBooking;
        } catch (err) {
            if (err.name == 'RepositoryError' || err.name == "ValidationError") {
                throw err;
            }
            throw new ServiceError();
        }
    }


}

module.exports = BookingService;