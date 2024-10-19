const emojis = ['⭐', '🏆', '🎈', '🫧', '💖', '🍎', '🥭', '🪔', '🧨', '⚽', 
    '💰', '💎', '👑', '📚', '🕉️', '🎶', '🚩', '✏️', '🪶', '❄️', 
    '😎', '🤡', '🧊', '🔥', '🌼', '🎁', '☠️', '🐍', '🤫', '🤯'];

let currentSlide = 0;
let responses = [];
const totalSlides = 5; // Total number of slides (A, B, C, D, E)

document.getElementById('startButton').addEventListener('click', startGame);

function startGame() {
currentSlide = 0;
responses = [];
document.getElementById('emojiDisplay').innerText = emojis.join(' ');
document.getElementById('responseContainer').classList.add('hidden');
document.getElementById('result').classList.add('hidden');
document.getElementById('startButton').classList.add('hidden'); // Hide the start button
document.getElementById('gameContainer').classList.remove('hidden'); // Show the game container
askQuestion();
}

function askQuestion() {
if (currentSlide < totalSlides) {
const questionText = `Kya aapka emoji Slide ${String.fromCharCode(65 + currentSlide)} me hai?`;
document.getElementById('question').innerText = questionText;

// Display emojis based on the current slide
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
const binaryValue = index + 1; // 1 to 30
const bit = (binaryValue >> slideIndex) & 1; // Get the bit corresponding to the slide index
if (bit === 1) {
slideEmojis.push(emoji);
}
});
return slideEmojis;
}

// Attach event listeners to response buttons
document.querySelectorAll('.response-button').forEach(button => {
button.addEventListener('click', function () {
responses[currentSlide] = this.getAttribute('data-response');
currentSlide++;
document.getElementById('responseContainer').classList.add('hidden'); // Hide the response buttons
askQuestion(); // Ask the next question
});
});

function showResult() {
const binaryResponse = responses.map(r => (r === 'yes' ? '1' : '0')).join('');
const decimalValue = parseInt(binaryResponse, 2);

// Display the guessed emoji based on the binary response
const guessedEmoji = emojis[decimalValue - 1] || "Emoji not found"; // Subtract 1 for zero-based index
document.getElementById('result').innerText = `Aapne socha hua emoji hai: ${guessedEmoji}`;

document.getElementById('responseContainer').classList.add('hidden');
document.getElementById('result').classList.remove('hidden');
document.getElementById('startButton').classList.remove('hidden'); // Show the start button again
document.getElementById('gameContainer').classList.add('hidden'); // Hide game container
}

// Utility function to shuffle an array
function shuffle(array) {
for (let i = array.length - 1; i > 0; i--) {
const j = Math.floor(Math.random() * (i + 1));
[array[i], array[j]] = [array[j], array[i]];
}
}