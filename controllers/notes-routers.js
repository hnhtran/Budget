// import dependencies
const express = require("express");
const notes = require("../models/note");
const bankAcc = require("../models/bankacc");
const user = require("../models/user");
let bankId = "";

const router = express.Router();

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
});

// create new note route
router.post("/", (req, res) => {
  req.body.user = req.session.email;
  req.body.noteDate = new Date();
  req.body.bankId = bankId;
  notes.create(req.body).then((note) => {
    bankAcc.findById(bankId).then((bankAcc) => {
      bankAcc.notes.push(note);
      // bankAcc.notes.push(req.body);
      bankAcc.save();
      // console.log(bankAcc);
      // I think at this step I have 2 arrays of object
      // notes =[{},{}]
      // bankAcc = [{notes:[{},{}]}]
      res.redirect(`/bankacc/${bankId}`);
    });
  });
});

// new notes route
router.get("/new/:bankId", (req, res) => {
  bankId = req.params.bankId;
  // console.log(bankId);
  res.render("notes/new");
});

// // show route linked from bankacc
// router.get("/:noteId/edit/:bankId", (req, res) => {
//   noteId = req.params.noteId;
//   bankId = req.params.bankId;
//   bankAcc.findById(bankId).then((transaction) => {
//     notes.findById(noteId).then((note) => {
//       // console.log(bankAcc);
//       // res.json(note);
//       res.render("notes/edit", { note, transaction });
//     });
//   });
// });

// show route for edit and delete linked from notes
router.get("/:noteId/edit", (req, res) => {
  noteId = req.params.noteId;
  notes.findById(noteId).then((note) => {
    bankId = note.bankId;
    bankAcc.findById(bankId).then((transaction) => {
      // res.json(transaction);
      res.render("notes/edit", { note, transaction });
    });
  });
});

// put method for edit route
router.put("/:noteId/:bankId", (req, res) => {
  noteId = req.params.noteId;
  bankId = req.params.bankId;
  notes
    .findByIdAndUpdate(noteId, { note: req.body.note }, { new: true })
    .then((note) => {
      bankAcc.findById(bankId).then((result) => {
        for (let i = 0; i < result.notes.length; i++) {
          if (result.notes[i]._id == noteId) {
            result.notes[i] = note;
            // console.log(bankAcc.notes);
          }
        }
        // res.json(result.notes);
        bankAcc
          .findByIdAndUpdate(bankId, { notes: result.notes }, { new: true })
          .then((result) => {
            res.redirect(`/notes`);
            // res.json(result)
          });
      });
    });
});

// // delete route from bankacc
// router.delete("/:noteId/:bankId", (req, res) => {
//   noteId = req.params.noteId;
//   bankId = req.params.bankId;
//   notes.findByIdAndRemove(noteId).then((note) => {
//     res.redirect(`/notes`);
//   })
//   .catch((error) => {
//     console.log(error);
//     res.json({ error });
//   })
// });

// delete route from notes
router.delete("/:noteId/:bankId", (req, res) => {
  noteId = req.params.noteId;
  bankId = req.params.bankId;
  notes.findByIdAndRemove(noteId)
  .then((note) => {
  bankAcc.findById(bankId).then((result) => {
    for (let i = 0; i < result.notes.length; i++) {
      if (result.notes[i]._id == noteId) {
        result.notes.splice(i, 1);
        // console.log(bankAcc.notes);
      }
    }
    // res.json(result.notes);
    bankAcc
      .findByIdAndUpdate(bankId, { notes: result.notes }, { new: true })
      .then((result) => {
        res.redirect(`/notes`);
        // res.json(result)
      });
    })
  });
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
