import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";

// Configuration Firebase
const firebaseConfig = {
    apiKey: "API_KEY",
    authDomain: "AUTH_DOMAIN",
    databaseURL: "DATABASE_URL",
    projectId: "PROJECT_ID",
};

// Initialisation Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Récupérer les articles depuis Firebase et les afficher
const articlesContainer = document.getElementById("articles-container");
get(ref(db, "selectedArticles"))
    .then(snapshot => {
        if (snapshot.exists()) {
            const articles = snapshot.val();
            Object.values(articles).forEach(article => {
                const articleDiv = document.createElement("div");
                articleDiv.innerHTML = `
                    <h2>${article.title}</h2>
                    <p>${article.content}</p>
                    <a href="${article.url}" target="_blank">Lire l'article complet</a>
                `;
                articlesContainer.appendChild(articleDiv);
            });
        } else {
            articlesContainer.innerHTML = "<p>Aucun article trouvé.</p>";
        }
    })
    .catch(error => console.error(error));
