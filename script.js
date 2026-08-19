// Herrika Landing Page JavaScript
// Système de traduction

// Fonction de validation sécurisée pour localStorage
function getValidLanguage() {
    const lang = localStorage.getItem('herrika-language');
    const validLanguages = ['fr', 'en', 'eu', 'es'];
    return validLanguages.includes(lang) ? lang : 'fr';
}

let currentLanguage = getValidLanguage();

// Fonction de mise à jour de la langue
function updateLanguage(language) {
    currentLanguage = language;
    localStorage.setItem('herrika-language', language);
    
    // Mettre à jour l'attribut lang du document pour l'accessibilité
    document.documentElement.lang = language;
    
    // Traduire tous les éléments avec data-translate
    const elementsToTranslate = document.querySelectorAll('[data-translate]');
    elementsToTranslate.forEach(element => {
        const key = element.getAttribute('data-translate');
        translateElement(element, key, language);
    });
    
    // Mettre à jour les états ARIA des boutons de langue
    document.querySelectorAll('.lang-btn').forEach(btn => {
        const isActive = btn.getAttribute('data-lang') === language;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-pressed', isActive);
    });
}

// Fonction d'initialisation de la langue
function initializeLanguage() {
    console.log('Langue initialisée:', currentLanguage);
    updateLanguage(currentLanguage);
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initialisation de la page...');
    try {
        initializeLanguage();
        initializeFAQ();
        console.log('Initialisation terminée');
    } catch (error) {
        console.error('Erreur lors de l\'initialisation:', error);
    }
});
    
// Fonction pour traduire un élément
function translateElement(element, key, language) {
    const keys = key.split('.');
    let translation = translations;
        
    for (const k of keys) {
        if (translation && (translation[k] !== undefined)) {
            translation = translation[k];
        } else {
            console.warn(`Translation key not found: ${key}`);
            return;
        }
    }
    
    if (translation && translation[language]) {
        // Utilisation de innerHTML pour permettre le formatage HTML (ex: <strong>)
        element.innerHTML = translation[language];
    } else if (translation && translation['fr']) {
        // Fallback vers le français si la traduction n'existe pas
        console.warn(`Translation not found for ${key} in ${language}, using French fallback`);
        element.innerHTML = translation['fr'];
    }
}
    
    // Fonction pour traduire toute la page
    function translatePage(language) {
        const elementsToTranslate = document.querySelectorAll('[data-translate]');
        
        elementsToTranslate.forEach(element => {
            const key = element.getAttribute('data-translate');
            translateElement(element, key, language);
        });
        
        // Mettre à jour le titre de la page
        if (translations.hero && translations.hero.title && translations.hero.title[language]) {
            document.title = `Herrika - ${translations.hero.title[language]}`;
        }
        
        // Mettre à jour la meta description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription && translations.hero && translations.hero.description && translations.hero.description[language]) {
            metaDescription.setAttribute('content', translations.hero.description[language]);
        }
    }
    
    // Gestion des boutons de langue
    const languageButtons = document.querySelectorAll('.lang-btn');
    languageButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const selectedLanguage = this.getAttribute('data-lang');
            
            // Mettre à jour les boutons actifs
            languageButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Traduire la page
            currentLanguage = selectedLanguage;
            translatePage(selectedLanguage);
            
            // Sauvegarder la préférence
            localStorage.setItem('herrichain-language', selectedLanguage);
        });
    });
    
    // Mettre à jour le bouton actif au chargement
    const activeBtn = document.querySelector(`[data-lang="${currentLanguage}"]`);
    if (activeBtn) {
        languageButtons.forEach(b => b.classList.remove('active'));
        activeBtn.classList.add('active');
    }
    // Navigation mobile toggle avec accessibilité
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            const isExpanded = navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Mettre à jour les attributs ARIA
            navToggle.setAttribute('aria-expanded', isExpanded);
            navToggle.setAttribute('aria-label', isExpanded ? 'Fermer le menu de navigation' : 'Ouvrir le menu de navigation');
            
            // Gérer le focus pour l'accessibilité
            if (isExpanded) {
                // Mettre le focus sur le premier lien du menu
                const firstLink = navMenu.querySelector('.nav-link');
                if (firstLink) {
                    setTimeout(() => firstLink.focus(), 100);
                }
            }
        });
        
        // Fermer le menu avec la touche Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.setAttribute('aria-label', 'Ouvrir le menu de navigation');
                navToggle.focus();
            }
        });
    }

    // Smooth scrolling pour les liens de navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Hauteur navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Fermer le menu mobile si ouvert
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Ajouter classe scrolled pour effet backdrop
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Auto-hide navbar on scroll down (optionnel)
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Intersection Observer pour animations au scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Animation spéciale pour les cartes de fonctionnalités
                if (entry.target.classList.contains('feature-card')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                    entry.target.style.animationDelay = `${delay}ms`;
                }
                
                // Animation spéciale pour les étapes
                if (entry.target.classList.contains('step')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 200;
                    entry.target.style.animationDelay = `${delay}ms`;
                }
            }
        });
    }, observerOptions);

    // Observer les éléments à animer
    const animatedElements = document.querySelectorAll(
        '.feature-card, .step, .value-item, .demo-screen, .about-content, .section-header'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Animation du hero au chargement
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.classList.add('loaded');
        }, 300);
    }

    // Effet de typing pour le titre principal
    const titleMain = document.querySelector('.title-main');
    if (titleMain) {
        const text = titleMain.textContent;
        titleMain.textContent = '';
        titleMain.style.borderRight = '2px solid #d63031';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                titleMain.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                setTimeout(() => {
                    titleMain.style.borderRight = 'none';
                }, 1000);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }

    // Copie IBAN dans la démo
    const ibanCopyBtn = document.querySelector('.iban-copy');
    if (ibanCopyBtn) {
        ibanCopyBtn.addEventListener('click', function() {
            const ibanNumber = document.querySelector('.iban-number');
            if (ibanNumber) {
                // Simuler la copie
                const originalText = this.textContent;
                const copiedText = {
                    'fr': 'Copié !',
                    'eu': 'Kopiatu!',
                    'es': '¡Copiado!'
                };
                
                this.textContent = copiedText[currentLanguage] || 'Copié !';
                this.style.background = '#00b894';
                
                setTimeout(() => {
                    // Retraduire le bouton
                    translateElement(this, 'demo.copy', currentLanguage);
                    this.style.background = '';
                }, 2000);
            }
        });
    }

    // Animation des statistiques
    const statNumbers = document.querySelectorAll('.stat-number');
    const animateStats = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                
                // Animation pour les pourcentages et nombres
                if (finalValue.includes('%')) {
                    animateNumber(target, 0, parseInt(finalValue), '%');
                } else if (finalValue.includes('€')) {
                    target.textContent = finalValue; // Garder tel quel pour "0€"
                } else if (finalValue.includes('/')) {
                    target.textContent = finalValue; // Garder tel quel pour "24/7"
                }
            }
        });
    };

    const statsObserver = new IntersectionObserver(animateStats, {
        threshold: 0.5
    });

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });

    // Fonction d'animation des nombres
    function animateNumber(element, start, end, suffix = '') {
        const duration = 2000;
        const increment = (end - start) / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                current = end;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + suffix;
        }, 16);
    }

    // Parallax effect pour les éléments de fond
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroPattern = document.querySelector('.hero-pattern');
        const basquePattern = document.querySelector('.basque-pattern');
        
        if (heroPattern) {
            heroPattern.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
        
        if (basquePattern) {
            const rect = basquePattern.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                basquePattern.style.transform = `rotate(${scrolled * 0.1}deg)`;
            }
        }
    });

    // Gestion des boutons CTA
    const ctaButtons = document.querySelectorAll('.cta-primary, .cta-secondary, .team-cta');
    ctaButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Effet de ripple
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Gestion du formulaire de contact (si ajouté plus tard)
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Logique de soumission du formulaire
            console.log('Formulaire soumis');
        });
    }

    // Easter egg : Konami Code
    let konamiCode = [];
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.keyCode);
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.toString() === konamiSequence.toString()) {
            // Easter egg activé
            document.body.style.filter = 'hue-rotate(180deg)';
            setTimeout(() => {
                document.body.style.filter = '';
            }, 3000);
            konamiCode = [];
        }
    });

    // Performance: Lazy loading des images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

