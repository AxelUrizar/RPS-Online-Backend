const mongoose = require('mongoose')

const TokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    idUsuario: {
        type: mongoose.Types.ObjectId,
        required: true
    }
})

module.exports = mongoose.model('Token', TokenSchema)
