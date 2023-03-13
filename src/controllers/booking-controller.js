const { BookingService } = require('../services/index');
const { StatusCodes } = require('http-status-codes');

const bookingService = new BookingService();

const {createChannel, publishMessage}=require('../utils/message-queue');
const {REMINDER_BINDING_KEY}=require('../config/serverConfig');
class BookingController{
                            constructor(){
                            }
                            async sendMessageToQueue(req,res){
                                const channel = await createChannel();
                                const payload = {
                                    data: {
                                        subject: 'this is a notification to be comsumed',
                                        content: 'Some queue will subscribe to this event',
                                        recepientEmail: 'praptesarker@gmail.com',
                                        notificationTime: '2023-03-09 13:20:30'
                                    },
                                    service: 'CREATE_TICKET'
                                };
                                publishMessage(channel,REMINDER_BINDING_KEY,JSON.stringify(payload));
                                return res.status(201).json({
                                    Message: "Successfully published the event"

                                });

                            }


                            async create(req,res){
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

                        }

module.exports = BookingController;