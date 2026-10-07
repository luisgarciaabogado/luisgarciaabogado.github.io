/* =========================================
   PANEL DE ACCESIBILIDAD
   ========================================= */

const botonAccesibilidad =
    document.querySelector(".accesibilidad-boton");

const panelAccesibilidad =
    document.querySelector(".accesibilidad-panel");

const botonCerrarAccesibilidad =
    document.querySelector(".accesibilidad-cerrar");


/* ABRIR Y CERRAR EL PANEL */

botonAccesibilidad.addEventListener("click", function () {

    const panelAbierto =
        panelAccesibilidad.classList.toggle("activo");

    botonAccesibilidad.setAttribute(
        "aria-expanded",
        panelAbierto
    );

});


/* CERRAR CON LA X */

botonCerrarAccesibilidad.addEventListener("click", function () {

    panelAccesibilidad.classList.remove("activo");

    botonAccesibilidad.setAttribute(
        "aria-expanded",
        "false"
    );

    botonAccesibilidad.focus();

});


/* CERRAR CON LA TECLA ESC */

document.addEventListener("keydown", function (event) {

    if (
        event.key === "Escape" &&
        panelAccesibilidad.classList.contains("activo")
    ) {

        panelAccesibilidad.classList.remove("activo");

        botonAccesibilidad.setAttribute(
            "aria-expanded",
            "false"
        );

        botonAccesibilidad.focus();

    }

});

/* =========================================
   TAMAÑO DEL TEXTO
   ========================================= */

const botonReducir =
    document.getElementById("texto-reducir");

const botonNormal =
    document.getElementById("texto-normal");

const botonAumentar =
    document.getElementById("texto-aumentar");

let tamanoTexto = 100;


/* REDUCIR TEXTO */

botonReducir.addEventListener("click", function () {

    if (tamanoTexto > 80) {

        tamanoTexto -= 10;

        document.documentElement.style.fontSize =
            tamanoTexto + "%";

    }

});


/* RESTABLECER TEXTO */

botonNormal.addEventListener("click", function () {

    tamanoTexto = 100;

    document.documentElement.style.fontSize = "100%";

});


/* AUMENTAR TEXTO */

botonAumentar.addEventListener("click", function () {

    if (tamanoTexto < 150) {

        tamanoTexto += 10;

        document.documentElement.style.fontSize =
            tamanoTexto + "%";

    }

});

/* =========================================
   ALTO CONTRASTE
   ========================================= */

const botonContraste =
    document.getElementById("alto-contraste");

botonContraste.addEventListener("click", function () {

    const contrasteActivo =
        document.body.classList.toggle("alto-contraste");

    botonContraste.setAttribute(
        "aria-pressed",
        contrasteActivo
    );

});

/* =========================================
   RESALTAR ENLACES
   ========================================= */

const botonResaltarEnlaces =
    document.getElementById("resaltar-enlaces");

botonResaltarEnlaces.addEventListener("click", function () {

    const enlacesActivos =
        document.body.classList.toggle("enlaces-resaltados");

    botonResaltarEnlaces.setAttribute(
        "aria-pressed",
        enlacesActivos
    );

});

/* =========================================
   TEXTO MÁS LEGIBLE
   ========================================= */

const botonTextoLegible =
    document.getElementById("texto-legible");

botonTextoLegible.addEventListener("click", function () {

    const textoLegibleActivo =
        document.body.classList.toggle("texto-legible");

    botonTextoLegible.setAttribute(
        "aria-pressed",
        textoLegibleActivo
    );

});

/* =========================================
   LECTURA POR VOZ
   ========================================= */

const botonLeer =
    document.getElementById("leer-pagina");

const botonPausar =
    document.getElementById("pausar-lectura");

const botonDetener =
    document.getElementById("detener-lectura");

let lecturaActual = null;
let lecturaPausada = false;


/* LEER PÁGINA */

botonLeer.addEventListener("click", function () {

    /* Detener cualquier lectura anterior */

    window.speechSynthesis.cancel();

    /* Obtener únicamente el contenido principal */

    const contenidoPrincipal =
        document.querySelector("main");

    if (!contenidoPrincipal) {
        return;
    }

    const texto =
        contenidoPrincipal.innerText;

    /* Crear la lectura */

    lecturaActual =
        new SpeechSynthesisUtterance(texto);

    lecturaActual.lang = "es-MX";

    lecturaActual.rate = 1;
    lecturaActual.pitch = 1;

    /* Comenzar lectura */

    window.speechSynthesis.speak(lecturaActual);

    lecturaPausada = false;

    botonPausar.textContent =
        "⏸ Pausar lectura";

});


/* PAUSAR O CONTINUAR */

botonPausar.addEventListener("click", function () {

    if (!window.speechSynthesis.speaking) {
        return;
    }

    if (lecturaPausada) {

        window.speechSynthesis.resume();

        lecturaPausada = false;

        botonPausar.textContent =
            "⏸ Pausar lectura";

    } else {

        window.speechSynthesis.pause();

        lecturaPausada = true;

        botonPausar.textContent =
            "▶ Continuar lectura";

    }

});


/* DETENER LECTURA */

botonDetener.addEventListener("click", function () {

    window.speechSynthesis.cancel();

    lecturaActual = null;
    lecturaPausada = false;

    botonPausar.textContent =
        "⏸ Pausar lectura";

});
