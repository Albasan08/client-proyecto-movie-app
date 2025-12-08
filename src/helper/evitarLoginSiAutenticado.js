const jwt = require("jsonwebtoken");

const evitarLoginSiAutenticado = (req, res, next) => {
    const token = req.cookies?.token;

    if (!token) return next();

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (data.rol === "admin") {
            return res.redirect("/movies");
        }

        if (data.rol === "user") {
            return res.redirect("/dashboard");
        }

        next();
    } catch (error) {
        next();
    }
};

module.exports = { evitarLoginSiAutenticado };
