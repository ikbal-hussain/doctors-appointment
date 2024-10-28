const jwt = require('jsonwebtoken');

const rbacMiddleware = (roles) => {
    return (req, res, next) => {
        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) return res.status(403).json({ message: 'No token provided.' });

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) return res.status(401).json({ message: 'Unauthorized' });

            if (!roles.includes(decoded.role)) {
                return res.status(403).json({ message: 'You are not allowed to do this' });
            }
            req.userId = decoded.id;
            req.role = decoded.role;
            next();
        });
    };
};

module.exports = rbacMiddleware;
