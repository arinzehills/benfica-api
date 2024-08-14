const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
   const bearer= req.header('Authorization')?.replace('Bearer ', '')
    const token =
    req.body.token || req.query.token || req.headers["x-access-token"]||bearer;

    if (!token) return res.status(401).json({success:false, msg: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next();
    } catch (err) {
        res.status(401).json({success:false, msg: 'Token is not valid' });
    }
};

module.exports = authMiddleware;
