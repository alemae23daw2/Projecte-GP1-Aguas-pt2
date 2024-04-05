class usuari {
    constructor(nom, edat) {
        if (this.constructor != usuari) {
            this.nom = nom;
            this.edat = edat;
        }
    }
}

class client extends usuari{
    constructor(nom, edat, titol) {
        super(nom, edat);
        this.titol = titol;
    }
}

class admin extends usuari{
    constructor(nom, edat, titol) {
        super(nom, edat);
        this.titol = titol;
    }
}

//! Usuario se registra y la contraseña se guarda hasheada.
//! el usuario hace login y el server busca su usuario y su contraseña hasheada, si coinciden, el server recoge los datos del usuario
//! (usuario, correo, nombre y tal)