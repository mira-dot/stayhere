const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const invoiceItemSchema = new Schema({
    InvoiceItemId: Number,
    InvoiceId: Number,
    Price: Number,
    Description: String
})

class InvoiceItemsDAO {
    invoiceItemModel = null

    createSchema = () => {
        invoiceItemSchema.plugin(AutoIncrement, { inc_field: 'InvoiceItemId' })
        this.invoiceItemModel = mongoose.model("InvoiceItem", invoiceItemSchema)
    }

    create = async (invoiceItem) => {
        return await this.invoiceItemModel.create(invoiceItem)
    }
}


module.exports = new InvoiceItemsDAO()