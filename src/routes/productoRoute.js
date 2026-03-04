const express = require('express');
const { poblarTablas, buscarProductos, buscarCategorias, getProductos, crearProducto} = require('../controllers/externalController');
const router = express.Router();
const authmiddleware = require('../middlewares/authmiddleware');

router.post('/poblar', poblarTablas);
router.post('/', authmiddleware, crearProducto);

router.get('/productos/:termino', buscarProductos);
router.get('/categorias/:termino', buscarCategorias);
router.get('/productos', getProductos);
module.exports = router;