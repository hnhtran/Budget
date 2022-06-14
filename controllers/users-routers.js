
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
    // console.log('sign up post route')
    // res.send('sign up post route')
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
    // res.send('I am login page')
    res.render('user/login')
})

// login post route
router.post('/login', async (req, res) => {
    // res.send('login post route')
    // // get the data from the request body, then search for user
    const { email, password } = req.body
    // res.json({email, password})
    user.findOne({user: email})
    .then(async (user) => {
        // check if email exists
        if (user) {
            // res.redirect('/')
            // console.log(user)
            // compare password
            const result = await bcrypt.compare(password, user.password)
            console.log(result)
            if (result) {
                // store some properties in the session object
                req.session.email = email
                req.session.loggedIn = true
                // res.send(`I will be redirect to bank account or notes page later`)
                res.redirect('/notes')
            } else {
                // error if password doesnt match
                res.json({ error: 'password doesnt match' })
            }
        } else {
            // send error if user doesnt exist
            res.json({ error: "email isn't registered"})
        }
    })
    .catch ((error) => {
        // send error as json
        console.log(error)
        res.json({error})
    })
})

// log out route
router.get('/logout', (req, res) => {
    // destroy session and redirect to main page
    req.session.destroy((error) => {
        if (error) {
            console.log(error)
            res.json({error})
        } else {
            res.redirect('/')
        }
    })
})

module.exports = router