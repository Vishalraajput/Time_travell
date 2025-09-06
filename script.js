document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('time-travel-form');
    const yearInput = document.getElementById('yearInput');
    const messagesDiv = document.getElementById('messages');
    
    // --- UPDATED: Added a new final message for fetching data ---
    const messages = [
        "Charging the flux capacitor... with a potato.",
        "Calculating temporal paradox probabilities...",
        "Rerouting past a T-Rex traffic jam...",
        "Ignoring all safety warnings...",
        "Hold onto your socks!",
        "Fetching timeline data...", // New message before API call
    ];

    let currentInterval = null;

    // --- UPDATED: The main function is now async to handle API calls ---
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); 
        if (currentInterval) return;

        const year = yearInput.value.trim();

        if (year === '') {
            messagesDiv.textContent = 'Please enter a year! The timeline depends on it!';
            messagesDiv.style.color = 'var(--error-color)';
            return;
        }
        
        messagesDiv.style.color = 'var(--primary-text)';
        messagesDiv.textContent = ""; 
        
        let messageIndex = 0;

        // Using a promise to know when the message animation is done
        await new Promise(resolve => {
            const showNextMessage = () => {
                messagesDiv.classList.add('fade-out');
                
                setTimeout(() => {
                    if (messageIndex < messages.length) {
                        messagesDiv.textContent = messages[messageIndex];
                        messagesDiv.classList.remove('fade-out');
                        messageIndex++;
                    } else {
                        clearInterval(currentInterval);
                        currentInterval = null; 
                        resolve(); // Resolve the promise when messages are done
                    }
                }, 500);
            };

            showNextMessage();
            currentInterval = setInterval(showNextMessage, 2000);
        });

        // --- NEW: Fetch data from APIs after messages are shown ---
        try {
            // Promise.all lets us call both APIs at the same time for speed
            const [factResponse, jokeResponse] = await Promise.all([
                fetch(`http://numbersapi.com/${year}/year`),
                fetch('https://icanhazdadjoke.com/', {
                    headers: { 'Accept': 'application/json' }
                })
            ]);

            const yearFact = await factResponse.text();
            const jokeData = await jokeResponse.json();

            // Construct the final, dynamic message
            const finalMessage = `
                <p style="font-size: 1.1rem; margin-bottom: 10px;">${yearFact}</p>
                <p style="font-size: 0.9rem; font-style: italic;">...and a dad joke from this era: "${jokeData.joke}"</p>
            `;
            
            messagesDiv.style.color = 'var(--success-color)';
            messagesDiv.innerHTML = finalMessage; // Use innerHTML to render the paragraphs
            messagesDiv.classList.remove('fade-out');
            
            launchConfetti();

        } catch (error) {
            // This runs if the APIs fail for any reason
            console.error("Time travel circuits fried! Error:", error);
            messagesDiv.style.color = 'var(--error-color)';
            messagesDiv.textContent = `Whoops! We hit a time paradox and couldn't get data for ${year}.`;
            messagesDiv.classList.remove('fade-out');
        } finally {
             yearInput.value = ""; // Clear input regardless of success or failure
        }
    });

    // Confetti function remains the same
    function launchConfetti() {
        const confettiContainer = document.getElementById('confetti-container');
        const colors = ['#ff69b4', '#55efc4', '#ffeaa7', '#a29bfe', '#ffffff'];
        const confettiCount = 100;

        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.left = `${Math.random() * 100}vw`;
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = `${Math.random() * 10 + 5}px`;
            confetti.style.height = confetti.style.width;
            confetti.style.animationDelay = `${Math.random() * 2}s`;
            confettiContainer.appendChild(confetti);
            setTimeout(() => { confetti.remove(); }, 5000);
        }
    }
});