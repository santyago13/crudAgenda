// ELEMENTOS DEL DOM
const btnAgregarContacto = document.getElementById("btnAgregarContacto")
const modalFormContacto = new bootstrap.Modal(document.getElementById("contactoModal"))
const formularioContacto = document.getElementById("formContacto")

// FUNCIONES
function crearContacto() {
    //aqui tengo que crear el contacto
    console.log("hola")
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