// Note: Les styles d'animation ont été déplacés vers styles.css pour de meilleures performances

// FAQ Accordéons - Version définitive
function initializeFAQ() {
    console.log('FAQ: Initialisation...');
    
    setTimeout(() => {
        try {
            const faqQuestions = document.querySelectorAll('.faq-question');
            console.log('FAQ: Nombre de questions trouvées:', faqQuestions.length);
            
            if (faqQuestions.length === 0) {
                console.error('FAQ: Aucune question trouvée');
                return;
            }
            
            faqQuestions.forEach((question, index) => {
                question.addEventListener('click', function(e) {
                    e.preventDefault();
                    console.log('FAQ: Clic détecté sur question', index);
                    
                    const parentItem = this.parentElement;
                    const isCurrentlyActive = parentItem.classList.contains('active');
                    
                    // Fermer tous les accordéons
                    document.querySelectorAll('.faq-item').forEach(item => {
                        item.classList.remove('active');
                        const question = item.querySelector('.faq-question');
                        if (question) {
                            question.setAttribute('aria-expanded', 'false');
                        }
                    });
                    
                    // Ouvrir l'accordéon cliqué s'il n'était pas déjà ouvert
                    if (!isCurrentlyActive) {
                        parentItem.classList.add('active');
                        this.setAttribute('aria-expanded', 'true');
                        console.log('FAQ: Accordéon ouvert');
                    } else {
                        console.log('FAQ: Accordéon fermé');
                    }
                });
            });
            
            console.log('FAQ: Initialisation réussie');
        } catch (error) {
            console.error('FAQ: Erreur lors de l\'initialisation:', error);
        }
    }, 100);
}

// Les styles sont maintenant dans le fichier CSS principal
