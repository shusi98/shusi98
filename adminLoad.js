console.log("im running")

function aploadproduct()
{
    const storage =firebase.storage().ref("loaded/bevera")
    const file = document.getElementById("imag").files[0]
    const name = new Date() + "-" + file.name;
    const metadata = {contentType: file.type};
    const task =storage.child(name).put(file,metadata);
    task.on("state_changed",function progress(snapshot){

        var percentage =(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        document.getElementById("progress-status").value = percentage;
        document.getElementById("upProgress").innerHTML = "Upload " + percentage + "%"

    })
    task.then((snapshot)=> snapshot.ref.getDownloadURL()).then((URL)=>{
            console.log(URL)
            
    var productName = document.getElementById("product-name").value;
    var productprice = document.getElementById("product-price").value;
    var prodDesc = document.getElementById("product-description").value;
  
    db.collection("loaded").add({
        ProdImage:URL,
        ProdName:productName,
        ProdPrice:productprice,
        ProductDesc:prodDesc,
        
    }).then(()=>{
        swal("Success!", "Data Successfully Loaded", "success");
    })

    })
  

}
//function for retrieve from the database to  show on html
function displayProduct()
{
    db.collection("loaded").onSnapshot((info)=>
    {   const list =document.getElementById("list-product");
        var html=""
        var div=""
        info.forEach(element => {
          div =`
          <div class="col-md-3">
          <div class="firstP">
            <img src="${element.data().ProdImage}" alt="">
          </div>
         <div class="infoProd">
           <h2>${element.data(). ProdName}</h2><br>
           <h3>${element.data().ProductDesc}</h3><br>
           <h4>R ${element.data().ProdPrice}</h4>
             
         </div>
         
         <button class="add">Add to Cart</button>
          
      </div>
          
          
          `


       html += div;
       list.innerHTML=html 
        });
    })

}

