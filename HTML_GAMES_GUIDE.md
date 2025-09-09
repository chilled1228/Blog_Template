# HTML Games Integration Guide

## Overview
This blog template supports embedding interactive HTML games directly in blog posts. Games are rendered with proper JavaScript execution and responsive styling.

## Requirements

### Basic Structure
```html
<div class="game-container">
  <div class="game-header">
    <h3>Game Title</h3>
    <p>Game description or instructions</p>
  </div>
  
  <div class="game-content">
    <!-- Your game HTML here -->
    <canvas id="gameCanvas" width="400" height="300"></canvas>
    <!-- or other game elements -->
  </div>
  
  <script>
    // Your game JavaScript here
    // Will be automatically executed
  </script>
</div>
```

### Supported Elements
- **Canvas**: For drawing-based games
- **HTML5 elements**: Buttons, inputs, divs, etc.
- **CSS styling**: Inline styles and classes
- **JavaScript**: Full ES5/ES6 support with error handling

## JavaScript Guidelines

### ✅ Supported Features
- DOM manipulation
- Event listeners
- Canvas 2D context
- SetTimeout/SetInterval
- Local variables and functions
- Object creation and manipulation
- Array methods
- Math operations

### ⚠️ Important Notes
1. **Variable Scope**: Declare all variables with `var`, `let`, or `const`
2. **Function Declarations**: Use proper function syntax
3. **Event Handling**: Attach events after DOM elements exist
4. **Error Handling**: Games with syntax errors will be skipped
5. **H1 Tags**: Do NOT use `<h1>` tags in content - they will be automatically converted to `<h2>` and generate console warnings. Use `<h2>`, `<h3>`, etc. for proper SEO hierarchy (page already has one H1 title).

### ❌ Limitations
- No external script imports (use inline only)
- No localStorage persistence across page reloads
- No network requests (fetch/XMLHttpRequest)
- No access to React state or props

## Code Examples

### Simple Click Game
```html
<div class="game-container">
  <div class="game-header">
    <h3>Click Counter Game</h3>
    <p>Click the button as fast as you can!</p>
  </div>
  
  <div class="game-content">
    <button id="clickBtn">Click Me!</button>
    <p>Score: <span id="score">0</span></p>
    <p>Time: <span id="timer">10</span>s</p>
  </div>
  
  <script>
    let score = 0;
    let timeLeft = 10;
    const gameActive = true;
    
    const clickBtn = document.getElementById('clickBtn');
    const scoreElement = document.getElementById('score');
    const timerElement = document.getElementById('timer');
    
    clickBtn.addEventListener('click', function() {
      if (gameActive && timeLeft > 0) {
        score++;
        scoreElement.textContent = score;
      }
    });
    
    const countdown = setInterval(function() {
      timeLeft--;
      timerElement.textContent = timeLeft;
      
      if (timeLeft <= 0) {
        clearInterval(countdown);
        clickBtn.disabled = true;
        clickBtn.textContent = 'Game Over!';
      }
    }, 1000);
  </script>
</div>
```

### Canvas Drawing Game
```html
<div class="game-container">
  <div class="game-header">
    <h3>Drawing Pad</h3>
    <p>Click and drag to draw</p>
  </div>
  
  <div class="game-content">
    <canvas id="drawCanvas" width="400" height="300"></canvas>
    <br>
    <button onclick="clearCanvas()">Clear</button>
  </div>
  
  <script>
    const canvas = document.getElementById('drawCanvas');
    const ctx = canvas.getContext('2d');
    let isDrawing = false;
    
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    
    function startDrawing(e) {
      isDrawing = true;
      const rect = canvas.getBoundingClientRect();
      ctx.beginPath();
      ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    }
    
    function draw(e) {
      if (!isDrawing) return;
      const rect = canvas.getBoundingClientRect();
      ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
      ctx.stroke();
    }
    
    function stopDrawing() {
      isDrawing = false;
    }
    
    function clearCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  </script>
</div>
```

## Styling

### Game Container Classes
The template provides these CSS classes:

```css
.game-container {
  /* Responsive container with proper spacing */
}

.game-header {
  /* Styled header section */
}

.game-content {
  /* Main game area with responsive design */
}
```

### Responsive Design
- Games automatically adapt to mobile screens
- Canvas elements scale proportionally
- Touch events work on mobile devices

## Best Practices

### 1. Proper Heading Structure
Always start with `<h2>` for main headings in your content:
```html
<!-- Good - proper hierarchy -->
<div class="game-header">
  <h2>My Awesome Game</h2>
  <h3>Instructions</h3>
  <p>Game description...</p>
</div>

<!-- Avoid - causes console warnings -->
<div class="game-header">
  <h1>My Game</h1>  <!-- Converted to h2, generates warning -->
</div>
```

### 2. Unique IDs
Always use unique element IDs to avoid conflicts:
```javascript
// Good
const myGameButton = document.getElementById('myUniqueGameBtn');

// Avoid generic IDs that might conflict
const button = document.getElementById('button');
```

### 2. Error Handling
Wrap your game logic in try-catch blocks:
```javascript
try {
  // Your game code
} catch (error) {
  console.warn('Game error:', error);
}
```

### 3. Cleanup
Clean up intervals and event listeners if needed:
```javascript
// Store interval ID for cleanup
const gameInterval = setInterval(gameLoop, 16);

// Clean up when game ends
function endGame() {
  clearInterval(gameInterval);
}
```

### 4. Mobile Compatibility
Include touch event handling:
```javascript
// Mouse events
canvas.addEventListener('mousedown', handleStart);
canvas.addEventListener('mousemove', handleMove);

// Touch events for mobile
canvas.addEventListener('touchstart', handleStart);
canvas.addEventListener('touchmove', handleMove);
```

## Debugging

### Console Logging
The template automatically logs script processing:
- Check browser console for syntax errors
- Script content is logged for debugging
- Runtime errors are caught and logged

### Common Issues

1. **"Can't find variable"**: Variable not declared with var/let/const
2. **"Unexpected token"**: HTML entities not properly encoded
3. **Element not found**: DOM element accessed before creation
4. **Function not defined**: Function declared after being called

### Testing
Test your games in:
- Desktop browsers (Chrome, Firefox, Safari)
- Mobile devices (iOS Safari, Android Chrome)
- Different screen sizes

## Integration Steps

1. **Use the Admin Editor**: Click the "🎮 Game" button in the toolbar to insert a game template
2. **Customize the template**: Replace placeholder content with your game
3. **Test locally**: Ensure no syntax errors in the preview
4. **Use image uploads**: Click "📷 Image" to upload and insert images from R2 storage
5. **Preview**: Check game works in blog template
6. **Publish**: Games will auto-execute on page load

### Admin Editor Features

The blog admin panel includes a WordPress-like editor with:
- **Game Templates**: One-click insertion of game containers
- **Image Upload**: Direct upload to Cloudflare R2 with automatic URL insertion
- **Code Blocks**: Syntax-highlighted code insertion
- **HTML Formatting**: Bold, italic, links, headings
- **Live Preview**: Real-time character and word count

## Support

Games are processed by `BlogContentRenderer.tsx` with:
- Automatic script execution
- HTML entity decoding
- Error handling and logging
- Mobile-responsive styling

For issues, check browser console for detailed error messages and script content logs.