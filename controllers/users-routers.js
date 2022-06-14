
// import dependencies
const express = require('express')
const user = require('../models/user')
const bcrypt = require('bcryptjs')

const router = express.Router()

// the sign up route (get => form, post => submit form)
router.get('/signup', (req, res) => {
    res.render('user/signup')
})

// sign up post route
router.post('/signup', async (req, res) => {
    // encrypt password
    req.body.password = await bcrypt.hash(
        req.body.password,
        await bcrypt.genSalt(13) // 13 random no. added to it, then bcrypt will encrypt it, take time, await for it to be done
    )
    // create user
    user.create(req.body)
    .then((user) => {
        res.redirect('/user/login')
    })
    .catch((error) => {
        // send error as json
        console.log(error)
        res.json({error})
    }) 
})

// The login Routes (Get => form, post => submi form)
router.get('/login', (req, res) => {
    res.send('I am login page')
    // res.render('user/login')
})

module.exports = router