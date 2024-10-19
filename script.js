const emojis = ['⭐', '🏆', '🎈', '🫧', '💖', '🍎', '🥭', '🪔', '🧨', '⚽', 
    '💰', '💎', '👑', '📚', '🕉️', '🎶', '🚩', '✏️', '🪶', '❄️', 
    '😎', '🤡', '🧊', '🔥', '🌼', '🎁', '☠️', '🐍', '🤫', '🤯'];

let emojiNames = Array.from({ length: 30 }, (_, i) => i + 1);
let emojiDict = {};
let currentSlide = 0;
let responses = [];
const totalSlides = 5; // Total number of slides (A, B, C, D, E)

document.getElementById('startButton').addEventListener('click', startGame);

function startGame() {
shuffle(emojis);
shuffle(emojiNames);
emojiDict = Object.fromEntries(emojis.map((emoji, index) => [emoji, emojiNames[index]]));
currentSlide = 0;
responses = [];
document.getElementById('emojiDisplay').innerText = emojis.join(' ');
document.getElementById('responseContainer').classList.add('hidden');
document.getElementById('result').classList.add('hidden');
document.getElementById('startButton').classList.add('hidden'); // Hide the start button
askQuestion();
}

function askQuestion() {
if (currentSlide < totalSlides) {
const questionText = `Kya aapka emoji Slide ${String.fromCharCode(65 + currentSlide)} me hai?`;
document.getElementById('question').innerText = questionText;

// Display emojis based on current slide's binary position
document.getElementById('emojiDisplay').innerText = `Slide ${String.fromCharCode(65 + currentSlide)}: ${getSlideEmojis(currentSlide).join(' ')}`;
document.getElementById('responseContainer').classList.remove('hidden');
} else {
showResult();
}
}

function getSlideEmojis(slideIndex) {
// Calculate which emojis should be present in this slide
const slideEmojis = [];
emojis.forEach((emoji, index) => {
const binaryValue = index +