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
		document.body.classList.add('blue');
	} else {
		document.body.classList.remove('blue');
	}
})
///////////////////////////////////firebase

function selectAllData()
{
	  
    auth.onAuthStateChanged((user)=>{

        if(user){
    db.collection("users").get().then((AllRecords)=>{
        const list =document.getElementById("table-info")
        var div ="";
        var html ="";

        AllRecords.forEach((currentRecord)=>{

            div =`
			<tr>
			<td class="Name">${currentRecord.data().Name}</td>
			<td>${currentRecord.data().Surname}</td>
			<td>${currentRecord.data().Username}</td>
			<td>${currentRecord.data().Password}</td>
			<td>${currentRecord.data().Cellphone}</td>
			<td>${currentRecord.data().Address}</td>
			<td class="show">
				<span class="updateIm"> <img src="./img/edit.png" alt="" data-toggle="modal" data-target="#myModal" onclick ="viewEachProduct('${currentRecord.id}')"></span>
				<span class="deleteIm"> <img src="./img/delete.png" alt=""  onclick="removeItem('${currentRecord.id}')"></span>
			</td>

		</tr>
       
            `
            html += div
            list.innerHTML =html
        })

    })
}
	})

}
var viewedItem =""
function viewEachProduct(id){

db.collection("users").doc(id).get().then((info)=>{
	// get values from database
	document.getElementById("cell").value = info.data().Cellphone;
	document.getElementById("address").value = info.data().Address;
	viewedItem= id
	
})

}
function updateProduct(){
	//take entered values and update
	var newCellphoneN = document.getElementById("cell").value;
	var newAddress =document.getElementById("address").value;
	
		console.log("clicked")
		db.collection("users").doc(viewedItem).update({
			Cellphone:newCellphoneN,
			Address:newAddress

		}, merge=true).then(()=>{
			swal("Success!", "Item updated successfully!", "success");
			setTimeout(()=>{
				window.location.reload();
			},2000)
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
				willDelete=db.collection("users").doc(id).delete();
			  swal("Poof! Item has been deleted!", {
				icon: "success",
			  });
			} else {
			  swal("Your Item is safe!");
			}
		  });


}
///////////////////////////////////////////////////////////

function register()
{
    console.log("running")
    var nam =document.getElementById("fName").value;
  
    var sur =document.getElementById("surname").value
   
    var userN = document.getElementById("username").value;

    var passW = document.getElementById("password").value;
   
    var confP = document.getElementById("confirmPass").value;
    

    var addr = document.getElementById("postAddress").value;
    
    var cellN = document.getElementById("cellN").value;
  
     auth.createUserWithEmailAndPassword(userN,passW).then(()=>{
         db.collection("users").doc(auth.currentUser.uid).set({
            Name:nam,
            Surname:sur,
            Username:userN,
            Password:passW,
            ConfirmPassword:confP,
            Cellphone:cellN,
            Address:addr


         }, merge=true).then(()=>{
            setTimeout(()=>{
				window.location.reload();
			},2000)
            

         })
        
     })
     
    }

function signOut()
{

    auth.signOut().then(()=>{
        location.href ="adminLogin.html";
    })
}

/*
var searchPath = document.getElementById("searchBar");
var btnSarch = document.getElementById("searchBtn");
var filterCartegory = document.getElementById("catergory");
var tbody = document.getElementById("table-info");


function SearchTable( filterCartegory) {

	var filter = searchPath.value.toUpperCase();
	var tr = tbody.getElementsByTagName("tr");
	var found;

	for(let i = 0 ;i < tr.length;i++)
	{
		var td = tr[i].getElementsByClassName("filterCartegory");
		 for(let j =0 ; j< td.length; j++)
		 {
			 if(td[j].innerHTML.toUpperCase().indexOf(filter) > -1)
			 {
				found =true;
			 }
		 }

		 if(found)
		 { 
			 tr[i].style.display="table-cell"
			 found = false;
		 }
		 else{
			 tr[i].style.display="none";
		 }

	}
   
	btnSarch.onclick = function(){
		console.log("Running")
		if(searchPath.value == "");

		else if(filterCartegory.value ==1)
		{
			SearchTable("Name");
		}

	}
	
}*/

function myFunction() {
	// Declare variables
	var input, filter, table, tr, td, i, txtValue;
	input = document.getElementById("myInput");
	filter = input.value.toUpperCase();
	table = document.getElementById("show");
	tr = table.getElementsByTagName("tr");
  
	// Loop through all table rows, and hide those who don't match the search query
	for (i = 0; i < tr.length; i++) {
	  td = tr[i].getElementsByTagName("td")[0];
	  if (td) {
		txtValue = td.textContent || td.innerText;
		if (txtValue.toUpperCase().indexOf(filter) > -1) {
		  tr[i].style.display = " ";
		} else {
		  tr[i].style.display = "none";
		}
	  }
	}
  }

  function printTable()
  {
	
        document.getElementById('info').innerHTML = "";
        var myTab = document.getElementById('show');

        // LOOP THROUGH EACH ROW OF THE TABLE AFTER HEADER.
        for (i = 1; i < myTab.rows.length; i++) {

            // GET THE CELLS COLLECTION OF THE CURRENT ROW.
            var objCells = myTab.rows.item(i).cells;

            // LOOP THROUGH EACH CELL OF THE CURENT ROW TO READ CELL VALUES.
            for (var j = 0; j < objCells.length-3; j++) {
                info.innerHTML = info.innerHTML + ' ' + objCells.item(j).innerHTML;
            }
            info.innerHTML = info.innerHTML + '<br />';     // ADD A BREAK (TAG).
        }
    
  //var tableData =document.getElementById("show").innerHTML
  //window.print(tableData)
}
  