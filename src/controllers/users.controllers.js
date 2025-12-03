const express=require('express')

const dashboardUser=async(req,res)=>{

    //captura el token desde las cookies o headers
    const token =req.cookies?.token || req.headers["authorization"]?.split(" ")[1];

    //variable para guardar la respuesta en formato json
    let data;

    //captura la respuesta de la API en ese ENDPOINT
    const respuesta = await fetch('http://localhost:3000/movies',{
                                   method:'GET',
                                   headers:{'Content-type':'application/json','Authorization': `Bearer ${token}` },
                                   //body: JSON.stringify(body), //formato a JSON,
                                })

    // transforma la respuesta a  formato JSON (porque siempre hay una respuesta de la API)
    data = await respuesta.json()

    //ver que llega en data
    //console.log(data)

    res.render('dashboard.ejs',{data})
}

module.exports={dashboardUser}