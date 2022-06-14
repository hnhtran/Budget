// import dependencies
const express = require('express')
const bankAcc = require('../models/bankacc')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('bankacc/index')
})

module.exports = router