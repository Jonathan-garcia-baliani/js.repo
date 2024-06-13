const nav = document .querySelector("#nav");
const abrir = document.querySelector("#abrir");
const cerra = document.querySelector("#cerrar");


abrir.addEventListener("click",()=> {
    nav.classList.add("visible");
})

cerra.addEventListener("click",()=>{
    nav.classList.remove("visible");
})


document.addEventListener("DOMContentLoaded", function () {
  const nav = document.getElementById("nav");
  const logo = document.querySelector(".logo");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 0) {
      nav.classList.add("scrolled");
      logo.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
      logo.classList.remove("scrolled");
    }

    // Agrega clase específica para el footer
    const footer = document.querySelector("footer");
    const logoFooter = document.querySelector(".logo.footer");
    
    // Verifica que footer y logoFooter no sean null antes de acceder a sus propiedades
    if (footer && logoFooter) {
      if (footer.getBoundingClientRect().top <= window.innerHeight) {
        logoFooter.classList.add("scrolled");
      } else {
        logoFooter.classList.remove("scrolled");
      }
    }
  });
});

  



 
let intentosFallidos = 0;
let bloqueado = false;

// Función para validar el inicio de sesión
function validateLogin() {
    // Verifica si el usuario está bloqueado
    if (bloqueado) {
        alert("Has intentado iniciar sesión 3 veces sin éxito. Por seguridad, debes esperar 3 minutos antes de intentarlo nuevamente.");
        return;
    }

    // Obtiene los valores de los campos de usuario y contraseña del formulario
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Verifica si el nombre de usuario es "Jonathan" y la contraseña es "123456"
    if (username === "Jonathan" && password === "123456") {
        // Restablece el contador de intentos fallidos al tener éxito en el inicio de sesión
        intentosFallidos = 0;

        // Solicita los datos adicionales del usuario
        const edad = prompt("Por favor, ingresa tu edad:");
        const nombre = prompt("Por favor, ingresa tu nombre:");
        const apellido = prompt("Por favor, ingresa tu apellido:");
        const destino = prompt("¿A dónde deseas viajar?");
        
        // Registra los datos en la consola
        console.log("Edad: " + edad);
        console.log("Nombre: " + nombre);
        console.log("Apellido: " + apellido);
        console.log("Lugar al que desea viajar: " + destino);
        // Redirige al usuario a ingreso.html después de obtener todos los datos adicionales
        window.location.href = '../html/ingreso.html';
    } else {
   
        // Incrementa el contador de intentos fallidos
        intentosFallidos++;

        // Verifica si el usuario ha tenido 3 intentos fallidos
        if (intentosFallidos >= 3) {
            bloqueado = true;

            // Informa al usuario que debe esperar 3 minutos
            alert("Has intentado iniciar sesión 3 veces sin éxito. Por seguridad, debes esperar 3 minutos antes de intentarlo nuevamente.");

            // Bloquea al usuario por 3 minutos (180,000 milisegundos)
            setTimeout(() => {
                bloqueado = false;
                intentosFallidos = 0;
                alert("Ahora puedes intentar iniciar sesión nuevamente.");
            }, 180000); // 3 minutos en milisegundos
        } else {
            // Muestra un mensaje de error si el nombre de usuario o contraseña son incorrectos
            alert("Nombre de usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.");
        }
    }
}




// Asigna la función validateLogin al evento de clic en el botón de inicio de sesión
document.addEventListener('DOMContentLoaded', function() {
  // Selecciona el botón utilizando querySelector
  const button = document.querySelector("button[type='button']");
  
  // Verifica que el botón exista
  if (button) {
      // Asigna la función validateLogin al evento onclick del botón
      button.onclick = validateLogin;
  }
});


// Este evento asegura que el código se ejecute solo cuando el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
  // Obtener el elemento con el ID "idDelElemento"
  var elemento = document.getElementById("idDelElemento");

  // Registrar el valor de elemento en la consola para depurar
  console.log('Elemento:', elemento);

  // Verificar si el elemento existe (no es null)
  if (elemento) {
      // Si el elemento existe, agregar la clase "claseEjemplo"
      elemento.classList.add("claseEjemplo");
  } else {
      // Mostrar una advertencia en la consola si el elemento no existe
      console.warn();
  }
});





function calcularCuota() {
  // Obtener los valores ingresados por el usuario
  const monto = parseFloat(document.getElementById("monto").value);
  const plazo = parseInt(document.getElementById("plazo").value, 10);
  const tasa = parseFloat(document.getElementById("tasa").value);

  // Calcular la tasa de interés mensual
  const tasaMensual = (tasa / 100) / 12;

  // Calcular la cuota mensual utilizando la fórmula de amortización
  const cuota = (monto * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -plazo));

  // Mostrar el resultado en el elemento con el ID "resultado"
  document.getElementById("resultado").textContent = `La cuota mensual es de: $${cuota.toFixed(2)}`;
}


// Función para agregar valores a la pantalla de la calculadora simple
function appendToDisplaySimple(value) {
  const displaySimple = document.getElementById('displaySimple');
  displaySimple.value += value;
}

// Función para realizar operaciones en la calculadora simple
function performOperationSimple(operation) {
  const displaySimple = document.getElementById('displaySimple');
  displaySimple.value += ` ${operation} `;
}

// Función para calcular el resultado en la calculadora simple
function calculateResultSimple() {
  const displaySimple = document.getElementById('displaySimple');
  try {
      const expression = displaySimple.value.replace(/\s/g, '');
      // Usar una librería segura para evaluar la expresión matemática
      const result = math.evaluate(expression);
      displaySimple.value = result;
  } catch (error) {
      displaySimple.value = 'Error';
  }
}


// Función para limpiar la pantalla de la calculadora simple
function clearDisplaySimple() {
  const displaySimple = document.getElementById('displaySimple');
  displaySimple.value = '';
}


// Función para calcular el gasto total
function calcularGastoTotal(servicios) {
  return servicios.reduce((total, servicio) => total + servicio.costo, 0);
}

// Función para solicitar servicios del hotel al usuario
function solicitarServiciosHotel() {
  const servicios = [];
  let agregarMas = true;

  while (agregarMas) {
      const nombre = prompt('Ingrese el nombre del servicio:');
      const costo = parseFloat(prompt('Ingrese el costo del servicio:'));

      if (nombre && !isNaN(costo)) {
          servicios.push({ nombre, costo });
      } else {
          alert('Entrada inválida. Por favor ingrese un nombre válido y un costo numérico.');
      }

      agregarMas = confirm('¿Desea agregar otro servicio?');
  }

  return servicios;
}

// Verificar si estamos en la página "ingreso.html"
if (window.location.pathname.includes('ingreso.html')) {
  alert("Calculadora de Gastos de Hotelería");

  // Solicitar servicios del hotel y calcular el total
  const serviciosHotel = solicitarServiciosHotel();
  const gastoTotal = calcularGastoTotal(serviciosHotel);

  // Imprimir los resultados en la consola
  console.log("Lista de Servicios del Hotel:");
  serviciosHotel.forEach(servicio => console.log(`- ${servicio.nombre}: $${servicio.costo.toFixed(2)}`));
  console.log(`Gasto Total: $${gastoTotal.toFixed(2)}`);
}



