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

///////////////////////////////////////////////////


function displayTotal()
{
	var delvFee = document.getElementById("fee").innerText
	var subtotal = document.getElementById("subTot").innerText
 document.getElementById("check-amt").innerText = (parseFloat( subtotal) + parseFloat(delvFee)).toString();

	 console.log(delvFee)

}

/////////////////////////////////////////////////////////////// checkout/////////////

function finalPrice()
{

    auth.onAuthStateChanged((user)=>{
		if(user){
    const query = window.location.search
    const url = new URLSearchParams(query)
   
    const price = url.get("Price")


    document.getElementById('subTot').innerHTML = (parseFloat(price)).toFixed(2);
   var delvFee = document.getElementById("fee").innerHTML

 document.getElementById("check-amt").innerText =( parseFloat( price) + parseFloat(delvFee)).toFixed(2);
    db.collection("ItemsOncart").doc(user.uid).get().then((infoCart)=>{

        const list =document.getElementById("ItemOrder444")
        var div="";
        var html ="";
    
        
        let mydata = infoCart.data().Items;
        console.log(mydata)
        for (let index = 0; index < mydata.length; index++) {
            const element =mydata[index];
            
            div =`<tr>
            <td><img src="${mydata[index].Img}" alt="" style="width:60px;height:60px"></td>
            <td>${mydata[index].Name}</td>
            <td>${mydata[index].Price}</td>
        </tr>`
        html +=div;
        list.innerHTML = html;
       
        }
            

        

    })
}
    })

}


function deliveryFee()
{

	const deliveryFe = 15.99;
    var checkOut =document.getElementById("check-amt").innerText;
  
	var showFee = document.getElementById("fee");
	var custAddress = document.getElementById("userAdress").value;
	if(custAddress =="")
	{
		swal("Error!", "Enter the your current address", "error");
		return false;
	}
	else{
		showFee.innerHTML = deliveryFe
		

	
	}
    var tot = parseFloat( checkOut) + parseFloat(deliveryFe) ;

    document.getElementById("check-amt").innerText =tot.toFixed(2);
    
	
	
	
}

function displayTotal()
{
	var delvFee = document.getElementById("fee").innerHTML
	var subtotal = document.getElementById("subTot").innerText
 document.getElementById("check-amt").innerText = subtotal + delvFee;


}

function checkoutOrder()
{
	const query = window.location.search
    const url = new URLSearchParams(query)
   
    const price = url.get("Price")
    var status ="";
    var CustName="";
    var CustSurname="";
  	var orderDate ="";
	var date = new Date()
	var day = date.getDate()
	var month =  date.getMonth() + 1;
	var year = date.getFullYear()


 /*document.querySelector(".current-day").innerHTML = day + "/"+month +"/"+ year*/

   

    auth.onAuthStateChanged((user)=>{
		if(user){
			db.collection("users").doc(user.uid).get().then((perInfo)=>{
                CustName=perInfo.data().Name
                CustSurname =perInfo.data().Surname
				status ="Processing"
				orderDate = day + "/"+month +"/"+ year

				db.collection("ItemsOncart").doc(user.uid).get().then((infoCart)=>{

					const list =document.getElementById("ItemOrder2")
					var div="";
					var html ="";
				
					
					let mydata = infoCart.data().Items;
            let iName = [];
                    for (let index = 0; index < mydata.length; index++) {
                        const element =mydata[index].Name;
                   iName.push(element)
                    }
            console.log(iName)
					var delvFee = document.getElementById("fee").innerHTML
					var totalCart =( parseFloat( price) + parseFloat(delvFee)).toFixed(2);
				db.collection("orders").add(
                {
                   
                  Name: CustName,
                  Surname: CustSurname,
                  Items: iName,

                  TotalPrice: totalCart,
				  OderDate:orderDate,
                  Status:status,
				  orderID:user.uid
				  
				}).then(()=>{
					swal({
						title: "Good job!",
						text: "You have successfully Ordered",
						icon: "success",
						button: "Ok",
					  });setTimeout(()=>{
						window.location.href="userDash.html";
					},2000)
				
				})
			})
			})
			
		}

	})

    if(document.getElementById("userAdress").value != "")
    {
        deliveryGG()
    }
    else
    {
        return false;
    }

   
}
function deliveryGG()
{
	var custAddress = document.getElementById("userAdress").value;
	var custName ="";
	var  custSurname="";
	var custItems="";
	var delivStatus ="Pending"


	auth.onAuthStateChanged((user)=>{
		if(user){

			db.collection("users").doc(user.uid).get().then((info)=>{
				custName=info.data().Name
				custSurname =info.data().Surname
			}).then(()=>{



				db.collection("orders").where("orderID", '==',user.uid).get().then((perInfo)=>{
					let arrayitems =[];
					
					
					perInfo.forEach(element => {
						custItems =element.data().Items
						let cartItems ={selectedItems:element.data().Items,
										totPrice:element.data().TotalPrice,
										orderCustDate:element.data().OderDate
						}
						arrayitems.push(cartItems)
					});
					
					console.log(arrayitems)

					for (let index = 0; index < arrayitems.length; index++) {
						db.collection("deliveries").add(
							{
							   
							  Name: custName,
							  Surname: custSurname,
							  Address:custAddress,
							  AllItems: arrayitems[index].selectedItems,
							  AllTotalPrice: arrayitems[index].totPrice,
							  AllOderDate:arrayitems[index].orderCustDate,
							  Status:delivStatus,
							  delivID:user.uid
							  
							})
						
					}

			})
			
				

			})
				
	
			
		}

	})



}

displayTotal()
///////////////////////////////////////////////////////////////

console.log("running")
///////////////////////////////////////////////////////////////
