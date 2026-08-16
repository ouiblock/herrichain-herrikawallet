# 🎨 CHARTE GRAPHIQUE HERRIKA
## Guide des couleurs pour l'équipe UI du wallet

---

## 🏴 **PALETTE PRINCIPALE - IDENTITÉ BASQUE**

### **Couleurs Primaires**
| Couleur | Code Hex | Usage | Aperçu |
|---------|----------|-------|---------|
| **Noir Principal** | `#0a0a0a` | Arrière-plans principaux, textes | ![#0a0a0a](https://via.placeholder.com/50x30/0a0a0a/ffffff?text=+) |
| **Rouge Basque** | `#d63031` | Éléments d'accent, CTA, lauburu | ![#d63031](https://via.placeholder.com/50x30/d63031/ffffff?text=+) |
| **Vert Basque** | `#00a085` | Éléments secondaires, succès, validation | ![#00a085](https://via.placeholder.com/50x30/00a085/ffffff?text=+) |
| **Blanc Pur** | `#ffffff` | Textes sur fonds sombres, éléments clairs | ![#ffffff](https://via.placeholder.com/50x30/ffffff/000000?text=+) |

---

## 🎨 **PALETTE SECONDAIRE**

### **Nuances de Gris**
| Couleur | Code Hex | Usage |
|---------|----------|-------|
| **Gris Sombre** | `#2d3436` | Arrière-plans secondaires |
| **Gris Moyen** | `#636e72` | Textes secondaires, bordures |
| **Gris Clair** | `#b2bec3` | Textes désactivés, placeholders |
| **Blanc Cassé** | `#f8f9fa` | Arrière-plans clairs |
| **Blanc Doux** | `#fafbfc` | Surfaces subtiles |

### **Couleurs d'Accent**
| Couleur | Code Hex | Usage |
|---------|----------|-------|
| **Rouge Accent** | `#e17055` | Hover states, transitions |
| **Vert Accent** | `#00d2aa` | Hover states, animations |
| **Vert Succès** | `#00b894` | Messages de succès |

---

## 🌈 **DÉGRADÉS SIGNATURE**

### **Dégradés Principaux**
```css
/* Dégradé Héro */
--hero-gradient: linear-gradient(135deg, #0a0a0a 0%, #2d3436 100%);

/* Dégradé Rouge Basque */
--red-gradient: linear-gradient(135deg, #d63031 0%, #e17055 100%);

/* Dégradé Vert Basque */
--green-gradient: linear-gradient(135deg, #00a085 0%, #00d2aa 100%);

/* Dégradé Drapeau Basque */
--basque-flag-gradient: linear-gradient(45deg, #d63031 0%, #ffffff 50%, #00a085 100%);
```

### **Dégradés Utilitaires**
```css
/* Cartes et surfaces */
--card-gradient: linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%);

/* Blanc subtil */
--white-gradient: linear-gradient(145deg, #ffffff 0%, #fafbfc 100%);
```

---

## 🎯 **USAGE PAR CONTEXTE**

### **Interface Wallet - Recommandations**

#### **🔴 Éléments Critiques (Rouge)**
- Boutons d'action principaux (Envoyer, Vendre)
- Alertes importantes
- Montants négatifs
- États d'erreur

#### **🟢 Éléments Positifs (Vert)**
- Boutons de validation (Recevoir, Confirmer)
- Messages de succès
- Montants positifs
- États de réussite

#### **⚫ Éléments Neutres (Gris/Noir)**
- Arrière-plans principaux
- Textes de contenu
- Bordures et séparateurs
- Navigation

#### **⚪ Éléments de Contraste (Blanc)**
- Textes sur fonds sombres
- Surfaces de contenu
- Modales et overlays

---

## 🎨 **COULEURS SPÉCIFIQUES WALLET**

### **États des Transactions**
| État | Couleur | Code Hex |
|------|---------|----------|
| **En attente** | Jaune/Orange | `#ffbd2e` |
| **Confirmée** | Vert Basque | `#00a085` |
| **Échouée** | Rouge Basque | `#d63031` |
| **En cours** | Bleu (suggestion) | `#0984e3` |

### **Types de Comptes**
| Type | Couleur Suggérée | Usage |
|------|------------------|-------|
| **Principal** | Rouge Basque | Compte principal |
| **Épargne** | Vert Basque | Comptes d'épargne |
| **Pro** | Gris Sombre | Comptes professionnels |

---

## 🔧 **COULEURS TECHNIQUES**

### **Interface Système**
```css
/* Dots de navigation (macOS style) */
--red-dot: #ff5f56;
--yellow-dot: #ffbd2e;
--green-dot: #27ca3f;

/* Puce dorée (cartes bancaires) */
--gold-chip: #ffd700;

/* Arrière-plans devices */
--device-dark: #1a1a1a;
--device-darker: #0f0f0f;
--screen-bg: #1e1e1e;
```

---

## 📱 **ADAPTATION MOBILE**

### **Contrastes Recommandés**
- **Texte principal** : Blanc (#ffffff) sur Noir (#0a0a0a) = 21:1
- **Texte secondaire** : Gris Clair (#b2bec3) sur Noir (#0a0a0a) = 9.5:1
- **Boutons CTA** : Blanc (#ffffff) sur Rouge (#d63031) = 5.9:1

### **Accessibilité**
- ✅ Tous les contrastes respectent WCAG 2.1 AA
- ✅ Couleurs distinguables pour daltoniens
- ✅ États focus visibles

---

## 🎭 **ANIMATIONS ET TRANSITIONS**

### **Couleurs d'Animation**
```css
/* Transitions douces */
--transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

/* Animations rebond */
--transition-bounce: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### **États Hover**
- **Rouge → Rouge Accent** : `#d63031` → `#e17055`
- **Vert → Vert Accent** : `#00a085` → `#00d2aa`
- **Gris → Gris Clair** : `#2d3436` → `#636e72`

---

## 🏷️ **VARIABLES CSS COMPLÈTES**

```css
:root {
  /* Couleurs principales */
  --primary-black: #0a0a0a;
  --basque-red: #d63031;
  --basque-green: #00a085;
  --basque-white: #ffffff;
  
  /* Couleurs secondaires */
  --dark-gray: #2d3436;
  --medium-gray: #636e72;
  --light-gray: #b2bec3;
  --off-white: #f8f9fa;
  --soft-white: #fafbfc;
  
  /* Accents */
  --accent-red: #e17055;
  --accent-green: #00d2aa;
  --success-green: #00b894;
  
  /* Dégradés */
  --red-gradient: linear-gradient(135deg, var(--basque-red) 0%, var(--accent-red) 100%);
  --green-gradient: linear-gradient(135deg, var(--basque-green) 0%, var(--accent-green) 100%);
  --card-gradient: linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%);
}
```

---

## 📋 **CHECKLIST IMPLÉMENTATION**

### **✅ À Respecter**
- [ ] Utiliser les variables CSS fournies
- [ ] Respecter les contrastes d'accessibilité
- [ ] Appliquer les dégradés pour les éléments importants
- [ ] Utiliser le rouge pour les actions critiques
- [ ] Utiliser le vert pour les validations
- [ ] Maintenir la cohérence avec l'identité basque

### **❌ À Éviter**
- [ ] Mélanger trop de couleurs vives
- [ ] Utiliser des couleurs non définies dans la charte
- [ ] Ignorer les états hover/focus
- [ ] Créer des contrastes insuffisants

---

**📧 Contact** : Pour toute question sur cette charte graphique, contactez l'équipe design Herrika.

**🔄 Version** : 1.0 - Septembre 2024

**🎨 Basé sur** : Landing page Herrika officielle
