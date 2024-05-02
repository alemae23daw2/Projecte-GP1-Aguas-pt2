class usuari {
    constructor(usr, correo) {
        if (this.constructor != usuari) {
            this.nom = nom;
            this.edat = edat;
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