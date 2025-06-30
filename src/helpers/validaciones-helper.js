export function validarNombre(nombre) {
    return typeof nombre === 'string' && nombre.length >= 3;
  }
  
  export function validarApellido(apellido) {
    return typeof apellido === 'string' && apellido.length >= 3;
  }
  
  export function validarID(id) {
    return !isNaN(id) && Number(id) > 0;
  }
  