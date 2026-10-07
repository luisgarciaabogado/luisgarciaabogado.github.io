const botonAccesibilidad = document.querySelector(".accesibilidad-boton");
const panelAccesibilidad = document.querySelector(".accesibilidad-panel");

botonAccesibilidad.addEventListener("click", function () {

    const panelAbierto =
        panelAccesibilidad.classList.toggle("activo");

    botonAccesibilidad.setAttribute(
        "aria-expanded",
        panelAbierto
    );

});
