    // Calculer le temps restant en millisecondes
    const timeRemaining = nextUpdate - now;

    if (timeRemaining > 0) {
        const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        document.getElementById('countdown').innerText =
            `Next update in: ${hours}h ${minutes}m ${seconds}s`;
    } else {
        fetchCitations(); // Mettre à jour les citations
    }
}

// Fonction pour demander et sauvegarder le prénom de l'utilisateur
function saveName() {
    const nameInput = document.getElementById('name-input').value.trim();

    if (nameInput) {
        localStorage.setItem('username', nameInput);
        document.getElementById('name-prompt').classList.add('hidden');
        updateGreeting();
        fetchCitations();
        updateDateTime();
        setInterval(updateCountdown, 1000); // Mettre à jour le compte à rebours toutes les secondes
    }
}

// Fonction pour afficher les salutations basées sur l'heure
function updateGreeting() {
    const now = new Date();
    const hours = now.getHours();

    let greeting;
    if (hours >= 6 && hours < 12) greeting = "Good Morning";
    else if (hours >= 12 && hours < 18) greeting = "Good Afternoon";
    else if (hours >= 18 && hours < 22) greeting = "Good Evening";
    else greeting = "Good Night";

    const name = localStorage.getItem('username') || "Guest";
    document.getElementById('greeting').innerHTML =
        `${greeting}, <span style="color:#0056b3">${name}</span>`;
}

// Vérifier si le prénom est déjà sauvegardé
function checkName() {
    const name = localStorage.getItem('username');

    if (!name) {
        document.getElementById('name-prompt').classList.remove('hidden');
        return;
    }

    document.getElementById('name-prompt').classList.add('hidden');
    updateGreeting();
    fetchCitations();
    updateDateTime();
    setInterval(updateCountdown, 1000); // Mettre à jour le compte à rebours toutes les secondes
}

// Initialisation au chargement de la page
checkName();
setInterval(updateDateTime, 1000); // Mettre à jour l'heure chaque seconde
