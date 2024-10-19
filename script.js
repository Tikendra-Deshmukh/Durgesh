const emojis = ['⭐', '🏆', '🎈', '🫧', '💖', '🍎', '🥭', '🪔', '🧨', '⚽', '💰', '💎', '👑', '📚', '🕉️', '🎶', '🚩', '✏️', '🪶', '❄️', '😎', '🤡', '🧊', '🔥', '🌼', '🎁', '☠️', '🐍', '🤫', '🤯'];

const slides = ['A', 'B', 'C', 'D', 'E'];

// Assign random numbers and create binary mapping for slides
const emojiMapping = {};
emojis.forEach((emoji, index) => {
    const randomName = index + 1; // Random number from 1 to 30
    const binary = randomName.toString(2).padStart(5, '0'); // Convert to binary
    emojiMapping[emoji] = binary; // Map emoji to binary
});

let chosenEmoji;
let currentSlideIndex = 0;
let currentSlideOrder = [];
let chosenEmojiPresent = false; // Track if chosen emoji was present

// Function to start the game
function startGame() {
    document.getElementById('emoji-container').innerHTML = emojis.join(' ');
    chosenEmoji = prompt("Think of one emoji from the displayed emojis!");
    currentSlideOrder = slides.sort(() => Math.random() - 0.5); // Shuffle slide order
    currentSlideIndex = 0;
    chosenEmojiPresent = false; // Reset presence check
    document.getElementById('slide').style.display = 'none';
    document.getElementById('response-container').style.display = 'none';
    document.getElementById('start-game').disabled = true;
    nextSlide();
}

// Function to show the next slide
function nextSlide() {
    if (currentSlideIndex < currentSlideOrder.length) {
        const slideName = currentSlideOrder[currentSlideIndex];
        const slideEmojis = getEmojisForSlide(slideName);

        // Check if the chosen emoji is present in the current slide
        if (slideEmojis.includes(chosenEmoji)) {
            chosenEmojiPresent = true; // Mark it as present
        }

        document.getElementById('slide').innerText = `Slide ${slideName}: ${slideEmojis.join(' ')}`;
        document.getElementById('slide').style.display = 'block';
        document.getElementById('response-container').style.display = 'none';
        currentSlideIndex++;
    } else {
        // Display the final guessing message
        document.getElementById('slide').innerText = `The emoji you chose in your mind is: ${chosenEmoji}!`;
        document.getElementById('response-container').style.display = 'none';
        document.getElementById('start-game').disabled = false;
    }
}

// Function to get emojis for the current slide based on binary values
function getEmojisForSlide(slideName) {
    const emojisInSlide = [];
    Object.entries(emojiMapping).forEach(([emoji, binary]) => {
        const slideBit = slides.indexOf(slideName);
        if (binary[binary.length - 1 - slideBit] === '1') { // Check the relevant bit
            emojisInSlide.push(emoji);
        }
    });
    return emojisInSlide;
}

// Event listeners
document.getElementById('start-game').addEventListener('click', startGame);
document.getElementById('next-slide').addEventListener('click', nextSlide);