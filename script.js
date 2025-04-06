// Fonction pour récupérer et afficher 5 citations basées sur la période de 12 heures
async function fetchCitations() {
    const response = await fetch('citations.txt');
    const text = await response.text();

    const citations = text.split('\n').filter(citation => citation.trim() !== '');

    // Mélanger les citations pour obtenir un ordre aléatoire
    const shuffledCitations = shuffleArray(citations);

    // Sélectionner les 5 premières citations mélangées
    const selectedCitations = shuffledCitations.slice(0, 5);

    // Effacer les anciennes citations du conteneur
    const quotesContainer = document.getElementById('quotes-container');
    quotesContainer.innerHTML = '';

    // Ajouter chaque citation au conteneur avec une animation GSAP
    selectedCitations.forEach((citation, index) => {
        const [quote, author] = citation.split('|');

        // Créer les éléments HTML pour la citation et l'auteur
        const quoteElement = document.createElement('blockquote');
        quoteElement.classList.add('quote');
        quoteElement.innerText = quote || "Citation not available";

        const authorElement = document.createElement('p');
        authorElement.classList.add('author');
        authorElement.innerText = author ? `-${author}` : "";

        // Ajouter les éléments au conteneur principal
        quotesContainer.appendChild(quoteElement);
        quotesContainer.appendChild(authorElement);

        // Animation avec GSAP (décalage progressif)
        gsap.from(quoteElement, { duration: 1, opacity: 0, y: 20, delay: index * 0.2 });
        gsap.from(authorElement, { duration: 1, opacity: 0, y: 20, delay: index * 0.2 + 0.1 });
    });
}

// Fonction utilitaire pour mélanger un tableau (algorithme de Fisher-Yates)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
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

document.getElementById("current-date").innerHTML=formattedDate
