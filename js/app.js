import Contacto from "./contacto.js";
import { validarCantidadCaracteres, validarEmail } from "./validaciones.js";

// Constante para la imagen por defecto
const URL_IMAGEN_DEFECTO =
  "https://cdn.pixabay.com/photo/2016/11/14/17/39/person-1824144_1280.png";

// Elementos del DOM
const btnAgregarContacto = document.getElementById("btnAgregarContacto");
const modalFormularioContacto = new bootstrap.Modal(
  document.getElementById("contactoModal")
);
const formularioContacto = document.getElementById("formContacto");
const inputNombre = document.getElementById("nombre");
const inputApellido = document.getElementById("apellido");
const inputEmail = document.getElementById("email");
const inputTelefono = document.getElementById("telefono");
const inputDireccion = document.getElementById("direccion");
const inputNotas = document.getElementById("notas");
const inputImagen = document.getElementById("imagen");
const inputPuestoTrabajo = document.getElementById("puestoTrabajo");
const inputEmpresa = document.getElementById("empresa");
const tbody = document.querySelector("#tablaContactosBody");
const seccionTablaContactos = document.getElementById("seccionTablaContactos");
const seccionDetalleContacto = document.getElementById(
  "seccionDetalleContacto"
);
const btnVolverLista = document.getElementById("btnVolverLista");

// Elementos detalle contacto
const detalleFoto = document.getElementById("detalleFoto");
const detalleNombreApellido = document.getElementById("detalleNombreApellido");
const detalleEmail = document.getElementById("detalleEmail");
const detalleEmailInfo = document.getElementById("detalleEmailInfo");
const detalleTelefono = document.getElementById("detalleTelefono");
const detalleCompany = document.getElementById("detalleCompany");
const detalleJobTitle = document.getElementById("detalleJobTitle");
const detalleLocation = document.getElementById("detalleLocation");
const detalleNotes = document.getElementById("detalleNotes");
const breadCrumbContactName = document.getElementById("breadCrumbContactName");
const breadCrumbContacts = document.getElementById("breadCrumbContacts");

let estoyCreando = true;
let idContacto = null;

// Array agenda guardada en localStorage o vacío
const agenda = JSON.parse(localStorage.getItem("agendaKey")) || [];

// Limpia mensaje "no hay contactos"
const limpiarMensajeSinContactos = () => {
  const mensaje = document.getElementById("mensajeSinContactos");
  if (mensaje) mensaje.remove();
};

// Guarda agenda en localStorage
const guardarLocalstorage = () => {
  localStorage.setItem("agendaKey", JSON.stringify(agenda));
};

// Limpia formulario
function limpiarFormulario() {
  formularioContacto.reset();
  inputNombre.classList.remove("is-valid", "is-invalid");
  inputApellido.classList.remove("is-valid", "is-invalid");
  inputEmail.classList.remove("is-valid", "is-invalid");
  inputTelefono.classList.remove("is-valid", "is-invalid");
  inputImagen.classList.remove("is-valid", "is-invalid");
}

// Valida todos los campos
const validacion = () => {
  let datosValidos = true;

  if (!validarCantidadCaracteres(inputNombre, 2, 50)) datosValidos = false;
  if (!validarCantidadCaracteres(inputApellido, 3, 50)) datosValidos = false;
  if (!validarEmail(inputEmail)) datosValidos = false;

  // Validar teléfono: debe ser 10 dígitos numéricos
  const telRegex = /^[0-9]{10}$/;
  if (!telRegex.test(inputTelefono.value)) {
    inputTelefono.classList.add("is-invalid");
    inputTelefono.classList.remove("is-valid");
    datosValidos = false;
  } else {
    inputTelefono.classList.add("is-valid");
    inputTelefono.classList.remove("is-invalid");
  }

  // Validar URL de imagen (si no está vacío)
  if (inputImagen.value.trim() !== "") {
    try {
      new URL(inputImagen.value);
      inputImagen.classList.add("is-valid");
      inputImagen.classList.remove("is-invalid");
    } catch {
      inputImagen.classList.add("is-invalid");
      inputImagen.classList.remove("is-valid");
      datosValidos = false;
    }
  } else {
    // Si está vacío, lo consideramos válido porque ponemos imagen por defecto
    inputImagen.classList.remove("is-invalid");
    inputImagen.classList.remove("is-valid");
  }

  return datosValidos;
};

