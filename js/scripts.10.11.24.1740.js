// Store the links in an object
const links = {
    artist_one_social: "https://soundcloud.com/nathaniel_pavel",
    artist_two_social: "https://soundcloud.com/mikeext",
    artist_three_social: "https://soundcloud.com/",
    // artist_one_sound: "https://soundcloud.com/keefemusic",
    // artist_two_sound: "https://soundcloud.com/nathaniel_pavel",
    // artist_three_sound: "https://soundcloud.com/mikeext",
    location_link: "https://californiaclipper.com/",
    calendar_link: "https://ra.co/events/2078452",
    ra_link: "https://ra.co/events/2078452",
    instagram_link: "https://www.instagram.com/"
};

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*[]/:_-";
const h1 = document.querySelector("h1");
const h2 = document.querySelector("h2");
const h3 = document.querySelector("h3");

// Store separate intervals for h1, h2, and h3
let intervalH1 = null;
let intervalH2 = null;
let intervalH3 = null;


// Find all links with the class 'link' and dynamically set href from links object
document.querySelectorAll('.link').forEach(function(anchor) {
    // Get the URL reference from the data-url attribute
    const urlKey = anchor.getAttribute('data-url');
  
    // Set the href of the link dynamically using the links object
    if (links[urlKey]) {
      anchor.href = links[urlKey];
    }
});

// original cycle effect
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

// fade effect
function animateText_fade(target, duration = 100, maxDelay = 3000) {  // Added maxDelay parameter
    const targetText = target.dataset.value;
    
    target.innerHTML = targetText.split("").map((char, index) => {
        const directions = ['top', 'bottom', 'left', 'right'];
        const direction = directions[Math.floor(Math.random() * directions.length)];
        
        if (char === " ") {
            return `<span class="letter space">&nbsp;</span>`;
        }
        // Create a more spread out delay
        const delay = Math.random() * maxDelay;
        return `<span class="letter" style="--delay: ${delay}ms; --direction: ${direction}">${char}</span>`;
    }).join("");
}

// Glitch Effect
function animateText_glitch(target, duration = 1500, maxDelay = 3000) {
    const targetText = target.dataset.value;
    
    target.innerHTML = targetText.split("").map((char, index) => {
        if (char === " ") {
            return `<span class="space">&nbsp;</span>`;
        }
        const delay = Math.random() * maxDelay;
        return `<span class="glitch" style="--delay: ${delay}ms">${char}</span>`;
    }).join("");
}


function animateText_vhs(target, startDelay = 0) {
    const targetText = target.dataset.value;
    
    target.innerHTML = targetText.split("").map((char) => {
        if (char === " ") {
            return " ";
        }
        return `<span class="vhs" style="animation-delay: ${startDelay}ms">${char}</span>`;
    }).join("");
}


// Start animations for all h1, h2, and h3 elements on page load
window.onload = function () {
    const h1Elements = document.querySelectorAll("h1");
    h1Elements.forEach((h1) => {
        animateText_vhs(h1, 250);
        restartAnimationOnHover(h1);  // Add hover effect to h1s
    });

    const h2Elements = document.querySelectorAll("h2");
    h2Elements.forEach((h2) => {
        animateText_vhs(h2, 500);
        restartAnimationOnHover(h2);  // Add hover effect to h2s
    });

    const h3Elements = document.querySelectorAll("h3");
    h3Elements.forEach((h3) => {
        animateText_vhs(h3, 500);
        restartAnimationOnHover(h3);  // Add hover effect to h3s
    });
};


// Simplified restart animation function
function restartAnimationOnHover(element) {
    element.addEventListener('mouseleave', () => {
        animateText_vhs(element, 0);
    });
}
  