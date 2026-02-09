/**
 * Happy Birthday - Interactive Script
 * Handles confetti, section transitions, candle blowing, and music
 */

// DOM Elements
const cakeWrapper = document.getElementById('cakeWrapper');
const startBtn = document.getElementById('startBtn');
const continueBtn = document.getElementById('continueBtn');
const candleWrapper = document.getElementById('candleWrapper');
const candleGif = document.getElementById('candleGif');
const wishMade = document.getElementById('wishMade');
const finalBtn = document.getElementById('finalBtn');
const restartBtn = document.getElementById('restartBtn');

// Background Music (No escape! 😈)
const bgMusic = document.getElementById('bgMusic');
let musicStarted = false;

// Sections
const heroSection = document.getElementById('hero');
const messageSection = document.getElementById('messages');
const wishSection = document.getElementById('wish');
const finalSection = document.getElementById('final');

// State
let candlesBlown = false;

// Start music on first interaction (browser requires user interaction)
function startMusic() {
    if (!musicStarted) {
        bgMusic.volume = 0.7;
        bgMusic.loop = true; // Force loop
        bgMusic.play().catch(() => {
            // Silently fail if blocked
        });
        musicStarted = true;

        // Fallback: restart if ended (belt and suspenders! 😈)
        bgMusic.addEventListener('ended', () => {
            bgMusic.currentTime = 0;
            bgMusic.play();
        });
    }
}

/**
 * Trigger confetti explosion
 * @param {Object} options - confetti options
 */
function fireConfetti(options = {}) {
    const defaults = {
        particleCount: 50,  // Reduced for mobile performance
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff6b9d', '#c084fc', '#fbbf24', '#fff', '#ff85c0']
    };

    confetti({ ...defaults, ...options });
}

/**
 * Fire confetti burst from both sides
 */
function fireSideConfetti() {
    // Left side
    confetti({
        particleCount: 25,  // Reduced for mobile
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff6b9d', '#c084fc', '#fbbf24']
    });

    // Right side
    confetti({
        particleCount: 25,  // Reduced for mobile
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff6b9d', '#c084fc', '#fbbf24']
    });
}

/**
 * Fire celebration confetti sequence
 */
function fireCelebration() {
    // Initial burst (reduced for mobile)
    fireConfetti({ particleCount: 80, spread: 100 });

    // Side bursts
    setTimeout(() => fireSideConfetti(), 300);
    setTimeout(() => fireSideConfetti(), 600);

    // Finale (reduced for mobile)
    setTimeout(() => {
        fireConfetti({
            particleCount: 100,
            spread: 160,
            startVelocity: 45,
            decay: 0.9
        });
    }, 900);
}

/**
 * Navigate to a section
 * @param {HTMLElement} targetSection - section to show
 */
