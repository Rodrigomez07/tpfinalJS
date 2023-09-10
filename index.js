// Importa la lista de productos desde listado.js
import { productos } from './listado.js';

// Inicializa la variable productosCarrito desde el almacenamiento local o como un array vacío
let productosCarrito = JSON.parse(localStorage.getItem("productos")) || [];

// Función para agregar productos al carrito
function addToCart(id) {
    const buscarProducto = productos.find(producto => producto.id === id);

    if (!productosCarrito.some(producto => producto.id === id)) {
        productosCarrito.push(buscarProducto);
        localStorage.setItem("productos", JSON.stringify(productosCarrito));
        showFeedbackMessage(`Se ha añadido ${buscarProducto.producto} al carrito de compras.`, "success");
        updateCartTotal();
    } else {
        showFeedbackMessage(`El producto ya está en el carrito.`, "error");
    }
}

// Función para generar tarjetas de productos con descuento
function generateDiscountedProductCards(array) {
    const discountedProductsContainer = document.querySelector(".discounted-products");

    // Filtra los productos con descuento mayor a 0%
    const discountedProducts = array.filter(producto => parseFloat(producto.descuento) > 0);

    // Recorre los productos con descuento y crea las tarjetas
    discountedProducts.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("product-card");

        // Calcula el precio con descuento
        const precioDescuento = (producto.precio - (producto.precio * (producto.descuento / 100))).toFixed(2);

        card.innerHTML = `
            <h2>${producto.producto}</h2>
            <figure class="container-card">
                <img src="${producto.imagen || 'not-found.jpg'}" alt="imagen de ${producto.producto}">
            </figure>
            <h6>Marca: ${producto.marca}</h6>
            <h5 style="text-decoration: line-through;"> $${producto.precio} </h5>
            <h4>Precio: $ ${precioDescuento}</h4>
            <h5>Descuento: ${producto.descuento} %</h5>
            <button class="button-card" data-id="${producto.id}">
                Agregar al carrito
            </button>
        `;

        const addToCartButton = card.querySelector(".button-card");
        addToCartButton.addEventListener("click", (e) => {
            const id = e.currentTarget.getAttribute("data-id");
            addToCart(Number(id));
        });

        discountedProductsContainer.appendChild(card);
    });
}

// Función para inicializar la página
function init() {
    generateDiscountedProductCards(productos);
}

// Ejecuta la función de inicialización al cargar la página
window.addEventListener("load", init);

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
