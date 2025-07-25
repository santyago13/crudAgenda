import Contacto from "./contacto.js";

// ELEMENTOS DEL DOM
const btnAgregarContacto = document.getElementById("btnAgregarContacto");
const modalFormContacto = new bootstrap.Modal(
  document.getElementById("contactoModal")
);
const formularioContacto = document.getElementById("formContacto");
const inputNombre = document.getElementById("nombre");
const inputApellido = document.getElementById("apellido");
const inputTelefono = document.getElementById("telefono");
const inputEmail = document.getElementById("email");
const inputImagen = document.getElementById("imagen");
const inputEmpresa = document.getElementById("empresa");
const inputPuestoTrabajo = document.getElementById("puestoTrabajo");
const inputDireccion = document.getElementById("direccion");
const inputNotas = document.getElementById("notas");

// FUNCIONES
function crearContacto() {
  //aqui tengo que crear el contacto
  //todo Agregar validaciones
  //buscar los datos del formulario y crear un objeto contacto
  const contactoNuevo = new Contacto(
    inputNombre.value,
    inputApellido.value,
    inputTelefono.value,
    inputEmail.value,
    inputImagen.value,
    inputEmpresa.value,
    inputPuestoTrabajo.value,
    inputDireccion.value,
    inputNotas.value
  );
  console.log(contactoNuevo);
  //guardar el contacto en la agenda de contactos
  //guardar la agenda en el localstorage
}

// MANEJADORES DE EVENTOS
btnAgregarContacto.addEventListener("click", () => {
  modalFormContacto.show();
});

formularioContacto.addEventListener("submit", (e) => {
  e.preventDefault();
  // aqui tengo que crear / editar contacto
  crearContacto();
});
