// Importa la lista de productos desde listado.js
import { productos } from './listado.js';

// Obtén referencias a los botones
const ascendenteButton = document.getElementById("ascendente");
const descendenteButton = document.getElementById("descendente");
const containerCards = document.querySelector(".container-cards");
const feedbackMessage = document.getElementById("feedback-message");
const productosCarrito = JSON.parse(localStorage.getItem("productos")) || [];

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

function generateProductCards(array) {
    const cards = array.map(element => `
        <div class="card" id="card-${element.id}">
            <h2>${element.producto}</h2>
            <figure class="container-card">
                <img src=${element.imagen || "not-found.jpg"} alt="imagen de ${element.producto}">
            </figure>
            <h6>Marca: ${element.marca}</h6>
            <h4>Precio: ${element.precio}</h4>
            <button class="button-card" id="button-${element.id}">
                Agregar al carrito
            </button>
        </div>
    `).join("");

    containerCards.innerHTML = cards;

    const allCards = document.querySelectorAll(".button-card");
    allCards.forEach(card => {
        card.addEventListener("click", (e) => {
            const id = e.currentTarget.id.slice(7);
            const buscarProducto = array.find(element => element.id === Number(id));

            if (!productosCarrito.some(producto => producto.id === Number(id))) {
                productosCarrito.push(buscarProducto);
                localStorage.setItem("productos", JSON.stringify(productosCarrito));
                showFeedbackMessage(`Se ha añadido ${buscarProducto.producto} al carrito de compras.`, "success");
                updateCartTotal();
            } else {
                showFeedbackMessage(`El producto ya está en el carrito.`, "error");
            }
        });
    });
}

// Llama a la función para mostrar los productos inicialmente
generateProductCards(productos);

// Función para ordenar productos de manera ascendente (A-Z)
function ordenarAscendente() {
    productos.sort((a, b) => a.producto.localeCompare(b.producto));
    generateProductCards(productos);
}

// Función para ordenar productos de manera descendente (Z-A)
function ordenarDescendente() {
    productos.sort((a, b) => b.producto.localeCompare(a.producto));
    generateProductCards(productos);
}

// Agrega eventos click a los botones de orden
ascendenteButton.addEventListener("click", ordenarAscendente);
descendenteButton.addEventListener("click", ordenarDescendente);


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
