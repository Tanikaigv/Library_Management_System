const mongoose = require("mongoose");

function dbConnection() {
    const DB_URL = process.env.MONGO_URI;

    mongoose.connect(DB_URL)
        .then(() => {
            console.log("DB Connected!!");
        })
        .catch((error) => {
            console.error("Connection Error:", error);
        });
}

module.exports = dbConnection;