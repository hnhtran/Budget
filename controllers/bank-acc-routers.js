// import dependencies
const express = require('express')
const bankAcc = require('../models/bankacc')
const router = express.Router()

// index route
router.get('/', (req, res) => {
    res.render('bankacc/index')
})

// new transaction route
router.get('/new', (req, res) => {
    res.render('bankacc/new')
})

module.exports = router