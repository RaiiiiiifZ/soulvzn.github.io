async function fetchCitation() {
    // Charger les citations depuis le fichier texte
    const response = await fetch('citations.txt');
    const text = await response.text();
    
    // Diviser les citations en tableau
    const citations = text.split('\n').filter(citation => citation.trim() !== '');
    
    // Calculer l'index basé sur l'heure actuelle
    const now = new Date();
    const index = Math.floor(now.getTime() / (12 * 60 * 60 * 1000)) % citations.length;

    // Afficher la citation
    document.getElementById('citation').innerText = citations[index];
}

// Charger la citation au démarrage
fetchCitation();
