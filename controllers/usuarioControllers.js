const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Usuario = require('../models/Usuarios')

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
// Crea un nuevo Usuario.
//
exports.crearUsuario = async(req, res) => {
    try{
        const { alias, contraseña } = req.body

        if(alias.length < 1) return res.status(401).json('El nombre debe contener almenos un carácter.')
        if(contraseña.length < 5) return res.status(401).json('La contraseña debe contener almenos 5 carácteres.')

        const contraseñaEncriptada = await bcrypt.hash(contraseña, 8)
        const nuevoUsuario = await Usuario.create({ alias: alias, contraseña: contraseñaEncriptada })

        return res.status(200).json(nuevoUsuario)
    } catch(e) {
        return res.status(500).json(e)
    }
}

//
// Devuelve la información del Usuario.
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
