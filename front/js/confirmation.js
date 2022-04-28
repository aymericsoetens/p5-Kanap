function main(){
    const idNode = document.getElementById("orderId");
    let params = new URLSearchParams(window.location.search);
    idNode.innerText = params.get("order_id")
   
}
main();