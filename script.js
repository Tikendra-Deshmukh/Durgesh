const emojis = ['⭐', '🏆', '🎈', '🫧', '💖', '🍎', '🥭', '🪔', '🧨', '⚽', 
    '💰', '💎', '👑', '📚', '🕉️', '🎶', '🚩', '✏️', '🪶', '❄️', 
    '😎', '🤡', '🧊', '🔥', '🌼', '🎁', '☠️', '🐍', '🤫', '🤯'];

let currentSlide = 0;
let responses = [];
const totalSlides = 5; // Total number of slides

document.getElementById('startButton').addEventListener('click', startGame);

function startGame() {
shuffle(emojis);
currentSlide = 0;
responses = [];
document.getElementById('emojiDisplay').innerText = emojis.join(' ');
document.getElementById('responseContainer').classList.add('hidden');
document.getElementById('result').classList.add('hidden');
document.getElementById('startButton').classList.add('hidden');
askQuestion();
}

function askQuestion() {
if (currentSlide < totalSlides) {
const questionText = `Kya aapka emoji Slide ${currentSlide + 1} me hai?`;
document.getElementById('question').innerText = questionText;
document.getElementById('emojiDisplay').innerText = `Slide ${currentSlide + 1}: ${getSlideEmojis(currentSlide + 1).join(' ')}`;
document.getElementById('responseContainer').classList.remove('hidden');
} else {
showResult();
}
}

// Function to simulate which emojis are on which slide
function getSlideEmojis(slideIndex) {
// For demonstration, we can return a random subset of emojis
const slideEmojis = emojis.slice(0, 6); // Replace this with your logic for slides
return slideEmojis; 
}

// Attach event listeners to response buttons
document.querySelectorAll('.response-button').forEach(button => {
button.addEventListener('click', function() {
responses[currentSlide] = this.getAttribute('data-response');
currentSlide++;
document.getElementById('responseContainer').classList.add('hidden'); // Hide the response buttons
askQuestion(); // Ask the next question
});
});

function showResult() {
const binaryResponse = responses.map(r => (r === 'yes' ? '1' : '0')).join('');
const decimalValue = parseInt(binaryResponse, 2);

const guessedEmoji = emojis[decimalValue]; // Assume we have a straightforward mapping for demo purposes
if (guessedEmoji) {
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