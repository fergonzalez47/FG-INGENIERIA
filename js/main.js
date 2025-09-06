import { validateTextarea, validateSubject, validateEmail, validateName, validatePhone, validateAddress, showError } from './utility.js';
// menú hamburguesa

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});




// Scrool aniation



const scrollElements = document.querySelectorAll('.scroll-animate');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            // Si quiero que solo aparezca una vez:
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 }); // 30% visible para activar
scrollElements.forEach(el => observer.observe(el));





// carrusel de testimonios

const carousel = document.querySelector('.testimonial-carousel');
let scrollPosition = 0;
const speed = 0.5;

// duplicar contenido para efecto infinito
carousel.innerHTML += carousel.innerHTML;

function autoScroll() {
    scrollPosition += speed;

    if (scrollPosition >= carousel.scrollWidth / 2) {
        // reiniciar suavemente
        scrollPosition = 0;
    }

    carousel.scrollLeft = scrollPosition;
    requestAnimationFrame(autoScroll);
}
autoScroll();






// FOFRMULARIO
const regiones = [
    { "nombre": "Arica y Parinacota", "comunas": ["Arica", "Camarones", "Putre", "General Lagos"] },
    { "nombre": "Tarapacá", "comunas": ["Iquique", "Alto Hospicio", "Pozo Almonte", "Camiña", "Colchane", "Huara", "Pica"] },
    { "nombre": "Antofagasta", "comunas": ["Antofagasta", "Mejillones", "Sierra Gorda", "Taltal", "Calama", "Ollagüe", "San Pedro de Atacama", "Tocopilla", "María Elena"] },
    { "nombre": "Atacama", "comunas": ["Copiapó", "Caldera", "Tierra Amarilla", "Chañaral", "Diego de Almagro", "Vallenar", "Alto del Carmen", "Freirina", "Huasco"] },
    { "nombre": "Coquimbo", "comunas": ["La Serena", "Coquimbo", "Andacollo", "La Higuera", "Paiguano", "Vicuña", "Illapel", "Canela", "Los Vilos", "Salamanca", "Ovalle", "Combarbalá", "Monte Patria", "Punitaqui", "Río Hurtado"] },
    { "nombre": "Valparaíso", "comunas": ["Valparaíso", "Casablanca", "Concón", "Juan Fernández", "Puchuncaví", "Quintero", "Viña del Mar", "Isla de Pascua", "Los Andes", "Calle Larga", "Rinconada", "San Esteban", "La Ligua", "Cabildo", "Papudo", "Petorca", "Zapallar", "Quillota", "Calera", "Hijuelas", "La Cruz", "Nogales", "San Antonio", "Algarrobo", "Cartagena", "El Quisco", "El Tabo", "Santo Domingo", "San Felipe", "Catemu", "Llaillay", "Panquehue", "Putaendo", "Santa María", "Quilpué", "Limache", "Olmué", "Villa Alemana"] },
    { "nombre": "Región Metropolitana de Santiago", "comunas": ["Santiago", "Maipú", "Providencia", "La Florida", "Puente Alto", "San Bernardo", "Ñuñoa", "Las Condes", "Macul", "La Reina", "Vitacura", "Lo Barnechea", "Lo Prado", "Cerro Navia", "Estación Central", "Huechuraba", "Independencia", "La Cisterna", "La Granja", "La Pintana", "Las Condes", "Lo Espejo", "Lo Prado", "Macul", "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", "Providencia", "Pudahuel", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "San Miguel", "San Joaquín", "San Ramón", "Santiago", "Vitacura"] },
    { "nombre": "Libertador General Bernardo O'Higgins", "comunas": ["Rancagua", "Machalí", "Mostazal", "Rengo", "Requínoa", "Coltauco", "Doñihue", "Graneros", "Las Cabras", "Malloa", "Olivar", "Peumo", "Pichidegua", "Quinta de Tilcoco", "San Vicente de Tagua Tagua", "Pichilemu", "La Estrella", "Litueche", "Marchihue", "Navidad", "Peralillo", "Pumanque", "San Fernando", "Chépica", "Chimbarongo", "Lolol", "Nancagua", "Palmilla", "Peralillo", "Placilla", "Pumanque", "San Fernando", "Santa Cruz"] },
    { "nombre": "Maule", "comunas": ["Talca", "Constitución", "Curepto", "Empedrado", "Maule", "Pencahue", "Río Claro", "San Clemente", "San Javier", "Villa Alegre", "Yerbas Buenas", "Colbún", "Linares", "Longaví", "Parral", "Retiro", "San Javier", "Villa Alegre", "Yerbas Buenas"] },
    { "nombre": "Ñuble", "comunas": ["Chillán", "Chillán Viejo", "Bulnes", "El Carmen", "Pemuco", "Pinto", "Quillón", "San Ignacio", "Yungay", "Coihueco", "Ñiquén", "San Carlos", "San Fabián", "San Nicolás"] },
    { "nombre": "Biobío", "comunas": ["Concepción", "Chillán", "Los Ángeles", "Arauco", "Cañete", "Contulmo", "Curanilahue", "Lebu", "Los Álamos", "Tirúa", "Alto Biobío", "Antuco", "Cabrero", "Laja", "Los Ángeles", "Mulchén", "Nacimiento", "Negrete", "Quilaco", "Quilleco", "San Rosendo", "Santa Bárbara", "Tucapel", "Yumbel", "Chiguayante", "Concepción", "Coronel", "Florida", "Hualpén", "Hualqui", "Lota", "Penco", "San Pedro de la Paz", "Santa Juana", "Talcahuano", "Tomé"] },
    { "nombre": "La Araucanía", "comunas": ["Temuco", "Angol", "Collipulli", "Curacautín", "Curarrehue", "Ercilla", "Freire", "Galvarino", "Gorbea", "Lonquimay", "Loncoche", "Melipeuco", "Nueva Imperial", "Perquenco", "Pitrufquén", "Pucón", "Saavedra", "Teodoro Schmidt", "Tolten", "Vilcún", "Villarrica"] },
    { "nombre": "Los Ríos", "comunas": ["Valdivia", "Corral", "Lanco", "Los Lagos", "Máfil", "Mariquina", "Paillaco", "Panguipulli", "Río Bueno", "La Unión"] },
    { "nombre": "Los Lagos", "comunas": ["Puerto Montt", "Calbuco", "Cochamó", "Fresia", "Frutillar", "Llanquihue", "Los Muermos", "Maullín", "Puerto Varas", "Ancud", "Castro", "Chonchi", "Curaco de Vélez", "Dalcahue", "Puqueldón", "Queilén", "Quellón", "Quemchi", "Achao", "Chaitén", "Futaleufú", "Hualaihué", "Palena"] },
    { "nombre": "Aysén del General Carlos Ibáñez del Campo", "comunas": ["Coyhaique", "Lago Verde", "Aysén", "Cisnes", "Guaitecas", "Cochrane", "O'Higgins", "Río Ibáñez", "Chile Chico", "Río Ibañez"] },
    { "nombre": "Magallanes y de la Antártica Chilena", "comunas": ["Punta Arenas", "Porvenir", "Primavera", "Timaukel", "Natales", "Torres del Paine"] }
];


