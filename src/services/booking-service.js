const { Booking } = require('../models/index');
const { ValidationError, AppError } = require('../utils/errors/index');
class BookingService {
    async create(data) {
        try {

        } catch (err) {
            if (err.name == "SequelizeValidationError") {
                throw new ValidationError(err);
            }
            throw new AppError;
        }
    }



}

module.exports = BookingService;