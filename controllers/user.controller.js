import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

import {UserModel} from "../models/users.model.js";

// /api/v1/users/register
const register = async(req, res) => {
    try {
        // console.log(req.body);
        const {username, email, password} = req.body;

        // Validar que los campos no estén vacíos, validaciones necesarias
        if (!username || !email || !password ) {
            return res.status(400).json({ ok: false, msg: 'All fields are required' });
        }

        const user = await UserModel.findOneByEmail(email);
        if (user) {
            return res.status(409).json({ ok: false, msg: 'Email already exists' });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = await UserModel.create({ email, password: hashedPassword, username });

        // Generar el token
        const token = jwt.sign({ 
            emil: newUser.email
        },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }
        );

        return res.status(201).json({ ok: true, msg: token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, msg: 'Server error' });    
    }
};

// /api/v1/users/login
const login = async(req, res) => {
    try {
        const {email, password} = req.body;

        if (!email || !password) {
            return res.status(400).json({ ok: false, msg: 'All fields are required' });
        }

        const user = await UserModel.findOneByEmail(email);
        if (!user) {
            return res.status(404).json({ ok: false, msg: 'User not found' });
        }

        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ ok: false, msg: 'Invalid credentials' });
        }

        // Generar el token
        const token = jwt.sign({ 
            email: user.email
        },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }
        );

        return res.status(200).json({ ok: true, msg: token});
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Server error'
        });    
    }
};

const profile = async (req, res) => {
    try {
        const user = await UserModel.findOneByEmail(req.email);
        return res.json({ ok: true, msg: user });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Server error' 
        });
    }
};

export const UserController = {
    register,
    login,
    profile
}