// Système de gestion des cookies pour Herrika
// Stockage local uniquement (zéro tracking, zéro données collectées)

(function() {
    'use strict';

    // Configuration
    const COOKIE_CONSENT_KEY = 'herrika_cookie_consent';
    const COOKIE_CONSENT_DURATION = 365; // jours

    // Obtenir la langue actuelle
    function getCurrentLanguage() {
        return localStorage.getItem('herrika_language') || 'fr';
    }

    // Obtenir une traduction
    function getTranslation(key) {
        const lang = getCurrentLanguage();
        if (typeof translations !== 'undefined' && translations.cookies && translations.cookies[key]) {
            return translations.cookies[key][lang] || translations.cookies[key]['fr'];
        }
        // Fallback en français si les traductions ne sont pas disponibles
        const fallbacks = {
            'title': 'Aucune donnée stockée 🔒',
            'message': 'Ce site utilise uniquement le stockage local de votre navigateur pour sauvegarder vos préférences (langue et thème). ',
            'strong': 'Aucune donnée n\'est collectée, stockée sur nos serveurs, analysée ou partagée.',
            'privacy': ' Zéro tracking, zéro cookies tiers.',
            'learnMore': 'En savoir plus',
            'accept': 'J\'ai compris'
        };
        return fallbacks[key] || '';
    }

    // Vérifier si le consentement a déjà été donné
    function hasConsent() {
        return localStorage.getItem(COOKIE_CONSENT_KEY) === 'accepted';
    }

    // Enregistrer le consentement
    function saveConsent() {
        localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + COOKIE_CONSENT_DURATION);
        localStorage.setItem(COOKIE_CONSENT_KEY + '_expiry', expiryDate.toISOString());
    }

    // Vérifier si le consentement a expiré
    function isConsentExpired() {
        const expiry = localStorage.getItem(COOKIE_CONSENT_KEY + '_expiry');
        if (!expiry) return true;
        return new Date() > new Date(expiry);
    }

    // Créer le banner de cookies
    function createCookieBanner() {
        const banner = document.createElement('div');
        banner.id = 'cookie-banner';
        banner.className = 'cookie-banner';
        
        // Créer la structure via DOM (sécurisé contre XSS)
        const content = document.createElement('div');
        content.className = 'cookie-banner-content';
        
        const textDiv = document.createElement('div');
        textDiv.className = 'cookie-banner-text';
        
        const icon = document.createElement('div');
        icon.className = 'cookie-icon';
        icon.textContent = '🍪';
        
        const message = document.createElement('div');
        message.className = 'cookie-message';
        
        const h3 = document.createElement('h3');
        h3.textContent = getTranslation('title');
        
        const p = document.createElement('p');
        p.textContent = getTranslation('message');
        
        const strong = document.createElement('strong');
        strong.textContent = getTranslation('strong');
        p.appendChild(strong);
        
        const privacyText = document.createTextNode(getTranslation('privacy'));
        p.appendChild(privacyText);
        
        const link = document.createElement('a');
        link.href = 'mentions-legales.html#cookies';
        link.className = 'cookie-learn-more';
        link.textContent = getTranslation('learnMore');
        
        message.appendChild(h3);
        message.appendChild(p);
        message.appendChild(link);
        
        textDiv.appendChild(icon);
        textDiv.appendChild(message);
        
        const actions = document.createElement('div');
        actions.className = 'cookie-banner-actions';
        
        const button = document.createElement('button');
        button.id = 'cookie-accept';
        button.className = 'cookie-btn cookie-btn-accept';
        button.textContent = getTranslation('accept');
        
        actions.appendChild(button);
        
        content.appendChild(textDiv);
        content.appendChild(actions);
        banner.appendChild(content);
        
        document.body.appendChild(banner);

        // Ajouter les styles
        addCookieStyles();

        // Gérer le clic sur le bouton
        document.getElementById('cookie-accept').addEventListener('click', function() {
            saveConsent();
            banner.classList.add('cookie-banner-hidden');
            setTimeout(() => banner.remove(), 300);
        });

        // Animation d'entrée
        setTimeout(() => banner.classList.add('cookie-banner-visible'), 100);
    }

    // Ajouter les styles CSS
    function addCookieStyles() {
        if (document.getElementById('cookie-banner-styles')) return;

        const style = document.createElement('style');
        style.id = 'cookie-banner-styles';
        style.textContent = `
            .cookie-banner {
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                background: rgba(10, 10, 10, 0.98);
                backdrop-filter: blur(20px);
                border-top: 1px solid rgba(0, 160, 133, 0.3);
                padding: 24px;
                z-index: 10000;
                transform: translateY(100%);
                transition: transform 0.3s ease;
                box-shadow: 0 -4px 24px rgba(0, 0, 0, 0.3);
            }

            .cookie-banner-visible {
                transform: translateY(0);
            }

            .cookie-banner-hidden {
                transform: translateY(100%);
            }

            .cookie-banner-content {
                max-width: 1200px;
                margin: 0 auto;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 32px;
            }

            .cookie-banner-text {
                display: flex;
                align-items: flex-start;
                gap: 20px;
                flex: 1;
            }

            .cookie-icon {
                font-size: 2.5rem;
                flex-shrink: 0;
                animation: cookieBounce 2s ease-in-out infinite;
            }

            @keyframes cookieBounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-5px); }
            }

            .cookie-message h3 {
                font-family: 'Space Grotesk', sans-serif;
                font-size: 1.1rem;
                font-weight: 600;
                color: var(--basque-green);
                margin: 0 0 8px 0;
            }

            .cookie-message p {
                font-size: 0.95rem;
                line-height: 1.6;
                color: var(--text-secondary);
                margin: 0 0 8px 0;
            }

            .cookie-message strong {
                color: var(--text-primary);
                font-weight: 600;
            }

            .cookie-learn-more {
                font-size: 0.9rem;
                color: var(--basque-green);
                text-decoration: none;
                border-bottom: 1px solid transparent;
                transition: border-color 0.3s ease;
            }

            .cookie-learn-more:hover {
                border-bottom-color: var(--basque-green);
            }

            .cookie-banner-actions {
                display: flex;
                gap: 12px;
                flex-shrink: 0;
            }

            .cookie-btn {
                padding: 12px 32px;
                border: none;
                border-radius: 8px;
                font-family: 'Space Grotesk', sans-serif;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                white-space: nowrap;
            }

            .cookie-btn-accept {
                background: linear-gradient(135deg, var(--basque-green), #008f75);
                color: white;
                box-shadow: 0 4px 12px rgba(0, 160, 133, 0.3);
            }

            .cookie-btn-accept:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 16px rgba(0, 160, 133, 0.4);
            }

            /* Responsive */
            @media (max-width: 768px) {
                .cookie-banner {
                    padding: 20px 16px;
                }

                .cookie-banner-content {
                    flex-direction: column;
                    gap: 20px;
                }

                .cookie-banner-text {
                    flex-direction: column;
                    gap: 12px;
                    text-align: center;
                }

                .cookie-icon {
                    font-size: 2rem;
                }

                .cookie-message h3 {
                    font-size: 1rem;
                }

                .cookie-message p {
                    font-size: 0.9rem;
                }

                .cookie-banner-actions {
                    width: 100%;
                }

                .cookie-btn {
                    width: 100%;
                    padding: 14px 24px;
                }
            }

            /* Mode clair */
            [data-theme="light"] .cookie-banner {
                background: rgba(255, 255, 255, 0.98);
                border-top-color: rgba(0, 160, 133, 0.2);
            }

            [data-theme="light"] .cookie-message p {
                color: #666;
            }

            [data-theme="light"] .cookie-message strong {
                color: #0a0a0a;
            }
        `;

        document.head.appendChild(style);
    }

    // Initialiser le système de cookies
    function init() {
        // Vérifier si le consentement est nécessaire
        if (!hasConsent() || isConsentExpired()) {
            // Attendre que le DOM soit chargé
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', createCookieBanner);
            } else {
                createCookieBanner();
            }
        }
    }

    // Lancer l'initialisation
    init();

    // Exposer une fonction pour réinitialiser le consentement (pour les tests)
    window.resetCookieConsent = function() {
        localStorage.removeItem(COOKIE_CONSENT_KEY);
        localStorage.removeItem(COOKIE_CONSENT_KEY + '_expiry');
        console.log('Cookie consent reset. Reload the page to see the banner again.');
    };

})();
