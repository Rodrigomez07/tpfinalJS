// modonoche.js

// Función para activar el modo oscuro
function activateDarkMode() {
    document.body.classList.add("dark-mode");
    localStorage.setItem("modo", "oscuro");
}

// Función para activar el modo claro
function activateLightMode() {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("modo", "claro");
}

// Función para cambiar el modo según la preferencia guardada
function toggleMode() {
    const modoActual = localStorage.getItem("modo");

    if (modoActual === "oscuro") {
        activateDarkMode();
    } else {
        activateLightMode();
    }
}

// Agregar evento de cambio de modo cuando se carga la página
window.addEventListener("load", toggleMode);
