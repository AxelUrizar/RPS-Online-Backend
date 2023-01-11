const moment = require('moment')
const mongoose = require('mongoose')

const PartidaSchema = new mongoose.Schema({
    jugadores: [{
        jugador1: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        jugador2: {
            type: mongoose.Types.ObjectId,
            required: true
        },
    }],
    ganador: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    rondas: [[{
        type: Number,
        required: true
    }]],
    fecha: {
        type: Date,
        required: true,
        default: moment(new Date()).format("DD/MM/YYYY")
    },
    apuesta: {
        type: Number,
        required: true,
        default: 0
    }
})

module.exports = mongoose.model('Partida', PartidaSchema)
