const jwt = require('jsonwebtoken');

function isSeller(req, res, next) {
    jwt.verify(req.header('refreshToken'), process.env.SECRET_KEY, (error, decoded) => {
        if (error) res.status(406).json({ error });
        if (decoded.role !== 'sellers') res.status(500).json({ message: 'You don\'t have permission' });

        next();
    });
}

function isCustomer(req, res, next) {
    jwt.verify(req.header('refreshToken'), process.env.SECRET_KEY, (error, decoded) => {
        if (error) res.status(406).json({ error });
        if (decoded.role !== 'customers') res.status(500).json({ message: 'You don\'t have permission' });

        next();
    });
}

function isRegisteredUser(req, res, next) {
    jwt.verify(req.header('refreshToken'), process.env.SECRET_KEY, (error, decoded) => {
        if (error) res.status(406).json({ error });
        if (decoded.role !== 'customers' && decoded.role !== 'sellers') res.status(500).json({ message: 'You don\'t have permission' });

        next();
    });
}

module.exports = {
    isSeller,
    isCustomer,
    isRegisteredUser
};
