const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const createInvoiceItemSchema = () => {
    const schema = new Schema({
        InvoiceItemId: Number,
        InvoiceId: Number,
        Price: Number,
        Description: String
    })
    schema.plugin(AutoIncrement, { inc_field: 'InvoiceItemId' })

    return mongoose.model("InvoiceItem", schema)
}

module.exports = createInvoiceItemSchema