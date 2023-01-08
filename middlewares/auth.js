const jwt = require('jsonwebtoken')
const Usuario = require('../models/Usuarios.js')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const data = jwt.verify(token, process.env.JWT_SECRET)
        const usuario = await Usuario.findOne({ _id: data.id })
        if (!usuario) {
            throw new Error()
        }
        req.usuario = usuario
        req.token = token
        next()
    } catch (error) {
        res.status(401).send('No autorizado para acceder a este recurso.')
    }
}
module.exports = auth
