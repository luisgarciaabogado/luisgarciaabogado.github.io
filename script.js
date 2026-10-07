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
