class usuari {
    constructor(usr, correo) {
        if (this.constructor != usuari) {
            this.usr = usr;
            this.correo = correo;
        }
    }
}

class client extends usuari{
    constructor(usr, dni, correo, genero) {
        super(usr, correo);
        this.genero = genero;
        this.dni = dni;
        this.rol = "client";
    }
}

class admin extends usuari{
    constructor(usr, correo) {
        super(usr, correo);
        this.rol = "admin";
    }
}

module.exports = {
    admin : admin,
    client : client
}

//! Usuario se registra y la contraseña se guarda hasheada.
//! el usuario hace login y el server busca su usuario y su contraseña hasheada, si coinciden, el server recoge los datos del usuario
//! (usuario, correo, nombre y tal)