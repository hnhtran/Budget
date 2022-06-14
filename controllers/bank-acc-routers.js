// import dependencies
const express = require('express')
const bankAcc = require('../models/bankacc')
const router = express.Router()

// index route
router.get('/', (req, res) => {
    // res.render('bankacc/index')
    bankAcc.find({ user: req.session.email })
    .then((bankAcc) => {
        // bankAcc.forEach((acc) => {
        //     toLocaleDateString(acc.transDate)
        //     // console.log(acc.transDate.toLocaleDateString())
        // })
            console.log(bankAcc.transDate)
        res.render('bankacc/index', { bankAcc })
    })
    .catch((error) => {
        console.log(error)
        res.json({error})
    })
})

// new transaction route
router.get('/new', (req, res) => {
    res.render('bankacc/new')
})

// post method for new transaction route
router.post('/', (req, res) => {
    // res.send('post method for new transaction route')
    // res.json(req.body)
    bankAcc.create(req.body)
    .then((bankAcc) => {
        res.redirect('/bankacc')
    })
    .catch((error) => {
        // send error as json
        console.log(error)
        res.json({error})
    })
})

module.exports = router