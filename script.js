import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyA9YhIdQDVPLGywlYOvpclV37gqno_T6y0",
    authDomain: "vzn-app.firebaseapp.com",
    databaseURL: "https://vzn-app-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "vzn-app",
    storageBucket: "vzn-app.appspot.com",
    messagingSenderId: "123148250660",
    appId: "1:123148250660:web:d696aba5bb0b571b48b2b1"
};

// Initialisation Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Conteneur des articles
const articlesContainer = document.getElementById("articles-container");

// Récupérer les articles depuis Firebase
const articlesRef = ref(db, "selectedArticles");
get(articlesRef)
    .then(snapshot => {
        if (snapshot.exists()) {
            const articles = snapshot.val();

            for (const article of Object.values(articles)) {
                const articleDiv = document.createElement("div");
                articleDiv.classList.add("article");

                const title = document.createElement("div");
                title.classList.add("article-title");
                title.textContent = article.title;
                articleDiv.appendChild(title);

                const summaryDiv = document.createElement("div");
                summaryDiv.classList.add("article-summary");
                summaryDiv.innerHTML = `<p>${article.summary}</p><a href="${article.url}" target="_blank" class="article-link">Lire l'article complet</a>`;
                summaryDiv.style.display = "none"; // Caché par défaut
                articleDiv.appendChild(summaryDiv);

                // Fonction pour afficher/masquer le résumé
                title.addEventListener("click", () => {
                    summaryDiv.style.display =
                        summaryDiv.style.display === "none" ? "block" : "none";
                });

                articlesContainer.appendChild(articleDiv);
            }
        } else {
            articlesContainer.innerHTML = "<p>Aucun article sélectionné.</p>";
        }
    })
    .catch(error => {
        console.error("Erreur lors de la récupération des articles :", error);
        articlesContainer.innerHTML = "<p>Erreur lors de la récupération des articles.</p>";
    });
