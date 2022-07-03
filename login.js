function getIn()
{

  var  verifyUserN =document.getElementById("usernameErr")
  var verifyPassW =document.getElementById("passwordErr")
    console.log("running")
    let userN = document.getElementById("username").value;
    let passW = document.getElementById("password").value; 

    

    auth.signInWithEmailAndPassword(userN,passW).then(()=>{
       if(userN != "" && passW !="")
       {
        location.href ="userdash.html";
       }
      
        
    }).catch(function(error){

        if( userN == "" && passW =="") 
        {
         verifyUserN.innerHTML ="Username required"  
         verifyPassW.innerHTML ="Password Required"
         
        }
        else
        {
            newFunction();
            setTimeout(()=>{
				window.location.reload();
			},1000)
            
        }
 
        
       
       
    })
    

    function newFunction() {
        alert("User not found!");
    }
}