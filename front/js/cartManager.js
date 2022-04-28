
 function getCart(){
    let cart = localStorage.getItem("cart");

    if (cart == null){
        return [];
    }
    else {
       return JSON.parse(localStorage.getItem('cart'));
       
    }  
}

/**
 * add product to cart or update quantity if product already exist
 * @param {*} product product to add to cart
 */
function addProduct(product){
    let productCart = getCart();
    const resultFind = productCart.find(
        (el) => el.id === product.id && el.color === product.color );
        if (resultFind){
            resultFind.qty += product.qty;
        }
        else{
            productCart.push (product);
        }
        saveCart(productCart);
}
/**
 * save cart in localstrorage
 * @param {[*]} cart cart to save 
 */
//fonction de sauvegarde du panier

function saveCart(cart){
    localStorage.setItem("cart", JSON.stringify(cart));
}

function removeProduct(product){
    let productCart = getCart();
    let saveNewCart = productCart.filter((el) => el.id != product.id || el.color != product.color);
    saveCart(saveNewCart);
}

function change(product){
    let productCart = getCart();
    let saveModifQty = productCart.filter((el) => el.id != product.id || el.color !=product.color || el.qty !== product.qty);
   // let saveModifQty = product.find((el) => el.qty != product.qty);
    saveCart (saveModifQty);
}
