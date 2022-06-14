// import dependencies
require('dotenv').config();
const mongoose = require('mongoose');

// database connection
// set up input for our connection
const DATABASE_URL = process.env.DATABASE_URL;
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

// connect to the database
mongoose.connect(DATABASE_URL, CONFIG);

// events for when the connection opens/closes/errors
mongoose.connection
.on('open', () => console.log('Connected to mongoose'))
.on('close', () => console.log('Connection to mongoose closed'))
.on('error', (err) => console.log(err))

// export the connection
module.exports = mongoose;  