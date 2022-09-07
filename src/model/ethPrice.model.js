const { mongoose } = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})


module.exports = mongoose.model('cripto', schema)