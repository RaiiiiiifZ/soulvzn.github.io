// Fonction pour récupérer une citation aléatoire
async function fetchCitation() {
    const response = await fetch('citations.txt');
    const text = await response.text();

    const citations = text.split('\n').filter(citation => citation.trim() !== '');
    
    // Choisir une citation aléatoire
    const randomIndex = Math.floor(Math.random() * citations.length);
    
    const [quote, author] = citations[randomIndex].split('|');
    
    document.getElementById('citation').innerText = quote || "Citation non disponible";
    document.getElementById('author').innerText = author ? `-${author}` : "";
}

// Fonction pour afficher l'heure actuelle et les salutations
function updateGreetingAndTime() {
    const now = new Date();

    // Formatage de l'heure
    const formattedTime = now.toLocaleString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    
    document.getElementById('current-time').innerText = formattedTime;

    // Salutations basées sur l'heure
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
        updateGreetingAndTime();
        fetchCitation();
    }
}

// Vérifier si le prénom est déjà sauvegardé
function checkName() {
    const name = localStorage.getItem('username');
    
    if (!name) {
        document.getElementById('name-prompt').classList.remove('hidden');
        document.getElementById('container').classList.add('hidden');
    } else {
        updateGreetingAndTime();
        fetchCitation();
        document.getElementById('container').classList.remove('hidden');
        document.getElementById('name-prompt').classList.add('hidden');
    }
}

// Initialisation au chargement de la page
checkName();

// Mettre à jour l'heure chaque seconde
setInterval(updateGreetingAndTime, 1000);
