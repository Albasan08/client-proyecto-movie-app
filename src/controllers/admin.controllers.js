const express=require('express')
const fs = require("fs/promises");

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

    const buffer = await fs.readFile(req.file.path);

    const blob = new Blob([buffer], { type: req.file.mimetype });

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
    

    // if (respuesta) {//si el status de la respuesta (OK) es TRUE lo transforma a formato JSON
    //     data = await respuesta.json()

    //     //ver que llega en data
    //     console.log(data) //esto se ve desde CMD no en consola del navegador
    // } else {
    //     data = { ok: false, mensaje: 'Error al crear la pelicula' };
    // }

    res.render('crear.ejs')
}

const crearPeliculaForm=async(req,res)=>{

    res.render('crear.ejs')
}

module.exports={crearPelicula,crearPeliculaForm}