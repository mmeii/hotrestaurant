// Dependencies
// =============================================================
const express = require("express");
const util = require('util');
const path = require("path");
const fs = require("fs");

//const DB_DIR = path.resolve(__dirname, "hot");
//const dbPath = path.join(DB_DIR, "db.json");

//maximum tables for reservations
const MAXTABLES = 5;

//promisify the file object for Async operation
const writeFileAsync = util.promisify(fs.writeFile);


// Sets up the Express App
// =============================================================
const app = express();
const PORT = (process.env.PORT || 3000);

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// note test (DATA)
// =============================================================
var reservation = [
    {
        customerName: "test",
        phoneNumber: "555-1212",
        customerEmail: "",
        customerID: "test"
    },
    {
        customerName: "test2",
        phoneNumber: "555-1212",
        customerEmail: "",
        customerID: "test2"
    },
];
var waitlist = [
    {
        customerName: "testw",
        phoneNumber: "555-1212",
        customerEmail: "",
        customerID: "test"
    },
    {
        customerName: "test2w",
        phoneNumber: "555-1212",
        customerEmail: "",
        customerID: "test2"
    },
];
// Routes
// =============================================================

// Displays tables.html file
app.get("/tables", function (req, res) {
    res.json(reservation);
    //res.sendFile(path.join(__dirname, "tables.html"));
});

// Displays reserve.html file
app.get("/reserve", function (req, res) {
    res.json(reservation);
    //res.sendFile(path.join(__dirname, "reserve.html"));
});

// Displays home.html file /api/tables
app.get("/home", function (req, res) {
    res.json(reservation);
    //res.sendFile(path.join(__dirname, "home.html"));
});

// Displays home.html file /api/tables
app.get("/api/tables", function (req, res) {
    res.json(reservation);
    //res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/api/waitlist", function (req, res) {
    res.json(waitlist);
    //res.sendFile(path.join(__dirname, "home.html"));
});

app.post("/api/tables", function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var reserve = req.body;

    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    //newCharacter.routeName = newCharacter.name.replace(/\s+/g, "").toLowerCase();

    console.log(reserve);

    if (reservation.length >= MAXTABLES) {

        waitlist.push(reserve);
    } else {
        reservation.push(reserve);
    }

    //res.json(newReservation);
    res.json({
        reservation,
        waitlist
    });

});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
