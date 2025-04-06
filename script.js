// Fonction pour récupérer une citation basée sur la période de 12 heures
async function fetchCitation() {
    const response = await fetch('citations.txt');
    const text = await response.text();

    const citations = text.split('\n').filter(citation => citation.trim() !== '');
    
    // Calculer l'index basé sur la période actuelle (12 heures)
    const now = new Date();
    
    // Chaque période de 12 heures a un index unique (00h-12h et 12h-24h)
    const periodIndex = Math.floor(now.getTime() / (12 * 60 * 60 * 1000)) % citations.length;

    // Récupérer la citation correspondante
    const [quote, author] = citations[periodIndex].split('|');
    
    document.getElementById('citation').innerText = quote || "Citation not available";
    document.getElementById('author').innerText = author ? `-${author}` : "";
}

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

    document.getElementById('current-date').innerText = formattedDate; // Ligne pour la date
    document.getElementById('current-time').innerText = formattedTime; // Ligne pour l'heure
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
    
    document.getElementById('greeting').innerHTML = `${greeting}, <span style="color:#0056b3">${name}</span>`;
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
        document.getElementById('container').classList.remove('hidden');
    }
}

// Vérifier si le prénom est déjà sauvegardé
function checkName() {
    const name = localStorage.getItem('username');
    
    if (!name) {
        document.getElementById('name-prompt').classList.remove('hidden');
        document.getElementById('container').classList.add('hidden');
    } else {
        updateGreeting();
        fetchCitation();
        updateDateTime();
        document.getElementById('container').classList.remove('hidden');
        document.getElementById('name-prompt').classList.add('hidden');
    }
}

// Initialisation au chargement de la page
checkName();

// Mettre à jour la date et l'heure chaque seconde
setInterval(updateDateTime, 1000);
