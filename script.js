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

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Récupération des articles depuis Firebase
const articlesContainer = document.getElementById("articles-container");

const articlesRef = ref(db, "selectedArticles");
get(articlesRef)
    .then(snapshot => {
        if (snapshot.exists()) {
            const articles = snapshot.val();
            Object.values(articles).forEach(article => {
                const articleDiv = document.createElement("div");
                articleDiv.classList.add("article");

                const articleLink = document.createElement("a");
                articleLink.href = article.url;
                articleLink.target = "_blank";
                articleLink.textContent = article.title;

                articleDiv.appendChild(articleLink);
                articlesContainer.appendChild(articleDiv);
            });
        } else {
            articlesContainer.innerHTML = "<p>Aucun article sélectionné.</p>";
        }
    })
    .catch(error => {
        console.error("Erreur lors de la récupération des articles :", error);
        articlesContainer.innerHTML = "<p>Erreur lors de la récupération des articles.</p>";
    });
