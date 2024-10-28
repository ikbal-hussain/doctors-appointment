const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const dotenv = require('dotenv');
dotenv.config();

exports.register = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 8);
        const user = await User.create({
            username: req.body.username,
            password: hashedPassword,
            role: req.body.role || 'user'
        });
        res.json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Registration error' });
    }
};

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ where: { username: req.body.username } });
        if (!user || !await bcrypt.compare(req.body.password, user.password)) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }
        
        const token = jwt.sign(
            { id: user.id, role: user.role }, 
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        
        res.json({ token, role: user.role });
    } catch (err) {
        res.status(500).json({ message: 'Login error' });
    }
};
