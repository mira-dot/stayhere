const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    CustomerId: Number,
    FirstName: String,
    LastName: String,
    Email: String,
    Address: String,
    Comment: String
})

class CustomersDAO {
    customerModel = null

    createSchema = () => {
        customerSchema.plugin(AutoIncrement, { inc_field: 'CustomerId' })
        this.customerModel = mongoose.model("Customer", customerSchema)
    }

    create = async (customer) => {
        return await this.customerModel.create(customer)
    }
}

module.exports = new CustomersDAO()