export function validarText(text) {
    return typeof text === 'string' && text.length >= 3;
  }
  
  export function validarID(id) {
    return !isNaN(id) && Number(id) > 0;
  }
  