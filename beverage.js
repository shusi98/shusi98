function displayProduct()
{
    db.collection("loaded").onSnapshot((info)=>
    {   const list =document.getElementById("list-product");
        var html=""
        var div=""
        info.forEach(element => {
           /*div =` <div class="col-md-3">
           <h3>${element.data(). ProdName}</h3>
           <h4>${element.data().ProdPrice}</h4>
           <h5>${element.data().ProductDesc}</h5>
       </div>`*/

          div =`
          <div class="col-md-3">
          <div class="firstP">
            <img src="${element.data().ProdImage}" alt="">
          </div>
         <div class="infoProd">
           <h2>${element.data(). ProdName}</h2><br>
           <h3>${element.data().ProductDesc}</h3><br>
           <h4>R ${element.data().ProdPrice}</h4>
             
         </div>
         
         <button class="add">Add to Cart</button>
          
      </div>
          
          
          `


       html += div;
       list.innerHTML=html 
        });
    })

}
displayProduct()