const tokenValidation = (req, res, next) => {
    const token = req.headers.authorization;
    if (regexToken.test(token)) {
        return next();
    }
    res.status(401).json({ "message": "invalid token" });
};

module.exports = tokenValidation;