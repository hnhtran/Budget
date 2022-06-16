// import dependencies
require('dotenv').config();
const mongoose = require('mongoose');

// database connection
// set up input for our connection
// const DATABASE_URL = process.env.DATABASE_URL;
const DATABASE_URL = process.env.MONGODB_URI;
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

// connect to the database
mongoose.connect(DATABASE_URL, CONFIG);

// events for when the connection opens/closes/errors
mongoose.connection
.on('open', () => console.log(`Mongoose connected to ${mongoose.connection.host}:${mongoose.connection.port}`))
.on('close', () => console.log('Connection to mongoose closed'))
.on('error', (err) => console.log(err))

// export the connection
module.exports = mongoose;  