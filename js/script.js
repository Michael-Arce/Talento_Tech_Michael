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
    
    /// Funcionalidad mejorada para el formulario de contacto
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const submitButton = document.getElementById('submitButton');
    const formSuccess = document.getElementById('formSuccess');
    const newMessageBtn = document.getElementById('newMessage');
    
    // Elementos del formulario
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const subjectSelect = document.getElementById('subject');
    const messageTextarea = document.getElementById('message');
    const charCount = document.getElementById('charCount');
    
    // Validación en tiempo real
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    phoneInput.addEventListener('input', validatePhone);
    subjectSelect.addEventListener('change', validateSubject);
    messageTextarea.addEventListener('input', validateMessage);
    
    // Contador de caracteres para el mensaje
    messageTextarea.addEventListener('input', function() {
        const length = this.value.length;
        charCount.textContent = length;
        
        if (length > 450) {
            charCount.classList.add('warning');
        } else {
            charCount.classList.remove('warning');
        }
        
        if (length > 500) {
            charCount.classList.add('error');
        } else {
            charCount.classList.remove('error');
        }
    });
    
    // Envío del formulario
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            submitForm();
        }
    });
    
    // Botón para nuevo mensaje
    newMessageBtn.addEventListener('click', function() {
        formSuccess.classList.remove('show');
        contactForm.reset();
        charCount.textContent = '0';
        charCount.classList.remove('warning', 'error');
        clearErrors();
    });
    
    // Funciones de validación
    function validateName() {
        const value = nameInput.value.trim();
        const errorElement = document.getElementById('nameError');
        
        if (value === '') {
            showError(nameInput, errorElement, 'El nombre es obligatorio');
            return false;
        } else if (value.length < 2) {
            showError(nameInput, errorElement, 'El nombre debe tener al menos 2 caracteres');
            return false;
        } else {
            clearError(nameInput, errorElement);
            return true;
        }
    }
    
    function validateEmail() {
        const value = emailInput.value.trim();
        const errorElement = document.getElementById('emailError');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (value === '') {
            showError(emailInput, errorElement, 'El correo electrónico es obligatorio');
            return false;
        } else if (!emailRegex.test(value)) {
            showError(emailInput, errorElement, 'Por favor ingresa un correo electrónico válido');
            return false;
        } else {
            clearError(emailInput, errorElement);
            return true;
        }
    }
    
    function validatePhone() {
        const value = phoneInput.value.trim();
        const errorElement = document.getElementById('phoneError');
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{7,15}$/;
        
        if (value !== '' && !phoneRegex.test(value)) {
            showError(phoneInput, errorElement, 'Por favor ingresa un número de teléfono válido');
            return false;
        } else {
            clearError(phoneInput, errorElement);
            return true;
        }
    }
    
    function validateSubject() {
        const value = subjectSelect.value;
        const errorElement = document.getElementById('subjectError');
        
        if (value === '') {
            showError(subjectSelect, errorElement, 'Por favor selecciona un asunto');
            return false;
        } else {
            clearError(subjectSelect, errorElement);
            return true;
        }
    }
    
    function validateMessage() {
        const value = messageTextarea.value.trim();
        const errorElement = document.getElementById('messageError');
        
        if (value === '') {
            showError(messageTextarea, errorElement, 'El mensaje es obligatorio');
            return false;
        } else if (value.length < 10) {
            showError(messageTextarea, errorElement, 'El mensaje debe tener al menos 10 caracteres');
            return false;
        } else if (value.length > 500) {
            showError(messageTextarea, errorElement, 'El mensaje no puede exceder los 500 caracteres');
            return false;
        } else {
            clearError(messageTextarea, errorElement);
            return true;
        }
    }
    
    function validateForm() {
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPhoneValid = validatePhone();
        const isSubjectValid = validateSubject();
        const isMessageValid = validateMessage();
        
        return isNameValid && isEmailValid && isPhoneValid && isSubjectValid && isMessageValid;
    }
    
    function showError(input, errorElement, message) {
        input.classList.add('error');
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
    
    function clearError(input, errorElement) {
        input.classList.remove('error');
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }
    
    function clearErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        const errorInputs = document.querySelectorAll('.error');
        
        errorMessages.forEach(error => {
            error.textContent = '';
            error.classList.remove('show');
        });
        
        errorInputs.forEach(input => {
            input.classList.remove('error');
        });
    }
    
    function submitForm() {
        // Simular envío del formulario
        submitButton.disabled = true;
        submitButton.classList.add('loading');
        
        // Simular delay de red
        setTimeout(function() {
            // Aquí normalmente enviarías los datos a un servidor
            const formData = {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                phone: phoneInput.value.trim(),
                subject: subjectSelect.value,
                message: messageTextarea.value.trim(),
                newsletter: document.getElementById('newsletter').checked
            };
            
            console.log('Datos del formulario:', formData);
            
            // Mostrar mensaje de éxito
            contactForm.style.display = 'none';
            formSuccess.classList.add('show');
            
            // Restablecer botón
            submitButton.disabled = false;
            submitButton.classList.remove('loading');
        }, 2000);
    }
    
    // Efectos visuales adicionales
    const formGroups = document.querySelectorAll('.form-group');
    
    formGroups.forEach(group => {
        const input = group.querySelector('input, select, textarea');
        
        if (input) {
            // Efecto de focus
            input.addEventListener('focus', function() {
                group.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (this.value === '') {
                    group.classList.remove('focused');
                }
            });
            
            // Verificar si el campo tiene valor al cargar la página
            if (input.value !== '') {
                group.classList.add('focused');
            }
        }
    });
    
    // Añadir estilos para el efecto focused
    const style = document.createElement('style');
    style.textContent = `
        .form-group {
            position: relative;
        }
        
        .form-group.focused label {
            color: #1a5276;
            font-weight: 600;
        }
        
        .form-group input:not(:placeholder-shown),
        .form-group select:not([value=""]),
        .form-group textarea:not(:placeholder-shown) {
            border-color: #1a5276;
        }
    `;
    document.head.appendChild(style);
});

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