console.log(generateRef());

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

  function bookSubmit()
{
    var bookDate = document.getElementById("bookDate").value;
    var bookTime = document.getElementById("bookTime").value;
    var bookReservNum = document.getElementById("reservNum").value;
    var random = generateRef();
   
    db.collection("table-booking").add({
        Bookdate:bookDate,
       BookTime:bookTime,
        BookReservNum:bookReservNum,
        Bookref:random
        
    }).then(()=>{
        swal("Success!", "Data Successfully Loaded"+" and Your reference number is :"+random, "success");
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

