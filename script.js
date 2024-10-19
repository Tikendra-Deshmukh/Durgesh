const emojis = ['⭐', '🏆', '🎈', '🫧', '💖', '🍎', '🥭', '🪔', '🧨', '⚽', '💰', '💎', '👑', '📚', '🕉️', '🎶', '🚩', '✏️', '🪶', '❄️', '😎', '🤡', '🧊', '🔥', '🌼', '🎁', '☠️', '🐍', '🤫', '🤯'];

const slides = ['A', 'B', 'C', 'D', 'E'];

const emojiMapping = {};
emojis.forEach((emoji, index) => {
    const randomName = index + 1; // Random number from 1 to 30
    const binary = randomName.toString(2).padStart(5, '0'); // Convert to binary
    emojiMapping[emoji] = binary; // Map emoji to binary
});

let chosenEmoji;
let currentSlideIndex = 0;
let currentSlideOrder = [];
let chosenEmojiPresent = false;
let answers = [];

// Function to start the game
function startGame() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('emoji-selection').style.display = 'block';
    document.getElementById('emoji-container').innerHTML = emojis.join(' ');
    currentSlideOrder = slides.sort(() => Math.random() - 0.5); // Shuffle slide order
    currentSlideIndex = 0;
    chosenEmojiPresent = false;
    answers = [];
}

// Function to show the next slide with emojis and ask the question
function nextSlide() {
    if (currentSlideIndex < currentSlideOrder.length) {
        const slideName = currentSlideOrder[currentSlideIndex];
        const slideEmojis = getEmojisForSlide(slideName);
        document.getElementById('emoji-set').innerText = slideEmojis.join(' ');
        document.getElementById('slide').style.display = 'block';
    } else {
        // After all slides, show the final guess based on user answers
        const guessedEmoji = calculateEmojiFromAnswers();
        document.getElementById('chosen-emoji').innerText = guessedEmoji;
        document.getElementById('final-guess').style.display = 'block';
        document.getElementById('slide').style.display = 'none';
    }
}

// Function to get emojis for the current slide based on binary values
function getEmojisForSlide(slideName) {
    const emojisInSlide = [];
    Object.entries(emojiMapping).forEach(([emoji, binary]) => {
        const slideBit = slides.indexOf(slideName);
        if (binary[binary.length - 1 - slideBit] === '1') {
            emojisInSlide.push(emoji);
        }
    });
    return emojisInSlide;
}

// Function to record the user's response and move to the next slide
function handleAnswer(isPresent) {
    answers.push(isPresent);
    currentSlideIndex++;
    nextSlide();
}

// Function to calculate the guessed emoji based on user answers
function calculateEmojiFromAnswers() {
    let guessedEmoji = null;
    Object.entries(emojiMapping).forEach(([emoji, binary]) => {
        const binaryArray = binary.split('');
        const matches = binaryArray.every((bit, index) => {
            if (index < answers.length) {
                return bit === (answers[index] ? '1' : '0');
            }
            return true;
        });
        if (matches) {
            guessedEmoji = emoji;
        }
    });
    return guessedEmoji;
}

// Event listeners
document.getElementById('start-game').addEventListener('click', startGame);
document.getElementById('start-quiz').addEventListener('click', nextSlide);
document.getElementById('yes-btn').addEventListener('click', () => handleAnswer(true));
document.getElementById('no-btn').addEventListener('click', () => handleAnswer(false));