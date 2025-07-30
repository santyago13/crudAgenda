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
const tbody = document.getElementById("tablaContactoBody");
// verificar si hay contactos en el local storage, si no hago un array vacio
const agenda = JSON.parse(localStorage.getItem("agendaKey")) || [];
console.log(agenda);

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
  agenda.push(contactoNuevo);
  //guardar la agenda en el localstorage
  guardarLocalStorage();
  //mostrar un mensaje al usuario final
  Swal.fire({
    title: "Contacto creado",
    text: `El contacto ${inputNombre.value} fue creado correctamente`,
    icon: "success",
    confirmButtonText: "Ok",
  });
  //limpiar el formulario
  limpiarFormulario();
}

function limpiarFormulario() {
  formularioContacto.reset();
}

function guardarLocalStorage() {
  localStorage.setItem("agendaKey", JSON.stringify(agenda));
}

function cargarContactos() {
  //verificar si tengo contactos para cargar
  if (agenda.length !== 0) {
    //recorrer mi agenda y por cada elemento de la agenda hacer una fila
    agenda.map((itemContacto, indice)=> dibujarFila(itemContacto, indice+1))
  } else {
    //todo dibujar un parrafo que diga que no tengo contactos
  }
  //si tengo, tengo que dibujar las filas en la tabla
}

function dibujarFila(itemContacto, fila) {
  tbody.innerHTML += `
              <tr>
                <th scope="row">${fila}</th>
                <td>${itemContacto.nombre}</td>
                <td>${itemContacto.apellido}</td>
                <td>${itemContacto.telefono}</td>
                <td>
                  <img
                    src="${itemContacto.imagen}"
                    alt="${itemContacto.nombre}"
                    class="rounded-circle object-fit-cover"
                    width="35px"
                    height="35px"
                  />
                </td>
                <td>
                  <div class="d-flex gap-2">
                    <button class="btn btn-info">
                      <i class="bi bi-eye"></i>
                    </button>
                    <button class="btn btn-warning">
                      <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-danger">
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
              `;
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

cargarContactos();
