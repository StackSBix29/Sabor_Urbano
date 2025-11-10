// Selecciona los elementos que vamos to animar
const navbar = document.getElementById('mainNavbar');
const heroLogo = document.querySelector('.main-logo'); // El logo grande del Hero

// Define el punto de scroll donde la navbar debería aparecer
const scrollPoint = 100; 

// Función que se ejecuta cada vez que el usuario hace scroll
window.addEventListener('scroll', () => {
    
    // Obtiene la posición actual del scroll
    const scrollPosition = window.scrollY;

    // --- ANIMACIÓN 1: Desvanecer el Logo Grande ---
    // Calcula la opacidad: 1 (visible) al inicio, 0 (invisible) al llegar a 300px
    // Puedes jugar con el número '300' para que se desvanezca más rápido o lento
    const opacity = 1 - (scrollPosition / 300);
    
    // Aplica la opacidad al logo grande, pero nunca menos de 0
    if (heroLogo) {
        heroLogo.style.opacity = Math.max(0, opacity);
    }

    // --- ANIMACIÓN 2: Mostrar/Ocultar la Navbar ---
    if (scrollPosition > scrollPoint) {
        // Añade la clase 'navbar-visible' (esto también dispara la animación del texto en CSS)
        navbar.classList.add('navbar-visible');
        navbar.classList.remove('navbar-hidden');
    } else {
        // Oculta la navbar
        navbar.classList.add('navbar-hidden');
        navbar.classList.remove('navbar-visible');
    }
});

// Suavizar el scroll al hacer clic en enlaces del menú (sin cambios)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});