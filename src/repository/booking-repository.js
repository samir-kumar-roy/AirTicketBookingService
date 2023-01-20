const { StatusCodes } = require('http-status-codes');
const { Booking } = require('../models/index');
const { ValidationError, AppError } = require('../utils/errors/index');

class BookingRepository {
    async create(data) {
        try {
            const booking = await Booking.create(data);
            return booking;

        } catch (err) {
            if (err.name == "SequelizeValidationError") {
                throw new ValidationError(err);
            }
            throw new AppError("RepositoryError", "can't create the booking", "There was some issue creating the booing, please try again", StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }
}