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

// Fonction pour afficher le compte à rebours avant la prochaine mise à jour
function updateCountdown() {
    const now = new Date();

    // Déterminer l'heure de la prochaine mise à jour (00h00 ou 12h00)
    let nextUpdate = new Date(now);
    
    if (now.getHours() >= 12) {
        // Si on est après midi, prochaine mise à jour est demain à 00h00
        nextUpdate.setDate(now.getDate() + 1);
        nextUpdate.setHours(0, 0, 0, 0);
    } else {
        // Sinon, prochaine mise à jour est aujourd'hui à 12h00
        nextUpdate.setHours(12, 0, 0, 0);
    }

    // Calculer le temps restant en millisecondes
    const timeRemaining = nextUpdate - now;

    // Convertir en heures, minutes et secondes
    const hours =
