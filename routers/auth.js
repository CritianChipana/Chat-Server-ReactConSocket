
/*
    path: /api/login
*/

const { Router } = require( 'express' );
const { check } = require('express-validator');
const { crearUsuario, login, renewToken } = require('../controllers/auth.controlle');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

//*Crear nuevo Uusarios
router.post( '/new', [
    check('nombre',"Nombre es obligatorio").not().isEmpty(),
    check('email',"No es un email valido").isEmail(),
    check('password',"No es un password valido").not().isEmpty(),
    validarCampos
],crearUsuario );


//*Login
router.post('/',[

    check('email',"El email es obligatorio").isEmail(),
    check('password',"El password es obligatorio").not().isEmpty(),
    validarCampos

], login);



//* revalidar token
router.get( '/', [
    validarJWT,
    
] ,renewToken)


module.exports = router;