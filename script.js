
function show()
{
    
    var productPrice = document.getElementById("price").innerHTML;
    var productName = document.getElementById("productname").innerHTML;
        var prdn=document.getElementById("nm");
    var prodP = document.getElementById("prc");
    

     getProductName(productName);

        console.log(getProductName(productName))

        prdn.innerHTML = getProductName(productName);
        prodP.innerHTML =productPrice
            
       
        


}

function getProductName( prn)
{

    const list = [prn]

    for(let i = 0; i < list.length; i++)
        {
            prn += list[i] 

        return prn
        }
}