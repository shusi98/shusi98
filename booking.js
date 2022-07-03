
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

//////////////////////////////////////////////////////////////////////////////////////////

function bookSubmit()
{
    var bookDate = document.getElementById("bookDate").value;
    var bookTime = document.getElementById("bookTime").value;
    var bookReservNum = document.getElementById("reservNum").value;
    var random = generateRef();
    var userName ="";
    var userSurn ="";
    var userEmail="";
   
    auth.onAuthStateChanged((user)=>{

      if(user){
        db.collection("users").doc(user.uid).get().then((info)=>{

          userName = info.data().Name;
          userSurn = info.data().Surname;
          userEmail =info.data().Username
          db.collection("bookings").add({
            Name:userName,
            Surname:userSurn,
              Bookdate:bookDate,
             BookTime:bookTime,
              BookReservNum:bookReservNum,
              Bookref:random,
              IDbooking:user.uid
              
          }).then(()=>{
            Email.send({
              Host : "smtp.gmail.com",
              Username : "sydneyshusi@gmail.com",
              Password : "cleiocpxdabukpvk",
              To : userEmail,
              From : "sydneyshusi@gmail.com",
              Subject :" shisanyama & lifestyle sent you an email",
              Body :  `<strong style="color:red;">${userName}</strong> </br>
              <button style="backgound-color:blue;color:black"> <a href="https://console.firebase.google.com/u/0/project/letsi-igawulo/firestore/data/~2FAdmin~2FGbWLK9FR4vNiiEIQP9AYmWxC54f1"> track-order</a></button>
              `+ " you have successfully booked a table and this is your unique ref number  :"+ random
          }).then(
            ()=>{
              swal("Success!", "Booking succesful made"+" and Your reference number is :"+random, "success");
              setTimeout(()=>{
                window.location.reload();
              },2000)
            });
           
          })
        })
   
  }
})

}

function generateRef()
{
  var randomString = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz"
  for(var i, i = 0;i<8;i++)
  {
    randomString += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return randomString
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


