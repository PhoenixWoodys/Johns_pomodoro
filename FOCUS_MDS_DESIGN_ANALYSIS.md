# Analyse du Design : Focus by MDS

## 📍 Localisation de l'extension
**Path:** `/Users/jdeniel/Documents/Cognitive_Science/Johns_Pomodoro/focus-mds-extension/`

---

## 🎨 Éléments Clés du Design

### 1. **Typographie**
- **Police principale:** `Poppins` (Google Fonts)
  ```css
  font-family: 'Poppins', sans-serif;
  font-weights: 400, 700
  ```
- **Votre version actuelle:** `Nunito Sans`
- **Recommandation:** Envisager Poppins pour plus de fidélité au design original

### 2. **Couleurs & Thème**
```css
/* Focus MDS */
background-color: #000          /* Noir pur */
color: #fff                     /* Blanc pur */
border: 1px solid #fff          /* Bordures blanches */

/* Contraste avec votre version */
--bg-primary: #0a0a0a          /* Légèrement plus clair */
--text-primary: #ffffff
--border-color: #2a2a2a        /* Bordure plus subtile */
```

### 3. **Effet Glassmorphism**
Focus MDS utilise intensivement le glassmorphism :
```css
.glassCard {
  backdrop-filter: blur(13px);
  -webkit-backdrop-filter: blur(13px);
  background: rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 10px;
}
```

**Impact visuel:** Transparence + flou d'arrière-plan

### 4. **Timer Display**
```css
.timeDisplay {
  font-family: poppins;
  font-size: 150px;
  text-align: center;
  caret-color: transparent;
}

.timers h1 {
  font-size: 50px;
  letter-spacing: 5px;
  text-transform: uppercase;
}
```

**Votre version:** 4rem (64px) → Beaucoup plus petit
**Recommandation:** Augmenter à ~100-150px pour impact visuel

### 5. **Cards & Containers**
```css
/* Focus MDS - Minimaliste */
.todoItems {
  background-color: #000;
  border: 1px solid #fff;
  border-radius: initial;        /* Pas de border-radius */
  padding: 20px;
  min-height: 300px;
  width: 300px;
}

/* Votre version - Plus moderne */
.task-card {
  background: var(--bg-card);
  border-radius: 16px;           /* Coins arrondis */
  padding: 1.5rem;
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-sm);
}
```

### 6. **Buttons**
```css
/* Focus MDS - Style simple */
.todoForm button {
  background-color: #fff;
  border: 1px solid #fff;
  color: #000;
  padding: 10px;
  border-radius: 4px;            /* Léger arrondi */
}

/* Votre version - Plus élaboré */
.btn-primary {
  padding: 1rem 2.5rem;
  border-radius: 12px;
  box-shadow: effects;
}
```

### 7. **Sidebar**
```css
.sidebar {
  background-color: #000;
  border: 1px solid #fff;
  border-radius: 20px;
  height: 95vh;
  width: 300px;
  position: fixed;
  right: 0;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.sidebar.show {
  opacity: 1;
  transform: translateX(-5%);
  z-index: 2000;
}
```

**Animation:** Fade in/out + légère translation

### 8. **Inputs**
```css
.todoForm input {
  border: 1px solid #fff;
  border-radius: 4px;
  color: #fff;
  padding: 10px;
}

/* Placeholders blancs */
::-webkit-input-placeholder {
  color: #fff;
  opacity: 1;
}
```

### 9. **Scrollbar Styling**
```css
.main::-webkit-scrollbar,
body::-webkit-scrollbar {
  display: none;           /* Masque les scrollbars */
}
```

### 10. **Navigation Tabs**
```css
.timerTab {
  color: #fff;
  cursor: pointer;
  letter-spacing: 1px;
  padding: 3px 5px;
  text-transform: uppercase;
  transition: background-color 0.3s ease-in-out;
}

.activeTimer {
  background-color: #fff;
  border-radius: 100px;
  color: #000;
  padding: 0 10px;
}
```

**Style:** Pills avec fond blanc pour l'état actif

---

## 🖼️ Wallpapers Inclus
L'extension inclut 15 fonds d'écran haute qualité :
- `wallpaper1.jpg` à `wallpaper15.jpg` (taille complète)
- `wallpaper1t.jpg` à `wallpaper15t.jpg` (thumbnails)

**Tailles:** ~400KB - 1MB par image

---

## 📊 Comparaison Design

| Élément | Focus MDS | Votre Version | Recommandation |
|---------|-----------|---------------|----------------|
| **Contraste** | Maximum (noir/blanc pur) | Nuancé (greys) | ✅ Garder votre version (meilleure lisibilité) |
| **Border-radius** | Minimal (4px, 10px) | Généreux (12-24px) | ⚖️ Réduire légèrement (8-16px) |
| **Timer size** | XXL (150px) | L (64px) | ⬆️ Augmenter à 100-120px |
| **Typography** | Poppins | Nunito Sans | ⚖️ Tester Poppins |
| **Glassmorphism** | Oui (heavy blur) | Non | ➕ Ajouter sur modals/overlays |
| **Shadows** | Aucune | Multiples | ⚖️ Réduire légèrement |
| **Animation** | Fade + translate | Scale + fade | ✅ Garder votre version |

---

## 🎯 Améliorations Prioritaires

### 1. **Ajouter Glassmorphism** ⭐⭐⭐
```css
.settings-overlay,
.stats-modal {
  backdrop-filter: blur(13px);
  -webkit-backdrop-filter: blur(13px);
}
```

### 2. **Augmenter Taille Timer** ⭐⭐⭐
```css
.timer-display {
  font-size: 6rem;  /* 96px au lieu de 64px */
}
```

### 3. **Simplifier Border-radius** ⭐⭐
```css
.task-card {
  border-radius: 10px;  /* au lieu de 16px */
}
.timer-card {
  border-radius: 16px;  /* au lieu de 24px */
}
```

### 4. **Mode Tabs Style Pills** ⭐⭐
```css
.mode-tab.active {
  border-radius: 100px;  /* pills au lieu de 8px */
}
```

### 5. **Tester Police Poppins** ⭐
```html
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap">
```

---

## 📁 Fichiers à Explorer
- **CSS:** `focus-mds-extension/static/css/main.a5c101f8.css`
- **Wallpapers:** `focus-mds-extension/wallpaper*.jpg`
- **Sounds:** `focus-mds-extension/notification.mp3`

---

## 💡 Notes
- Focus MDS est minimaliste et brutal (noir/blanc pur)
- Votre version est plus raffinée avec nuances et ombres
- **Meilleure approche:** Mélanger les deux styles
  - Garder vos nuances/shadows (meilleure UX)
  - Ajouter leur glassmorphism (effet premium)
  - Augmenter taille timer (impact visuel)
  - Simplifier border-radius (plus clean)
