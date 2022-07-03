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

//////////////////////////////////////load

function aploadproduct()
{
    const storage =firebase.storage().ref("products/")
    const file = document.getElementById("imag").files[0]
    const name = new Date() + "-" + file.name;
    const metadata = {contentType: file.type};
    const task =storage.child(name).put(file,metadata);
    task.on("state_changed",function progress(snapshot){

        var percentage =(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        document.getElementById("progress-status").value = percentage;
        document.getElementById("upProgress").innerHTML = "Upload " + percentage + "%"

    })
    task.then((snapshot)=> snapshot.ref.getDownloadURL()).then((URL)=>{
            console.log(URL)
            
    var productName = document.getElementById("product-name").value;
	if(productName =="")
	{
		swal("Success!", "product name must not be empty!", "error");
		return false;
	}

    var productprice = document.getElementById("product-price").value;
	if(productprice =="")
	{
		swal("Success!", "product price must be entered!", "error");
		return false;
	}
    var prodDesc = document.getElementById("product-description").value;
  if(prodDesc=="")
  {
	swal("Success!", "product description must be empty", "error");
	return false;
  }
  
  else
  {
	db.collection("products").add({
        ProdImage:URL,
        ProdName:productName,
        ProdPrice:productprice,
        ProductDesc:prodDesc,
        
    }).then(()=>{
        swal("Success!", "Data Successfully Loaded", "success");
        setTimeout(()=>{
            window.location.reload();
        },2000)
    }) 
  }
   

    })
  

}
