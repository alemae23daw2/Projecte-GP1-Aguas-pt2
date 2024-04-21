var crypto = require('crypto');
const { default: mongoose } = require("mongoose");
const userSchema = new mongoose.Schema({
    usr: String,
    dni: String,
    genero: String,
    correo: String,
    hash: String,
    salt: String
}, { collection: "test" });

userSchema.methods.setPassword = function (password) {

    // Creating a unique salt for a particular user 
    this.salt = crypto.randomBytes(16).toString('hex');

    // Hashing user's salt and password with 1000 iterations, 

    this.hash = crypto.pbkdf2Sync(password, this.salt,
        1000, 64, `sha512`).toString(`hex`);
};

// Method to check the entered password is correct or not 
userSchema.methods.validPassword = function (password) {
    var hash = crypto.pbkdf2Sync(password,
        this.salt, 1000, 64, `sha512`).toString(`hex`);
    return this.hash === hash;
};

const Usuario = mongoose.model("Usuario", userSchema);

exports.index = function (req, res) {
    res.render('layout');
};

exports.afegir = function () {
    return async function (req, res) {

        // recuperem les dades del formulari
        var usr = req.body.usr;
        var dni = req.body.dni;
        var genero = req.body.genero;
        var correo = req.body.correo;
        var contraseña = req.body.pswd;

        await mongoose.connect('mongodb://127.0.0.1:27017/test').catch((err) => console.log(err));

        let usuario1 = new Usuario({ usr: usr, dni: dni, genero: genero, correo: correo });
        usuario1.setPassword(contraseña);
        await usuario1.save();

        res.location("/");
        res.redirect("/");
    };
};

exports.login = function () {
    return async function (req, res) {

        var usr = req.body.usr;

        await mongoose.connect('mongodb://127.0.0.1:27017/test').catch((err) => console.log(err));;

        /*await Usuario.findOne({ nombre: usr }, function(err, usuario){
            if (usuario === null) { 
                return res.render('mostrarAlumnes', { arrUsrs: "no se ha encontrado el usuario" });
            } 
            else { 
                if (usuario.validPassword(req.body.pswd)) { 
                    return res.render('mostrarAlumnes', { arrUsrs: "usuario y contraseña correctos" });
                } 
                else { 
                    return res.render('mostrarAlumnes', { arrUsrs: "usuario o contraseña incorrectos" });
                } 
            } 
        });*/

        await Usuario.findOne({ usr: usr }).then((usuario) =>{
            if(!usuario){
                return res.render('mostrarAlumnes', { msg: "no se ha encontrado el usuario" });
            }else{
                if (usuario.validPassword(req.body.pswd)) {
                    var loggedUser = crearClient(usuario.usr, usuario.dni, usuario.correo, usuario.genero);
                    console.log(loggedUser);
                    //return res.render('mostrarAlumnes', { msg: "usuario y contraseña correctos" });
                } 
                else { 
                    return res.render('mostrarAlumnes', { msg: "usuario o contraseña incorrectos" });
                }
            }
        });
    };
};

exports.loginAdmin = function () {
    return async function (req, res) {

        var usr = req.body.usr;

        await mongoose.connect('mongodb://127.0.0.1:27017/test').catch((err) => console.log(err));;

        await Usuario.findOne({ usr: usr }).then((usuario) =>{
            if(!usuario){
                return res.render('mostrarAlumnes', { msg: "no se ha encontrado el usuario" });
            }else{
                if (usuario.validPassword(req.body.pswd)) {
                    var loggedUser = crearAdmin(usuario.usr, usuario.correo);
                    console.log(loggedUser);
                    //return res.render('mostrarAlumnes', { msg: "usuario y contraseña correctos" });
                } 
                else { 
                    return res.render('mostrarAlumnes', { msg: "usuario o contraseña incorrectos" });
                }
            }
        });
    };
};

exports.mostrarTots = function () {
    return async function (req, res) {

        await mongoose.connect('mongodb://127.0.0.1:27017/test').catch((err) => console.log(err));;

        const Usuarios = await Usuario.find();

        res.render('mostrarAlumnes', { arrUsrs: Usuarios });
    };
};

exports.mostrarCoincidencies = function () {
    return async function (req, res) {

        var dni = req.query.dni;

        await mongoose.connect('mongodb://127.0.0.1:27017/test').catch((err) => console.log(err));;

        const Usuarios = await Usuario.find({ dni: dni }).exec();

        res.render('mostrarAlumnes', { arrUsrs: Usuarios });
    };
};