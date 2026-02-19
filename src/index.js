const express = require('express');
const cors = require('cors');
const router = require('./routes/productoRoute');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use('/api', router);
app.use('/api/auth', require('./routes/authRoute'));

app.listen(PORT, () => console.log("Servicio arriba"));