// Fonction pour récupérer une citation aléatoire
async function fetchCitation() {
    // Charger les citations depuis le fichier texte
    const response = await fetch('citations.txt');
    const text = await response.text();

    // Diviser les citations en tableau
    const citations = text.split('\n').filter(citation => citation.trim() !== '');

    // Choisir une citation aléatoire
    const randomIndex = Math.floor(Math.random() * citations.length);

    // Afficher la citation
    document.getElementById('citation').innerText = citations[randomIndex];
}

// Fonction pour afficher l'heure actuelle
function updateCurrentTime() {
    const now = new Date();
    
    // Formatage de l'heure : jour/mois/année heure:minute:seconde
    const formattedTime = now.toLocaleString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    document.getElementById('current-time').innerText = `Heure actuelle : ${formattedTime}`;
}

// Fonction pour calculer le temps restant avant la prochaine mise à jour (00h00 ou 12h00)
function updateCountdown() {
    const now = new Date();

    // Calculer la prochaine mise à jour (00h00 ou 12h00)
    let nextUpdate = new Date(now);
    if (now.getHours() >= 12) {
        // Si on est après 12h, prochaine mise à jour est demain à 00h00
        nextUpdate.setDate(now.getDate() + 1);
        nextUpdate.setHours(0, 0, 0, 0);
    } else {
        // Sinon, prochaine mise à jour est aujourd'hui à 12h00
        nextUpdate.setHours(12, 0, 0, 0);
    }

    // Calculer le temps restant en millisecondes
    const timeRemaining = nextUpdate - now;

    // Convertir en heures, minutes et secondes
    const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    // Afficher le décompte
    document.getElementById('countdown').innerText =
        `Prochaine mise à jour dans : ${hours}h ${minutes}m ${seconds}s`;
}

// Fonction principale pour mettre à jour toutes les informations
function updatePage() {
    fetchCitation();
    updateCurrentTime();
    updateCountdown();
}

// Mettre à jour les informations au chargement de la page
updatePage();

// Mettre à jour l'heure et le décompte toutes les secondes
setInterval(updateCurrentTime, 1000);
setInterval(updateCountdown, 1000);

// Mettre à jour la citation toutes les 12 heures (ou au rechargement)
setInterval(fetchCitation, 12 * 60 * 60 * 1000);
