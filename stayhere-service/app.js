const express = require("express");

const app = express();

app.get("/health", (req, res, next) =>{
    res.send("<h1>Service is OK!</h1>");
});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(express.json());

app.use("/rooms", require("./routes/rooms"));

app.listen(3001);