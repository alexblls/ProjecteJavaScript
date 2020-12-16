export { sesionUsuarioLogeado };
import { home } from "./views.js";
import { dispositius } from "./jeison.js";
import { datosDispos } from "./jeison.js";

(() => {
    "use strict"

    document.addEventListener("DOMContentLoaded", function () {

        login();

        datosDispos();

        const switchers = [...document.querySelectorAll('.switcher')]

        switchers.forEach(item => {
            item.addEventListener('click', function () {
                switchers.forEach(item => item.parentElement.classList.remove('is-active'))
                this.parentElement.classList.add('is-active')
            })
        })
    });
})();


class GalletaPrincipe {
    static setgalleta(cNom, cvalor, nDies) {
        let data = new Date();
        data.setTime(data.getTime + (nDies * 24 * 60 * 1000));
        let expira = "expira = " + data.toUTCString();
        document.cookie = cNom + "=" + cvalor + ";" + expira + ";path=/";
    }

    static getGalleta(cNom) {
        let nom = cNom + "=";
        let ca = document.cookie.split(";");
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(nom) == 0) {
                return c.substring(nom.length, c.length);
            }
        }
        return "";
    }

    static borrarGalletaOreo() {
        let galletaMaria = GalletaPrincipe.getGalleta("username");
        galletaMaria = document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.querySelector('#barra').innerHTML = "";
        document.querySelector('#contingut').innerHTML = "";
        login();
    }
}

function barraNavegacio() {

    let contingut = document.querySelector("#contingut");
    contingut.innerHTML = "";
    let contenedorTot = document.getElementById("barra");

    let barraNavegacion = document.createElement("nav");
    contenedorTot.appendChild(barraNavegacion);
    barraNavegacion.setAttribute("class", "navbar absolute-top navbar-dark bg-dark");

    let dinsnav = document.createElement("button");
    barraNavegacion.appendChild(dinsnav);
    dinsnav.setAttribute("class", "navbar-brand");

    let dinsnav1 = document.createElement("button");
    barraNavegacion.appendChild(dinsnav1);
    dinsnav1.setAttribute("class", "navbar-brand");

    let logOut = document.createElement("button");
    barraNavegacion.appendChild(logOut);
    logOut.setAttribute("class", "navbar-brand");

    let dinsnava = document.createTextNode("Home")
    dinsnav.appendChild(dinsnava);
    let dinsnava1 = document.createTextNode("Mis Dispositivos")
    dinsnav1.appendChild(dinsnava1);
    let logOuta = document.createTextNode("LogOut")
    logOut.appendChild(logOuta);

    dinsnav.addEventListener("click", home);
    dinsnav1.addEventListener("click", dispositivos);
    logOut.addEventListener("click", GalletaPrincipe.borrarGalletaOreo);

}

let arrayDisposUsuarios = [];

async function dispositivos() {
    document.title = "Dispositius";
    let arrayTempDispos = [] //En este array se guardan los dispositivo de cada usuario
    for (let i = 0; i < arrayDisposUsuarios.length; i++) {
        if (arrayDisposUsuarios[i].includes(nombreUser)) {
            arrayTempDispos.push(arrayDisposUsuarios[i]);
        }
    }

    let contingut = document.querySelector("#contingut");

    let dinsTot = '';

    let arrayAtribut = [];

    dinsTot += "<div id='dispositius'>"
    for (const unDispo of dispositivosACrear) {
        for (let i = 0; i < arrayTempDispos.length; i++) {
            if (arrayTempDispos[i].includes(unDispo)) {
                dinsTot += `
            <div id="${unDispo}" class="cartasDispos card shadow-lg p-3 mb-5 bg-white rounded" style="width: 18rem;">
                <div class="card-body ">
                    <h3 class="card-title">${unDispo}</h3>`;
                let arrayCosas = [];
                for (let j of Object.entries(dispositius)) {
                    if (j[0] == unDispo) {
                        arrayCosas.push(j);
                        arrayAtribut.length = 0;
                        for (const itera of Object.entries(arrayCosas[0][1])) {
                            arrayAtribut.push(itera);
                        }
                        for (let i = 0; i < arrayAtribut.length; i++) {
                            dinsTot += `<p class="atribut card-text">${arrayAtribut[i].toString().replace(",", ": ").replace("true", "on").replace("false", "off")}</p>`
                        }
                    }
                }

                dinsTot += `
                </div>
            </div>
            `
            }
        }
    }

    dinsTot += `
        
            <div id="cartaBuida" class="card shadow-lg p-3 mb-5 bg-white rounded" style="width: 18rem;">
                <div class="card-body ">
                    <h5 class="card-title">Nuevo Dispositivo</h5>
                    <p class="card-text">Pulsa la carta para añadir un nuevo dispositivo.</p>
                </div>
            </div>
        </div>
        `


    contingut.innerHTML = dinsTot;

    let cartaBuida = document.getElementById("cartaBuida");


    cartaBuida.addEventListener("click", mostrarDispositivos);

    let disUsus = document.querySelectorAll(".cartasDispos");

    for (const tralala of disUsus) {
        cadaDispositivo(tralala)
    }
}

