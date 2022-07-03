function openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  
  function closeForm() {
    document.getElementById("myForm").style.display = "none";
  }
// display info from database

/*function displayUserInfo()
{
    auth.onAuthStateChanged((user)=>{
        if(user)
        {
            db.collection("users").doc(user.uid).get().then((info)=>{
                console.log(info.data().username)

                document.querySelector(".username").innerHTML=info.data().Username;

            }) 
        }

    })

}*/
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }
///////////////////////////////////////////////////////////////
//ELEMENTS///////////////////
const productEl = document.querySelector(".info");
const cartItemsEl =document.querySelector(".cart-items")
const subtotalEl = document.querySelector(".subtotal");
const totalItemsInCartEl = document.querySelector(".total-items-in-cart");



  function renderProduct()
  {
   products.forEach((product) => {
       productEl.innerHTML +=`
       <div class="col-md-3">
              <div class="firstP">
                <img src="${product.imgSrc}" alt="">
              </div>
             <div class="infoProd">
               <h2 id="productname">${product.name}</h2><br>
               <h3>${product.description}</h3><br>
           <h2><small>R</small>${product.price}</h2>    
             </div>
              
              <div class="add-to-wishlist">
                <img src="icons/heart.png" alt="">
              </div>
  
              <div class="add-to-cart" onClick ="addToCart(${product.id})">
                <img src="icons/bag-plus.png" alt="">
              </div>
              
          
            </div>br
       `
   });
  
  }
   // this is calling the function on top the pictures displayed are equals to the ones on product.js
  renderProduct();
   // cart array
  
   let cart =JSON.parse(localStorage.getItem("CART")) || [];
  
  // ADD TO CART
  function addToCart(id){
      //check if product already exists in cart
      if(cart.some((item) => item.id === id)){
        changeNumberOfUnits("plus",id);
  
      }else{
          const item =  products.find((product)=> product.id === id);
  
          cart.push({...item,
          numberOfUnits: 1});
   
      }
      updateCart();
  }
  // update cart
function  updateCart()
{
    reanderCartItems();
    reanderSubtotal();
    //save cart to local storage
    localStorage.setItem("CART",JSON.stringify(cart));

}

// render subtotal function

function reanderSubtotal()
{

    let totalPrice = 0,
    totalItems = 0;

    cart.forEach((item)=>{
        totalPrice += item.price * item.numberOfUnits;
        totalItems += item.numberOfUnits;

    })

  subtotalEl.innerHTML=`Subtotal (${ totalItems} items): R${totalPrice.toFixed(2)}`
  totalItemsInCartEl.innerHTML =totalItems

}

function reanderCartItems()
{
    cartItemsEl.innerHTML ="";// clear cart element
    cart.forEach((item)=>
    {
       
        cartItemsEl.innerHTML +=`
        <div class="cart-item">
        <div class="item-info">
            <img src="${item.imgSrc}" alt="${item.name}">
            <h4>${item.name}</h4>
            <div class="cancel">
            <img src="./icons/binCancel.jpg" alt="" onclick ="removeItemFromCart(${item.id})">
        </div>
        </div>
        <div class="unit-price">
            <small>R</small>${item.price}
        </div>
        <div class="units">
        <div class="btn minus" onclick="changeNumberOfUnits('minus', ${item.id})">-</div>
        <div class="number">${item.numberOfUnits}</div>
        <div class="btn plus"  onclick="changeNumberOfUnits('plus', ${item.id})">+</div>         
        </div>
    </div>
    
        
        `
        
    })
}

function changeNumberOfUnits(action, id)
{
  cart = cart.map((item)=> {
        let numberOfUnits = item.numberOfUnits;
        if(item.id === id)
        {
            if(action === 'minus' && numberOfUnits > 1)
            {
                numberOfUnits --
            }
            else if (action === 'plus' && numberOfUnits < item.instock)
            {
                numberOfUnits ++
            }
        }

  return {
      ...item,
       numberOfUnits,
  }

    })

    updateCart();
}

// remove from cart
function removeItemFromCart(id)
 {
     cart = cart.filter((item)=> item.id !== id)
     
     updateCart();
 }
