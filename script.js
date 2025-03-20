// script.js
document.addEventListener('DOMContentLoaded', () => {
    const apiKey = "a35a11dd-825a-434c-913d-40749e6df065";
    const categories = ["usa", "apple", "fashion", "music", "technology"];
    
    Promise.all(categories.map(category => fetchArticle(category, apiKey)))
    .then(articles => {
        const validArticles = articles.filter(article => article !== null);
        if (validArticles.length > 0) {
            displayArticles(validArticles);
        } else {
            document.getElementById('article-container').innerHTML += '<p>Aucun article trouvé</p>';
        }
    })
    .catch(error => {
        console.error("Erreur globale:", error);
    });
});

async function fetchArticle(category, apiKey) {
    const endpoint = new URL("https://www.newsapi.ai/api/v1/article/getArticles");
    
    endpoint.searchParams.append("resultType", "articles");
    endpoint.searchParams.append("keyword", category);
    endpoint.searchParams.append("lang", "eng");
    endpoint.searchParams.append("articlesSortBy", "date");
    endpoint.searchParams.append("includeArticleBody", "true");
    endpoint.searchParams.append("articleBodyLen", "-1");
    endpoint.searchParams.append("pageSize", "1");
    endpoint.searchParams.append("apiKey", apiKey);

    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        const data = await response.json();
        if (data?.articles?.results?.length > 0) {
            const article = data.articles.results[0];
            return {
                title: article.title,
                body: article.body || "Contenu non disponible",
                url: article.url
            };
        } else {
            return null;
        }
    } catch (error) {
        console.error(`Erreur pour ${category}:`, error);
        return null;
    }
}

function displayArticles(articles) {
    const container = document.getElementById('article-container');
    
    articles.forEach(article => {
        const articleDiv = document.createElement('div');
        articleDiv.className = 'article';
        articleDiv.innerHTML = `
            <h2>${article.title}</h2>
            <p>${article.body}</p>
            <a href="${article.url}" target="_blank">Lire l'article complet</a>
        `;
        container.appendChild(articleDiv);
    });
}
