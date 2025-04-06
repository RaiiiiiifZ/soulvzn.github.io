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

    // Animation avec GSAP sur la citation
    gsap.from("#citation", { duration: 2, scale: 0.8, opacity: 0 });
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

document.getElementById('current-date').innerText
