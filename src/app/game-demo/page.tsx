'use client';

import React, { useState } from 'react';

const GameDemo: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState('all');

  const gameExamples = [
    {
      title: 'Simple Number Guessing Game',
      type: 'basic-javascript',
      code: `<div class="game-container">
  <h3>Number Guessing Game</h3>
  <p>I'm thinking of a number between 1 and 100!</p>
  <input type="number" id="guessInput" min="1" max="100" placeholder="Enter your guess">
  <button onclick="checkGuess()">Guess!</button>
  <div id="gameResult"></div>
  
  <script>
    let secretNumber = Math.floor(Math.random() * 100) + 1;
    let attempts = 0;
    
    function checkGuess() {
      const guess = parseInt(document.getElementById('guessInput').value);
      const result = document.getElementById('gameResult');
      attempts++;
      
      if (guess === secretNumber) {
        result.innerHTML = \`🎉 Congratulations! You found the number in \${attempts} attempts!\`;
        result.style.color = 'green';
      } else if (guess < secretNumber) {
        result.innerHTML = '📈 Too low! Try a higher number.';
        result.style.color = 'orange';
      } else {
        result.innerHTML = '📉 Too high! Try a lower number.';
        result.style.color = 'red';
      }
    }
  </script>
</div>`
    },
    {
      title: 'Canvas Drawing Game',
      type: 'canvas',
      code: `<div class="game-container">
  <h3>Canvas Drawing Game</h3>
  <p>Click and drag to draw on the canvas!</p>
  <canvas id="drawingCanvas" width="400" height="300" style="border: 2px solid #333; cursor: crosshair;"></canvas>
  <button onclick="clearCanvas()">Clear Canvas</button>
  
  <script>
    const canvas = document.getElementById('drawingCanvas');
    const ctx = canvas.getContext('2d');
    let isDrawing = false;
    
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    
    function startDrawing(e) {
      isDrawing = true;
      draw(e);
    }
    
    function draw(e) {
      if (!isDrawing) return;
      
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.strokeStyle = '#2563eb';
      
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
    
    function stopDrawing() {
      if (isDrawing) {
        isDrawing = false;
        ctx.beginPath();
      }
    }
    
    function clearCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  </script>
</div>`
    },
    {
      title: 'Memory Card Game',
      type: 'advanced-javascript',
      code: `<div class="game-container">
  <h3>Memory Card Game</h3>
  <p>Find all matching pairs!</p>
  <div id="gameBoard" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; max-width: 400px; margin: 0 auto;"></div>
  <div id="gameStats" style="margin-top: 20px; text-align: center;">
    <p>Moves: <span id="moveCount">0</span></p>
    <p>Matches: <span id="matchCount">0</span>/6</p>
  </div>
  
  <script>
    const symbols = ['🎮', '🎯', '🎲', '🎪', '🎨', '🎭'];
    const cards = [...symbols, ...symbols];
    let flippedCards = [];
    let matchedPairs = 0;
    let moves = 0;
    
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
    
    function createCard(symbol, index) {
      const card = document.createElement('div');
      card.className = 'memory-card';
      card.style.cssText = \`
        width: 80px;
        height: 80px;
        background: #6366f1;
        border: 2px solid #4338ca;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        cursor: pointer;
        transition: transform 0.3s;
      \`;
      card.dataset.symbol = symbol;
      card.dataset.index = index;
      card.textContent = '?';
      
      card.addEventListener('click', flipCard);
      return card;
    }
    
    function flipCard() {
      if (flippedCards.length >= 2) return;
      if (this.textContent !== '?') return;
      
      this.textContent = this.dataset.symbol;
      this.style.background = '#e0e7ff';
      flippedCards.push(this);
      
      if (flippedCards.length === 2) {
        moves++;
        document.getElementById('moveCount').textContent = moves;
        checkMatch();
      }
    }
    
    function checkMatch() {
      const [card1, card2] = flippedCards;
      
      if (card1.dataset.symbol === card2.dataset.symbol) {
        matchedPairs++;
        document.getElementById('matchCount').textContent = matchedPairs;
        flippedCards = [];
        
        if (matchedPairs === 6) {
          setTimeout(() => {
            alert(\`🎉 Congratulations! You won in \${moves} moves!\`);
          }, 500);
        }
      } else {
        setTimeout(() => {
          card1.textContent = '?';
          card1.style.background = '#6366f1';
          card2.textContent = '?';
          card2.style.background = '#6366f1';
          flippedCards = [];
        }, 1000);
      }
    }
    
    function initGame() {
      const gameBoard = document.getElementById('gameBoard');
      const shuffledCards = shuffleArray(cards);
      
      shuffledCards.forEach((symbol, index) => {
        gameBoard.appendChild(createCard(symbol, index));
      });
    }
    
    initGame();
  </script>
</div>`
    },
    {
      title: 'Reaction Time Game',
      type: 'timing',
      code: `<div class="game-container">
  <h3>Reaction Time Game</h3>
  <p>Click as fast as you can when the screen turns green!</p>
  <div id="gameArea" style="width: 400px; height: 200px; border: 3px solid #333; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: bold; cursor: pointer; background: #ef4444; color: white; margin: 0 auto;">
    Click to Start
  </div>
  <div id="results" style="margin-top: 20px; text-align: center;">
    <p>Your reaction time: <span id="reactionTime">-</span> ms</p>
    <p>Best time: <span id="bestTime">-</span> ms</p>
  </div>
  
  <script>
    const gameArea = document.getElementById('gameArea');
    const reactionTimeSpan = document.getElementById('reactionTime');
    const bestTimeSpan = document.getElementById('bestTime');
    
    let startTime;
    let timeout;
    let gameState = 'waiting';
    let bestTime = localStorage.getItem('bestReactionTime') || null;
    
    if (bestTime) {
      bestTimeSpan.textContent = bestTime;
    }
    
    gameArea.addEventListener('click', handleClick);
    
    function handleClick() {
      if (gameState === 'waiting') {
        startGame();
      } else if (gameState === 'ready') {
        recordReaction();
      } else if (gameState === 'tooSoon') {
        resetGame();
      }
    }
    
    function startGame() {
      gameState = 'waitingForGreen';
      gameArea.style.background = '#ef4444';
      gameArea.textContent = 'Wait for green...';
      
      const delay = Math.random() * 3000 + 2000; // 2-5 seconds
      
      timeout = setTimeout(() => {
        gameState = 'ready';
        gameArea.style.background = '#22c55e';
        gameArea.textContent = 'CLICK NOW!';
        startTime = Date.now();
      }, delay);
    }
    
    function recordReaction() {
      const reactionTime = Date.now() - startTime;
      reactionTimeSpan.textContent = reactionTime;
      
      if (!bestTime || reactionTime < parseInt(bestTime)) {
        bestTime = reactionTime;
        bestTimeSpan.textContent = bestTime;
        localStorage.setItem('bestReactionTime', bestTime);
        gameArea.textContent = \`New Best Time: \${reactionTime}ms!\`;
      } else {
        gameArea.textContent = \`\${reactionTime}ms - Click to try again\`;
      }
      
      gameState = 'finished';
    }
    
    function resetGame() {
      clearTimeout(timeout);
      gameState = 'waiting';
      gameArea.style.background = '#ef4444';
      gameArea.textContent = 'Too soon! Click to try again';
    }
    
    // Reset game when finished
    gameArea.addEventListener('click', () => {
      if (gameState === 'finished') {
        gameState = 'waiting';
        gameArea.style.background = '#ef4444';
        gameArea.textContent = 'Click to Start';
      }
    });
  </script>
</div>`
    }
  ];

  const filteredGames = selectedGame === 'all' 
    ? gameExamples 
    : gameExamples.filter(game => game.type === selectedGame);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">🎮 Universal Game Compatibility Demo</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Filter by Game Type:</h2>
        <div className="flex gap-4 flex-wrap">
          <button
            onClick={() => setSelectedGame('all')}
            className={`px-4 py-2 rounded-lg ${
              selectedGame === 'all' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            All Games
          </button>
          <button
            onClick={() => setSelectedGame('basic-javascript')}
            className={`px-4 py-2 rounded-lg ${
              selectedGame === 'basic-javascript' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Basic JavaScript
          </button>
          <button
            onClick={() => setSelectedGame('canvas')}
            className={`px-4 py-2 rounded-lg ${
              selectedGame === 'canvas' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Canvas Games
          </button>
          <button
            onClick={() => setSelectedGame('advanced-javascript')}
            className={`px-4 py-2 rounded-lg ${
              selectedGame === 'advanced-javascript' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Advanced JavaScript
          </button>
          <button
            onClick={() => setSelectedGame('timing')}
            className={`px-4 py-2 rounded-lg ${
              selectedGame === 'timing' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Timing Games
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {filteredGames.map((game, index) => (
          <div key={index} className="border rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-2">{game.title}</h2>
            <p className="text-gray-600 mb-4">Type: {game.type}</p>
            
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Game:</h3>
              <div 
                dangerouslySetInnerHTML={{ __html: game.code }}
                className="border rounded p-4 bg-gray-50"
              />
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Source Code:</h3>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                <code>{game.code}</code>
              </pre>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 p-6 bg-blue-50 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">🚀 Universal Game Framework Support</h2>
        <p className="mb-4">
          This system automatically detects and supports various game frameworks:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>🎮 <strong>Phaser.js</strong> - Popular 2D game framework</li>
          <li>🎨 <strong>Three.js</strong> - 3D graphics and WebGL</li>
          <li>🎯 <strong>p5.js</strong> - Creative coding and graphics</li>
          <li>⚡ <strong>Matter.js</strong> - 2D physics engine</li>
          <li>🎪 <strong>PixiJS</strong> - 2D rendering engine</li>
          <li>🌟 <strong>Babylon.js</strong> - 3D game engine</li>
          <li>🎲 <strong>Unity WebGL</strong> - Unity games</li>
          <li>🎭 <strong>Cocos2d</strong> - Mobile game framework</li>
        </ul>
        
        <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
          <p className="font-semibold text-yellow-800">
            💡 <strong>Pro Tip:</strong> Just add your game HTML/JavaScript to any blog post, 
            and it will automatically be detected and rendered with full functionality!
          </p>
        </div>
      </div>
    </div>
  );
};

export default GameDemo;