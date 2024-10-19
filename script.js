// script.js

// Change text when button is clicked
document.getElementById('changeTextBtn').addEventListener('click', function() {
    const homeSection = document.querySelector('#home p');
    homeSection.textContent = 'You have clicked the button, and the text is now changed!';
  });
  
  // Form submission (this just logs the input values for now)
  document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting
  
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
  
    console.log(`Name: ${name}, Email: ${email}, Message: ${message}`);
    alert('Form submitted successfully!');
  });