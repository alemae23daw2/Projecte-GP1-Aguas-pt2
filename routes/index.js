const crypto = require('crypto');
const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    usr: String,
    dni: String,
    genero: String,
    correo: String,
    hash: String,
    salt: String,
    isAdmin: { type: Boolean, default: false } 
}, { collection: "test" });

userSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`);
};

userSchema.methods.validPassword = function (password, isAdmin = false) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`);
    return this.hash === hash && (isAdmin ? this.isAdmin : true);
};

const Usuario = mongoose.model("Usuario", userSchema);

let sessions = {};

function createSession(username, isAdmin) {
    const sessionId = crypto.randomBytes(16).toString('hex');
    sessions[sessionId] = { username: username, isAdmin: isAdmin };
    return sessionId;
}

function verifySession(sessionId) {
    return sessions[sessionId];
}

exports.index = function (req, res) {
    res.render('layout');
};

exports.afegir = function () {
    return async function (req, res) {
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

        await mongoose.connect('mongodb://127.0.0.1:27017/test').catch((err) => console.log(err));

        await Usuario.findOne({ usr: usr }).then((usuario) =>{
            if(!usuario){
                return res.render('mostrarAlumnes', { msg: "no se ha encontrado el usuario" });
            }else{
                if (usuario.validPassword(req.body.pswd)) {
                    const sessionId = createSession(usuario.usr, false);
                    res.cookie('session_id', sessionId);
                    return res.redirect('/homeusr');
                } else {
                    return res.render('mostrarAlumnes', { msg: "usuario o contraseña incorrectos" });
                }
            }
        });
    };
};

exports.loginAdmin = function () {
    return async function (req, res) {
        var usr = req.body.usr;

        await mongoose.connect('mongodb://127.0.0.1:27017/test').catch((err) => console.log(err));

        await Usuario.findOne({ usr: usr }).then((usuario) =>{
            if(!usuario){
                return res.render('mostrarAlumnes', { msg: "no se ha encontrado el usuario" });
            }else{
                if (usuario.validPassword(req.body.pswd, true)) {
                    const sessionId = createSession(usuario.usr, true);
                    res.cookie('session_id', sessionId);
                    return res.redirect('/homeadmin');
                } else {
                    return res.render('mostrarAlumnes', { msg: "usuario o contraseña incorrectos" });
                }
            }
        });
    };
};
