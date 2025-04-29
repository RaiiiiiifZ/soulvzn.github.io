function getParisDate() {
    const now = new Date();
    const parts = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/Paris',
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
    }).formatToParts(now).reduce((acc, part) => {
        if (part.type !== 'literal') acc[part.type] = part.value;
        return acc;
    }, {});
    return new Date(
        parseInt(parts.year), parseInt(parts.month) - 1, parseInt(parts.day),
        parseInt(parts.hour), parseInt(parts.minute), parseInt(parts.second)
    );
}

function updateDateTime() {
    const nowParis = getParisDate();
    document.getElementById('current-date').innerText = nowParis.toLocaleDateString('en-US', {
        timeZone: 'Europe/Paris',
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    });
    document.getElementById('current-time').innerText = nowParis.toLocaleTimeString('en-US', {
        timeZone: 'Europe/Paris',
        hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
}

function updateCountdown() {
    const nowParis = getParisDate();
    let nextUpdate = new Date(nowParis);

    if (nowParis.getHours() < 12) {
        nextUpdate.setHours(12, 0, 0, 0);
    } else {
        nextUpdate.setDate(nextUpdate.getDate() + 1);
        nextUpdate.setHours(0, 0, 0, 0);
    }

    const timeRemaining = nextUpdate - nowParis;
    if (timeRemaining > 0) {
        const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
        document.getElementById('countdown').innerText =
            `Next update in: ${hours}h ${minutes}m ${seconds}s`;
    } else {
        fetchCitation();
    }
}

function updateGreeting() {
    const nowParis = getParisDate();
    const hours = nowParis.getHours();
    let greeting = "Hello";
    if (hours >= 6 && hours < 12) greeting = "Good Morning";
    else if (hours >= 12 && hours < 18) greeting = "Good Afternoon";
    else if (hours >= 18 && hours < 22) greeting = "Good Evening";
    else greeting = "Good Night";
    const name = localStorage.getItem('username') || "Guest";
    document.getElementById('greeting').innerHTML =
        `${greeting}, <span style="color:#e94560">${name}</span>`;
}

function saveName() {
    const nameInput = document.getElementById('name-input').value.trim();
    if (nameInput) {
        localStorage.setItem('username', nameInput);
        document.getElementById('name-prompt').classList.add('hidden');
        updateGreeting();
        fetchCitation();
        updateDateTime();
        updateCountdown();
    }
}

function checkName() {
    const name = localStorage.getItem('username');
    if (!name) {
        document.getElementById('name-prompt').classList.remove('hidden');
        return false;
    }
    document.getElementById('name-prompt').classList.add('hidden');
    return true;
}

async function fetchCitation() {
    try {
        const response = await fetch('citations.txt');
        if (!response.ok) throw new Error('Citations file not found.');
        const text = await response.text();
        const citations = text.split('\n').filter(citation => citation.trim() !== '');
        if (citations.length === 0) throw new Error('No citations available in the file.');

        const nowParis = getParisDate();
        const day = nowParis.getFullYear() * 10000 + (nowParis.getMonth() + 1) * 100 + nowParis.getDate();
        const period = nowParis.getHours() < 12 ? 0 : 1;
        const periodIndex = (day * 2 + period) % citations.length;
        const [quote, author] = citations[periodIndex].split('|');
        document.getElementById('citation').innerText = quote || "Citation not available";
        document.getElementById('author').innerText = author ? `- ${author}` : "";
    } catch (error) {
        document.getElementById('citation').innerText = error.message;
        document.getElementById('author').innerText = "";
    }
}

// Animation d’apparition au scroll (bonus moderne)
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.quote-card');
    cards.forEach(card => {
        card.classList.add('animate-fadein');
    });
});

window.onload = function () {
    if (checkName()) {
        updateGreeting();
        fetchCitation();
        updateDateTime();
        updateCountdown();
    }
    setInterval(updateDateTime, 1000);
    setInterval(updateCountdown, 1000);
};
