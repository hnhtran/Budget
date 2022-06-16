// import dependencies
const express = require("express");
const notes = require("../models/note");
const bankAcc = require("../models/bankacc");
notes.bankAcc= {};

const router = express.Router();

// authorization middleware
// router.use((req, res, next) => {
//   if (req.session.loggedIn) {
//     next();
//   } else {
//     res.redirect("/user/login");
//   }
// });

// notes index route
router.get("/", (req, res) => {
  notes
    .find({ user: req.session.email })
    .then((notes) => {
      // console.log(notes);
      res.render("notes/index");
    })
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

// new notes route
router.get("/new/:bankId", (req, res) => {
  // this is live in post method for create new note
  req.body.user = req.session.email
  const bankId = req.params.bankId;
  // console.log(bankId);
  // console.log(bankAcc)
  

  if(!notes.bankAcc._id){
  bankAcc.findById(bankId)
  .then((result) => {
    notes.bankAcc = result
    // notes.noteDate = new Date()
    // notes.create(
    //   {notes.noteDate : new Date()},
    //   notes.bankAcc : result,
    //   notes.user = req.session.email
    // )
    console.log(notes)
    res.render("notes/new");
  })
  .catch((error) => {
    console.log(error)
    res.json(error)
  })}
  else{
    res.send('bankId already exists')
    console.log(notes)
  }
  
});

module.exports = router;
