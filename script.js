// Obtenir la date et l'heure de Paris sous forme d'objet Date
function getParisDate() {
    const now = new Date();
    // Extraire les composantes en heure de Paris
    const options = { timeZone: 'Europe/Paris', hour12: false };
    const dateParts = new Intl.DateTimeFormat('en-GB', {
        ...options,
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
    }).formatToParts(now).reduce((acc, part) => {
        if (part.type !== 'literal') acc[part.type] = part.value;
        return acc;
    }, {});
    // Créer un objet Date en UTC correspondant à la date/heure Paris
    return new Date(Date.UTC(
        parseInt(dateParts.year),
        parseInt(dateParts.month) - 1,
        parseInt(dateParts.day),
        parseInt(dateParts.hour),
        parseInt(dateParts.minute),
        parseInt(dateParts.second)
    ));
}

// Fonction pour afficher la date et l'heure de Paris
function updateDateTime() {
    const nowParis = getParisDate();

    // Formatage de la date en anglais (long format)
    const formattedDate = nowParis.toLocaleDateString('en-US', {
        timeZone: 'Europe/Paris',
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    // Formatage de l'heure (24h format)
    const formattedTime = nowParis.toLocaleTimeString('en-US', {
        timeZone: 'Europe/Paris',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    document.getElementById('current-date').innerText = formattedDate;
    document.getElementById('current-time').innerText = formattedTime;
}

// Fonction pour afficher le compte à rebours avant la prochaine mise à jour Paris
function updateCountdown() {
    const nowParis = getParisDate();
    let nextUpdate = new Date(nowParis);

    if (nowParis.getUTCHours() < 12) {
        nextUpdate.setUTCHours(12, 0, 0, 0);
    } else {
        nextUpdate.setUTCDate(nextUpdate.getUTCDate() + 1);
        nextUpdate.setUTCHours(0, 0, 0, 0);
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

// Fonction pour afficher les salutations basées sur l'heure de Paris
function updateGreeting() {
    const nowParis = getParisDate();
    const hours = nowParis.getUTCHours();
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

// Fonction pour récupérer une citation basée sur la période de 12 heures (heure de Paris)
async function fetchCitation() {
    try {
        const response = await fetch('citations.txt');
        if (!response.ok) throw new Error('Citations file not found.');
        const text = await response.text();
        const citations = text.split('\n').filter(citation => citation.trim() !== '');
        if (citations.length === 0) throw new Error('No citations available in the file.');

        const nowParis = getParisDate();
        // Calculer l'index de citation : chaque période de 12h à Paris a un index unique
        const day = nowParis.getUTCFullYear() * 10000 + (nowParis.getUTCMonth() + 1) * 100 + nowParis.getUTCDate();
        const period = nowParis.getUTCHours() < 12 ? 0 : 1;
        const periodIndex = (day * 2 + period) % citations.length;

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
