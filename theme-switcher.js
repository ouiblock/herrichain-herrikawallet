// Theme Switcher - Dark/Light Mode
(function() {
  'use strict';
  
  // Fonction de validation sécurisée pour localStorage
  function getValidTheme() {
    const theme = localStorage.getItem('herrika-theme');
    const validThemes = ['dark', 'light'];
    return validThemes.includes(theme) ? theme : 'dark';
  }
  
  // Vérifier le thème sauvegardé ou utiliser dark par défaut
  const savedTheme = getValidTheme();
  
  // Appliquer le thème au chargement
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  // Fonction pour basculer le thème
  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('herrika-theme', newTheme);
    
    // Mettre à jour l'icône du bouton
    updateThemeButton(newTheme);
  }
  
  // Créer l'icône soleil (mode clair)
  function createSunIcon() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', '12');
    circle.setAttribute('cy', '12');
    circle.setAttribute('r', '5');
    svg.appendChild(circle);
    
    const lines = [
      {x1: '12', y1: '1', x2: '12', y2: '3'},
      {x1: '12', y1: '21', x2: '12', y2: '23'},
      {x1: '4.22', y1: '4.22', x2: '5.64', y2: '5.64'},
      {x1: '18.36', y1: '18.36', x2: '19.78', y2: '19.78'},
      {x1: '1', y1: '12', x2: '3', y2: '12'},
      {x1: '21', y1: '12', x2: '23', y2: '12'},
      {x1: '4.22', y1: '19.78', x2: '5.64', y2: '18.36'},
      {x1: '18.36', y1: '5.64', x2: '19.78', y2: '4.22'}
    ];
    
    lines.forEach(coords => {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', coords.x1);
      line.setAttribute('y1', coords.y1);
      line.setAttribute('x2', coords.x2);
      line.setAttribute('y2', coords.y2);
      svg.appendChild(line);
    });
    
    return svg;
  }
  
  // Créer l'icône lune (mode sombre)
  function createMoonIcon() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z');
    svg.appendChild(path);
    
    return svg;
  }
  
  // Mettre à jour l'icône du bouton
  function updateThemeButton(theme) {
    const button = document.getElementById('theme-toggle');
    if (!button) return;
    
    const icon = button.querySelector('.theme-icon');
    // Vider le contenu existant
    while (icon.firstChild) {
      icon.removeChild(icon.firstChild);
    }
    
    if (theme === 'dark') {
      icon.appendChild(createSunIcon());
      button.setAttribute('aria-label', 'Activer le mode clair');
      button.setAttribute('title', 'Mode clair');
    } else {
      icon.appendChild(createMoonIcon());
      button.setAttribute('aria-label', 'Activer le mode sombre');
      button.setAttribute('title', 'Mode sombre');
    }
  }
  
  // Initialiser le bouton au chargement du DOM
  document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('theme-toggle');
    if (button) {
      button.addEventListener('click', toggleTheme);
      updateThemeButton(savedTheme);
    }
  });
  
  // Exposer la fonction globalement pour les tests
  window.toggleTheme = toggleTheme;
})();