const regionSelect = document.getElementById("region");
const comunaSelect = document.getElementById("comuna");

// Rellenar regiones
regiones.forEach(r => {
    const option = document.createElement("option");
    option.value = r.nombre;
    option.textContent = r.nombre;
    regionSelect.appendChild(option);
});

// Cambiar comunas según región
regionSelect.addEventListener("change", function () {
    comunaSelect.innerHTML = '<option value="">Selecciona tu comuna</option>';
    const region = regiones.find(r => r.nombre === this.value);
    if (region) {
        region.comunas.forEach(c => {
            const option = document.createElement("option");
            option.value = c;
            option.textContent = c;
            comunaSelect.appendChild(option);
        });
    }
});

// Validación
function validateContactForm() {
    let valid = true;

    const fields = [
        { id: "name", validate: validateName, fieldset: "#fieldset-name" },
        { id: "phone", validate: validatePhone, fieldset: "#fieldset-phone" },
        { id: "email", validate: validateEmail, fieldset: "#fieldset-email" },
        { id: "direccion", validate: validateAddress, fieldset: "#fieldset-address" },
        { id: "subject", validate: validateSubject, fieldset: "#fieldset-subject" },
        { id: "mensaje", validate: validateTextarea, fieldset: "#fieldset-message" },
        { id: "region", validate: v => v !== "", fieldset: "#fieldset-region" },
        { id: "comuna", validate: v => v !== "", fieldset: "#fieldset-comuna" },
    ];

    fields.forEach(f => {
        const value = document.getElementById(f.id).value.trim();
        if (!f.validate(value)) {
            showError(f.fieldset);
            valid = false;
        }
    });

    return valid;
}


// --- Función para mostrar mensaje modal ---
function showModalMessage(message, isSuccess = true) {
    // Crear modal si no existe
    let modal = document.getElementById("modal-message");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "modal-message";
        modal.style.position = "fixed";
        modal.style.top = "0";
        modal.style.left = "0";
        modal.style.width = "100%";
        modal.style.height = "100%";
        modal.style.backgroundColor = "rgba(0,0,0,0.5)";
        modal.style.display = "flex";
        modal.style.justifyContent = "center";
        modal.style.alignItems = "center";
        modal.style.zIndex = "1000";

        const box = document.createElement("div");
        box.style.backgroundColor = "#fff";
        box.style.padding = "2rem";
        box.style.borderRadius = "10px";
        box.style.textAlign = "center";
        box.id = "modal-box";

        const text = document.createElement("p");
        text.id = "modal-text";
        box.appendChild(text);

        const closeBtn = document.createElement("button");
        closeBtn.textContent = "Cerrar";
        closeBtn.style.marginTop = "1rem";
        closeBtn.addEventListener("click", () => {
            modal.style.display = "none";
        });
        box.appendChild(closeBtn);

        modal.appendChild(box);
        document.body.appendChild(modal);
    }

    document.getElementById("modal-text").textContent = message;
    const box = document.getElementById("modal-box");
    box.classList.remove("success", "error");
    box.classList.add(isSuccess ? "success" : "error");

    modal.style.display = "flex";
}




// Envío

// --- Envío ---
document.getElementById("sendButton").addEventListener("click", async (e) => {
    e.preventDefault();

    if (!validateContactForm()) return;

    const data = {
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        direccion: document.getElementById("direccion").value,
        region: document.getElementById("region").value,
        comuna: document.getElementById("comuna").value,
        asunto: document.getElementById("subject").value,
        mensaje: document.getElementById("mensaje").value
    };

    try {
        const res = await fetch("sendContactInf.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const result = await res.json();

        // Mostrar mensaje modal
        showModalMessage(result.message, result.success);

        // Reset formulario si fue éxito
        if (result.success) {
            document.getElementById("contact-form").reset();
        }

    } catch (err) {
        showModalMessage("Error enviando formulario. Intenta más tarde.", false);
    }
});