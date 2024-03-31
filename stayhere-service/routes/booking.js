const express = require("express");
const { BookingModel, CustomerModel, InvoiceModel } = require("../dao/schemas");
const router = express.Router();

router.get("/get", async (req, res) => {
    const bookings = await BookingModel.find({}).populate("Customer")
    res.send(bookings);
});

router.post("/create", async (req, res) => {
    const customer = await CustomerModel.create(req.body)
    const booking = await BookingModel.create({ ...req.body, CustomerId: customer.CustomerId, Customer: customer })
    res.send(booking);
});

router.post("/status/:bookingId/:status", async (req, res) => {
    const booking = await BookingModel.findOneAndUpdate({ BookingId: req.params.bookingId }, { Status: req.params.status }, { new: true }).populate("Customer");
    console.log(booking)
    res.send(booking);
});

router.post("/create-invoice/:bookingId", async (req, res) => {
    const booking = await BookingModel.findOne({ BookingId: req.params.bookingId }).populate("Customer");
    const invoiceId = await InvoiceModel.createInvoice(booking);
    res.send({ invoiceId: invoiceId })
});


module.exports = router;