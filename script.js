async function fetchCitations() {
    try {
        // Charger les citations depuis le fichier texte
        const response = await fetch('citations.txt');

        // Vérifier si le fichier existe
        if (!response.ok) {
            throw new Error('Citations file not found.');
        }

        const text = await response.text();

        // Diviser les citations en tableau et filtrer les lignes vides
        const citations = text.split('\n').filter(citation => citation.trim() !== '');

        // Vérifier si des citations sont disponibles
        if (citations.length === 0) {
            throw new Error('No citations available in the file.');
        }

        // Mélanger les citations et sélectionner les 5 premières
        const shuffledCitations = shuffleArray(citations);
        const selectedCitations = shuffledCitations.slice(0, 5);

        // Afficher les citations dans le conteneur
        const quotesContainer = document.getElementById('quotes-container');
        quotesContainer.innerHTML = '';

        selectedCitations.forEach((citation, index) => {
            const [quote, author] = citation.split('|');

            // Créer les éléments HTML pour chaque citation et son auteur
            const quoteElement = document.createElement('blockquote');
            quoteElement.classList.add('quote');
            quoteElement.innerText = quote || "Citation not available";

            const authorElement = document.createElement('p');
            authorElement.classList.add('author');
            authorElement.innerText = author ? `-${author}` : "";

            quotesContainer.appendChild(quoteElement);
            quotesContainer.appendChild(authorElement);

            // Animation avec GSAP (décalage progressif)
            gsap.from(quoteElement, { duration: 1, opacity: 0, y: 20, delay: index * 0.2 });
            gsap.from(authorElement, { duration: 1, opacity: 0, y: 20, delay: index * 0.2 + 0.1 });
        });
    } catch (error) {
        console.error(error.message);

        // Afficher un message d'erreur dans le conteneur des citations
        const quotesContainer = document.getElementById('quotes-container');
        quotesContainer.innerHTML = `<p class="error">${error.message}</p>`;
    }
}

// Fonction utilitaire pour mélanger un tableau (algorithme de Fisher-Yates)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
async function debugFetch() {
    try {
        const response = await fetch('citations.txt');
        
        if (!response.ok) {
            throw new Error('Citations file not found.');
        }
        
        const text = await response.text();
        console.log("File content:", text);
    } catch (error) {
        console.error("Error fetching file:", error.message);
    }
}

debugFetch();

