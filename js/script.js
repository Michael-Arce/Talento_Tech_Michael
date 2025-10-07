// Funcionalidad del carrusel
document.addEventListener('DOMContentLoaded', function() {
    // Elementos del carrusel
    const carouselTrack = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevButton = document.querySelector('.carousel-control.prev');
    const nextButton = document.querySelector('.carousel-control.next');
    const indicators = document.querySelectorAll('.indicator');
    
    let currentIndex = 0;
    let autoSlideInterval;
    const slideCount = slides.length;
    
    // Función para actualizar el carrusel
    function updateCarousel() {
        // Actualizar posición del track
        carouselTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Actualizar clases activas de slides
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentIndex);
            slide.setAttribute('aria-hidden', index !== currentIndex);
        });
        
        // Actualizar indicadores
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
            indicator.setAttribute('aria-current', index === currentIndex ? 'true' : 'false');
        });
    }
    
    // Función para ir al slide siguiente
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slideCount;
        updateCarousel();
    }
    
    // Función para ir al slide anterior
    function prevSlide() {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        updateCarousel();
    }
    
    // Función para ir a un slide específico
    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }
    
    // Iniciar el desplazamiento automático
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000); // Cambia cada 5 segundos
    }
    
    // Detener el desplazamiento automático
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    // Event listeners para los botones
    nextButton.addEventListener('click', function() {
        stopAutoSlide();
        nextSlide();
        startAutoSlide();
    });
    
    prevButton.addEventListener('click', function() {
        stopAutoSlide();
        prevSlide();
        startAutoSlide();
    });
    
    // Event listeners para los indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            stopAutoSlide();
            goToSlide(index);
            startAutoSlide();
        });
    });
    
    // Pausar el carrusel cuando el mouse está sobre el carrusel
    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.addEventListener('mouseenter', stopAutoSlide);
    carouselContainer.addEventListener('mouseleave', startAutoSlide);
    
    // Iniciar el carrusel automático
    startAutoSlide();
    
    // Funcionalidad del menú móvil
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    menuToggle.addEventListener('click', function() {
        // Alternar la visibilidad del menú
        mainNav.classList.toggle('active');
        
        // Cambiar el atributo aria-expanded para accesibilidad
        const isExpanded = mainNav.classList.contains('active');
        menuToggle.setAttribute('aria-expanded', isExpanded);
        
        // Animación del botón hamburguesa
        const hamburgerLines = document.querySelectorAll('.hamburger-line');
        if (isExpanded) {
            hamburgerLines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            hamburgerLines[1].style.opacity = '0';
            hamburgerLines[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            hamburgerLines[0].style.transform = 'none';
            hamburgerLines[1].style.opacity = '1';
            hamburgerLines[2].style.transform = 'none';
        }
    });
    
    // Cerrar el menú al hacer clic en un enlace (útil para móviles)
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                mainNav.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                
                // Revertir animación del botón hamburguesa
                const hamburgerLines = document.querySelectorAll('.hamburger-line');
                hamburgerLines[0].style.transform = 'none';
                hamburgerLines[1].style.opacity = '1';
                hamburgerLines[2].style.transform = 'none';
            }
            
            // Actualizar enlace activo
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            link.classList.add('active');
        });
    });
    
    // Cerrar el menú al redimensionar la ventana si se vuelve a un tamaño grande
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            mainNav.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            
            // Revertir animación del botón hamburguesa
            const hamburgerLines = document.querySelectorAll('.hamburger-line');
            hamburgerLines[0].style.transform = 'none';
            hamburgerLines[1].style.opacity = '1';
            hamburgerLines[2].style.transform = 'none';
        }
    });
    
    // Navegación suave para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement && targetId.startsWith('#')) {
                e.preventDefault();
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Ajuste para el header fijo
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Formulario de contacto
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aquí normalmente se enviaría el formulario a un servidor
            // Por ahora, solo mostraremos una alerta
            alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
            contactForm.reset();
        });
    }
    
    // Efecto de aparición al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observar elementos para animación
    document.querySelectorAll('.content-section, .info-card, .event-card, .gallery-item, .blog-card').forEach(el => {
        observer.observe(el);
    });
    
    // Añadir clase para animación CSS
    const style = document.createElement('style');
    style.textContent = `
        .content-section, .info-card, .event-card, .gallery-item, .blog-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .fade-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
});