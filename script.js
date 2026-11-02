document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const menuIcon = menuToggle ? menuToggle.querySelector('i') : null;

    // 1. Efecto de barra de navegación al hacer scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Menú hamburguesa para móviles
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            if (menuIcon) {
                menuIcon.classList.toggle('fa-bars');
                menuIcon.classList.toggle('fa-xmark');
            }
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                if (menuIcon) {
                    menuIcon.classList.add('fa-bars');
                    menuIcon.classList.remove('fa-xmark');
                }
            });
        });
    }

    // 3. Desplazamiento suave y preselección de servicio en el formulario
    const servicioSelect = document.getElementById('servicio');
    const mensajeTextarea = document.getElementById('mensaje');

    const defaultMessages = {
        'Reparación de PC / Notebook': 'Hola Geeksy, necesito presupuesto para reparar/revisar mi computadora.',
        'Diseño de Página Web': 'Hola Geeksy, me gustaría recibir información y presupuesto para diseñar una página web.',
        'Optimización / Limpieza / SSD': 'Hola Geeksy, quiero consultar por optimización, limpieza o instalación de disco SSD.',
        'Ambos servicios / Otra consulta': 'Hola Geeksy, quiero información y presupuesto sobre sus servicios.'
    };

    if (servicioSelect && mensajeTextarea) {
        servicioSelect.addEventListener('change', () => {
            const selected = servicioSelect.value;
            const currentVal = mensajeTextarea.value.trim();
            const isDefaultMessage = Object.values(defaultMessages).includes(currentVal) ||
                currentVal === 'Hola Geeksy, quiero información sobre el servicio técnico.';

            if (isDefaultMessage && defaultMessages[selected]) {
                mensajeTextarea.value = defaultMessages[selected];
            }
        });
    }

    document.querySelectorAll('[data-service]').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetService = btn.getAttribute('data-service');
            if (servicioSelect && targetService) {
                servicioSelect.value = targetService;
                servicioSelect.dispatchEvent(new Event('change'));
            }
        });
    });

    // 4. Acordeón de Preguntas Frecuentes (FAQ)
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', () => {
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.querySelector('.faq-question').classList.remove('active');
                    otherItem.querySelector('.faq-answer').classList.remove('active');
                }
            });

            question.classList.toggle('active');
            answer.classList.toggle('active');
        });
    });
});
