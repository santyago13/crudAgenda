export const validarCantidadCaracteres = (input, min, max) => {
  if (input.value.trim().length >= min && input.value.trim().length <= max) {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    return true;
  } else {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    return false;
  }
};

export const validarEmail = (input) => {
  const regExp =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
  if (regExp.test(input.value.trim())) {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    return true;
  } else {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    return false;
  }
};

export const validarTelefono = (input) => {
  const regExp = /^[0-9]{10}$/;
  if (regExp.test(input.value.trim())) {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    return true;
  } else {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    return false;
  }
};

export const validarUrl = (input) => {
  if (input.value.trim() === "") {
    // vacío es válido, es opcional
    input.classList.remove("is-invalid");
    input.classList.remove("is-valid");
    return true;
  }
  try {
    new URL(input.value.trim());
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    return true;
  } catch {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    return false;
  }
};
