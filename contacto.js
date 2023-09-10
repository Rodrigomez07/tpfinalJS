document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contact-form");

    contactForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Evita el envío del formulario por defecto

        // Obtener los valores de los campos
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const message = document.getElementById("message").value;

        // Realizar validaciones
        const nameError = validateName(name);
        const emailError = validateEmail(email);
        const phoneError = validatePhone(phone);
        const messageError = validateMessage(message);

        // Mostrar errores o enviar el formulario
        if (nameError || emailError || phoneError || messageError) {
            displayErrors({ name: nameError, email: emailError, phone: phoneError, message: messageError });
        } else {
            // Aquí puedes enviar el formulario (por ejemplo, a través de una solicitud AJAX)
            alert("Formulario enviado correctamente");
            contactForm.reset();
        }
    });

    // Funciones de validación
    function validateName(name) {
        return /^[a-zA-Z\s]{3,}$/.test(name) ? null : "Nombre no válido";
    }

    function validateEmail(email) {
        return /\S+@\S+\.\S+/.test(email) ? null : "Email no válido";
    }

    function validatePhone(phone) {
        return /^[0-9]{10}$/.test(phone) ? null : "Teléfono no válido";
    }

    function validateMessage(message) {
        return message.length > 0 ? null : "Mensaje no válido";
    }

    // Función para mostrar errores
    function displayErrors(errors) {
        for (const field in errors) {
            const errorSpan = document.getElementById(`${field}-error`);
            errorSpan.textContent = errors[field];
        }
    }
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