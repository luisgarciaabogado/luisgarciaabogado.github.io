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

/* =========================================
   RESTABLECER ACCESIBILIDAD
   ========================================= */

const botonRestablecer =
    document.getElementById("restablecer-accesibilidad");

botonRestablecer.addEventListener("click", function () {

    /* RESTABLECER TAMAÑO DEL TEXTO */

    tamanoTexto = 100;

    document.documentElement.style.fontSize = "100%";


    /* DESACTIVAR ALTO CONTRASTE */

    document.body.classList.remove("alto-contraste");

    botonContraste.setAttribute(
        "aria-pressed",
        "false"
    );


    /* DESACTIVAR RESALTADO DE ENLACES */

    document.body.classList.remove("enlaces-resaltados");

    botonResaltarEnlaces.setAttribute(
        "aria-pressed",
        "false"
    );


    /* DESACTIVAR TEXTO LEGIBLE */

    document.body.classList.remove("texto-legible");

    botonTextoLegible.setAttribute(
        "aria-pressed",
        "false"
    );


    /* DETENER LECTURA POR VOZ */

    window.speechSynthesis.cancel();

    lecturaActual = null;
    lecturaPausada = false;

    botonPausar.textContent =
        "⏸ Pausar lectura";

});



/* =========================================
   CARRUSEL DE VIDEOS INFORMATIVOS
   ========================================= */

const videoInicio = document.getElementById("video-inicio");

if (videoInicio) {

    /* LISTA DE VIDEOS */

    const listaVideos = [
        "video-institucional.mp4",
        "reformas-2027.mp4"
    ];

    let indiceVideo = 0;
    let reproduccionPausada = false;

   
    /* INDICADORES DEL CARRUSEL */

    const contenedorIndicadores =
        document.getElementById("video-indicadores");

    function actualizarIndicadores() {

        if (!contenedorIndicadores) return;

        const indicadores =
            contenedorIndicadores.querySelectorAll("button");

        indicadores.forEach(function (indicador, indice) {

            const activo = indice === indiceVideo;

            indicador.classList.toggle("activo", activo);

            indicador.setAttribute(
                "aria-pressed",
                String(activo)
            );

        });

    }

    if (contenedorIndicadores) {

        listaVideos.forEach(function (archivo, indice) {

            const indicador = document.createElement("button");

            indicador.type = "button";

            indicador.setAttribute(
                "aria-label",
                "Ver video " + (indice + 1)
            );

            indicador.addEventListener("click", function () {

                cambiarVideo(indice);

            });

            contenedorIndicadores.appendChild(indicador);

        });

        actualizarIndicadores();

    }

   
    /* BOTONES DEL REPRODUCTOR */

    const videoAnterior =
        document.getElementById("video-anterior");

    const videoSiguiente =
        document.getElementById("video-siguiente");

    const videoPausar =
        document.getElementById("video-pausar");

    const videoSonido =
        document.getElementById("video-sonido");

    const videoAmpliar =
        document.getElementById("video-ampliar");

    const contenedorVideo =
        document.querySelector(".video-institucional");


    /* SONIDO DESACTIVADO POR DEFECTO */

    videoInicio.muted = true;

    videoSonido.textContent = "🔇";


    /* CAMBIAR DE VIDEO */

   
    function cambiarVideo(nuevoIndice) {

        indiceVideo =
            (nuevoIndice + listaVideos.length) %
            listaVideos.length;

        actualizarIndicadores();

        videoInicio.src = listaVideos[indiceVideo];


        videoInicio.load();

        if (!reproduccionPausada) {

            videoInicio.play().catch(function () {
                /* El navegador puede bloquear la reproducción */
            });

        }

    }


    /* VIDEO ANTERIOR */

    videoAnterior.addEventListener("click", function () {

        cambiarVideo(indiceVideo - 1);

    });


    /* VIDEO SIGUIENTE */

    videoSiguiente.addEventListener("click", function () {

        cambiarVideo(indiceVideo + 1);

    });


    /* AVANCE AUTOMÁTICO AL TERMINAR */

    videoInicio.addEventListener("ended", function () {

        if (!reproduccionPausada) {

            cambiarVideo(indiceVideo + 1);

        }

    });


    /* ACTIVAR O DESACTIVAR SONIDO */

    videoSonido.addEventListener("click", function () {

        videoInicio.muted = !videoInicio.muted;

        if (videoInicio.muted) {

            videoSonido.textContent = "🔇";

            videoSonido.setAttribute(
                "aria-label",
                "Activar sonido"
            );

        } else {

            videoSonido.textContent = "🔊";

            videoSonido.setAttribute(
                "aria-label",
                "Desactivar sonido"
            );

        }

    });


    /* PAUSAR O REPRODUCIR */

    videoPausar.addEventListener("click", function () {

        if (videoInicio.paused) {

            reproduccionPausada = false;

            videoInicio.play().catch(function () {
                /* Reproducción no permitida */
            });

        } else {

            reproduccionPausada = true;

            videoInicio.pause();

        }

    });


    /* ACTUALIZAR BOTÓN DE PAUSA */

    videoInicio.addEventListener("play", function () {

        videoPausar.textContent = "❚❚";

        videoPausar.setAttribute(
            "aria-label",
            "Pausar video"
        );

    });

    videoInicio.addEventListener("pause", function () {

        videoPausar.textContent = "▶";

        videoPausar.setAttribute(
            "aria-label",
            "Reproducir video"
        );

    });


    /* PANTALLA COMPLETA */

    videoAmpliar.addEventListener("click", function () {

        if (document.fullscreenElement) {

            document.exitFullscreen();

        } else if (contenedorVideo.requestFullscreen) {

            contenedorVideo.requestFullscreen();

        } else if (videoInicio.webkitEnterFullscreen) {

            videoInicio.webkitEnterFullscreen();

        }

    });

}
