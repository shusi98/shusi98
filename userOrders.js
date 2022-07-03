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
function signOut()
{

    auth.signOut().then(()=>{
        location.href ="userLogin.html";
    })
}


function selectAllData()
{
 
    auth.onAuthStateChanged((user)=>{

        if(user){
          db.collection("users").doc(user.uid).get().then((info)=>{
			console.log(info.data().Name)
                    db.collection("orders").where("orderID", '==',user.uid).get().then((have)=>{
                        const list =document.getElementById("table-info")
                        var div ="";
                        var html ="";

                        have.forEach((currentRecord)=>{
							console.log(currentRecord.data().Items)
                            div =`
                            <tr>
								<td>${info.data().Name}</td>
								<td>${info.data().Surname}</td>
                                <td> ${currentRecord.data().Items}</td>
                                <td>${currentRecord.data().TotalPrice}</td>
                                <td>${currentRecord.data().OderDate}</td>
                                <td>${currentRecord.data().Status}</td>
                               
                            </tr>

                    
                            `
                            html += div
                         
                              list.innerHTML =html
                        
		            })
                

	            })
            })
        }
       
    })
   
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
				willDelete=db.collection("orders").doc(id).delete();
			  swal("Poof! Item has been deleted!", {
				icon: "success",
			  });
			} else {
			  swal("Your Item is safe!");
			}
		  });


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
selectAllData()
getuserN()
