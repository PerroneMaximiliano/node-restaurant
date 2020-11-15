const jwt = require('jsonwebtoken');

let checkToken = (req, res, next) => {
    let token = req.get('Authorization');
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Invalid token'
                }
            });
        }

        req.user = decoded.user;
        next();
    });
};

let checkAdminRole = (req, res, next) => {
    let user = req.user;
    if (user.role === 'ADMIN_ROLE') {
        next();
    }

    res.status(401).json({
        ok: false,
        err: {
            message: 'The user is not admin'
        }
    });
};

module.exports = {
    checkToken,
    checkAdminRole
}