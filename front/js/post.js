 //requete post avec content type
function postForm(){
    let btn_order = document.getElementById("order");
    btn_order.addEventListener("click", (e) => {
        e.preventDefault();

        //récupération des inputs du formulaire client
        let dataForm =  document.querySelectorAll('.cart__order__form input')
        
            
        let product = [];
        for(let i =0; i<cart.length;i++){
            product.push(cart[i].idKanap)
        }
        console.log(product);
    }
    )}