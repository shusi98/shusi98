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

////////////////////////////////////firebase

function displayProduct()
{
	  
    auth.onAuthStateChanged((user)=>{

        if(user){
    db.collection("products").onSnapshot((info)=>
    {   const list =document.getElementById("table-info");
        var html=""
        var div=""
        info.forEach(element => {
          div =`
       
		<tr>
				<td class="imag">
						<img src="${element.data().ProdImage}">
					<p>${element.data(). ProdName}</p>
				</td>
				<td>${element.data().ProductDesc}</td>
				<td><span>R</span>${element.data().ProdPrice}</td>
				<td class="show">
						<span class="updateIm"> <img src="./img/edit.png" alt= ""  data-toggle="modal" data-target="#myModal"  onclick="viewEachProduct('${element.id}')"></span>
						<span class="deleteIm"> <img src="./img/delete.png" alt="" onclick="removeItem('${element.id}')"></span>
		</td>
			

		</tr>
          `


       html += div;
       list.innerHTML=html 
        });
    })
}
	})

}
var viewedItem =""
function viewEachProduct(id){

db.collection("products").doc(id).get().then((info)=>{
	// get values from database
	document.getElementById("foodName").value = info.data().ProdName;
	document.getElementById("foodPrice").value = info.data().ProdPrice;
	document.getElementById("pDesc").value = info.data().ProductDesc;
	viewedItem= id
	
})

}
function updateProduct(){
	//take entered values and update
	var newName = document.getElementById("foodName").value;

	if(newName =="")
	{
		swal("Error!", "product name must not be empty!", "error");
		return false;
	}
	var newPrice =document.getElementById("foodPrice").value;
	if(newPrice =="")
	{
		swal("Error!", "product price must entered!", "error");
		return false;
	}
	var newdesc =document.getElementById("pDesc").value;
	if(newdesc =="")
	{
		swal("Error!", "product description must not be empty!", "error");
		return false;
	}

	else{
		console.log("clicked")
		db.collection("products").doc(viewedItem).update({
			ProdName: newName,
			ProdPrice:newPrice,
			ProductDesc:newdesc
		}, merge=true).then(()=>{
			swal("Success!", "Item updated successfully!", "success");
			setTimeout(()=>{
				window.location.reload();
			},2000)
		})
	}
		

}
function removeItem(id)
{
	
  
		swal({
			title: "Are you sure?",
			text: "Once deleted,Customer wont be able to order It",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		  })
		  .then((willDelete) => {

			if (willDelete) {
				willDelete=db.collection("products").doc(id).delete();
			  swal("Poof! Item has been deleted!", {
				icon: "success",
			  });
			} else {
			  swal("Your Item is safe!");
			}
		  });


}
displayProduct()