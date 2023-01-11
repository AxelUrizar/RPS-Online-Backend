const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const Usuario = require('../models/Usuarios')
const Token = require('../models/Tokens')

//
// Devuelve una lista con todos los Usuarios en la base de datos.
//
exports.listaUsuarios = async (req, res) => {
    try {
        const listaUsuarios = await Usuario.find({});
        if(listaUsuarios.length < 1) return res.status(200).json('No hay ningún usuario registrado.')

        return res.status(200).json(listaUsuarios)
    } catch (e) {
       return res.status(500).json(e)
    }
}

//
// Devuelve la información del un Usuario.
//
exports.perfilUsuario = async(req, res) => {
    try{
        const { id } = req.params
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(401).json('Id no válida.')

        const perfilUsuario = await Usuario.findById(id)
        if(perfilUsuario === null) return res.status(401).json('Usuario no encontrado.')

        return res.status(200).json(perfilUsuario)
    } catch(e){
        return res.status(500).json(e)
    }
}

//
// Crea un nuevo Usuario.
//
exports.crearUsuario = async(req, res) => {
    try{
        const { alias, email, contraseña } = req.body

        if(alias.length < 1) return res.status(401).json('El nombre debe contener almenos un carácter.')
        if(!email) return res.status(401).json('Es necesario introducir un email.')
        if(contraseña.length < 5) return res.status(401).json('La contraseña debe contener almenos 5 carácteres.')

        const comprobacionAlias = await Usuario.find({ alias: alias})
        if(comprobacionAlias.length > 0) return res.status(401).json('El alias deseado ya está en uso.')

        const comprobacionEmail = await Usuario.find({ email: email})
        if(comprobacionEmail.length > 0) return res.status(401).json('El email deseado ya está en uso.')

        const contraseñaEncriptada = await bcrypt.hash(contraseña, 8)
        const nuevoUsuario = await Usuario.create({ alias: alias, email: email, contraseña: contraseñaEncriptada })

        return res.status(200).json(nuevoUsuario)
    } catch(e) {
        return res.status(500).json(e)
    }
}

//
// Loguea al usuario generando un token.
//
exports.login = async(req, res) => {
    try{
        const { alias, contraseña } = req.body

        const usuario = await Usuario.findOne({ alias })
        if(usuario === null) return res.status(401).json('El alias no coincide con ningún usuario.')

        const desencriptarContraseña = await bcrypt.compare(contraseña, usuario.contraseña)
        if(!desencriptarContraseña) return res.status(401).json('Contraseña incorrecta.')

        const generarToken = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET)
        await Token.create({
            token: generarToken,
            idUsuario: usuario._id
        })

        return res.status(200).json({ usuario: usuario, token: generarToken })
    } catch(e) {
        return res.status(500).json(e)
    }
}

//
// Borra a un usuario y sus tokens.
//
exports.borrarUsuario = async(req, res) => {
    try {
        const borrarUsuario = await Usuario.findByIdAndDelete(req.usuario._id)
        console.log(borrarUsuario)

        return res.status(200).json('Usuario eliminado con éxito.')
    } catch (e) {
        return res.status(500).json(e)
    }
}
