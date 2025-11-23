// Constants
const NO_PHRASES = [
    "No",
    "Are you sure?",
    "Really sure?",
    "Think again!",
    "Last chance!",
    "Surely not?",
    "You might regret this!",
    "Give it another thought!",
    "Are you absolutely certain?",
    "This could be a mistake!",
    "Have a heart!",
    "Don't be so cold!",
    "Change of heart?",
    "Wouldn't you reconsider?",
    "Is that your final answer?",
    "You're breaking my heart ;(",
];

const EMOJIS = {
    love: ['❤', '💖', '💕', '💗', '💓'],
    sad: ['💔', '😢', '🌧️', '🥺', '🥀'],
    celebration: ['💍', '🥂', '💒', '💖', '✨', '💑']
};

// State
let noCount = 0;
let isSuccess = false;

// Elements
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const questionScreen = document.getElementById('question-screen');
const successScreen = document.getElementById('success-screen');
const heartsContainer = document.getElementById('hearts-container');
const body = document.body;

// Functions

function getNoButtonText() {
    return NO_PHRASES[Math.min(noCount, NO_PHRASES.length - 1)];
}

function updateBackgroundAndHearts(mode) {
    // Update Background Color
    body.className = "min-h-screen flex flex-col items-center justify-center overflow-hidden selection:bg-rose-200 transition-colors duration-700 font-sans";
    
    if (mode === 'celebration') {
        body.classList.add('bg-gradient-to-br', 'from-pink-200', 'to-purple-200');
    } else if (mode === 'sad') {
        body.classList.add('bg-slate-200');
    } else {
        body.classList.add('bg-[#ffe4e6]');
    }

    // Render Hearts
    renderHearts(mode);
}

function renderHearts(mode) {
    heartsContainer.innerHTML = ''; // Clear existing hearts
    const emojiSet = EMOJIS[mode];
    const isSad = mode === 'sad';
    const animationClass = isSad ? 'animate-fall' : 'animate-fly';
    const colorClass = isSad ? ['text-blue-400', 'grayscale', 'opacity-80'] : ['text-valentine-300'];

    for (let i = 0; i < 35; i++) {
        const heart = document.createElement('div');
        heart.innerText = emojiSet[Math.floor(Math.random() * emojiSet.length)];
        
        // Base classes
        heart.classList.add('absolute', animationClass);
        if (isSad) {
            heart.classList.add(...colorClass);
        } else {
             heart.classList.add(...colorClass);
        }

        // Random styles
        const left = Math.random() * 100;
        const animDuration = Math.random() * 15 + 10;
        const delay = Math.random() * 20;
        const opacity = Math.random() * 0.5 + 0.3;
        const size = Math.random() * 20 + 10;

        heart.style.left = `${left}%`;
        heart.style.fontSize = `${size}px`;
        heart.style.animationDuration = `${animDuration}s`;
        heart.style.animationDelay = `-${delay}s`;
        heart.style.opacity = opacity;
        
        if (isSad) {
            heart.style.top = '-50px';
        } else {
            heart.style.bottom = '-50px';
        }

        heartsContainer.appendChild(heart);
    }
}

function triggerConfetti() {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min, max) => {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        
        confetti({
            ...defaults, 
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        });
        confetti({
            ...defaults, 
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        });
    }, 250);
}

// Event Listeners

noBtn.addEventListener('click', () => {
    noCount++;
    noBtn.innerText = getNoButtonText();
    
    // Increase Yes button size
    const newSize = (noCount * 20) + 16;
    yesBtn.style.fontSize = `${newSize}px`;

    // Change mood to sad
    updateBackgroundAndHearts('sad');
});

yesBtn.addEventListener('click', () => {
    isSuccess = true;
    
    // Hide Question, Show Success
    questionScreen.classList.add('hidden');
    successScreen.classList.remove('hidden');
    
    // Change mood to celebration
    updateBackgroundAndHearts('celebration');
    triggerConfetti();
});

// Initial Render
updateBackgroundAndHearts('love');
