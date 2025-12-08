const viewLogin = async (req, res) => {
    res.render("login");
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const respuesta = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await respuesta.json();

        res.cookie("token", data.token, {
            httpOnly: true,
            maxAge: 12 * 60 * 60 * 1000,
        });

        if (!data.ok) {
            return res.render("login", {
                error: data.message,
                email: req.body.email,
            });
        }

        return res.redirect(data.redirect);
    } catch (error) {
        console.log(error);
        res.render("login", {
            error: "Error conectando con el servidor",
        });
    }
};



const viewRegister = async (req, res) => {
    res.render("register");
};

const registerUser = async (req, res) => {
    const { nombre, email, password, confirmPassword } = req.body;

    try {
        const respuesta = await fetch("http://localhost:3000/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ nombre, email, password, confirmPassword }),
        });

        const data = await respuesta.json();

        if (!data.ok) {
            return res.render("register", {
                error: data.message,
                nombre,
                email,
            });
        }

        res.cookie("token", data.token, {
            httpOnly: true,
            maxAge: 12 * 60 * 60 * 1000,
        });

        return res.redirect(data.redirect);
    } catch (error) {
        console.error("Error en register:", error);
        return res.render("register", {
            error: "Error conectando con el servidor",
            nombre,
            email,
        });
    }
};

const favoritosUser = async (req, res) => {
    //captura el token desde las cookies o headers
    const token =
        req.cookies?.token || req.headers["authorization"]?.split(" ")[1];

    //variable para guardar la respuesta en formato json
    let data;

    //captura mensajes de la query (cuando se venga por redireccion al borrar una peli)
    const msg = req.query.msg || null;

    console.log(msg)
    //captura la respuesta de la API en ese ENDPOINT
    const respuesta = await fetch("http://localhost:3000/movies", {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        //body: JSON.stringify(body), //formato a JSON,
    });

    // transforma la respuesta a  formato JSON (porque siempre hay una respuesta de la API)
    data = await respuesta.json();

    //ver que llega en data
    //console.log(data)

    res.render("favoritos.ejs", { data:data,msg:msg});
};

module.exports = {
    viewLogin,
    loginUser,
    viewRegister,
    registerUser,
    favoritosUser
};
