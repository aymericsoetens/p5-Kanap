//recuperation de l'ID
let params = new URLSearchParams(window.location.search);
let productId = params.get('id');


//sélecteurs modifications
let titleProduct = document.getElementById("title");
let priceProduct = document.getElementById("price");
let descriptionProduct = document.getElementById("description");
let colorsProduct = document.getElementById("colors");
let imgProduct = document.querySelector(".item__img");
let img = document.createElement("img");
imgProduct.appendChild(img);


getArticle();

//info produit + Id

async function getArticle() {
    await fetch("http://localhost:3000/api/products/" + productId )
   .then((response) => response.json())
   .then(article => {
       
//info produit dom

    img.setAttribute("src", article.imageUrl);
    img.setAttribute("alt", article.altTxt);    
    titleProduct.innerHTML = article.name;
    priceProduct.innerHTML = article.price;
    descriptionProduct.innerHTML = article.description;
    

    //boucle 
    for (let i=0; i < article.colors.length; i++) {
        let color = document.createElement("option");
        color.setAttribute("value", article.colors[i]);
        color.innerHTML = article.colors[i];
        colorsProduct.appendChild(color);
    }  
}); 
    addToCart(productId);
}

// Ajouté un article au panier

let addToCartBtn = document.getElementById("addToCart");
addToCartBtn.addEventListener("click", addToCart);

function addToCart() {

    const colorChoice = document. querySelector("#colors");
    const quantityChoice = document.querySelector("#quantity");

    if (quantityChoice.value > 0 && quantityChoice.value <=100 && quantityChoice.value != 0 && colorChoice.value != 0) { 

      
    
            let productCart = getCart();
            console.log(productCart);

            let id = productId;
            let color = document.querySelector("#colors").value;
            let qty = document.querySelector("#quantity").value;
            let price = document.querySelector("#price").value;
            let name = document.querySelector("#title").textContent;
            

                    let productCartObj = {
                        id : productId,
                        color : color,
                        qty : parseInt(qty), 
                    };
                    addProduct(productCartObj);
                                 
                    alert("Le produit à été ajouté au panier !");
                

        
    }
}