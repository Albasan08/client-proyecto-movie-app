const jwt = require("jsonwebtoken");

const protegerVista = (...rolesPermitidos) => {
    return (req, res, next) => {
        const token = req.cookies?.token;

        if (!token) return res.redirect("/");

        try {
            const data = jwt.verify(token, process.env.JWT_SECRET_KEY);

            if (!rolesPermitidos.includes(data.rol)) {
                return res.redirect("/");
            }

            req.usuario = data;
            next();
        } catch (error) {
            console.log(error);
            return res.redirect("/");
        }
    };
};

module.exports = { protegerVista };
