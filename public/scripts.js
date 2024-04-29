window.onload = () => {

    ////////////////////////////////Minijuego///////////////////////////////////

    class Minijuego {
        constructor() {
            this.timer = document.querySelector(".timer");
            this.minutes = 0;
            this.seconds = 0;
            this.lastPosition = null;
            this.timerInterval = setInterval(() => this.actualitzarTimer(), 1000);
            this.listeners();
            this.mostrarTimer();
        }

        actualitzarTimer() {
            if (this.seconds === 0) {
                if (this.minutes > 0) {
                    this.minutes--;
                    this.seconds = 59;
                }
            } else if (this.seconds === 1) {
                this.seconds--;
                this.treureAigua();
            } else {
                this.seconds--;
            }
            this.mostrarTimer();
        }

        treureAigua() {
            document.querySelector(".medidor").firstChild.remove();
        }

        mostrarTimer() {
            this.timer.innerHTML = `${this.minutes.toString().padStart(2, '0')}:${this.seconds.toString().padStart(2, '0')}`;
        }

        listeners() {
            let containers = document.querySelectorAll('.recipiente, .llenado');
            containers.forEach(container => {
                container.addEventListener('dragstart', ev => this.gestionarIniciDrag(ev), false);
                container.addEventListener('dragover', ev => this.gestionarSobreDrag(ev), false);
                container.addEventListener('drop', ev => this.gestionarDrop(ev), false);
            });
        }


        gestionarSobreDrag(ev) {
            ev.preventDefault();
        }

        gestionarIniciDrag(ev) {
            this.lastPosition = document.getElementById("bidon").parentElement;
            ev.dataTransfer.setData("img", ev.target.id);
        }

        gestionarDrop(ev) {
            ev.preventDefault();
            var data = ev.dataTransfer.getData("img");
            ev.target.appendChild(document.getElementById(data).cloneNode(true));
            this.lastPosition.firstElementChild.remove();
            if (ev.target.classList.contains('recipiente')) {
                this.omplirAigua();
                this.girar();
            }
            if (ev.target.classList.contains('llenado')) {
                this.mostrarAigua();
            }
        }

        omplirAigua() {
            let container = document.querySelector(".medidor");
            let aigua = document.createElement("div");
            if (container.children.length <= 11) {
                aigua.className = "aigua";
                container.appendChild(aigua);
                this.minutes += 1;
            }
        }

        girar() {
            let bidon = document.getElementById("bidon");
            bidon.style.transform = "rotate(-60deg)";
            bidon.parentElement.style.border = "1px solid transparent";
            setTimeout(() => {
                bidon.style.transform = "rotate(0deg)";
                bidon.parentElement.style.border = "1px solid black";
            }, 500);
        }

        mostrarAigua() {
            let aiguaCau = document.getElementById("agua");
            aiguaCau.style.visibility = "visible";
            setTimeout(() => {
                aiguaCau.style.visibility = "hidden";
            }, 1000);
        }
    }

    const game = new Minijuego();

    /////////////////////////////////////Mongo//////////////////////////////////////////////////

    let registre = document.querySelector(".popup");
    let login = document.querySelector(".popup2");
    let perEsborrar = document.querySelector(".popup3");
    let perCanviar = document.querySelector(".popup4");

    let loginButton = document.querySelector(".perfil>h1");
    loginButton.addEventListener("click", () => {
        registre.style.display = "block";
    });

    let buttons = document.querySelectorAll(".popup-inner button");
    buttons[1].addEventListener("click", () => {
        registre.style.display = "none";
        login.style.display = "none";
    });

    buttons[3].addEventListener("click", () => {
        registre.style.display = "none";
        login.style.display = "none";
    });

    buttons[5].addEventListener("click", () => {
        registre.style.display = "none";
        login.style.display = "none";
    });

    buttons[7].addEventListener("click", () => {
        registre.style.display = "none";
        login.style.display = "none";
    });

    let conmutarLogin = document.getElementById("conmutar");
    conmutarLogin.addEventListener("click", () => {
        registre.style.display = "none";
        login.style.display = "block";
    });
    let conmutarRegistre = document.getElementById("conmutar2");
    conmutarRegistre.addEventListener("click", () => {
        login.style.display = "none";
        registre.style.display = "block";
    });
    let conmutarBorra = document.getElementById("conmutarEsborrar");
    conmutarBorra.addEventListener("click", () => {
        login.style.display = "none";
        perEsborrar.style.display = "block";
    });
    let conmutarCanvia = document.getElementById("conmutarCanvia");
    conmutarCanvia.addEventListener("click", () => {
        login.style.display = "none";
        perCanviar.style.display = "block";
    });

    let ferLogin = document.querySelector(".login");
    let ferRegistre = document.querySelector(".registre");
    let esborrarCompte = document.querySelector(".esborra");
    let canvia = document.querySelector(".canvia");

    ferLogin.addEventListener("click", () => {
        let a = document.getElementById("usr2").value;
        let b = document.getElementById("cnt2").value;

        var initPropi = {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `usrAEliminar=${encodeURIComponent(a)}&newCnt=${encodeURIComponent(b)}`,
        };

        var peticio = new Request(`http://localhost:8888/login?usuari=${a}&contraseña=${b}`, initPropi);

        fetch(peticio);
        
        registre.style.display = "none";
        login.style.display = "none";
    });

    ferRegistre.addEventListener("click", () => {
        let a = document.getElementById("usr1").value;
        let b = document.getElementById("cnt1").value;

        var initPropi = {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        };

        var peticio = new Request(`http://localhost:8888/registre?usuari=${a}&contraseña=${b}`, initPropi);

        fetch(peticio);

        registre.style.display = "none";
        login.style.display = "none";
    });

    esborrarCompte.addEventListener("click", () => {
        let a = document.getElementById("usr3").value;

        var initPropi = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        };

        var peticio = new Request(`http://localhost:8888/esborrarCompte?usuari=${a}`, initPropi);

        fetch(peticio);

        registre.style.display = "none";
        login.style.display = "none";
        perEsborrar.style.display = "none";
    });

    canvia.addEventListener("click", () => {
        let a = document.getElementById("usr4").value;
        let b = document.getElementById("cnt4").value;

        var initPropi = {
            method: 'PUT',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        };

        var peticio = new Request(`http://localhost:8888/canvia?usuari=${a}&contraseña=${b}`, initPropi);

        fetch(peticio);
        
        registre.style.display = "none";
        login.style.display = "none";
        perCanviar.style.display = "none";
    });
}