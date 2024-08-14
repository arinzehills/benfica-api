const dotenv = require('dotenv');

const configFile = `./.env`;
dotenv.config({ path: configFile });

const { MONGO_URI, PORT, JWT_SECRET, NODE_ENV } = process.env;

module.exports = {
    MONGO_URI,
    PORT,
    JWT_SECRET,
    env: NODE_ENV,
};
