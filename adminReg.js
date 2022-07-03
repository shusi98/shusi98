
function register()
{ console.log("running")
var nam =document.getElementById("fName").value;
var namVal = document.getElementById("showVal");

if( nam == "")
  { 
      namVal.innerHTML="*Field is Required!";
   }
   else{
       namVal.innerHTML="";
   }

var sur =document.getElementById("surname").value
var surVal = document.getElementById("surnameVal");
if( sur == "")
{ 
    surVal.innerHTML="Field is Required!";
 }
 else
{
    surVal.innerHTML="";
}

var userN = document.getElementById("username").value;
var userNVal = document.getElementById("UsernameVal")

if( userN =="")
{
    userNVal.innerHTML = "Field is Required!";
}
else{
    userNVal.innerHTML=""; 
}

checkEmail()
      



var passW = document.getElementById("password").value;
var passwVal = document.getElementById("passVal")

if(passW =="")
{
    passwVal.innerHTML ="Field is Required!";
    
}
else
{
    passwVal.innerHTML ="";
}



var confP = document.getElementById("confirmPass").value;
var confPval = document.querySelector(".passVal")

if(confP == "")
 {
confPval.innerHTML ="Field is Required!"

 }
 else
 {
    confPval.innerHTML =""; 
 }

if(confP != passW)
{
confPval.innerHTML ="Password do not match!"
return false;
}
var addr = document.getElementById("postAddress").value;
var addrVal=document.getElementById("addressVal")
if(addr =="")
{
    addrVal.innerHTML ="Field is Required!"
}
else
{
    addrVal.innerHTML=""; 
}


var cellN = document.getElementById("cell").value;
var cellVal =document.getElementById("celphoneVal")

if( cellN == "")
{
    cellVal.innerHTML = "Field is Required!"
}
else
{
    cellVal.innerHTML =""; 
}
 if(isNaN(cellN))
 {
     cellVal.innerHTML="Number must be a digit!"
 }
 var logUser ="admin";
     auth.createUserWithEmailAndPassword(userN,passW).then(()=>{
         db.collection("users").doc(auth.currentUser.uid).set({
            Name:nam,
            Surname:sur,
            Username:userN,
            Password:passW,
            ConfirmPassword:confP,
            Cellphone:cellN,
            Address:addr,
            Status:logUser
            


         }, merge=true).then(()=>{
             
            location.href = "adminJungle.html";

         })
        
     })
     
    }

    function checkEmail() {

        var email = document.getElementById('username');
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    
        if (!filter.test(email.value)) {
            var userNVal = document.getElementById("UsernameVal")
            userNVal.innerHTML="Please enter e valid email"
        email.focus;
        return false;
     }
    }
    
   
