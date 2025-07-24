class Contacto {
   #id;
   #nombre;
   #apellido;
   #telefono;
   #email;
   #imagen;
   #empresa;
   #puestoTrabajo;
   #direccion;
   #notas; 

   constructor(id, nombre, apellido, telefono, email, imagen, empresa, puestoTrabajo, direccion, notas) {
    this.#id = id;
    this.#nombre = nombre;
    this.#apellido = apellido;
    this.#telefono = telefono;
    this.#email = email;
    this.#imagen = imagen;
    this.#empresa = empresa;
    this.#puestoTrabajo = puestoTrabajo;
    this.#direccion = direccion;
    this.#notas = notas;
   }

   // Getters
   get getid() {
      return this.#id;
   }

   get getnombre() {
      return this.#nombre;
   }

   get getapellido() {
      return this.#apellido;
   }

   get gettelefono() {
      return this.#telefono;
   }

   get getemail() {
      return this.#email;
   }

   get getimagen() {
      return this.#imagen;
   }

   get getempresa() {
      return this.#empresa;
   }

   get getpuestoTrabajo() {
      return this.#puestoTrabajo;
   }

   get getdireccion() {
      return this.#direccion;
   }

   get getnotas() {
      return this.#notas;
   }

   // Setters
   set id(nuevoId) {
      this.#id = nuevoId;
   }

   set nombre(nuevoNombre) {
      this.#nombre = nuevoNombre;
   }

   set apellido(nuevoApellido) {
      this.#apellido = nuevoApellido;
   }

   set telefono(nuevoTelefono) {
      this.#telefono = nuevoTelefono;
   }

   set email(nuevoEmail) {
      this.#email = nuevoEmail;
   }

   set imagen(nuevaImagen) {
      this.#imagen = nuevaImagen;
   }

   set empresa(nuevaEmpresa) {
      this.#empresa = nuevaEmpresa;
   }

   set puestoTrabajo(nuevoPuestoTrabajo) {
      this.#puestoTrabajo = nuevoPuestoTrabajo;
   }

   set direccion(nuevaDireccion) {
      this.#direccion = nuevaDireccion;
   }

   set notas(nuevasNotas) {
      this.#notas = nuevasNotas;
   }

   // metodo para almacenar el objeto en el localstorage / sessionstorage
   toJSON(){
    return {
        id: this.getid,
        nombre: this.getnombre,
        apellido: this.getapellido,
        telefono: this.gettelefono,
        imagen: this.getimagen,
        direccion: this.getdireccion,
        empresa: this.getempresa,
        puestoTrabajo: this.getpuestoTrabajo,
        email: this.getemail,
        notas: this.getnotas,

    }
   }
}