const express = require("express");
const bookingsDAO = require("../dao/bookingsDAO");
const invoicesDAO = require("../dao/invoicesDAO");
const router = express.Router();

router.get("/get", async (req, res) => {
    try {
        const bookings = await bookingsDAO.getAll()
        res.send(bookings);
    } catch (error) {
        res.status(500).send("Failed to load bookings")
    }
});

router.post("/create", async (req, res) => {
    try {
        const isValid = req.body.FirstName?.length > 0 &&
            req.body.LastName?.length > 0 &&
            req.body.Email?.length > 0 &&
            req.body.Address?.length > 0 &&
            ["CASH", "CARD"].includes(req.body.PaymentType)
        if (!isValid) {
            res.status(500).send("All mandatory fields must be filled with valid data")
            return
        }

        const booking = await bookingsDAO.create(req.body)
        res.send(booking);
    } catch (error) {
        res.status(500).send("Failed to create booking")
    }
});

router.post("/status/:bookingId/:status", async (req, res) => {
    try {
        if (!["ACCEPTED", "DECLINED", "CHECKEDIN", "CHECKEDOUT"].includes(req.params.status)) {
            res.status(500).send("Invalid status")
            return
        }

        const booking = await bookingsDAO.changeStatus(req.params.bookingId, req.params.status);
        res.send(booking);
    } catch (error) {
        res.status(500).send("Failed to change the status of the booking")
    }
});

router.post("/create-invoice/:bookingId", async (req, res) => {
    try {
        const invoiceId = await invoicesDAO.createInvoiceByBookingId(req.params.bookingId);
        res.send({ invoiceId: invoiceId })
    } catch (error) {
        res.status(500).send("Failed to create invoice")
    }
});


module.exports = router;