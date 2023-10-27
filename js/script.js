// Obtener el elemento con el ID "gamebox" del documento HTML.
const gamebox = document.getElementById("gamebox");

// Seleccionar todas las imágenes dentro del elemento con el ID "gamebox".
const imagenes = gamebox.querySelectorAll("img");

// Total de imágenes diferentes que se espera encontrar en la carpeta "img/".
const imgTotal = 64;

// Crear un array de números del 1 al "imgTotal" como IDs de las imágenes.
const imgIDs = [...Array(imgTotal)].map((_, i) => i + 1);

// Función para mezclar aleatoriamente un array.
function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex > 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

// Mezclar los IDs de las imágenes en el array "imgIDs".
shuffle(imgIDs);

// Variable para mantener el estado del juego (si ya se ha encontrado una pareja).
let parejaEncontrada = false;

// Almacena la primera imagen seleccionada.
let primeraImagen = null;

// Configurar las imágenes y agregar eventos de clic.
for (let i = 0; i < imagenes.length; i++) {
    imagenes[i].src = `img/img${imgIDs[i]}.svg`;

    imagenes[i].addEventListener("click", function () {
        if (!parejaEncontrada) {
            if (primeraImagen === null) {
                // Almacena la primera imagen seleccionada.
                primeraImagen = this;
            } else {
                // Si las imágenes coinciden, marca la pareja como encontrada.
                parejaEncontrada = true;
            }
        }
    });
}

// Seleccionar dos imágenes aleatorias como pareja inicial, asegurándose de que no sean la misma.
let pareja1ID, pareja2ID;
do {
    pareja1ID = Math.floor(Math.random() * imagenes.length);
    pareja2ID = Math.floor(Math.random() * imagenes.length);
} while (pareja1ID === pareja2ID);

// Cambiar la fuente de una de las imágenes de la pareja para que coincida con la otra.
imagenes[pareja1ID].src = `img/img${imgIDs[pareja2ID]}.svg`;

// Variable para mantener el src de la imagen anteriormente seleccionada.
let anteriorSRC = "";

// Variable para almacenar la imagen anteriormente seleccionada.
let imgAnterior;

// Función que se llama cuando se hace clic en una imagen.
function seleccionar(imagen) {
    if(imgAnterior!=null){
        imgAnterior.classList.remove("circulo")

    }
    imagen.classList.add("circulo")
    const estaSRC = imagen.src;
    if (estaSRC === anteriorSRC && imagen !== imgAnterior) {
        // Mostrar el mensaje en el div oculto
        imagen.classList.remove("circulo")
        petit();
        anteriorSRC = "";
        encontrarPareja();
    
    } else {
        // Agregar la clase de animación al hacer clic en la imagen
        imagen.classList.add("animacion-imagen");
        
        // Establecer un temporizador para quitar la clase después de la duración de la animación
        setTimeout(function() {
            imagen.classList.remove("animacion-imagen");
        }, 300); // Asegúrate de que coincida con la duración de la animación en milisegundos

        imgAnterior = imagen;
        anteriorSRC = estaSRC;
    }
}

// Agrega una variable para contar las parejas encontradas.
let parejasEncontradas = 0;

// Función para actualizar el contador de parejas encontradas en el DOM.
function actualizarContadorParejas() {
    const contadorParejas = document.getElementById("parejas-encontradas");
    contadorParejas.textContent = `Parelles encertades: ${parejasEncontradas}`;
}

// Función que se llama cuando se encuentra una pareja.
function encontrarPareja() {
    // Aumenta el contador de parejas encontradas.
    parejasEncontradas++;

    // Actualiza el contador en el DOM.
    actualizarContadorParejas();

    // Llama a la función para cambiar todas las imágenes y seleccionar una nueva pareja.
    cambiarImagenesYSeleccionarNuevaPareja();
}

// Función para cambiar todas las imágenes y seleccionar una nueva pareja.
function cambiarImagenesYSeleccionarNuevaPareja() {
    // Cambiar todas las imágenes nuevamente
    shuffle(imgIDs);
    for (let i = 0; i < imagenes.length; i++) {
        imagenes[i].src = `img/img${imgIDs[i]}.svg`;
    }

    // Seleccionar dos imágenes aleatorias como nueva pareja inicial, asegurándose de que no sean la misma.
    do {
        pareja1ID = Math.floor(Math.random() * imagenes.length);
        pareja2ID = Math.floor(Math.random() * imagenes.length);
    } while (pareja1ID === pareja2ID);

    // Cambiar la fuente de una de las imágenes de la pareja para que coincida con la otra.
    imagenes[pareja1ID].src = `img/img${imgIDs[pareja2ID]}.svg`;

    // Reiniciar variables y estado del juego
    parejaEncontrada = false;
    primeraImagen = null;
}

function petit() {
    gamebox.classList.remove("grande");
    gamebox.classList.add("petiso")
    setTimeout(grande, 300)
}
function grande() {
    gamebox.classList.remove("petiso")
    gamebox.classList.add("grande");
}

