
function getIn()
{

    console.log("running")
    var userN = document.getElementById("username").value;
    var passW = document.getElementById("password").value; 

   
    
        auth.signInWithEmailAndPassword(userN,passW).then(()=>{
          
    auth.onAuthStateChanged((user)=>{

        if(user){

               db.collection("users").doc(user.uid).get().then((info)=>{

                if(info.data().Status == "admin")
                {
                    location.href ="adminJungle.html";
                    
                }
                else
                {
                    swal("error!", "You're a customer! ", "error");
                }
                   
             
               })
                     
        
        }
    })   

        }).catch(function(error){
            swal("error!", "you are not registered", "error");
        })
        
    
    
   
}