
function getIn()
{

    console.log("running")
    var userN = document.getElementById("username").value;
    var passW = document.getElementById("password").value; 

   
    
        auth.signInWithEmailAndPassword(userN,passW).then(()=>{
          
   

    
               db.collection("users").doc(auth.currentUser.uid).get().then((info)=>{

                if(info.data().Status == "customer")
                {
                    location.href ="userdash.html";
                   
                }
                else
                {
                    swal("error!", "you are an admin", "error");
                }
                   
             
               })
                      

        }).catch(function(error){
            swal("error!", "you are not a registered user", "error");
        })
    
   
}


function signOut()
{

    auth.signOut().then(()=>{
        location.href ="userLogin.html";
    })
}