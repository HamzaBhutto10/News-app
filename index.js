const Api_key = "84ee1338ae5947b39baa90cf11010747";
const url = 'https://newsapi.org/v2/everything?q=';

window.addEventListener('load', () => fetchNews("india"));

async function fetchNews(query) {
    const response = await fetch(`${url}${query}&apiKey=${Api_key}`);
    const data = await response.json();
    bindData(data.articles);
}

function bindData(articles) {
    const cardsContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card');


    if (!newsCardTemplate) {
        console.error('Template element not found!');
        return;
    }

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsDesc = cardClone.querySelector('#news-desc');
    const newsSource = cardClone.querySelector('#news-source');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString('en-US', {
        timeZone: "Asia/Karachi"
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener('click', ()=>{
        window.open(article.url,"blanks")
    })
}

let curSelectNav = null;
function onNavItemClick(id){
    fetchNews(id)
    const navItem = document.getElementById(id)
    curSelectNav?.classList.remove("active")
    curSelectNav = navItem;
    curSelectNav.classList.add('active')
}

let searchBtn = document.getElementById('search-btn')
let searchText = document.getElementById('search-text')

searchBtn.addEventListener('click', ()=>{
    let query = searchText.value 
    if(!query) return;
    fetchNews(query)
    curSelectNav?.classList.remove('active')
    curSelectNav = null;
    searchText.value = ""
    blur();
})

searchText.addEventListener('keydown',(e)=>{
    if(e.key === 'Enter'){
        let query = searchText.value 
        if(!query) return;
        fetchNews(query)
        curSelectNav?.classList.remove('active')
        curSelectNav = null;
        searchText.value = ""
        searchText.blur();
    }
    else return;
})


function reload(){
    window.location.reload()
}