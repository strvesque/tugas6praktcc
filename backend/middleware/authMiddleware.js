const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // Allow preflight requests (OPTIONS)
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204); // or next();
    }

    const bearer = req.headers['authorization'];
    const token = bearer && bearer.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.sendStatus(403);
        req.user = decoded;
        next();
    });
};

module.exports = verifyToken;
