import Contacto from "./contacto.js";
// ELEMENTOS DEL DOM
const btnAgregarContacto = document.getElementById("btnAgregarContacto")
const modalFormContacto = new bootstrap.Modal(document.getElementById("contactoModal"))
const formularioContacto = document.getElementById("formContacto")
const inputNombre = document.getElementById("nombre")
const inputApellido = document.getElementById("apellido")
const inputEmail = document.getElementById("email")
const inputTelefono = document.getElementById("telefono")
const inputDireccion = document.getElementById("direccion")
const inputEmpresa = document.getElementById("empresa")
const inputPuestoTrabajo = document.getElementById("puestoTrabajo")
const inputNotas = document.getElementById("notas")
const inputImagen = document.getElementById("imagen")

// FUNCIONES
function crearContacto() {
    //aqui tengo que crear el contacto
    //todo Agregar validaciones
    //buscar los datos del formulario y crear un objeto contacto
    //guardar el contacto en la agenda de contactos
    //guardar la agenda en el localstorage
    const contactoNuevo = new Contacto(1,1,1,1,1,1,1,1,1,1)
}

// MANEJADORES DE EVENTOS
btnAgregarContacto.addEventListener("click", ()=> {
    modalFormContacto.show()
})

formularioContacto.addEventListener('submit', (e)=>{
    e.preventDefault()
    // aqui tengo que crear / editar contacto
    crearContacto()
})