function navigateToSection(targetSection) {
    // Hide all sections
    [heroSection, messageSection, wishSection, finalSection].forEach(section => {
        section.classList.add('hidden');
    });

    // Show target section
    targetSection.classList.remove('hidden');

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Reset all state for restart
 */
function resetAll() {
    candlesBlown = false;
    candleGif.classList.remove('blown');
    wishMade.classList.add('hidden');
    candleWrapper.style.display = 'block';

    // Reset message animations
    document.querySelectorAll('.message-card').forEach(card => {
        card.style.animation = 'none';
        card.offsetHeight; // Trigger reflow
        card.style.animation = null;
    });

    navigateToSection(heroSection);
}

// Event Listeners

// Cake tap - fire confetti
cakeWrapper.addEventListener('click', () => {
    fireConfetti({
        particleCount: 80,
        origin: { y: 0.5 }
    });
});

// Trolling button messages 😈
const trollMessages = [
    "เอ้า! กดใหม่สิ~ 😏",
    "ไม่ง่ายขนาดนั้น! 🤭",
    "หนีๆๆๆ! 🏃‍♂️",
    "มาจับเค้าสิ! 😜",
    "เกือบได้แล้ว! 😂",
    "พยายามอีกนิด! 💪",
    "ช้าอะ 🐢",
    "ฮ่าๆๆ ไม่โดน! 😝",
    "อีกนิดเดียว! 🎯",
    "ยังไม่ถึง 10 เลย! 🔟",
    "กดต่อไป~ 👆",
    "เหนื่อยยัง? 😴",
    "สู้ๆนะ! 💖",
    "อย่าเพิ่งยอมแพ้! 🥊",
    "เก่งมาก! แต่ยังไม่พออ 😈",
    "ครึ่งทางแล้ว! รึเปล่านนะ? 🌈",
    "กดเร็วกว่านี้สิ! ⚡",
    "นิ้วไม่เมื่อยเหรอ? 🤔",
    "ตั้งใจดีนะ! เก่งๆ🎀",
    "20 แล้ว! เก่งมาก! 🏆",
    "อีก 10 ครั้ง รึเปล่านนะ? 😜",
    "หมดแรงยัง? 😂",
    "กดๆๆๆ! 🔥",
    "เร็วๆ! ⏰",
    "ใกล้แล้ว! 🌟",
    "อย่าหยุด! 🚀",
    "มาเลย! 💨",
    "อีกนิดเดียวจริงๆ! 🎊",
    "ไหวไหมเนี่ยไอเด็กเปรี้ยว 🎁",
    "อ่ะๆๆๆ สุดท้ายแล้วจริงๆ! 🎉"
];

let trollClickCount = 0;
const TROLL_MAX = 30;

// Start button - TROLL MODE! 😈
startBtn.addEventListener('click', (e) => {
    startMusic(); // Music starts immediately!
    trollClickCount++;

    if (trollClickCount >= TROLL_MAX) {
        // Finally let them through after 10 clicks
        startBtn.style.position = '';
        startBtn.style.left = '';
        startBtn.style.top = '';
        startBtn.textContent = 'ไปเลย! 🎉';
        fireConfetti({ particleCount: 150, spread: 100 });
        setTimeout(() => {
            navigateToSection(messageSection);
        }, 500);
        return;
    }

    // Teleport button to random position!
    const maxX = window.innerWidth - startBtn.offsetWidth - 20;
    const maxY = window.innerHeight - startBtn.offsetHeight - 20;
    const randomX = Math.floor(Math.random() * maxX) + 10;
    const randomY = Math.floor(Math.random() * maxY) + 10;

    startBtn.style.position = 'fixed';
    startBtn.style.left = randomX + 'px';
    startBtn.style.top = randomY + 'px';
    startBtn.style.zIndex = '9999';

    // Change text to teasing message
    startBtn.textContent = trollMessages[trollClickCount - 1];

    // Small confetti on each click
    fireConfetti({
        particleCount: 20,
        spread: 40,
        origin: { x: (randomX + startBtn.offsetWidth / 2) / window.innerWidth, y: (randomY + startBtn.offsetHeight / 2) / window.innerHeight }
    });
});

// Continue button
continueBtn.addEventListener('click', () => {
    navigateToSection(wishSection);
});

// Candle blow
candleWrapper.addEventListener('click', () => {
    if (candlesBlown) return;

    candlesBlown = true;
    candleGif.classList.add('blown');

    // Fire celebration
    setTimeout(() => {
        fireCelebration();
        candleWrapper.style.display = 'none';
        wishMade.classList.remove('hidden');
    }, 500);
});

// Final button
finalBtn.addEventListener('click', () => {
    navigateToSection(finalSection);

    // Delayed celebration confetti
    setTimeout(() => {
        fireSideConfetti();
    }, 500);
});

// Restart button
restartBtn.addEventListener('click', resetAll);

// Initial confetti on page load
window.addEventListener('load', () => {
    setTimeout(() => {
        fireConfetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.3 }
        });
    }, 500);
});

// Add touch feedback for mobile
document.querySelectorAll('.scroll-btn, .restart-btn').forEach(btn => {
    btn.addEventListener('touchstart', () => {
        btn.style.transform = 'scale(0.95)';
    });

    btn.addEventListener('touchend', () => {
        btn.style.transform = '';
    });
});
