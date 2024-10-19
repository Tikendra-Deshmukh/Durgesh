const emojis = ['⭐', '🏆', '🎈', '🫧', '💖', '🍎', '🥭', '🪔', '🧨', '⚽', '💰', '💎', '👑', '📚', '🕉️', '🎶', '🚩', '✏️', '🪶', '❄️', '😎', '🤡', '🧊', '🔥', '🌼', '🎁', '☠️', '🐍', '🤫', '🤯'];
const slides = ['A', 'B', 'C', 'D', 'E'];

let emojiBinaryMap = {};
emojis.forEach((emoji, index) => {
    const binary = (index + 1).toString(2).padStart(5, '0');  // Get the binary representation
    emojiBinaryMap[emoji] = binary;
});

let userResponses = [];
let currentSlideIndex = 0;
let currentSlideOrder = [];
let userChosenEmoji = null;

document.getElementById('start-game').addEventListener('click', () => {
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('emoji-selection').classList.remove('hidden');
    displayEmojiSelection();
});

document.getElementById('proceed').addEventListener('click', () => {
    document.getElementById('emoji-selection').classList.add('hidden');
    currentSlideOrder = slides.sort(() => Math.random() - 0.5);  // Randomize slide order
    currentSlideIndex = 0;
    userResponses = [];
    displayNextSlide();
});

document.getElementById('yes-btn').addEventListener('click', () => handleAnswer(true));
document.getElementById('no-btn').addEventListener('click', () => handleAnswer(false));
document.getElementById('restart').addEventListener('click', () => location.reload());

function displayEmojiSelection() {
    const emojiContainer = document.getElementById('emoji-container');
    emojiContainer.innerHTML = '';  // Clear previous emojis
    emojis.forEach(emoji => {
        const emojiElement = document.createElement('span');
        emojiElement.textContent = emoji;
        emojiContainer.appendChild(emojiElement);
    });
}

function displayNextSlide() {
    if (currentSlideIndex < currentSlideOrder.length) {
        const slideName = currentSlideOrder[currentSlideIndex];
        const emojiSet = getEmojisForSlide(slideName);
        document.getElementById('emoji-set').innerHTML = emojiSet.join(' ');
        document.getElementById('slide').classList.remove('hidden');
    } else {
        calculateGuessedEmoji();
        document.getElementById('slide').classList.add('hidden');
        document.getElementById('final-guess').classList.remove('hidden');
    }
}

function getEmojisForSlide(slideName) {
    const emojisForSlide = [];
    emojis.forEach(emoji => {
        const binary = emojiBinaryMap[emoji];
        const bitPosition = slides.indexOf(slideName);
        if (binary[bitPosition] === '1') {
            emojisForSlide.push(emoji);
        }
    });
    return emojisForSlide;
}

function handleAnswer(isPresent) {
    userResponses.push(isPresent);
    currentSlideIndex++;
    document.getElementById('slide').classList.add('hidden');
    displayNextSlide();
}

function calculateGuessedEmoji() {
    for (let emoji in emojiBinaryMap) {
        const binary = emojiBinaryMap[emoji].split('');
        let isMatch = true;
        for (let i = 0; i < userResponses.length; i++) {
            const expectedBit = userResponses[i] ? '1' : '0';
            if (binary[slides.length - 1 - i] !== expectedBit) {
                isMatch = false;
                break;
            }
        }
        if (isMatch) {
            userChosenEmoji = emoji;
            break;
        }
    }
    document.getElementById('guessed-emoji').textContent = userChosenEmoji;
}