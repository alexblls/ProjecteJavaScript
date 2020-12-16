export {home};
import {sesionUsuarioLogeado} from "./projecteJS.js";


function home() {

    document.title = "Home";
    let contingut = document.querySelector("#contingut");

    let dinsContingut = '';

    dinsContingut = `
            <div class="container">
                <p>Bienvenido `+sesionUsuarioLogeado.nombre+`</p>
            </div>
            `
    contingut.innerHTML = dinsContingut;
}