const mongoose = require('mongoose')

const UsuarioSchema = new mongoose.Schema({
    alias: {
        type: String,
        required: true,
        unique: true
    },
    contraseña: {
        type: String,
        required: true
    },
    monedas: {
        type: Number,
        required: true,
        default: 1000
    },
    listaAmigos: [{
        idAmigo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Usuario',
            required: true
        },
        nombreAmigo: {
            type: String,
            required: true
        }
    }],
    historial: [{
        idPartida: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Partida',
            required: true
        },
        resultado: {
            type: String,
            required: true
        },
        impactoMonedas: {
            type: Number,
            required: true
        },
        rival: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        }
    }]
})

module.exports = mongoose.model('Usuario', UsuarioSchema)
