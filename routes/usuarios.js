var express = require('express');
var router = express.Router();

const usuarioControllers = require('../controllers/usuarioControllers.js')

//
// Listado de todos los usuarios
//
router.get('/', usuarioControllers.listaUsuarios)

//
// Perfil de Usuario
//
router.get('/perfil/:id', usuarioControllers.perfilUsuario)

//
// Creación de Usuario
//
router.post('/signUp', usuarioControllers.crearUsuario)

//
// Login de Usuario
//
router.post('/login', usuarioControllers.login)

module.exports = router;
