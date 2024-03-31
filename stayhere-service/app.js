const bodyParser = require('body-parser')
var cors = require('cors')
const express = require("express");
const { connectDB, disconnectDB } = require("./database/mongoose-in-memory");
const seedRooms = require("./data/seedRooms");

const app = express();
app.use(cors())

// create application/json parser
var jsonParser = bodyParser.json()
app.use(jsonParser)

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(urlencodedParser)

app.get("/", () =>{
    res.send("<h1>Service is OK!</h1>");
});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use("/room", require("./routes/room"));
app.use("/booking", require("./routes/booking"));

app.listen(3001, async () => {
    await connectDB()
    await seedRooms()
});

process.on('exit', function () {
    disconnectDB()
}); 