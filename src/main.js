main();

///

async function main() {

  console.log('main');
}

// skopiowane z labu 12
import './style.css'
import { format } from 'date-fns';

async function loadArticles(orderBy = "created_at.asc") {
  try {
    const response = await fetch(`https://xfuezwjkwtojqxsrccge.supabase.co/rest/v1/article?select=title,subtitle,author,created_at,content&order=${orderBy}`, {
      method: 'GET',
      headers: {
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhmdWV6d2prd3RvanF4c3JjY2dlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2NjU1MDQsImV4cCI6MjA2MzI0MTUwNH0.k3dEcZDYEVcQ3K-sSNu9AF9enL69utG14-JfK95FYAw',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhmdWV6d2prd3RvanF4c3JjY2dlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2NjU1MDQsImV4cCI6MjA2MzI0MTUwNH0.k3dEcZDYEVcQ3K-sSNu9AF9enL69utG14-JfK95FYAw',
      }
    });

    if (!response.ok) {
      throw new Error('HTTP error');
    }

    const data = await response.json();
    displayArticles(data);

  } catch (error) {
    console.error('Błąd:', error);
    document.getElementById('articles-container').innerText = "Wystąpił błąd podczas ładowania artykułów.", + error.message;
  }
}

const Sortowanie = document.getElementById("sorting");
Sortowanie.addEventListener('change', () => {
  const Wybrane = Sortowanie.value;
  let sposobSortowania;
  switch(Wybrane){
    case "RosnacaData":
      sposobSortowania = "created_at.asc";
    break;
    case "MalejacaData":
      sposobSortowania = "created_at.desc";
      break;
    case "AlfabetycznieNazwisko":
      sposobSortowania = "author.asc";
      break
    default:
      sposobSortowania = "created_at";    

  }
    document.getElementById("articles-container").innerHTML = "";
  loadArticles(sposobSortowania);
})




function displayArticles(articles) {
  const container = document.getElementById('articles-container');
  container.innerHTML = "";

  articles.forEach(article => {
    const div = document.createElement("div");
    div.className = "article-box";

    div.innerHTML = `
      <h2>${article.title}</h2>
      <h3>${article.subtitle}</h3>
      // <p><strong>Autor:</strong> ${article.author}</p>
      <p><strong>Data:</strong> ${format(new Date(article.created_at), 'dd-MM-yyyy')}</p>
      <p>${article.content}</p>
    `;

    container.appendChild(div);
  });
}

loadArticles("created_at.asc");


const formularz = document.getElementById("articleForm");
const title = document.getElementById("title");
const subtitle = document.getElementById("subtitle");
const author = document.getElementById("author");
const content = document.getElementById("content");
const date = document.getElementById("created");


formularz.addEventListener("submit", async function (event) {
    event.preventDefault();
    const added_title = title.value;
    const added_subtitle = subtitle.value;
    const added_author = author.value;
    const added_content = content.value;
    const added_date = date.value;

  
 try {
        const response = await fetch("https://xfuezwjkwtojqxsrccge.supabase.co/rest/v1/article", {
            method: "POST",
            headers: {
                'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhmdWV6d2prd3RvanF4c3JjY2dlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2NjU1MDQsImV4cCI6MjA2MzI0MTUwNH0.k3dEcZDYEVcQ3K-sSNu9AF9enL69utG14-JfK95FYAw',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhmdWV6d2prd3RvanF4c3JjY2dlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2NjU1MDQsImV4cCI6MjA2MzI0MTUwNH0.k3dEcZDYEVcQ3K-sSNu9AF9enL69utG14-JfK95FYAw',
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: added_title,
                subtitle: added_subtitle,
                author: added_author,
                content: added_content,
                created_at: added_date,
            })
        });

        if (!response.ok) throw new Error("Błąd przy dodawaniu artykułu");

        document.getElementById("articles-container").innerHTML = "";
        await loadArticles();


        formularz.reset();

    } catch (error) {
        console.error("Błąd dodawania artykułu:", error);
    }
  });
