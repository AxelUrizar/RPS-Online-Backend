var express = require('express');
var router = express.Router();

const usuarioControllers = require('../controllers/usuarioControllers.js')

//
// Listado de todos los usuarios
//
router.get('/', usuarioControllers.listaUsuarios)

//
// Creación de Usuario
//
router.post('/signUp', usuarioControllers.crearUsuario)

//
// Perfil de Usuario
//
router.get('/perfil/:id', usuarioControllers.perfilUsuario)

module.exports = router;
