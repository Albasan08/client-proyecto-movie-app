# CLIENTE MOVIE APP

## DESCRIPCIÓN GENERAL
Aplicación web desarrollada de búsqueda y gestión de películas que engloba diferentes funcionalidades y endpoints asociados.

## TECNOLOGÍAS UTILIZADAS
1. **CLIENTE - FRONTEND**
    - HTML5
    - CSS.
    - EJS
    - JavaScript
2. **HERRAMIENTAS DE DESARROLLO**
    - Git & GitHub
    - Postman
3. **DESPLIEGUE**
    - Render
4. **ORGANIZACIÓN DE TRABAJO**
    - Trello

## ARQUITECTURA
```bash
.env.template
README.md
package-lock.json
package.json
/src
    /controllers - Funciones controladora
    /helper - Funciones ayudadoras
    /public - Carpeta pública
        /assets
            /img
        /css
        /js
    /routes - Rutas
    /views - Vistas
        /template - Plantillas 
    /app.js

```

## ROLES DE USUARIO
Se diferencian dos roles de usuario: 
    - Admin: Rol que gestiona las funciones relacionadas con las películas.
    - User: Rol que se adjudica automáticamente cuando un usuario nuevo se registra.
Cada rol tiene acceso únicamente a las funcionalidades que le corresponde.

## ENDPOINTS
### Autenticación
- **login** - /login
- **registro** - /signup
- **cerrar sesión** - /logout
### Películas
- **panel de control usuario** - /dashboard
- **buscador películas** - /search
- **detalle película** - /search/:title
- **crear película** - /createmovie
- **editar película** - /editmovie/:id
- **eliminar película** - /removemoevie

## INSTRUCCIONES DE INSTALACIÓN
1. Fork el repositorio
2. Instalar dependencias
```bash
npm install express, dotenv, cors, express-validator, ejs, cookie-parser
``
3. Ejecutar servidor en la terminal
```bash
npm run dev
```

## VARIABLES DE ENTORNO
1. Renombrar archivo .env.template por .env
2. Compeltar las variables de entorno con la información del entorno local o de producción