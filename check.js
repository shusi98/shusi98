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










function arrays()
{
   /* var string = "I am a student";
    let array_numbers = [1,2,3,4,5,6,7,8,9,10]
    let arrayAlphaberts =["A","B","C","","","",""]
*/



let arrayNumber =[];

    for(let i =0;i<5;i++)
    {
    
    //console.log("I am running")
    var number = window.prompt("Enter any number")
     arrayNumber.push(number)
    }
    console.log(arrayNumber)
}
function currentTime() {
var date = new Date()
var day = date.getDate()
var month =  date.getMonth() + 1;
var year = date.getFullYear()

document.querySelector(".current-time").innerHTML =date 
document.querySelector(".current-day").innerHTML = day + "/"+month +"/"+ year
document.querySelector(".current-month").innerHTML = month

}

function time(){
   setInterval(() => {
    var date = new Date()
    var hours = date.getHours()
    var minutes = date.getMinutes()
    var seconds = date.getSeconds()
    var time = hours +":"+minutes+":"+seconds
    
    document.querySelector(".working-time").innerHTML = time
   }, 1000);

}
time()
currentTime()