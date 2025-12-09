

const crearPelicula=async(req,res)=>{

    //captura el token desde las cookies o headers
    const token =req.cookies?.token || req.headers["authorization"]?.split(" ")[1];
     //console.log(req.cookies)
    
    // Capturar el body
     const body=req.body
     //console.log(body)

    //variable para guardar la respuesta en formato json
    let data;

    //crea un form data para enviar el archivo y datos del body juntos
    const formData = new FormData();

    //añade cada campo del body individualmente
    formData.append("titulo", body.titulo);
    formData.append("director", body.director);
    formData.append("anio", body.anio);
    formData.append("genero", body.genero);
    formData.append("duracion", body.duracion);
    
    
    //comprobacion de que se ha subido un archivo
    if (req.file) {
        
        //se contsruye el objeto de tipo file para enviarlo en el form data
        const file = new File(
            [req.file.buffer],          // contenido
            req.file.originalname,      // nombre
            { type: req.file.mimetype } // tipo de extension
        );

        //se añade el objeto file al form data
        formData.append("url_imagen", file);
        
    }else{
        formData.append("url_imagen", null);
    }

    //bucle para ver que contiene el form data
    //console.log([...formData.entries()]);

    //captura la respuesta de la API en ese ENDPOINT
    const respuesta = await fetch(`${process.env.URLBASE}/movies/createmovie`,{
                                   method:'POST',
                                   headers:{/*'Content-type':'application/json',*/'Authorization': `Bearer ${token}` },
                                   //body: JSON.stringify(body)
                                   body: formData
    })
    
    data = await respuesta.json()

    // si la respuesta no es ok, recoge los errores y los manda a la vista
    if (!respuesta.ok || data.ok === false) {

        //se recoge el mensaje de error de sql o los errores provenientes del check en backend
        const msg = data?.msg|| data?.errores;
         //console.log("Error backend:", msg);
        return res.render("crear.ejs", { msg });
    }

    return res.render("crear.ejs", { msg: data.msg });
}

const crearPeliculaForm=async(req,res)=>{

    //pinta el formulario de creacion con el mensaje nulo
    return res.render('crear.ejs',{msg:null})
}


const editarPelicula = async (req, res) => {

    // Captura el token desde cookies o headers
    const token = req.cookies?.token || req.headers["authorization"]?.split(" ")[1];

    // ID de la película
    const { id } = req.params;

    // esparce lo que haya en body y añade el id
    const body ={
        ...req.body,
        id_pelicula:id
    }

    let data;

    // Crear FormData para enviar texto + archivo
    const formData = new FormData();

    //añade cada campo del body individualmente
    formData.append("titulo", body.titulo);
    formData.append("director", body.director);
    formData.append("anio", body.anio);
    formData.append("genero", body.genero);
    formData.append("duracion", body.duracion);
    
    //comprobacion de que se ha subido un archivo
    if (req.file) {
                
        //se contsruye el objeto de tipo file para enviarlo en el form data
        const file = new File(
            [req.file.buffer],          // contenido
            req.file.originalname,      // nombre
            { type: req.file.mimetype } // tipo de extension
        );

        //se añade el objeto file al form data
        formData.append("url_imagen", file);
        
    }else{
        formData.append("url_imagen", null);
    }

    //bucle para ver que contiene el form data
    console.log([...formData.entries()]);

    // Llamada a la API para editar
    const respuesta = await fetch(`${process.env.URLBASE}/movies/editmovie/${id}`, {
        method: 'PUT',
        headers: {'Authorization': `Bearer ${token}`},
        body: formData
    });

    data = await respuesta.json();

    //console.log(data)
    // si la respuesta no es ok, recoge los errores y los manda a la vista
    if (!respuesta.ok || data.ok === false) {

        //se recoge el mensaje de error de sql o los errores provenientes del check en backend
        const msg = data?.msg|| data?.errores;
         //console.log("Error backend:", msg);
        return res.render("editar.ejs", { data: body,msg });
    }
    
    // viene del back e incluye url_imagen
    const pelicula = data.data;

    //envia la pelicula actualizada y mensaje de éxito
    res.render("editar.ejs", { data: pelicula, msg: "Película actualizada correctamente" });
};

const editarPeliculaForm = async (req, res) => {

    //captura el id de la pelicula desde los parametros
    const { id } = req.params;

    // Captura el token desde cookies o headers
    const token = req.cookies?.token || req.headers["authorization"]?.split(" ")[1];

    try {
        // Llamada a la API para obtener los datos actuales
        const respuesta = await fetch(`${process.env.URLBASE}/movies/editmovie/${id}`, {
            method: 'GET',
            headers: {'Authorization': `Bearer ${token}`}
        });

        
        const data = await respuesta.json();
        // Renderiza la vista con los datos de la película

        //console.log(data)
        res.render("editar.ejs", {data: data.data });

    } catch (error) {
        console.error("Error al cargar datos de la película:", error);
        // Renderiza con data vacío o mensaje de error
        return res.render("editar.ejs", { data: null, msg: "Error al cargar la película"})
        //  res.render("editar.ejs")        
    }       
}; 


const eliminarPelicula = async (req, res) => {

    //captura el id de la pelicula desde los parametros
    const { id } = req.params;

    // Captura el token desde cookies o headers
    const token = req.cookies?.token || req.headers["authorization"]?.split(" ")[1];

    try {
        // Llamada a la API para obtener los datos actuales
        const respuesta = await fetch(`${process.env.URLBASE}/movies/removemovie/${id}`, {
            method: 'DELETE',
            headers: {'Authorization': `Bearer ${token}`}
        });

        const data = await respuesta.json();
        console.log("IMprimiendo respuesta de back en cliente:",data)

        //return res.redirect('/movies',{data:data.data});

        return res.redirect(`/movies?msg=${encodeURIComponent(data.msg)}`)

    } catch (error) {
        console.error("Error al cargar datos de la película:", error);
        // Renderiza con data vacío o mensaje de error
       return res.redirect(`/movies/editmovie/${id}?msg=${encodeURIComponent("Error al eliminar la película")}`);
        //return res.render("/movies/editmovie", )   
    }       
};

module.exports={crearPelicula,crearPeliculaForm,editarPelicula,editarPeliculaForm,eliminarPelicula}