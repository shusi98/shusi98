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
function signOut()
{

    auth.signOut().then(()=>{
        location.href ="userLogin.html";
    })
}




$(document).ready(function() {

    
    var readURL = function(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('.avatar').attr('src', e.target.result);
            }
    
            reader.readAsDataURL(input.files[0]);
        }
    }
    

    $(".file-upload").on('change', function(){
        readURL(this);
    });
});

////////////////////////////////////////////////////////////////////
function displayUserinfo()
{
	
    auth.onAuthStateChanged((user)=>{
        if(user){
            db.collection("users").doc(user.uid).get().then((info)=>{
                // get values from database
                document.getElementById("first_name").value = info.data().Name;
                document.getElementById("last_name").value = info.data().Surname;
                document.getElementById("phone").value = info.data().Cellphone;
                document.getElementById("phoneADD").value = info.data().Address;
				
				
            })     
        } else{
            console.log("user logged out")
        }
    }) 
   

}


function updateProduct(){
	//take entered values and update
	var newName = document.getElementById("first_name").value;
	var newSurname =document.getElementById("last_name").value;
    var newCellphone =document.getElementById("phone").value;
    var newAddress =document.getElementById("phoneADD").value;
	
		console.log("clicked")
        auth.onAuthStateChanged((user)=>{

            if(user){
		db.collection("users").doc(user.uid).update({
            Name:newName,
            Surname: newSurname,
            Username: newSurname,
            Cellphone:newCellphone,
            Address: newAddress

		}, merge=true).then(()=>{
			swal("Success!", "Profile updated successfully!", "success");
			setTimeout(()=>{
				window.location.reload();
			},2000)
		})
    }
})
}

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
getuserN()
displayUserinfo()