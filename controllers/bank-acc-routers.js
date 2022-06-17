// import dependencies
const express = require("express");
const bankAcc = require("../models/bankacc");
const router = express.Router();

// index route
router.get("/bankAcc", (req, res) => {
  bankAcc
    .find({ user: req.session.email })
    .then((bankAcc) => {
//=========================================
// i use this code to get the sorted date for index page
//=========================================
// source: https://www.delftstack.com/howto/javascript/sort-array-of-objects-by-singlekey-with-date-value/#:~:text=You%20can%20sort%20an%20array%20of%20objects%20by,will%20return%201%3B%20otherwise%2C%20it%20will%20return%200.  

      bankAcc.sort(function (x, y) {
        var firstDate = new Date(x.transDate),
          SecondDate = new Date(y.transDate);

        if (firstDate < SecondDate) return -1;
        if (firstDate > SecondDate) return 1;
        return 0;
      });
      console.log(bankAcc);
      res.render("bankacc/index", { bankAcc });
    })
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

// new transaction route
router.get("/bankAcc/new", (req, res) => {
  res.render("bankacc/new");
});

// post method for new transaction route
router.post("/bankAcc", (req, res) => {
  req.body.user = req.session.email;
  bankAcc
    .create(req.body)
    .then((bankAcc) => {
      res.redirect("/bankacc");
    })
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

// edit route
router.get("/bankAcc/:id/edit", (req, res) => {
  const id = req.params.id;
  bankAcc
    .findById(id)
    .then((transaction) => {
      console.log(transaction.transDate);
      res.render("bankacc/edit", { transaction });
    })
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

// put method for edit route
router.put("/bankAcc/:id", (req, res) => {
  // get the id from params
  const id = req.params.id;
  // if transDate changed, update all the fields, otherwise, update transName and transAmount only
  if (req.body.transDate) {
    bankAcc
      .findByIdAndUpdate(id, req.body, { new: true })
      .then((transaction) => {
        // redirect to main page after updating
        console.log(req.body.transDate);
        console.log(transaction);
        res.redirect("/bankacc");
      })
      // send error as json
      .catch((error) => {
        console.log(error);
        res.json({ error });
      });
  } else {
    bankAcc
      .findByIdAndUpdate(
        id,
        { transName: req.body.transName, transAmount: req.body.transAmount },
        { new: true }
      )
      .then((transaction) => {
        // redirect to main page after updating
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
router.get("/bankAcc/:id", (req, res) => {
  const id = req.params.id;
  let date

  bankAcc.findById(id)
  .then((transaction) => {
    date = transaction.transDate
    bankAcc
    .find({ transDate: date })
    .then((transactions) => {
        // console.log(transaction.notes)
      res.render("bankacc/show", { 
        transactions : transactions, 
        notes : transaction.notes 
      });
    })
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
  })
  .catch((error) => {
    console.log(error);
    res.json({ error });
    })
});

// delete route
router.delete("/bankAcc/:id", (req, res) => {
  // get the id from params
  const id = req.params.id;
  // delete the fruit
  bankAcc
    .findByIdAndRemove(id)
    .then((transaction) => {
      // redirect to main page after deleting
        res.redirect("/bankacc")
    })
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

module.exports = router;

//=========================================
// Code Graveyard
//=========================================
// code got from this source https://stackoverflow.com/questions/53212020/get-list-of-duplicate-objects-in-an-array-of-objects
// const values = [
//   { id: 10, name: "someName4" },
//   { id: 10, name: "someName2" },
//   { id: 11, name: "someName2" },
//   { id: 10, name: "someName4" },
//   { id: 12, name: "someName4" },
// ];

// const lookup = values.reduce((a, e) => {
//   a[e.name] = ++a[e.name] || 0;
//   return a;
// }, {});
// const filterA = values.filter((e) => lookup[e.name]);
//   console.log(values)
//   console.log(filterA)

//=========================================
// i will use this code to get the search date for show page
//=========================================
// const filterSpecificity = filterA.filter((e) => e.name === "someName4");
// //   console.log(filterSpecificity)

// // source mdn https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#specifications
// const items = [
//   { name: "Edward", value: 21 },
//   { name: "Sharpe", value: 37 },
//   { name: "And", value: 45 },
//   { name: "The", value: -12 },
//   { name: "Magnetic", value: 13 },
//   { name: "Zeros", value: 37 },
// ];

// // sort by value
// items.sort(function (a, b) {
//   return a.value - b.value;
// });

// // sort by name
// const itemsSorted = items.sort(function (a, b) {
//   const nameA = a.name.toUpperCase(); // ignore upper and lowercase
//   const nameB = b.name.toUpperCase(); // ignore upper and lowercase
//   if (nameA < nameB) {
//     return -1;
//   }
//   if (nameA > nameB) {
//     return 1;
//   }

//   // names must be equal
//   return 0;
// });
// //   console.log(itemsSorted)

// // source: https://www.delftstack.com/howto/javascript/sort-array-of-objects-by-singlekey-with-date-value/#:~:text=You%20can%20sort%20an%20array%20of%20objects%20by,will%20return%201%3B%20otherwise%2C%20it%20will%20return%200.
// let MyAppointments = [
//   {
//     with: "Doctor Tauseef",
//     designation: "Dentist",
//     reason: "Toothache",
//     appointment_date: "2021-12-01T06:25:24Z",
//   },
//   {
//     with: "Abdullah Abid",
//     designation: "Software Engineer",
//     reason: "An Idea for a App",
//     appointment_date: "2021-12-09T06:25:24Z",
//   },
//   {
//     with: "Muhammad Haris",
//     designation: "Painter",
//     reason: "Need to pain the house",
//     appointment_date: "2021-12-05T06:25:24Z",
//   },
// ];

// // sorted dates for index page
// MyAppointments.sort(function (x, y) {
//   var firstDate = new Date(x.appointment_date),
//     SecondDate = new Date(y.appointment_date);

//   if (firstDate < SecondDate) return -1;
//   if (firstDate > SecondDate) return 1;
//   return 0;
// });

// //   console.log(MyAppointments);

// authorization midleware
// router.use((req, res, next) => {
//     if(req.session.loggedIn) {
//         next()
//     } else{
//         res.redirect('/user/login')
//     }
// })

// //   bankAcc
// //     .find({ transDate: date })
// //     .then((transaction) => {
// //       res.render("bankacc/show", { transaction });
// //       // console.log(transaction)
// //     })
// //     .catch((error) => {
// //       console.log(error);
// //       res.json({ error });
// //     });

// show route
// router.get("/:id", (req, res) => {
//     // res.send('show route')
//     const id = req.params.id;
//     // const transDate = req.body.transDate
//     bankAcc
//       .findById(id)
//       .then((transaction) => {
//         res.render("bankacc/show", { transaction });
//         // console.log(transaction)
//       })
//       .catch((error) => {
//         console.log(error);
//         res.json({ error });
//       });
//   });