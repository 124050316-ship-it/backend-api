const express = require('express');
const { poblarTablas, buscarProductos, buscarCategorias,  buscarProductosConQuery, obtenerTodosLosProductos, getProductos} = require('../controllers/externalController');
const router = express.Router();

router.post('/poblar', poblarTablas);

router.get('/productos/:termino', buscarProductos);
router.get('/categorias/:termino', buscarCategorias);
router.get('/productos', getProductos);
module.exports = router;