function displayUserInfo()
{
    auth.onAuthStateChanged((user)=>{
        if(user)
        {
            db.collection("users").doc(user.uid).get().then((info)=>{
                console.log(info.data().username)

                document.querySelector(".username").innerHTML=info.data().Username;

            }) 
        }

    })

}
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }