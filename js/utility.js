// utility.js

// Muestra el mensaje de error en un fieldset
export function showError(fieldId) {
    const errorParagraph = document.querySelector(`${fieldId} .error-message`);
    if (!errorParagraph) return;
    errorParagraph.classList.add("show");

    // Ocultar después de 5 segundos
    setTimeout(() => {
        errorParagraph.classList.remove("show");
    }, 5000);
}

// Valida nombres (al menos una palabra, sin números ni caracteres especiales)
export function validateName(name) {
    const nameRegex = /^[a-zA-ZÁÉÍÓÚáéíóúÑñ]+(\s[a-zA-ZÁÉÍÓÚáéíóúÑñ]+)*$/;
    return nameRegex.test(name.trim());
}

// Valida número de celular chileno (9 dígitos comenzando con 9)
export function validatePhone(phone) {
    const phoneRegex = /^9\d{8}$/;
    return phoneRegex.test(phone.trim());
}

// Valida email
export function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email.trim());
}

// Valida dirección (sin caracteres peligrosos)
export function validateAddress(address) {
    if (address.trim().length === 0) return true; // opcional
    if (address.length < 5 || address.length > 100) return false;
    const unsafeChars = /[<>/{}[\]()$%#^*;'"\\|]/;
    if (unsafeChars.test(address)) return false;

    const addressRegex = /^[a-zA-ZÁÉÍÓÚáéíóúÑñ0-9\s.,#-]+$/;
    return addressRegex.test(address.trim());
}


// Valida el campo "Asunto"
export function validateSubject(subject) {
    // Solo letras, números, espacios y algunos signos de puntuación
    const subjectRegex = /^[a-zA-ZÁÉÍÓÚáéíóúÑñ0-9\s.,'";:?!()-]+$/;
    return subjectRegex.test(subject.trim()) && subject.trim().length >= 3;
}


// Valida textarea (mínimo 10 caracteres, letras, números y signos comunes)
export function validateTextarea(text) {
    if (text.trim().length === 0) return true; // opcional
    const textRegex = /^[a-zA-Z0-9ÁÉÍÓÚáéíóúÑñ\s.,'";:?!()-]+$/;
    return textRegex.test(text.trim()) && text.trim().length >= 10;
}
