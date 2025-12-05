

const crearPelicula=async(req,res)=>{

    //captura el token desde las cookies o headers
    const token =req.cookies?.token || req.headers["authorization"]?.split(" ")[1];

    if (!req.file) {
        return res.render("crear.ejs", { msg: "Debes seleccionar una imagen" });
    }
    // Capturar el body
     const body=req.body

     //console.log(body)
    //variable para guardar la respuesta en formato json
    let data;

    //crea un form data para enviar el archivo y datos del body juntos
    const formData = new FormData();

    //req.file.buffer contiene los bytes del archivo subido
    //const blob = new Blob([req.file.buffer], { type: req.file.mimetype }); //Para preservar el tipo del archivo

    const file = new File(
        [req.file.buffer],          // contenido
        req.file.originalname,      // nombre
        { type: req.file.mimetype } // tipo de extension
    );

    //añade cada campo del body individualmente
    formData.append("titulo", body.titulo);
    formData.append("director", body.director);
    formData.append("anio", body.anio);
    formData.append("genero", body.genero);
    formData.append("duracion", body.duracion);
    formData.append("url_imagen", file);
    
    //bucle para ver que contiene el form data
    //console.log([...formData.entries()]);

    //captura la respuesta de la API en ese ENDPOINT
    const respuesta = await fetch('http://localhost:3000/movies/createmovie',{
                                   method:'POST',
                                   headers:{/*'Content-type':'application/json',*/'Authorization': `Bearer ${token}` },
                                   //body: JSON.stringify(body)
                                   body: formData
    })
    
    data = await respuesta.json()

    // si HTTP no es 2xx o tu backend marca ok:false
    if (!respuesta.ok || data.ok === false) {
        const msg = data?.msg|| data?.errores;
        console.log("Error backend:", msg);
        return res.render("crear.ejs", { msg });
    }

    return res.render("crear.ejs", { msg: data.msg });
}

const crearPeliculaForm=async(req,res)=>{
    return res.render('crear.ejs',{msg:null})
}

module.exports={crearPelicula,crearPeliculaForm}