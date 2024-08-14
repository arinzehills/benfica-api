const app = require("./app.js");
const config = require("./config/config.js");
const connectDB = require("./database/connection.js");

let server;
connectDB();
const port = config.PORT || 3000;
server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