function cadaDispositivo(tralala) {

    tralala.addEventListener("click", (e) => {
        let arrayClaus = [];
        let arrayValors = [];
        Array.from(e.target.querySelectorAll(".atribut")).map(pepe => {
            let clauvalor = pepe.innerHTML.split(":");
            let valor = clauvalor[1].replace(" ", "");
           
                valor = parseInt(valor);
                if (!isNaN(valor)){
                
                arrayValors.push(valor);
                arrayClaus.push(clauvalor[0]);
                }
        });
        document.querySelector('#contingut').innerHTML = "";

        let contenedor = document.querySelector('#contingut');
        let contingut = document.createElement("div");
        contenedor.appendChild(contingut);
        contingut.setAttribute("class", "contingutCanvas");
        let canvas = document.createElement("canvas");
        contingut.appendChild(canvas);

        canvas.setAttribute("id", "myChart");
        var ctx = document.getElementById('myChart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: arrayClaus,
                datasets: [{
                    label: 'borrar barres',
                    data: arrayValors,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
        let textGrafic= document.createElement("div");
        textGrafic.id="divBaixGrafic";

        Array.from(e.target.querySelectorAll(".atribut")).map(pepe => {
            textGrafic.innerHTML+=pepe.innerHTML+" | ";
        });
        textGrafic.innerHTML=textGrafic.innerHTML.substring(0,textGrafic.innerHTML.length-2)
        contingut.appendChild(textGrafic);

    });
    
}

let dispositivosACrear = [];
let arrayDispositivos = [];
function mostrarDispositivos() {
    arrayDispositivos.length = 0;
    for (var clave in dispositius) {
        arrayDispositivos.push(clave);
    }
    let llistaDispositius = "";
    llistaDispositius += `
            <div id="llistaDispos">
            `
    for (var coses of arrayDispositivos.sort()) {
        llistaDispositius += `
                <input class="btn btn-info" type="button" id="`+ coses + `" value="` + coses + `">
            `
    }
    llistaDispositius += `</div>`
    let contenedorTot = document.getElementById("contingut");

    contenedorTot.innerHTML = llistaDispositius;
    crearDispositivo();
}

function crearDispositivo() {
    let botonesDispos = document.querySelectorAll(".btn-info");
    for (const cadaDispo of botonesDispos) {
        cadaDispo.addEventListener("click", function () {
            let dispoActual = cadaDispo.id;
            dispositivosACrear.push(dispoActual);
            let cosas = "idDispositivo: " + dispoActual + " nombreUsuario: " + nombreUser;
            arrayDisposUsuarios.push(cosas);
            dispositivos();
        });
    }
}

class Cliente {
    constructor(nombre, contrasenya, email) {
        this.nombre = nombre;
        this.contrasenya = contrasenya;
        this.email = email;
    }
}

let cliente;
let baseClientes = [];

let sesionUsuarioLogeado = [];

cliente = new Cliente("alex", "alex", "alex@gmail.com");
baseClientes.push(cliente);

cliente = new Cliente("hitto", "hitto", "hitto@gmail.com");
baseClientes.push(cliente);


function login() {
    document.title = "Login";

    const bodyLogin = `
    <section class="forms-section">
        <div class="forms">
            <div class="form-wrapper is-active">
                <button type="button" class="switcher switcher-login">
                    Login
                    <span class="underline"></span>
                </button>
                <form class="form form-login">
                    <fieldset>
                        <legend>Porfavor, introduce usuario i contraseña.</legend>

                        <div class="input-block">
                            <label for="login-email">Nombre Usuario</label>
                            <input id="login-email" type="text" required>
                        </div>
                        <div class="input-block">
                            <label for="login-password">Contraseña</label>
                            <input id="login-password" type="password" required>
                        </div>
                        <span id="errores"></span>
                    </fieldset>
                    <button type="button" id="botonLog" class="btn-login">Logearse</button>
                </form>
            </div>
            <div class="form-wrapper">
                <button type="button" class="switcher switcher-signup">
                    Registrarse
                    <span class="underline"></span>
                </button>
                <form class="form form-signup">
                    <fieldset>
                        <legend>Please, enter your email, password and password confirmation for sign up.</legend>
                        <div class="input-block">
                            <label for="signup-usuario">Nombre Usuario</label>
                            <input id="signup-usuario" type="text" required>
                        </div>
                        <div class="input-block">
                            <label for="signup-password">Contraseña</label>
                            <input id="signup-password" type="password" required>
                        </div>
                        <div class="input-block">
                            <label for="signup-password-confirm">Confirma Contraseña</label>
                            <input id="signup-password-confirm" type="password" required>
                        </div>
                    </fieldset>
                    <button type="submit" class="btn-signup">Continue</button>
                </form>
            </div>
        </div>
    </section>`;

    let login = document.createElement('div');

    login.innerHTML = bodyLogin;

    document.querySelector('#contingut').appendChild(login);

    let botonLog = document.querySelector("#botonLog");
    botonLog.addEventListener("click", () => {

        loginCorrecto();

    });
}
let nombreUser;

function loginCorrecto() {
    nombreUser = document.querySelector("#login-email").value
    let passwordUser = document.querySelector("#login-password").value;

    let logeadoCorrecto = false;

    for (let usuario of baseClientes) {
        if (usuario.nombre == nombreUser && usuario.contrasenya == passwordUser) {
            logeadoCorrecto = true;
            sesionUsuarioLogeado = usuario;
        }
    }

    if (!logeadoCorrecto) {
        document.getElementById("errores").innerHTML = "Usuario incorrecto " + nombreUser;
        document.querySelector("#login-email").setAttribute("value", nombreUser);
    } else {
        GalletaPrincipe.setgalleta("username", nombreUser, 7);
        barraNavegacio();
    }
}