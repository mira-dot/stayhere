const express = require("express");
const { InvoiceModel } = require("../dao/schemas");
const router = express.Router();

router.get("/get/:invoiceId", async (req, res) => {
    const invoice = await InvoiceModel.findOne({InvoiceId: req.params.invoiceId}).populate("Items")
    res.send(invoice);
});

module.exports = router;