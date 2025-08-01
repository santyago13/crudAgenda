import Contacto from "./contacto.js";

// ! ELEMENTOS DEL DOM
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
let estoyCreando = true; // cuando es true crea contacto, cuando esta en false edita el contacto
let idContacto = null;
// verificar si hay contactos en el local storage, si no hago un array vacio
const agenda = JSON.parse(localStorage.getItem("agendaKey")) || [];
console.log(agenda);

// ! FUNCIONES
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
    theme: "dark",
    text: `El contacto ${inputNombre.value} fue creado correctamente`,
    icon: "success",
    confirmButtonText: "Ok",
  });
  //limpiar el formulario
  limpiarFormulario();
  //dibuje el contacto en la tabla
  console.log(contactoNuevo);
  dibujarFila(contactoNuevo, agenda.length);
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
    agenda.map((itemContacto, indice) => dibujarFila(itemContacto, indice + 1));
  } else {
    //todo dibujar un parrafo que diga que no tengo contactos
  }
  //si tengo, tengo que dibujar las filas en la tabla
}

function dibujarFila(itemContacto, fila) {
  console.log(itemContacto);
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
                    <button class="btn btn-warning" onclick="prepararContacto('${itemContacto.id}')">
                      <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-danger" onclick="borrarContacto('${itemContacto.id}')">
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
              `;
}

window.borrarContacto = (id) => {
  /* El documento html no puede acceder a esta funcion porque este archivo js esta declarada
  como tipo modulo type="module" y se tiene que hacer que esta funcion este en el objeto window
  que esta arriba del documento html y asi poder acceder a la funcion desde el documento html*/
  Swal.fire({
    title: "Estas seguro que quieres eliminar este contacto?",
    text: "No puedes revertir esto!",
    icon: "warning",
    theme: "dark",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Eliminar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      // aqui agrego la logica para borrar
      // buscar en que posicion esta el contacto con el id que quiero borrar
      const posicionContacto = agenda.findIndex(
        (contacto) => contacto.id === id
      );
      // con splice borramos el elemento de determinada posicion del array
      agenda.splice(posicionContacto, 1);
      // actualizar el local storage
      guardarLocalStorage();
      // actualizar el tbody
      tbody.children[posicionContacto].remove();
      //todo actualizar el numero de fila del array
      // mensaje de se borro perfecto
      Swal.fire({
        title: "Eliminado",
        theme: "dark",
        text: "El contacto se elimino correctamente!",
        icon: "success",
      });
    }
  });
};

window.prepararContacto = (id) => {
  //todo modificar el titulo del formulario
  estoyCreando = false;
  // cargar los datos del contacto que quiero editar
  const contactoBuscado = agenda.find((contacto) => contacto.id === id);
  // mostrar los datos del contacto en el form
  inputNombre.value = contactoBuscado.nombre;
  inputApellido.value = contactoBuscado.apellido;
  inputTelefono.value = contactoBuscado.telefono;
  inputEmail.value = contactoBuscado.email;
  inputImagen.value = contactoBuscado.imagen;
  inputEmpresa.value = contactoBuscado.empresa;
  inputPuestoTrabajo.value = contactoBuscado.puestoTrabajo;
  inputDireccion.value = contactoBuscado.direccion;
  inputNotas.value = contactoBuscado.notas;
  idContacto = id;
  // cambio la variable que controla el crear/editar

  //  abrir el modal
  modalFormContacto.show();
};

function editarContacto() {
  //buscar en que posicion del array esta el contacto con ID
  const indiceContacto = agenda.findIndex(
    (contacto) => contacto.id === idContacto
  );
  // modificar el contacto
  agenda[indiceContacto].nombre = inputNombre.value;
  agenda[indiceContacto].apellido = inputApellido.value;
  agenda[indiceContacto].telefono = inputTelefono.value;
  agenda[indiceContacto].email = inputEmail.value;
  agenda[indiceContacto].imagen = inputImagen.value;
  agenda[indiceContacto].empresa = inputEmpresa.value;
  agenda[indiceContacto].puestoTrabajo = inputPuestoTrabajo.value;
  agenda[indiceContacto].direccion = inputDireccion.value;
  agenda[indiceContacto].notas = inputNotas.value;
  // actualizar el local storage
  guardarLocalStorage();
  // actualizar el tbody
  //cerrar el modal
  modalFormContacto.hide();
}

// ! MANEJADORES DE EVENTOS
btnAgregarContacto.addEventListener("click", () => {
  limpiarFormulario();
  estoyCreando = true;
  modalFormContacto.show();
});

formularioContacto.addEventListener("submit", (e) => {
  e.preventDefault();
  // aqui tengo que crear / editar contacto
  if (estoyCreando) {
    crearContacto();
  } else {
    editarContacto();
  }
});

cargarContactos();
