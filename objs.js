const Classes = require('./classes');

function crearClient(usr, dni, correo, genero){
    return new Classes.client(usr, dni, correo, genero);
}

function crearAdmin(usr, correo){
    return new Classes.admin(usr, correo);
}

module.exports = {
    client : crearClient(),
    admin : crearAdmin()
}