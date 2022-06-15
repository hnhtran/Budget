// import dependencies
const express = require('express')
const bankAcc = require('../models/bankacc')
const router = express.Router()

// index route
router.get('/', (req, res) => {
    // res.render('bankacc/index')
    bankAcc.find({ user: req.session.email })
    .then((bankAcc) => {
        // console.log(bankAcc)
        // bankAcc.forEach((acc) => {
        //     toLocaleDateString(acc.transDate)
        //     // console.log(acc.transDate.toLocaleDateString())
        // })
            // console.log(bankAcc.transDate)
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
    req.body.user = req.session.email
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

// edit route
router.get('/:id/edit', (req, res) => {
    // res.render('bankacc/edit')
    const id = req.params.id
    bankAcc.findById(id)
    .then((transaction) => {
        console.log(transaction.transDate)
        // console.log(req.body)
        res.render('bankacc/edit', { transaction })
    })
    .catch((error) => {
        console.log(error)
        res.json({error})
    })
})

// put method for edit route
router.put("/:id", (req, res) => {
    // get the id from params
    const id = req.params.id
    // if transDate changed, update all the fields, otherwise, update transName and transAmount only
    if (req.body.transDate) {
        bankAcc.findByIdAndUpdate(id, req.body, { new: true })
      .then((transaction) => {
        // redirect to main page after updating
        console.log(req.body.transDate)
        console.log(transaction)
        res.redirect("/bankacc");
      })
      // send error as json
      .catch((error) => {
        console.log(error);
        res.json({ error });
      });
    } else {
    bankAcc.findByIdAndUpdate(id, {transName: req.body.transName, transAmount: req.body.transAmount}, { new: true })
      .then((transaction) => {
        // redirect to main page after updating
        console.log(req.body.transDate)
        console.log(transaction)
        res.redirect("/bankacc");
      })
      // send error as json
      .catch((error) => {
        console.log(error);
        res.json({ error });
      });
    }
  });

// show route
router.get('/:id', (req, res) => {
    // res.send('show route')
    const id = req.params.id
    // const transDate = req.body.transDate
    bankAcc.findById(id)
    .then((transaction) => {
        res.render('bankacc/show', { transaction })
        // console.log(transaction)
    })
    .catch((error) => {
        console.log(error)
        res.json({error})
    })
})

// delete route
router.delete("/:id", (req, res) => {
    // get the id from params
    const id = req.params.id;
    // delete the fruit
    bankAcc.findByIdAndRemove(id)
      .then((transaction) => {
        // redirect to main page after deleting
        res.redirect("/bankacc");
      })
      // send error as json
      .catch((error) => {
        console.log(error);
        res.json({ error });
      });
  });

module.exports = router