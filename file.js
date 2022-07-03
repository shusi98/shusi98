function aploadproduct()
{
    const storage =firebase.storage().ref("products/")
    const file = document.getElementById("chooseFile").files[0]
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
    })
  


    /*var productName = document.getElementById("product-name").value;
    var productprice = document.getElementById("product-price").value;
    var prodDesc = document.getElementById("product-description").value;
    
  

    db.collection("product").add({
        ProdName:productName,
        ProdPrice:productprice,
        ProductDesc:prodDesc
    }).then(()=>{
        alert("data successfully added")
    })*/
}
//function for retrieve from the database to  show on html
function displayProduct()
{
    db.collection("product").onSnapshot((info)=>
    {   const list =document.getElementById("list-product");
        var html=""
        var div=""
        info.forEach(element => {
           div =` <div class="col-md-3">
           <h3>${element.data(). ProdName}</h3>
           <h4>${element.data().ProdPrice}</h4>
           <h5>${element.data().ProductDesc}</h5>
       </div>`
       html += div;
       list.innerHTML=html 
        });
    })

}