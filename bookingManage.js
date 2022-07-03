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
////////////////////////////////////////////FIREBASE

function selectAllData()
{
	  
    auth.onAuthStateChanged((user)=>{

        if(user){

	db.collection("bookings").get().then((AllRecords)=>{
		const list =document.getElementById("table-info")
		var div ="";
		var html ="";

		AllRecords.forEach((currentRecord)=>{

			div =`
			<tr>
				<td>${currentRecord.data().Name}</td>
				<td>${currentRecord.data().Surname}</td>
				<td> ${currentRecord.data().Bookdate}</td>
				<td>${currentRecord.data().BookTime}</td>
				<td>${currentRecord.data().BookReservNum}</td>
				<td>${currentRecord.data().Bookref}</td>
				<td class="show">
					<span class="updateIm"> <img src="./img/edit.png" alt=""  data-toggle="modal" data-target="#myModal"  onclick="viewEachProduct('${currentRecord.id}')"></span>
					<span class="deleteIm"> <img src="./img/delete.png" alt="" onclick="removeItem('${currentRecord.id}')"></span>
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

db.collection("bookings").doc(id).get().then((info)=>{
	// get values from database
	document.getElementById("bkDate").value = info.data().Bookdate;
	document.getElementById("bkTime").innerHTML = `	<option value="${info.data().BookTime}">${info.data().BookTime}</option>
											<option value="10:00 Am">10:00 Am</option>
											<option value="11:00 Am">11:00 Am</option>
											<option value="12:00 pm">12:00 pm</option>
											<option value="13:00 pm">13:00 pm</option>
											<option value="14:00 pm">14:00 pm</option>
											<option value="15:00 pm">15:00 pm</option>
											<option value="16:00 pm">16:00 pm</option>
											<option value="17:00 pm">17:00 pm</option>
											<option value="18:00 pm">18:00 pm</option>
											<option value="19:00 pm">19:00 pm</option>
	`
	document.getElementById("noVisitors").innerHTML = `	<option value="${info.data().BookReservNum}">${info.data().BookReservNum}</option>
	<option value="2">2</option>
	<option value="3">3</option>
	<option value="4">4</option>
	<option value="5">5</option>
	<option value="6">6</option>
	<option value="7">7</option>
	<option value="8">8</option>
	
	`
	viewedItem= id
	console.log( info.data().BookTime)
	
})

}
function updateProduct(){
	//take entered values and update
	var newDate = document.getElementById("bkDate").value;
	var newTime =document.getElementById("bkTime").value;
	var newNumberOfVis =document.getElementById("noVisitors").value;

		console.log("clicked")
		db.collection("bookings").doc(viewedItem).update({
			Bookdate: newDate,
			BookTime:newTime,
			BookReservNum:newNumberOfVis
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
				willDelete=db.collection("bookings").doc(id).delete();
			  swal("Poof! Item has been deleted!", {
				icon: "success",
			  });
			} else {
			  swal("Your Item is safe!");
			}
		  });


}
selectAllData()
