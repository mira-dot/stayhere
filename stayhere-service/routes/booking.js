const express = require("express");
const { BookingModel, CustomerModel } = require("../dao/schemas");
const router = express.Router();

router.get("/get", async (req, res) => {
    const bookings = await BookingModel.find({})
    res.send(bookings);
});

router.post("/create", async (req, res) => {
    const customer = await CustomerModel.create(req.body)
    const booking = await BookingModel.create({ ...req.body, CustomerId: customer.CustomerId })
    res.send(booking);
});

router.post("/status/:bookingId/:status", async (req, res) => {
    await BookingModel.findOneAndUpdate({ BookingId: req.params.bookingId }, { Status: req.params.status });
    res.sendStatus(200);
});


module.exports = router;