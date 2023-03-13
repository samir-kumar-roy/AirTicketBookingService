const amqplib = require('amqplib');
const { MESSAGE_BROKER_URL, EXCHANGE_NAME } = require('../config/serverConfig');
const createChannel = async () => {
    try {
        const conn = await amqplib.connect(MESSAGE_BROKER_URL);
        const channel = await conn.createChannel();
        await channel.assertExchange(EXCHANGE_NAME, 'direct', false);
        return channel;
    } catch (err) {
        throw err;
    }
}

const subscribeMessage = async (channel, service, binding_key) => {
    const applicationQueue = await channel.assertQueue('QUEUE_NAME');
    channel.bindQueue(applicationQueue.queue, EXCHANGE_NAME, binding_key);
    channel.consume(applicationQueue.queue, (msg) => {
        console.log("data received");
        console.log(msg.content.toString());
        channel.ack(msg);
    });

}

const publishMessage = async (channel, binding_key, message) => {
    try {
        await channel.assertQueue('QUEUE_NAME');
        await channel.publish(EXCHANGE_NAME, binding_key, Buffer.from(message));
    } catch (err) {
        throw err;
    }
}

module.exports = {
    createChannel,
    subscribeMessage,
    publishMessage
}
