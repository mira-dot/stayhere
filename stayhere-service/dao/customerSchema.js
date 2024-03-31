const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const createCustomerSchema = () => {
    const schema = new Schema({
        CustomerId: Number,
        FirstName: String,
        LastName: String,
        Email: String,
        Address: String,
        Comment: String
    })
    schema.plugin(AutoIncrement, { inc_field: 'CustomerId' })

    return mongoose.model("Customer", schema)
}

module.exports = createCustomerSchema