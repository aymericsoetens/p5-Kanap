// requete à l'API 
async function Articles() {
   
    let articlesCatch = await fetch("http://localhost:3000/api/products");
  
    return await articlesCatch.json();
  }
  

Section();    
async function Section() {
    let result = await Articles ()
    .then(function (API){
        const articles = API;
        console.table(articles);
       

let listArticleDom = "";
        
        for (let article of articles) {

           listArticleDom +=`<a href="product.html?id=${article._id}">
                                <article>
                                  <img src="${article.imageUrl}" alt="${article.altTxt}">
                                  <h3 class="productName">${article.name}</h3>
                                  <p class="productDescription">${article.description}</p>
                                </article>
                              </a>`;
        }

        document.querySelector(".items").innerHTML = listArticleDom;
    }
)};

          


 
