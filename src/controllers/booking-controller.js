const { BookingService } = require('../services/index');
const { StatusCodes } = require('http-status-codes');

const bookingService = new BookingService();


const create = async (req, res) => {
    try {
        const response = await bookingService.createBooking(req.body);
        return res.status(StatusCodes.OK).json({
            message: "Flight booking is completed successfully",
            success: true,
            data: response,
            error: {}
        });
    } catch (err) {
        return res.status(err.statusCode).json({
            message: err.message,
            success: false,
            data: {},
            error: err.explanation
        });
    }
}

module.exports = {
    create
}