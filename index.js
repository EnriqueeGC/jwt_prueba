import 'dotenv/config'; // Load .env file
import express from 'express';

import userRoute from './routes/user.route.js';
import publicRouter from './routes/public.route.js';

const app = express();

app.use(express.json()); // Middleware para que express pueda entender json
app.use(express.urlencoded({ extended: true })); //  Middleware para que express pueda entender formularios
app.use(express.static('public')); // Middleware para servir archivos estáticos

app.use('/', publicRouter);
app.use('/api/v1/users', userRoute);

const PORT = process.env.PORT || 3000; // Default port is 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});