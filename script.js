document.addEventListener('DOMContentLoaded', () => {
    // Select the HTML elements once the page is loaded
    const form = document.getElementById('time-travel-form');
    const yearInput = document.getElementById('yearInput');
    const messagesDiv = document.getElementById('messages');

    // The sequence of messages to display
    const messages = [
        "Gathering Information...",
        "Searching For Portals...",
        "Contacting Loki...",
        "Portal Found...",
        "Opening portal...",
    ];

    let currentInterval = null; // To prevent multiple animations at once

    // This function runs when the form is submitted
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Stop the page from reloading

        // Don't start a new animation if one is already running
        if (currentInterval) {
            return;
        }

        const year = yearInput.value.trim();

        // Check if the input is empty
        if (year === '') {
            messagesDiv.textContent = 'Please enter a year to begin your journey.';
            messagesDiv.style.color = 'var(--shadow-color-inactive)';
            return;
        }
        
        // Reset styles and clear previous messages
        messagesDiv.style.color = 'var(--primary-text)';
        messagesDiv.textContent = ""; 
        
        let messageIndex = 0;

        // Use setInterval to show each message every 2 seconds (2000ms)
        currentInterval = setInterval(() => {
            if (messageIndex < messages.length) {
                // Display the next message in the sequence
                messagesDiv.textContent = messages[messageIndex];
                messageIndex++;
            } else {
                // End the animation once all messages are shown
                clearInterval(currentInterval);
                currentInterval = null; // Reset the interval tracker
                
                // Display the final message
                messagesDiv.textContent = `Arrived in  ${year}! But... wait... 26 me to duniya Khatam hai! 😂😂`;
                yearInput.value = ""; // Clear the input field for the next trip
            }
        }, 2000);
    });
});