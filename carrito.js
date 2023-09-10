import { productos } from './listado.js';

const cartItemsContainer = document.getElementById("cart-items");
const feedbackMessage = document.getElementById("feedback-message");
const emptyCartButton = document.getElementById("empty-cart-button");
let productosCarrito = JSON.parse(localStorage.getItem("productos")) || [];

function updateCartTotal() {
    const totalElement = document.querySelector(".cart-total");
    const total = productosCarrito.reduce((acc, producto) => acc + producto.precio, 0);
    totalElement.textContent = `Total: $${total.toFixed(2)}`;
}

function showFeedbackMessage(message, type = "success") {
    feedbackMessage.textContent = message;
    feedbackMessage.classList.add(type);

    setTimeout(() => {
        feedbackMessage.textContent = "";
        feedbackMessage.classList.remove(type);
    }, 3000);
}

function generateCartProductCards(array) {
    const cards = array.map(element => `
        <div class="card" id="card-${element.id}">
            <h2>${element.producto}</h2>
            <figure class="container-card">
                <img src=${element.imagen || "not-found.jpg"} alt="imagen de ${element.producto}">
            </figure>
            <h6>Marca: ${element.marca}</h6>
            <h4>Precio: ${element.precio}</h4>
            <button class="button-remove" data-id="${element.id}">
                Eliminar
            </button>
        </div>
    `).join("");

    cartItemsContainer.innerHTML = cards;

    const allRemoveButtons = document.querySelectorAll(".button-remove");
    allRemoveButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const id = e.currentTarget.getAttribute("data-id");
            productosCarrito = productosCarrito.filter(producto => producto.id !== Number(id));
            localStorage.setItem("productos", JSON.stringify(productosCarrito));
            generateCartProductCards(productosCarrito);
            updateCartTotal();
            showFeedbackMessage(`Se ha eliminado un producto del carrito.`, "success");
        });
    });
}

emptyCartButton.addEventListener("click", () => {
    productosCarrito = [];
    localStorage.removeItem("productos");
    generateCartProductCards(productosCarrito);
    updateCartTotal();
    showFeedbackMessage(`Se ha vaciado el carrito de compras.`, "success");
});

window.addEventListener("load", () => {
    updateCartTotal();
    generateCartProductCards(productosCarrito);
});


// Agregar evento de cambio de modo cuando se hace clic en el botón
const toggleModeButton = document.getElementById("toggle-mode-button");
toggleModeButton.addEventListener("click", () => {
    const modoActual = localStorage.getItem("modo");

    if (modoActual === "oscuro") {
        activateLightMode();
    } else {
        activateDarkMode();
    }
});

// Verifica si el modo oscuro está habilitado en localStorage
const isDarkModeEnabled = localStorage.getItem('darkMode') === 'true';

// Aplica la clase dark-mode al cuerpo si es necesario
if (isDarkModeEnabled) {
    activateDarkMode();
}
