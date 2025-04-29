// Fonction pour afficher la date et l'heure actuelles
function updateDateTime() {
    const now = new Date();

    // Formatage de la date en anglais (long format)
    const formattedDate = now.toLocaleDateString('en-US', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    // Formatage de l'heure (24h format)
    const formattedTime = now.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    document.getElementById('current-date').innerText = formattedDate;
    document.getElementById('current-time').innerText = formattedTime;
}

// Fonction pour afficher le compte à rebours avant la prochaine mise à jour
function updateCountdown() {
    const now = new Date();
    let nextUpdate = new Date(now);

    if (now.getHours() >= 12) {
        nextUpdate.setDate(now.getDate() + 1);
        nextUpdate.setHours(0, 0, 0, 0);
    } else {
        nextUpdate.setHours(12, 0, 0, 0);
    }

    const timeRemaining = nextUpdate - now;
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

// Fonction pour afficher les salutations basées sur l'heure
function updateGreeting() {
    const now = new Date();
    const hours = now.getHours();
    let greeting = "Hello";
    if (hours >= 6 && hours < 12) greeting = "Good Morning";
    else if (hours >= 12 && hours < 18) greeting = "Good Afternoon";
    else if (hours >= 18 && hours < 22) greeting = "Good Evening";
    else greeting = "Good Night";
    const name = localStorage.getItem('username') || "Guest";
    document.getElementById('greeting').innerHTML =
        `${greeting}, <span style="color:#0056b3">${name}</span>`;
}

// Fonction pour demander et sauvegarder le prénom de l'utilisateur
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

// Vérifier si le prénom est déjà sauvegardé
function checkName() {
    const name = localStorage.getItem('username');
    if (!name) {
        document.getElementById('name-prompt').classList.remove('hidden');
        return false;
    }
    document.getElementById('name-prompt').classList.add('hidden');
    return true;
}

// Fonction pour récupérer une citation basée sur la période de 12 heures
async function fetchCitation() {
    try {
        const response = await fetch('citations.txt');
        if (!response.ok) throw new Error('Citations file not found.');
        const text = await response.text();
        const citations = text.split('\n').filter(citation => citation.trim() !== '');
        if (citations.length === 0) throw new Error('No citations available in the file.');
        const now = new Date();
        const periodIndex = Math.floor(now.getTime() / (12 * 60 * 60 * 1000)) % citations.length;
        const [quote, author] = citations[periodIndex].split('|');
        document.getElementById('citation').innerText = quote || "Citation not available";
        document.getElementById('author').innerText = author ? `-${author}` : "";
    } catch (error) {
        document.getElementById('citation').innerText = error.message;
        document.getElementById('author').innerText = "";
    }
}

// Initialisation au chargement de la page
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
