export {datosDispos};
export { dispositius };

let dispositius;
function datosDispos() {
    async function dades() {
        let array = {}
        await fetch('dispositius.json')
            .then(response => response.json())
            .then(dato => array = dato)
    
        return array;
    }
    async function tratDatos(){
        let array = await dades();
        let dadesDispos = array.dispositivos;
        dispositius = dadesDispos;
    }
    tratDatos();
}