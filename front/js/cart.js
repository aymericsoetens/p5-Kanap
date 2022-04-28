let cart = JSON.parse(localStorage.getItem("cart")); //initialisation du localstorage
//cartArticles();
async function cartArticles() // récupération des données de l'api
{
    let articlesCatch = await fetch("http://localhost:3000/api/products/" );
    return await articlesCatch.json();
}

//fonction qui recupere l'image, le nom et le prix du ou des articles en cours de traitement et qui ajoute le prix total du panier
function cartId(data, p, qty)     
{
    //let name = '';  //initialisation de la variable
    fetch("http://localhost:3000/api/products/" + data)     //recupere les données du produit au sein de l'api
    .then((response) => response.json())       //renvoie la reponse des données recuperer au sein de l'api
    .then(article =>                           //renvoie les valeurs de l'article selectionné
        {
            document.getElementById('img' + p).setAttribute('src', article.imageUrl);   //reenvoie a la balise html dont l'id est img[p] l'url de la photo de produit
            document.getElementById('title' + p).innerHTML = article.name ;             //reenvoie a la balise html dont l'id est title[p] le nom du produit
            document.getElementById('price' + p).innerHTML = article.price + '€' ;      //reenvoie a la balise html dont l'id est price[p] le prix du produit
            document.getElementById('totalPrice').innerHTML = parseInt(document.getElementById('totalPrice').innerHTML) + (article.price * qty); //ajoute au total du panier la valeur du ou des articles en cours de traitement
        }
    ) 
}

cartSection();                      //appel de la fonction cartSection

//fonction pour le code html
async function cartSection()         
{
    let result = await cartArticles ()  //initialisation de la variable et assignation de la liste des articles du magasin 
    .then(function (API)                //reenvoie les infos de la liste
    {
        //const cartAPI = API;                      
        if (!cart)         //si le panier est vide, modification du h1
        {
            const titleCart = document.querySelector("h1");     //assigne le h1 a la variable titleCart
            //const sectionCart = document.querySelector(".cart");  
            titleCart.innerHTML = "Votre panier est vide !";  // assigne au titre une indication de panier vide 
        } 
        else               //si il y a au moins un article, modification et ajout de code html dans le dom pour chaque produit du panier
        {
            
            let productToCart = "";         //initialisation de la variable à null 
            for (let i= 0; i < cart.length; i++)   //boucle qui va traiter les produits du panier et creer le code Html dans le dom
            {
                
                //assignation du code html a la variable productToCart
                productToCart += `<article class="cart__item" data-id="${cart[i].id}" data-color="${cart[i].color}">
                                        <div class="cart__item__img">
                                            <img id='img`+ i +`' src="">
                                        </div>
                                        <div class="cart__item__content">
                                            <div class="cart__item__content__description">
                                                <h2 class = "title" id='title`+ i + `'></h2>
                                                <p class="color">${cart[i].color}</p>
                                                <p class ="price" id='price`+ i + `'></p>
                                            </div>
                                            <div class="cart__item__content__settings">
                                                <div class="cart__item__content__settings__quantity">
                                                    <p>Qté : </p>
                                                    <input type="number" id="qty` + i + `" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cart[i].qty}">
                                                </div>
                                                <div class="cart__item__content__settings__delete">
                                                <p class="deleteItem">Supprimer</p>
                                                </div>
                                            </div>
                                        </div>
                                    </article>`;  
                        cartId(cart[i].id, i, cart[i].qty); //appel de la fonction cartId
            }            
            document.querySelector("#cart__items").innerHTML = productToCart;  //assigne le code html de l'ensemble des articles a la balise html dont l'Id est cart__items 
            change(); 
            removeItem();  //appel de la fonction removeItem
        }
    })
};

//fonction pour modifier la quantité d'un produit à même le panier

function change(){
    //const selectElement = document.querySelector('.cart')
   let iptChange =  document.getElementsByClassName('itemQuantity');

   for (let ipt of iptChange){
       ipt.addEventListener("change", (e)=>{
            e.preventDefault();  

            let product = {                                                 //initialisation de la variable product
                id: e.currentTarget.closest('.cart__item').dataset.id,      //assignation à la variable id de l'id du parent de la balise html dont la class est cart__item (closest = selectionner parent   dataset = selectionner element)
                color: e.currentTarget.closest('.cart__item').dataset.color  //assignation à la variable color de la couleur du produit à supprimer
            };
           
        const resultFind = cart.find(
            (el) => el.id === product.id && el.color === product.color );
            
            resultFind.qty = ipt.value;
            localStorage.setItem("cart", JSON.stringify(cart));
            location.reload();

        
       })
   }

}



// fonction supprimer un article
function removeItem(){
    let btnDelete = document.getElementsByClassName('deleteItem');          //initialisation de la variable btnDelete et assignation de la balise html de la ou des class deleteItem
                                                                            
    for (let btn of btnDelete){                                             //boucle pour chaque bouton supprimer
        btn.addEventListener("click" , (e) => {                             //creation de l'event onClick()
            e.preventDefault();
            
            //selection produit par Id & color
            let product = {                                                 //initialisation de la variable product
                id: e.currentTarget.closest('.cart__item').dataset.id,      //assignation à la variable id de l'id du parent de la balise html dont la class est cart__item (closest = selectionner parent   dataset = selectionner element)
                color: e.currentTarget.closest('.cart__item').dataset.color  //assignation à la variable color de la couleur du produit à supprimer
            };
            
            removeProduct(product);                                            //appel de la fonction removeProduct() présent dans le fichier cartManager.js
            e.currentTarget.closest('.cart__item').remove();                   //supprime le parent de cart__item
            location.reload();  
                                                       //recharge la page après suppression du produit
        }
        )}
};

    
//formulaire de commande


    let form = document.querySelector("#order").addEventListener("click",(e)=>{   //recuperation du formulaire
        e.preventDefault(); //ca annule l'envoie du formulaire
        if (checkForm()){

            console.log('envoie du formulaire')
            postForm()
        }
    });

    //requete post avec content type
    function postForm(){
       
            //Récupération des coordonnées du formulaire client
           
            let Name = document.getElementById('firstName');
            let LastName = document.getElementById('lastName');
            let Adress = document.getElementById('address');
            let City = document.getElementById('city');
            let Mail = document.getElementById('email');
    
            //Construction d'un array depuis le local storage
            let id = [];
        
            for (let i = 0; i<cart.length;i++) {
                id.push(cart[i].id);
            }
            
            const order = {
                contact : {
                    firstName: Name.value,
                    lastName: LastName.value,
                    address: Adress.value,
                    city: City.value,
                    email: Mail.value,
                },
                products: id,
            } 
        
    
            const options = {
                method: 'POST',
                body: JSON.stringify(order),  //info envoyé par la requete
                headers: {                         
                    
                    "Content-Type": "application/json" 
                },
            };
            fetch("http://localhost:3000/api/products/order", options)
            .then((response) => response.json())
            .then((data) => {
               
                document.location.href = "confirmation.html?order_id=" + data.orderId;
            })
           
        
    }