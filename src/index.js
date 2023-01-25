const express = require('express');
const bodyParser = require('body-parser');
const { PORT, DB_SYNC } = require('./config/serverConfig');
const app = express();
const apiRoutes = require('./routes/index');
const db = require('./models/index');

const setupAndStartServer = async () => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/api', apiRoutes);

    app.listen(PORT, () => {
        console.log("Server is running on port ", PORT);
        if (DB_SYNC) {
            db.sequelize.sync({ alter: true });
        }
    })
}
setupAndStartServer();