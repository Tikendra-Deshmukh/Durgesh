const emojis = ['⭐', '🏆', '🎈', '🫧', '💖', '🍎', '🥭', '🪔', '🧨', '⚽', 
    '💰', '💎', '👑', '📚', '🕉️', '🎶', '🚩', '✏️', '🪶', '❄️', 
    '😎', '🤡', '🧊', '🔥', '🌼', '🎁', '☠️', '🐍', '🤫', '🤯'];

let emojiNames = Array.from({length: 30}, (_, i) => i + 1);
let emojiDict = {};
let currentSlide = 0;
let responses = [];
const totalSlides = 5; // Total number of slides

document.getElementById('startButton').addEventListener('click', startGame);

function startGame() {
shuffle(emojis);
shuffle(emojiNames);
emojiDict = Object.fromEntries(emojis.map((emoji, index) => [emoji, emojiNames[index]]));
currentSlide = 1;
responses = [];
document.getElementById('emojiDisplay').innerText = emojis.join(' ');
document.getElementById('responseContainer').classList.remove('hidden');
document.getElementById('result').classList.add('hidden');
askQuestion();
}

function askQuestion() {
const questionText = `Kya aapka emoji Slide ${currentSlide} me hai?`;
document.getElementById('question').innerText = questionText;
document.getElementById('emojiDisplay').innerText = `Slide ${currentSlide}: ${getSlideEmojis(currentSlide).join(' ')}`;
}

// Function to get emojis for a specific slide based on their secret name
function getSlideEmojis(slideIndex) {
return emojis.filter(emoji => emojiDict[emoji] === slideIndex);
}

// Attach event listeners to response buttons
document.querySelectorAll('.response-button').forEach(button => {
button.addEventListener('click', function() {
responses.push(this.getAttribute('data-response'));
currentSlide++;

if (currentSlide <= totalSlides) {
askQuestion();
} else {
showResult();
}
});
});

function showResult() {
const binaryResponse = responses.map(r => (r === 'yes' ? '1' : '0')).join('');
const decimalValue = parseInt(binaryResponse, 2);

if (decimalValue > 0 && decimalValue <= 30) {
const guessedEmoji = Object.keys(emojiDict).find(emoji => emojiDict[emoji] === decimalValue);
document.getElementById('result').innerText = `Aapne socha hua emoji hai: ${guessedEmoji}`;
} else {
document.getElementById('result').innerText = "Kuch galat hua, aapka emoji nahi mila.";
}

document.getElementById('responseContainer').classList.add('hidden');
document.getElementById('result').classList.remove('hidden');
}

// Utility function to shuffle an array
function shuffle(array) {
for (let i = array.length - 1; i > 0; i--) {
const j = Math.floor(Math.random() * (i + 1));
[array[i], array[j]] = [array[j], array[i]];
}
}