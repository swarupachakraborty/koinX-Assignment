const { mongoose } = require('mongoose');

const schema = new mongoose.Schema({
    address: {
        type: String,
        required: true
    },
    transaction: {
        type: mongoose.Schema.Types.Mixed
    }
})


module.exports = mongoose.model('txn', schema)