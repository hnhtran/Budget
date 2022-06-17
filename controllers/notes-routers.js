// import dependencies
const express = require("express");
const notes = require("../models/note");
const bankAcc = require("../models/bankacc");
notes.bankAcc = {};
let bankId = "";

const router = express.Router();

// authorization middleware
router.use((req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    res.redirect("/user/login");
  }
});

// notes index route
router.get("/", (req, res) => {
  notes
    .find({ user: req.session.email })
    .then((notes) => {
      console.log(notes);
      res.render("notes/index", { notes });
    })
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

// create route
router.post("/", (req, res) => {
  req.body.noteDate = new Date();
  bankAcc.findById(bankId)
  .then((bankAcc) => {
    bankAcc.notes.push(req.body);
    bankAcc.save();
    console.log(bankAcc);
    res.redirect(`/bankacc/${bankId}`);
  })
  // bankAcc
  //   .findById(bankId)
  //   .then((bankAcc) => {
  //     req.body.noteDate = new Date();
  //     req.body.bankAcc = bankAcc;
  //     // console.log(req.body);
  //     notes.create(req.body)
  //       .then((notes) => {
  //         // res.render("notes/index", { notes });
  //         // res.redirect("/notes");
  //         // res.json(notes);
  //         notes.save()
  //           .then((result) => {
  //             console.log(result)
  //             res.redirect('/notes');
  //           })
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         res.json({ error });
  //       });
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //     res.json({ error });
  //   });
});

// new notes route
router.get("/new/:bankId", (req, res) => {
  bankId = req.params.bankId;
  // console.log(bankId);
  res.render("notes/new");
});

// router.get("/new/:bankId", (req, res) => {
//   // this is live in post method for create new note
//   req.body.user = req.session.email;
//   const bankId = req.params.bankId;

//   if (notes.bankAcc._id) {
//     for (let i = 0; i < notes.ength; i++) {
//       if (notes.bankAcc._id === bankId) {
//         res.send("You already have a note for this bank account");
//       } else {
//         bankAcc
//           .findById(bankId)
//           .then((result) => {
//             notes.bankAcc = result;
//             console.log(result);
//             res.render("notes/new");
//           })
//           .catch((error) => {
//             console.log(error);
//             res.json(error);
//           });
//       }
//     }
//   } else {
//     bankAcc
//       .find({})
//       .then((result) => {
//         notes.bankAcc = result;
//         // notes.noteDate = new Date()
//         // notes.create(
//         //   {notes.noteDate : new Date()},
//         //   notes.bankAcc : result,
//         //   notes.user = req.session.email
//         // )
//         console.log(result);
//         res.render("notes/new");
//       })
//       .catch((error) => {
//         console.log(error);
//         res.json(error);
//       });

//     // this block of code works, so keep for reference
//     // bankAcc.findById(bankId)
//     // .then((result) => {
//     //   console.log(result)
//     //   res.render("notes/new");
//     // })
//     // .catch((error) => {
//     //   console.log(error)
//     //   res.json(error)
//     // })
//   }
// });

module.exports = router;