// Dibuja la tabla de contactos
const dibujarContactos = () => {
  tbody.innerHTML = "";
  limpiarMensajeSinContactos();

  if (agenda.length === 0) {
    // Crear párrafo avisando que no hay contactos
    const p = document.createElement("p");
    p.id = "mensajeSinContactos";
    p.className = "text-center mt-3";
    p.textContent = "No hay contactos disponibles. Agrega uno nuevo.";
    seccionTablaContactos.appendChild(p);
    return;
  }

  agenda.forEach((contacto, index) => {
    tbody.innerHTML += crearFilaHTML(contacto, index + 1);
  });

  // Agregar listeners a botones de ver, editar y borrar
  agregarListenersBotones();
};

// Crea fila HTML para la tabla
const crearFilaHTML = (itemContacto, fila) => {
  const imgSrc =
    itemContacto.imagen && itemContacto.imagen !== ""
      ? itemContacto.imagen
      : URL_IMAGEN_DEFECTO;

  return `
    <tr data-id="${itemContacto.id}">
      <th scope="row">${fila}</th>
      <td>${itemContacto.nombre}</td>
      <td>${itemContacto.apellido}</td>
      <td>${itemContacto.telefono}</td>
      <td>
        <img
          src="${imgSrc}"
          alt="${itemContacto.nombre}"
          class="rounded-circle img-thumbnail" style="width: 40px; height: 40px; object-fit: cover;"  
        />
      </td>
      <td>
        <button
          type="button"
          class="btn btn-info btn-sm me-2 btn-ver-detalle"
          title="Ver más"
        >
          <i class="bi bi-eye"></i>
        </button>
        <button
          type="button"
          class="btn btn-warning btn-sm me-2 btn-editar"
          title="Editar"
        >
          <i class="bi bi-pencil"></i>
        </button>
        <button
          type="button"
          class="btn btn-danger btn-sm btn-borrar"
          title="Borrar"
        >
          <i class="bi bi-trash"></i>
        </button>
      </td>
    </tr>
  `;
};

// Agrega eventos a botones de cada fila
const agregarListenersBotones = () => {
  // Botones ver detalle
  document.querySelectorAll(".btn-ver-detalle").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.target.closest("tr").dataset.id;
      mostrarDetalle(id);
    });
  });

  // Botones editar
  document.querySelectorAll(".btn-editar").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.target.closest("tr").dataset.id;
      prepararContacto(id);
    });
  });

  // Botones borrar
  document.querySelectorAll(".btn-borrar").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.target.closest("tr").dataset.id;
      borrarContacto(id);
    });
  });
};

// Crear nuevo contacto
const crearContacto = () => {
  if (!validacion()) {
    console.log("Errores en la validación");
    return;
  }

  const urlImagen =
    inputImagen.value.trim() === ""
      ? URL_IMAGEN_DEFECTO
      : inputImagen.value.trim();

  const contactoNuevo = new Contacto(
    inputNombre.value.trim(),
    inputApellido.value.trim(),
    inputTelefono.value.trim(),
    inputEmail.value.trim(),
    urlImagen,
    inputEmpresa.value.trim(),
    inputPuestoTrabajo.value.trim(),
    inputDireccion.value.trim(),
    inputNotas.value.trim()
  );

  agenda.push(contactoNuevo);
  guardarLocalstorage();
  Swal.fire({
    theme: "dark",
    title: "Contacto creado",
    text: `El contacto ${inputNombre.value} fue creado correctamente.`,
    icon: "success",
    confirmButtonText: "Ok",
  });

  limpiarFormulario();
  modalFormularioContacto.hide();
  dibujarContactos();
};

// Preparar formulario para editar contacto
const prepararContacto = (id) => {
  const contactoBuscado = agenda.find((c) => c.id === id);
  if (!contactoBuscado) return;

  estoyCreando = false;
  idContacto = id;

  // Cambiar título modal
  document.getElementById("contactoModalLabel").textContent = "Editar Contacto";

  // Completar campos con datos existentes
  inputNombre.value = contactoBuscado.nombre;
  inputApellido.value = contactoBuscado.apellido;
  inputEmail.value = contactoBuscado.email;
  inputTelefono.value = contactoBuscado.telefono;
  inputImagen.value =
    contactoBuscado.imagen !== URL_IMAGEN_DEFECTO ? contactoBuscado.imagen : "";
  inputEmpresa.value = contactoBuscado.empresa;
  inputPuestoTrabajo.value = contactoBuscado.puestoTrabajo;
  inputDireccion.value = contactoBuscado.direccion;
  inputNotas.value = contactoBuscado.notas;

  modalFormularioContacto.show();
};

