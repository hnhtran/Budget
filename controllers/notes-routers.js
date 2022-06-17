// import dependencies
const express = require("express");
const notes = require("../models/note");
const bankAcc = require("../models/bankacc");
const user = require("../models/user");
// notes.bankAcc = {};
let bankId = "";

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
      res.render("notes/index", { notes });
    })
    .catch((error) => {
      console.log(error);
      res.json({ error });
});
})

// create route
router.post("/", (req, res) => {
  req.body.user = req.session.email;
  req.body.noteDate = new Date();
  notes.create(req.body).then((note) => {
    bankAcc.findById(bankId).then((bankAcc) => {
      bankAcc.notes.push(note);
      bankAcc.save();
      console.log(bankAcc);
      res.redirect(`/bankacc/${bankId}`);
    });
  });
});

// new notes route
router.get("/new/:bankId", (req, res) => {
  bankId = req.params.bankId;
  res.render("notes/new");
});

// show route
router.get("/:noteId/edit/:bankId", (req, res) => {
  noteId = req.params.noteId;
  bankId = req.params.bankId;
  bankAcc.findById(bankId).then((transaction) => {
    notes.findById(noteId).then((note) => {
      // console.log(bankAcc);
      // res.json(note);
      res.render("notes/edit", { note, transaction });
    });
  });
});

// edit route
// router.put("/:noteId/:bankId", (req, res) => {
//   noteId = req.params.noteId;
//   bankId = req.params.bankId;
//   notes
//     .findByIdAndUpdate(noteId, { note: req.body.note }, { new: true })
//     .then((note) => {
//       console.log(note);
//       res.redirect(`/bankacc/${bankId}`);
//     });
// });

// show route
router.get("/:noteId/edit", (req, res) => {
  noteId = req.params.noteId;
  notes.findById(noteId).then((note) => {
  bankAcc.findOne({note}).then((transaction) => {
      // console.log(bankAcc);
      // res.json(note);
      res.render("notes/edit", { note, transaction });
    });
  });
});
// edit route
router.put("/:noteId/:bankId", (req, res) => {
  noteId = req.params.noteId;
  bankId = req.params.bankId;
  notes
    .findByIdAndUpdate(noteId, { note: req.body.note }, { new: true })
    .then((note) => {
      console.log(note);
      res.redirect(`/notes`);
    });
});



// delete route
router.delete("/:noteId/:bankId", (req, res) => {
  noteId = req.params.noteId;
  bankId = req.params.bankId;
  notes.findByIdAndRemove(noteId).then((note) => {
    res.redirect(`/notes`);
  })
  .catch((error) => {
    console.log(error);
    res.json({ error });
  })
});

// delete route
router.delete("/:noteId", (req, res) => {
  noteId = req.params.noteId;
  notes.findByIdAndRemove(noteId).then((note) => {
    res.redirect(`/notes`);
  })
  .catch((error) => {
    console.log(error);
    res.json({ error });
  })
});

module.exports = router;

//=========================================
// Code Graveyard
//=========================================
// delete route
// router.delete("/:noteId", (req, res) => {
//   noteId = req.params.noteId;
//   // bankId = req.params.bankId;
//   notes.deleteMany({}).then((note) => {
//     // res.redirect(`/bankacc/${bankId}`);
//     res.send("deleted");
//   });
// });
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
