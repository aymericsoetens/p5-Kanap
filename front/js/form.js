
   
        function checkForm() {

            let listInput = document.querySelectorAll('.cart__order__form input');
            for (let input of listInput){
                if (!input.reportValidity()){
                    return false
                }
            }
            return true; 
        };

   
   
 
  

