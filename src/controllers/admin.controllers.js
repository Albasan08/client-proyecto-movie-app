const express=require('express')

const crearPelicula=async(req,res)=>{

    //captura el token desde las cookies o headers
    const token =req.cookies?.token || req.headers["authorization"]?.split(" ")[1];

    // Capturar los elementos deseados - data de la película
    
     const body=req.body

     console.log(body)
    //variable para guardar la respuesta en formato json
    let data;

    //crea un form data para enviar el archivo y datos del body juntos
    const formData = new FormData();

    const blob = new Blob([req.file.buffer], { type: req.file.mimetype });

    //formData.append("body", JSON.stringify(body)); //añade body como string

    //formData.append("file", JSON.stringify(req.file)); //añade el archivo subido

    //añade cada campo del body individualmente
    formData.append("titulo", body.titulo);
    formData.append("director", body.director);
    formData.append("anio", body.anio);
    formData.append("genero", body.genero);
    formData.append("duracion", body.duracion);
    formData.append("url_imagen",  blob, req.file.originalname); //añade el archivo subido como blob

    //bucle para ver que contiene el form data
    console.log([...formData.entries()]);

    //captura la respuesta de la API en ese ENDPOINT
    const respuesta = await fetch('http://localhost:3000/movies/createmovie',{
                                   method:'POST',
                                   headers:{/*'Content-type':'application/json',*/'Authorization': `Bearer ${token}` },
                                   //body: JSON.stringify(body)
                                   body: formData
    })
    

    if (respuesta) {//si el status de la respuesta (OK) es TRUE lo transforma a formato JSON
        data = await respuesta.json()

        //ver que llega en data
        console.log(data) //esto se ve desde CMD no en consola del navegador
    } else {
        data = { ok: false, mensaje: 'Error al crear la pelicula' };
    }

    res.render('crear.ejs',{data})
}

const crearPeliculaForm=async(req,res)=>{

    res.render('crear.ejs')
}


const editarPelicula = async (req, res) => {

    // Captura el token desde cookies o headers
    const token = req.cookies?.token || req.headers["authorization"]?.split(" ")[1];

    // ID de la película
    const { id } = req.params;

    // Datos enviados desde el formulario
    const body = req.body;

    let data;

    // Crear FormData para enviar texto + archivo
    const formData = new FormData();

    // Si llega archivo, lo convertimos a Blob
    if (req.file) {
        const blob = new Blob([req.file.buffer], { type: req.file.mimetype });
        formData.append("url_imagen", blob, req.file.originalname);
    }

    // Añadir campos del body
    formData.append("titulo", body.titulo);
    formData.append("director", body.director);
    formData.append("anio", body.anio);
    formData.append("genero", body.genero);
    formData.append("duracion", body.duracion);

    // Debug
    console.log([...formData.entries()]);

    // Llamada a la API para editar
    const respuesta = await fetch(`http://localhost:3000/movies/editmovie/${id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`
            // NO pongas Content-Type, fetch lo añade solo con boundary
        },
        body: formData
    });

    data = await respuesta.json();

    res.render('editar.ejs', { data });
};

const editarPeliculaForm = async (req, res) => {

    const { id } = req.params;

    // Captura el token desde cookies o headers
    const token = req.cookies?.token || req.headers["authorization"]?.split(" ")[1];

    try {
        // Llamada a la API para obtener los datos actuales
        const respuesta = await fetch(`http://localhost:3000/movies/editmovie/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await respuesta.json();
       

        // Renderiza la vista con los datos de la película
        res.render("editar.ejs", {data: data.data });

    } catch (error) {
        console.error("Error al cargar datos de la película:", error);

       /*  res.render("editar.ejs", {
            data: { mensaje: "Error al cargar la película",  });*/ 
            // res.render({ data: null })
        
    } 

         res.render("editar.ejs")
};


module.exports={crearPelicula,crearPeliculaForm,editarPelicula,editarPeliculaForm}