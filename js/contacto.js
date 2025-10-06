// Funcionalidad para la sección de contacto
document.addEventListener('DOMContentLoaded', function() {
    // Elementos principales
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
    
    // Inicializar contador de caracteres
    charCount.textContent = '0';
    
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
        
        // Cambiar color según la cantidad de caracteres
        if (length > 450) {
            charCount.classList.add('warning');
            charCount.classList.remove('error');
        } else if (length > 500) {
            charCount.classList.add('error');
            charCount.classList.remove('warning');
        } else {
            charCount.classList.remove('warning', 'error');
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
        resetForm();
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
    
    function clearAllErrors() {
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
        // Deshabilitar botón y mostrar estado de carga
        submitButton.disabled = true;
        submitButton.classList.add('loading');
        
        // Simular envío del formulario (en un caso real, aquí iría AJAX/Fetch)
        setTimeout(function() {
            // Recopilar datos del formulario
            const formData = {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                phone: phoneInput.value.trim(),
                subject: subjectSelect.value,
                message: messageTextarea.value.trim(),
                newsletter: document.getElementById('newsletter').checked,
                timestamp: new Date().toISOString()
            };
            
            // En un caso real, aquí enviarías los datos al servidor
            console.log('Datos del formulario enviados:', formData);
            
            // Mostrar mensaje de éxito
            showSuccessMessage();
            
        }, 2000); // Simular delay de red de 2 segundos
    }
    
    function showSuccessMessage() {
        // Ocultar formulario y mostrar mensaje de éxito
        contactForm.style.display = 'none';
        formSuccess.classList.add('show');
        
        // Restablecer botón de envío
        submitButton.disabled = false;
        submitButton.classList.remove('loading');
    }
    
    function resetForm() {
        // Ocultar mensaje de éxito y mostrar formulario
        formSuccess.classList.remove('show');
        contactForm.style.display = 'flex';
        
        // Limpiar formulario
        contactForm.reset();
        charCount.textContent = '0';
        charCount.classList.remove('warning', 'error');
        clearAllErrors();
    }
    
    // Efectos visuales para los campos del formulario
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
            
            // Verificar si el campo tiene valor al cargar
            if (input.value !== '') {
                group.classList.add('focused');
            }
        }
    });
    
    // Efectos para los métodos de contacto
    const contactMethods = document.querySelectorAll('.contact-method');
    
    contactMethods.forEach(method => {
        method.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        method.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Efecto de aparición para la sección completa
    const contactoSection = document.getElementById('contacto');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    // Aplicar estilos iniciales para la animación
    contactoSection.style.opacity = '0';
    contactoSection.style.transform = 'translateY(30px)';
    contactoSection.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    
    observer.observe(contactoSection);
});