// Editar contacto existente
const editarContacto = () => {
  if (!validacion()) {
    console.log("Errores en la validación");
    return;
  }

  const indiceContacto = agenda.findIndex((c) => c.id === idContacto);
  if (indiceContacto === -1) return;

  agenda[indiceContacto].nombre = inputNombre.value.trim();
  agenda[indiceContacto].apellido = inputApellido.value.trim();
  agenda[indiceContacto].email = inputEmail.value.trim();
  agenda[indiceContacto].telefono = inputTelefono.value.trim();
  agenda[indiceContacto].imagen =
    inputImagen.value.trim() === ""
      ? URL_IMAGEN_DEFECTO
      : inputImagen.value.trim();
  agenda[indiceContacto].empresa = inputEmpresa.value.trim();
  agenda[indiceContacto].puestoTrabajo = inputPuestoTrabajo.value.trim();
  agenda[indiceContacto].direccion = inputDireccion.value.trim();
  agenda[indiceContacto].notas = inputNotas.value.trim();

  guardarLocalstorage();
  modalFormularioContacto.hide();
  Swal.fire({
    theme: "dark",
    title: "Contacto actualizado",
    text: `El contacto ${agenda[indiceContacto].nombre} fue modificado correctamente.`,
    icon: "success",
    confirmButtonText: "Ok",
  });

  dibujarContactos();
};

// Borrar contacto
const borrarContacto = (id) => {
  Swal.fire({
    theme: "dark",
    title: "¿Estás seguro de eliminar el contacto?",
    text: "No puedes revertir este paso",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Borrar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      const indice = agenda.findIndex((c) => c.id === id);
      if (indice === -1) return;
      agenda.splice(indice, 1);
      guardarLocalstorage();
      Swal.fire({
        theme: "dark",
        title: "Contacto eliminado",
        text: "El contacto fue eliminado satisfactoriamente",
        icon: "success",
      });
      dibujarContactos();
    }
  });
};

// Mostrar detalle del contacto y ocultar tabla
const mostrarDetalle = (id) => {
  const contacto = agenda.find((c) => c.id === id);
  if (!contacto) return;

  detalleFoto.src =
    contacto.imagen && contacto.imagen !== ""
      ? contacto.imagen
      : URL_IMAGEN_DEFECTO;
  detalleFoto.alt = contacto.nombre;
  detalleNombreApellido.textContent = contacto.nombre + " " + contacto.apellido;
  detalleEmail.textContent = contacto.email;
  detalleEmailInfo.textContent = contacto.email;
  detalleTelefono.textContent = contacto.telefono;
  detalleCompany.textContent = contacto.empresa;
  detalleJobTitle.textContent = contacto.puestoTrabajo;
  detalleLocation.textContent = contacto.direccion;
  detalleNotes.textContent = contacto.notas;
  breadCrumbContactName.textContent = contacto.nombre + " " + contacto.apellido;

  // Mostrar detalle y ocultar tabla
  seccionTablaContactos.classList.add("d-none");
  seccionDetalleContacto.classList.remove("d-none");
};

// Botón para volver a la lista y ocultar detalle
btnVolverLista.addEventListener("click", () => {
  seccionDetalleContacto.classList.add("d-none");
  seccionTablaContactos.classList.remove("d-none");
  breadCrumbContactName.textContent = "";
});

// Evento botón Agregar contacto
btnAgregarContacto.addEventListener("click", () => {
  limpiarFormulario();
  estoyCreando = true;
  idContacto = null;
  document.getElementById("contactoModalLabel").textContent =
    "Agregar Contacto";
  modalFormularioContacto.show();
});

// Evento submit formulario
formularioContacto.addEventListener("submit", (e) => {
  e.preventDefault();
  if (estoyCreando) {
    crearContacto();
  } else {
    editarContacto();
  }
});

// Al cargar, pintar contactos
dibujarContactos();
