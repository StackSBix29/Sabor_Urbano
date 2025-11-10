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

    

    // --- ANIMACIÓN 3: ICONOS FLOTANTES EN EL MENÚ ---

    

    // 1. Definir los iconos para cada sección

    const icons = {

        cafe: ['☕️', '🫘', '☕️', '🫘', '☕️'],

        postres: ['🍰', '🍪', '🍩', '🧁', '🍰'],

        comida: ['🥪', '🥗', '🌯', '🌮', '🥪']

    };

    

    // 2. Función para crear y añadir los iconos a una tarjeta

    const createIcons = (cardElement, iconType) => {

        const container = cardElement.querySelector('.floating-icons');

        if (container.children.length > 0) return; // No crear si ya existen

    

        icons[iconType].forEach(icon => {

            const iconEl = document.createElement('span');

            iconEl.className = 'icon';

            iconEl.textContent = icon;

            // Posición inicial aleatoria

            iconEl.style.left = `${Math.random() * 100}%`;

            iconEl.style.top = `${Math.random() * 100}%`;

            container.appendChild(iconEl);

        });

    };

    

    // 3. Usar Intersection Observer para activar la animación

    const observerOptions = {

        root: null,

        rootMargin: '0px',

        threshold: 0.1 // Activar cuando el 10% de la tarjeta sea visible

    };

    

    const observerCallback = (entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                const card = entry.target;

                const cardId = card.id;

                let iconType = '';

    

                if (cardId === 'cafe-card') iconType = 'cafe';

                if (cardId === 'postres-card') iconType = 'postres';

                if (cardId === 'comida-card') iconType = 'comida';

    

                if (iconType) {

                    createIcons(card, iconType);

                    // Añadimos la clase para que la animación CSS se active

                    card.querySelector('.floating-icons').classList.add('animate');

                }

                

                // Dejamos de observar la tarjeta una vez animada

                observer.unobserve(card);

            }

        });

    };

    

    // 4. Crear el observador y ponerlo a escuchar

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    document.getElementById('cafe-card') && observer.observe(document.getElementById('cafe-card'));

    document.getElementById('postres-card') && observer.observe(document.getElementById('postres-card'));

    document.getElementById('comida-card') && observer.observe(document.getElementById('comida-card'));

    