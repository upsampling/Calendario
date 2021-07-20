const { getEventos, crearEventos, actualizarEvento, eliminarEvento } = require("../controllers/events");
const {Router} = require('express');
const router = Router();
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {validarJWT } = require('../middlewares/validar-jwt');
const { isDate } = require("../helpers/isDate");

router.use(validarJWT);


router.get('/', getEventos);


router.post(
    '/',
    [
        check('title', 'el titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de fincalizacion es obligatoria').custom(isDate),
        validarCampos
    ],
    crearEventos
);


router.put(
    '/:id', 
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom( isDate ),
        check('end','Fecha de finalización es obligatoria').custom( isDate ),
        validarCampos
    ],
    actualizarEvento);


router.delete('/:id', eliminarEvento);


module.exports=router;