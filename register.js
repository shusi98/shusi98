console.log("running")
function register()
{
    var nam =document.getElementById("fName").value;
    var namVal = document.getElementById("showVal");

    if( nam == "")
      { 
          namVal.innerHTML="*Field is Required!";
       }

    var sur =document.getElementById("surname").value
    var surVal = document.getElementById("surnameVal");
    if( sur == "")
    { 
        surVal.innerHTML="Field is Required!";
     }


    var userN = document.getElementById("username").value;
    var userNVal = document.getElementById("UsernameVal")

    if( userN =="")
    {
        userNVal.innerHTML = "Field is Required!";
    }
    
     
          
   


    var passW = document.getElementById("password").value;
    var passwVal = document.getElementById("passVal")

    if(passW =="")
    {
        passwVal.innerHTML ="Field is Required!";
        
    }
   
  

    var confP = document.getElementById("confirmPass").value;
    var confPval = document.querySelector(".passVal")

    if(confP == "")
     {
   confPval.innerHTML ="Field is Required!"

     }

 if(confP != passW)
 {
    alert("Password do not match!")
}
    var addr = document.getElementById("postAddress").value;
    var addrVal=document.getElementById("addressVal")
   if(addr =="")
    {
        addrVal.innerHTML ="Field is Required!"
    }


    var cellN = document.getElementById("cell").value;
    var cellVal =document.getElementById("celphoneVal")

    if( cellN == "")
    {
        cellVal.innerHTML = "Field is Required!"
    }

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
            location.href = "userDash.html";

         })
        
     })
     
    }

function signOut()
{

    auth.signOut().then(()=>{
        location.href ="login.html";
    })
}


