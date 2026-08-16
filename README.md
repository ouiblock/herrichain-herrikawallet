# Herrika - Landing Page

> Portefeuille numérique souverain avec IBAN européen sur blockchain

Landing page officielle de **Herrika**, le compte bancaire souverain et décentralisé porté par l'association Herrichain.

🌐 **Site web:** [herrika.org](https://herrika.org)

---

## 🎯 À propos

Herrika est un portefeuille numérique non-custodial qui offre:
- **IBAN européen** intégré sur blockchain Gnosis Chain
- **Virements SEPA** gratuits et instantanés 24/7
- **Auto-détention** complète de vos fonds
- **Régulation MiCA** avec stablecoin EURe (Monerium)
- **Zéro frais** • **Zéro blocage** • **Zéro intermédiaire**

---

## 🌍 Fonctionnalités de la Landing Page

### Multilingue
- 🇫🇷 Français
- 🇪🇺 Euskera (Basque)
- 🇪🇸 Español
- 🇬🇧 English

### Sections
1. **Hero** - Message principal et CTA
2. **Features** - Fonctionnalités clés (IBAN, virements, sécurité)
3. **How it works** - 3 étapes simples
4. **Legal** - Partenaires (Ibex Wallet, Monerium, Gnosis Chain)
5. **EURe** - Stablecoin régulé MiCA
6. **Video** - Présentation du projet
7. **Demo** - Aperçu de l'interface
8. **FAQ** - Questions fréquentes
9. **About** - Association Herrichain
10. **Footer** - Liens et mentions légales

### Design
- **Palette basque** moderne (vert, rouge, noir)
- **Mode sombre/clair** avec switch
- **Responsive** complet (mobile, tablet, desktop)
- **Animations** fluides et interactions avancées
- **Accessibilité** WCAG 2.1

---

## 🚀 Développement Local

### Prérequis
- Navigateur moderne (Chrome, Firefox, Safari, Edge)
- Serveur HTTP local

### Installation

```bash
# Cloner le repository
git clone [url-du-repo]
cd windsurf-project

# Lancer un serveur local
python3 -m http.server 8000
# ou
npx serve .
# ou
php -S localhost:8000
```

Ouvrir [http://localhost:8000](http://localhost:8000) dans votre navigateur.

---

## 📁 Structure du Projet

```
windsurf-project/
├── index.html              # Page principale
├── styles.css              # Styles CSS
├── script.js               # JavaScript principal
├── translations.js         # Système de traductions
├── theme-switcher.js       # Mode sombre/clair
├── cookies.js              # Gestion cookies RGPD
├── netlify.toml            # Configuration Netlify
├── robots.txt              # SEO
├── sitemap.xml             # SEO
├── site.webmanifest        # PWA
├── _redirects              # Redirections
├── logo.svg                # Logo Herrika
├── favicon.svg             # Favicon
├── *.html                  # Pages légales
└── *.png, *.webp           # Images partenaires
```

---

## 🔒 Sécurité

Le site a été audité et sécurisé:
- ✅ Protection XSS (pas d'innerHTML dangereux)
- ✅ Validation localStorage
- ✅ En-têtes HTTP sécurisés (CSP, HSTS, X-Frame-Options)
- ✅ Iframe YouTube avec sandbox
- ✅ Cookies techniques uniquement (RGPD compliant)

**Score de sécurité:** 9/10

Voir `SECURITY_AUDIT_REPORT.md` et `SECURITY_FIXES_APPLIED.md` pour les détails.

---

## 🎨 Personnalisation

### Couleurs
Modifier les variables CSS dans `styles.css`:

```css
:root {
  --basque-green: #00a085;
  --basque-red: #d63031;
  --primary-black: #0a0a0a;
  --text-primary: #f8f9fa;
}
```

### Traductions
Ajouter/modifier dans `translations.js`:

```javascript
const translations = {
  "section": {
    "key": {
      "fr": "Texte français",
      "eu": "Testu euskaraz",
      "es": "Texto español",
      "en": "English text"
    }
  }
}
```

---

## 🌐 Déploiement

### Netlify (Recommandé)
Le projet est configuré pour Netlify avec:
- Build automatique
- En-têtes de sécurité
- Redirections
- Cache optimisé

```bash
# Déployer sur Netlify
netlify deploy --prod
```

### Autres plateformes
Compatible avec:
- Vercel
- GitHub Pages
- Cloudflare Pages
- Serveur web classique (Apache, Nginx)

---

## 📱 Responsive Design

| Breakpoint | Largeur | Optimisations |
|------------|---------|---------------|
| Mobile | 320px - 768px | Navigation hamburger, colonnes simples |
| Tablet | 768px - 1024px | Grille 2 colonnes, espacements réduits |
| Desktop | 1024px+ | Grille 3 colonnes, animations complètes |

---

## ⚡ Performance

- **Lazy loading** des images
- **Preconnect** pour Google Fonts
- **Minification** CSS/JS (via Netlify)
- **Cache** optimisé (1 an pour assets statiques)
- **Lighthouse Score:** 95+/100

---

## 🤝 Contribution

Porté par l'**Association Herrichain** (Loi 1901)
- **RNA:** W641015204
- **Siège:** 257 avenue d'Atherbea, 64210 Bidart, France
- **Contact:** contact@herrika.org

---

## 📄 Licence

© 2024-2026 Association Herrichain  
Tous droits réservés.

Le code source est disponible pour consultation. Pour toute utilisation commerciale, veuillez contacter l'association.

---

## 🔗 Liens

- **Site web:** [herrika.org](https://herrika.org)
- **Application:** [app.herrika.org](https://app.herrika.org)
- **Association:** [herrichain.org](https://herrichain.org)
- **Twitter:** [@herrika](https://twitter.com/herrika)
- **Telegram:** [t.me/herrika](https://t.me/herrika)

---

**Fait avec ❤️ pour la souveraineté financière européenne**
