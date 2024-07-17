import { Router } from 'express';
import { UserController } from '../controllers/user.controller.js';
import { verifyToken } from '../middlewares/jwt.middlewares.js';

const router = Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/profile', verifyToken, UserController.profile); // ruta protegida, solo puedo acceder si tengo un token valido

export default router; // exportar el router