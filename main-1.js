// Selecciona la barra de navegación por su ID
const navbar = document.getElementById('mainNavbar');
// Define el punto de scroll donde la navbar debería aparecer (ej. 100px desde arriba)
const scrollPoint = 100; 

// Función que se ejecuta cada vez que el usuario hace scroll
window.addEventListener('scroll', () => {
    // Si el usuario ha hecho scroll más allá del 'scrollPoint'
    if (window.scrollY > scrollPoint) {
        // Añade la clase 'navbar-visible' y quita la 'navbar-hidden'
        navbar.classList.add('navbar-visible');
        navbar.classList.remove('navbar-hidden');
    } else {
        // Si el usuario está arriba de nuevo, oculta la navbar
        navbar.classList.add('navbar-hidden');
        navbar.classList.remove('navbar-visible');
    }
});

// Suavizar el scroll al hacer clic en enlaces del menú
// Esta parte no es 100% necesaria si Bootstrap 5 la maneja, pero es buena práctica
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Previene el salto brusco
        e.preventDefault();

        // Obtiene el destino del enlace
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Desplaza suavemente hacia el destino
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});