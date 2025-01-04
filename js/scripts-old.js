const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*[]/:_-";
const h1 = document.querySelector("h1");
const h2 = document.querySelector("h2");
const h3 = document.querySelector("h3");

// Store separate intervals for h1, h2, and h3
let intervalH1 = null;
let intervalH2 = null;
let intervalH3 = null;

// Helper function to animate text
function animateText_cycle(target, duration = 1500, intervalTime = 35) {
    let iteration = 0;
    let lastIndex = -1;

    const startTime = Date.now();
    const interval = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        const targetText = target.dataset.value;

        // Update target content based on iteration
        target.innerHTML = targetText.split("").map((letter, index) => {
            if (index < iteration) {
                // If the letter was just revealed, apply the "match" class
                if (index === lastIndex + 1) {
                    lastIndex = index;
                    return `<span class="match">${letter}</span>`;
                }
                return `<span>${letter}</span>`;
            }
            return `<span>${letters[Math.floor(Math.random() * letters.length)]}</span>`;
        }).join("");

        // If all letters are revealed, clear the interval
        if (iteration >= targetText.length) {
            clearInterval(interval);
        }

        // Increase iteration at the rate of time
        if (elapsedTime >= duration) {
            iteration += 1 / 5; // Adjust the rate of animation
        }
    }, intervalTime);

    return interval;  // Return the interval ID
}

// Start animations for h1, h2, and h3 on page load
window.onload = function () {
    intervalH1 = animateText(h1, 1500, 35);  // Start for h1
    intervalH2 = animateText(h2, 3000, 35);  // Start for h2
    intervalH3 = animateText(h3, 4500, 35);  // Start for h3
};

// Mouseover events to reset and restart animation on each element
h1.addEventListener('mouseover', () => {
    if (intervalH1) {
        clearInterval(intervalH1);  // Stop current animation for h1
    }
    intervalH1 = animateText(h1, 0, 35);  // Restart animation for h1
});


