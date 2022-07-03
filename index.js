function signOut()
{

    auth.signOut().then(()=>{
        location.href ="adminLogin.html";
    })
}
