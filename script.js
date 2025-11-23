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

const IMAGES = {
    ASKING: "https://gifdb.com/images/high/cute-love-bear-roses-ou7zho5oosxnpo6k.gif",
    SUCCESS: "https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif"
};

// State
let noCount = 0;
let currentMode = 'love';

// DOM Elements
const body = document.getElementById('app-body');
const heartsContainer = document.getElementById('hearts-container');
const questionScreen = document.getElementById('question-screen');
const successScreen = document.getElementById('success-screen');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const mainImage = document.getElementById('main-image');

// Functions

function getNoButtonText() {
    return NO_PHRASES[Math.min(noCount, NO_PHRASES.length - 1)];
}

function renderHearts(mode) {
    // Clear existing hearts
    heartsContainer.innerHTML = '';
    
    const emojiSet = EMOJIS[mode];
    const isSad = mode === 'sad';
    const animationClass = isSad ? 'animate-fall' : 'animate-fly';
    
    // Sad hearts are blue/grey/transparent, Love/Celebration are pink/red
    // We add these classes to the heart div
    const colorClasses = isSad 
        ? ['text-blue-400', 'grayscale', 'opacity-80'] 
        : ['text-valentine-300'];

    // Create 35 hearts
    for (let i = 0; i < 35; i++) {
        const heart = document.createElement('div');
        
        // Pick a random emoji from the set
        heart.innerText = emojiSet[Math.floor(Math.random() * emojiSet.length)];
        
        // Add base classes
        heart.classList.add('absolute', animationClass, 'pointer-events-none', 'z-0');
        // Add specific color classes
        colorClasses.forEach(cls => heart.classList.add(cls));

        // Randomize position and animation properties
        const left = Math.random() * 100;
        const animDuration = Math.random() * 15 + 10; // 10s to 25s
        const delay = Math.random() * 20;
        const opacity = Math.random() * 0.5 + 0.3;
        const size = Math.random() * 20 + 10;

        // Apply inline styles for randomness
        heart.style.left = `${left}%`;
        heart.style.fontSize = `${size}px`;
        heart.style.animationDuration = `${animDuration}s`;
        // Negative delay makes it start partially through the animation immediately
        heart.style.animationDelay = `-${delay}s`; 
        heart.style.opacity = opacity;
        
        // Sad falls from top, others fly from bottom
        if (isSad) {
            heart.style.top = '-50px';
        } else {
            heart.style.bottom = '-50px';
        }

        heartsContainer.appendChild(heart);
    }
}

function updateMood(mode) {
    if (currentMode === mode) return;
    currentMode = mode;

    // Remove existing background classes (keeping base classes)
    body.className = "min-h-screen flex flex-col items-center justify-center overflow-hidden selection:bg-rose-200 transition-colors duration-700 font-sans";

    // Add specific background classes
    if (mode === 'celebration') {
        body.classList.add('bg-gradient-to-br', 'from-pink-200', 'to-purple-200');
    } else if (mode === 'sad') {
        body.classList.add('bg-slate-200');
    } else {
        body.classList.add('bg-[#ffe4e6]');
    }

    renderHearts(mode);
}

function triggerConfetti() {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 50 };

    const randomInRange = (min, max) => {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        
        // Check if window.confetti is available (loaded via CDN)
        if (typeof window.confetti === 'function') {
            window.confetti({
                ...defaults, 
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
            });
            window.confetti({
                ...defaults, 
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
            });
        }
    }, 250);
}

// Event Listeners

noBtn.addEventListener('click', () => {
    noCount++;
    
    // Update No Button Text
    noBtn.innerText = getNoButtonText();
    
    // Grow Yes Button
    // Base size 16px, grows by 20px each click
    const newSize = (noCount * 20) + 16;
    yesBtn.style.fontSize = `${newSize}px`;

    // Change mood to sad
    updateMood('sad');
});

yesBtn.addEventListener('click', () => {
    // Hide Question, Show Success
    questionScreen.classList.add('hidden');
    
    successScreen.classList.remove('hidden');
    successScreen.classList.add('flex'); // Add flex back since hidden removed display property
    
    // Change mood to celebration
    updateMood('celebration');
    triggerConfetti();
});

// Initial Setup
// Preload images
const img1 = new Image();
img1.src = IMAGES.ASKING;
const img2 = new Image();
img2.src = IMAGES.SUCCESS;

// Start animation
renderHearts('love');