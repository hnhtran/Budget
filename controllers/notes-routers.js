// import dependencies
const express = require('express')
const notes = require('../models/note')

const router = express.Router()

// notes index route
router.get('/', (req, res) => {
    res.render('notes/index')
})

module.exports = router