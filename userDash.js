function signOut()
{

    auth.signOut().then(()=>{
        location.href ="userLogin.html";
    })
}



const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

allSideMenu.forEach(item=> {
	const li = item.parentElement;

	item.addEventListener('click', function () {
		allSideMenu.forEach(i=> {
			i.parentElement.classList.remove('active');
		})
		li.classList.add('active');
	})
});




// TOGGLE SIDEBAR
const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');

menuBar.addEventListener('click', function () {
	sidebar.classList.toggle('hide');
})







const searchButton = document.querySelector('#content nav form .form-input button');
const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
const searchForm = document.querySelector('#content nav form');

searchButton.addEventListener('click', function (e) {
	if(window.innerWidth < 576) {
		e.preventDefault();
		searchForm.classList.toggle('show');
		if(searchForm.classList.contains('show')) {
			searchButtonIcon.classList.replace('bx-search', 'bx-x');
		} else {
			searchButtonIcon.classList.replace('bx-x', 'bx-search');
		}
	}
})





if(window.innerWidth < 768) {
	sidebar.classList.add('hide');
} else if(window.innerWidth > 576) {
	searchButtonIcon.classList.replace('bx-x', 'bx-search');
	searchForm.classList.remove('show');
}


window.addEventListener('resize', function () {
	if(this.innerWidth > 576) {
		searchButtonIcon.classList.replace('bx-x', 'bx-search');
		searchForm.classList.remove('show');
	}
})



const switchMode = document.getElementById('switch-mode');

switchMode.addEventListener('change', function () {
	if(this.checked) {
		document.body.classList.add('dark');
	} else {
		document.body.classList.remove('dark');
	}
})

////////////////cart///////////////////////////////////////////////////
let addToCartButtons = document.getElementsByClassName('btn-primary')
let cartContainer = document.getElementsByTagName('tbody')[0]
let quantityFields = document.getElementsByClassName('num')
let delete_buttons = document.getElementsByClassName('uk-button-danger')


function displayProducts()
{
    
  //function to dispalyProducts from database
   db.collection("products").onSnapshot((info)=>{
    var html=""
    var div=""
    const list = document.getElementById("rowss");
    info.forEach(element => {
     
        div=`<div class = 'col-md-4 col-lg-4'>
				<div class="card" style="width: 18rem;">
					<img src="${element.data().ProdImage}" class="card-img-top" alt="...">
					 <div class="card-body">
						<h3 class="card-title">${element.data().ProdName}</h3>
						<h5 class="card-text">${element.data().ProductDesc}</h5>
						<h4 class="card-text"><span>R</span>${element.data().ProdPrice}</h4>
						<a class="btn btn-primary" onclick="addToCart(event)">Add to Cart</a>
					</div>
			</div>
		  </div>

	 
	  `
    html += div ;
    list.innerHTML=html;

    });
})
    
}

// picking up all the Add-To-Cart buttons
for(let i = 0; i < addToCartButtons.length; i++){
    addToCartButtons[i].addEventListener('click', addToCart)
    
}
// This function helps to add items to our cart
let move = [];
function addToCart(event){

   
    
    let itemContainer = document.createElement('tr')
    let btn = event.target
    let btnGrandParent = btn.parentElement.parentElement
    let btnParent = btn.parentElement
    let itemImage = btnGrandParent.children[0].src
    let itemName = btnParent.children[0].innerText
    let itemPrice = btnParent.children[2].innerText
    
    move.push({Name:itemName,Price:itemPrice,Img:itemImage})

    
    itemContainer.innerHTML = `
   
    <td><img class="uk-preserve-width uk-border-circle" src=${itemImage} width="40" alt=""></td>
    <td class="uk-table-link">
        <h3 class = "item-name">${itemName}</h3>
    </td>
    <td class="uk-text-truncate item-price"><h3>${itemPrice}</h3></td>
    <td><input type = 'number' class = 'num' value = '1'></td>
    <td class="uk-text-truncate total-price"><h3>${itemPrice}</h3></td>
    <td><button class="uk-button uk-button-danger" type="button">Remove</button></td>
`

    cartContainer.append(itemContainer)




    // Accessing individual quantity fields
    for(let i = 0; i < quantityFields.length; i++){
        quantityFields[i].value = 1
        quantityFields[i].addEventListener('change', totalCost)
                
    }

    // Accessing individual quantity fields
    for(let i = 0; i < delete_buttons.length; i++){
        delete_buttons[i].addEventListener('click', removeItem)
    }

    grandTotal()

   console.log(move);
}





// This function helps to multiply the quantity and the price
function totalCost(event){
    let quantity = event.target
    quantity_parent = quantity.parentElement.parentElement
    price_field = quantity_parent.getElementsByClassName('item-price')[0]
    total_field = quantity_parent.getElementsByClassName('total-price')[0]
	
    price_field_content = price_field.innerText.replace('R', '')
    total_field.children[0].innerText = 'R' +  (quantity.value * price_field_content).toFixed(2);
    grandTotal()
    if(isNaN(quantity.value)|| quantity.value <= 0){
        quantity.value = 1
    }

    
    
}
let total = 0
// This function helps to add up the total of the items
function grandTotal(){
  total = 0
	
    let grand_total = document.getElementsByClassName('grand-total')[0]
    all_total_fields = document.getElementsByClassName('total-price')
    for(let i = 0; i < all_total_fields.length; i++){
        all_prices = Number(all_total_fields[i].innerText.replace('R', ''))
        total+=all_prices
    }
    grand_total.children[0].innerText = "R"+(total).toFixed(2)
    grand_total.children[0].style.fontWeight = 'bold'
   
}


function removeItem(event){
    del_btn = event.target
    del_btn_parent = del_btn.parentElement.parentElement
    del_btn_parent.remove()
    console.log(del_btn)
    grandTotal()
    
}


///////////////////////////////////////////////////////////////////////

function getuserN()
{
	var getN = document.getElementById("welcome");
	auth.onAuthStateChanged((user)=>{
		if(user){
			db.collection("users").doc(user.uid).get().then((info)=>{

				getN.innerHTML = info.data().Name;

			})
			
		}

	})
}
///////////////////////////////////////////////// orders/////////////////////

function submitOrder()
{ 
    auth.onAuthStateChanged((user)=>{
		if(user){
    db.collection("ItemsOncart").doc(user.uid).set({
        Items:move,
    }).then(()=>{
        window.location.href="checkout.html?Price="+total;
    })
}
    })
    
    
}
displayProducts()
getuserN()

