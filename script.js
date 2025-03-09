{\rtf1\ansi\ansicpg1252\cocoartf2821
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // Configuration Firebase\
const firebaseConfig = \{\
    apiKey: "AIzaSyA9YhIdQDVPLGywlYOvpclV37gqno_T6y0",\
    authDomain: "vzn-app.firebaseapp.com",\
    databaseURL: "https://vzn-app-default-rtdb.europe-west1.firebasedatabase.app",\
    projectId: "vzn-app",\
    storageBucket: "vzn-app.appspot.com",\
    messagingSenderId: "123148250660",\
    appId: "1:123148250660:web:d696aba5bb0b571b48b2b1"\
\};\
\
// Initialisation Firebase\
const app = firebase.initializeApp(firebaseConfig);\
const db = firebase.database(app);\
\
// R\'e9cup\'e9rer les articles depuis Firebase\
const articlesContainer = document.getElementById("articles-container");\
\
db.ref("selectedArticles").once("value").then(snapshot => \{\
    const articles = snapshot.val();\
\
    if (articles) \{\
        Object.values(articles).forEach(article => \{\
            const articleDiv = document.createElement("div");\
            articleDiv.classList.add("article");\
\
            const articleLink = document.createElement("a");\
            articleLink.href = article.url;\
            articleLink.target = "_blank";\
            articleLink.textContent = article.title;\
\
            articleDiv.appendChild(articleLink);\
            articlesContainer.appendChild(articleDiv);\
        \});\
    \} else \{\
        articlesContainer.innerHTML = "<p>Aucun article s\'e9lectionn\'e9.</p>";\
    \}\
\}).catch(error => \{\
    console.error("Erreur lors de la r\'e9cup\'e9ration des articles :", error);\
    articlesContainer.innerHTML = "<p>Erreur lors de la r\'e9cup\'e9ration des articles.</p>";\
\});}