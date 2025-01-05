const typingElement = document.querySelector('.highlight');
const phrases = ["Software Engineer", "College Student", "Programmer", "Full-Stack Developer"];
let currentPhraseIndex = 0;
let typingSpeed = 100;
let deletingSpeed = 100;
let delayBetweenPhrases = 1000;

// Function to start typing a phrase
function typeText() {
    let currentPhrase = phrases[currentPhraseIndex];
    let charIndex = 0;

    // Type the current phrase
    const typeInterval = setInterval(() => {
        typingElement.textContent = currentPhrase.substring(0, charIndex); // Keep cursor stationary
        charIndex++;
        if (charIndex > currentPhrase.length) {
            clearInterval(typeInterval);
            setTimeout(deleteText, delayBetweenPhrases);
        }
    }, typingSpeed);
}

// Function to delete the current phrase
function deleteText() {
    let currentPhrase = phrases[currentPhraseIndex];
    let charIndex = currentPhrase.length;

    // Delete the current phrase
    const deleteInterval = setInterval(() => {
        typingElement.textContent = currentPhrase.substring(0, charIndex - 1); // Keep cursor stationary
        charIndex--;
        if (charIndex < 0) {
            clearInterval(deleteInterval);
            currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
            setTimeout(typeText, delayBetweenPhrases);
        }
    }, deletingSpeed);
}

// Start the typing animation initially
typeText();
(function () {
    emailjs.init("C08pkjRS-b9pL3pX0"); // Replace with your actual EmailJS User ID
})();

document.getElementById("contact-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = {
        from_name: document.getElementById("from_name").value,
        from_email: document.getElementById("from_email").value,
        from_subject: document.getElementById("from_subject").value,
        message: document.getElementById("message").value,
    };

    emailjs
        .send("service_uznlkvf", "template_0ppj8hp", formData) // Replace with actual IDs
        .then(
            function (response) {
                console.log("SUCCESS!", response.status, response.text);
                alert("Message sent successfully!");
            },
            function (error) {
                console.error("FAILED...", error);
                alert("Failed to send message. Please try again later.");
            }
        );
});
