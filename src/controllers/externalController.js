const pool = require('../config/db');

const poblarTablas = async (request, response) => {
    const client = await pool.connect();
    try {
        // Fetch FakeStoreApi
        const apiFetch = await fetch('https://fakestoreapi.com/products');
        const products = await apiFetch.json();

        await client.query("BEGIN");

        let inserciones = 0;
        // Destructurar el objeto
        for(const product of products){
            const { title, price, description, image, category} = product;

            const stock = Math.floor(Math.random() * 50) + 1;

            let idCategoria;
            const checker = await pool.query('SELECT id FROM categoria WHERE nombre = $1', [category]);
            if(checker.rows.length > 0){
                idCategoria = checker.rows[0].id;
            } else {
                const nuevaCategoria = await pool.query('INSERT INTO categoria (nombre) VALUES ($1) RETURNING id', [category]);
                idCategoria = nuevaCategoria.rows[0].id;
            }
            const query = `
                INSERT INTO productos
                (nombre, precio, stock, descripción, imagen_url, id_categoria)
                VALUES ($1, $2, $3, $4, $5, $6)
            `

            await pool.query(query, [title, price, stock, description, image, idCategoria]);

            inserciones++;
        }

        await client.query("COMMIT");
        response.status(200).json(
            {
                mensaje: "Carga masiva exitosa", 
                cantidad: inserciones
            }
        );
    } catch (error) {
        await client.query("ROLLBACK");
        console.log(`Error: ${error}`);
        response.status(500).json({error: error.message})
    }finally{
        client.release();
    }
};

const buscarProductos = async (req, res) => {
    try {
        const {termino} = req.params;
        const response = await pool.query(
            `SELECT * FROM productos WHERE nombre ILIKE $1`, 
            [`%${termino}%`]
        );
        
        res.status(200).json(response.rows);
    }catch (error){
        console.log(error);
        res.status(500).json({ error: error.message});
    }
};

const buscarCategorias = async (req, res) => {
    try {
        const {termino} = req.params;
        const response = await pool.query(
            `SELECT * FROM categoria WHERE nombre ILIKE $1`, 
            [`%${termino}%`]
        );
        
        res.status(200).json(response.rows);
    }catch (error){
        res.status(500).json({ error: error.message});
    }
};
const buscarProductosConQuery = async (req, res) => {
    try {
        const { q } = req.query;

        if (!q || q.trim() === '') {
            return res.status(400).json({ error: 'El parámetro de búsqueda "q" es requerido' });
        }
        const query = `
            SELECT p.*, c.nombre AS categoria_nombre
            FROM productos p
            LEFT JOIN categoria c ON p.id_categoria = c.id
            WHERE p.nombre ILIKE $1 OR p.descripción ILIKE $1
            ORDER BY p.nombre
        `;
        const response = await pool.query(query);
        res.status(200).json(response.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al buscar productos' });
    }
};

const obtenerTodosLosProductos = async (req, res) => {
    try {
        const query = `
            SELECT p.*, c.nombre AS categoria_nombre
            FROM productos p
            LEFT JOIN categoria c ON p.id_categoria = c.id
            ORDER BY p.nombre
        `;
        const response = await pool.query(query);
        res.status(200).json(response.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener productos' });
    }       
};

module.exports = { poblarTablas, buscarProductos, buscarCategorias, buscarProductosConQuery, obtenerTodosLosProductos };