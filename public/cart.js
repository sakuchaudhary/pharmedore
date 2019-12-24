var user=[];
var img=[];
var category=[];
var medArray=[];
var cartArray=[];
var order=[];
var targetParent;
var src1;
var price=0;
var pic = document.getElementById("image");
var ListofMedicine = document.getElementById("ListofMedicine");
var purchasebtn = document.getElementById("purchasebtn");

function callonload()
{
    locate();
    getusername();
    getStoredImages();
    getmedicine();
    getcartArray();
}

purchasebtn.addEventListener("click",function()
{
   if(!checkCart())
   {
     alert("Your Cart is empty.");
   }
   else if(quanEmpty())
   {
     alert("Some Products Are Out Of Stock !");
     location.href="user1.html";
   }
   else
   {
        for(var i=0;i<cartArray.length;i++)
        {
            if(user.username==cartArray[i].username)
                orderArray(cartArray[i]);    
        }
        for(var i=0;i<cartArray.length;i++)
        {
            var temp = deleteFromCart(cartArray[i].mname);
            if(temp!=-1)
            {
                var ind = getIndex(cartArray[i].mname);
                medArray[ind].mquan = medArray[ind].mquan-cartArray[i].mquan;
                console.log(medArray[ind].mquan);
                cartArray.splice(temp,1);
                console.log(cartArray);
                i--;
            }
        }
        emptyCart(user.username);
        updateMedicine(medArray);
        for(var i=0;i<cartArray.length;i++)
        {
            if(cartArray[i].username==user.username)
            createDom(cartArray[i]);
        }
        alert("Thank You for Shopping");
       // location.href="/orders.html";
    }
    
})

function updateMedicine(medArray)
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     
    }
  };
  xhttp.open("POST", "/updatemedicne", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  xhttp.send("medList="+JSON.stringify(medArray));
}

function emptyCart(username)
{
    var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
   
  }
};
xhttp.open("POST", "/emptycart", true);
xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

xhttp.send("username="+JSON.stringify(username));
}

function getIndex(mname)
{
    for(var i=0;i<medArray.length;i++)
    {
        if(medArray[i].mname==mname)
        return i;
    }
    return -1;
}
function deleteFromCart(mname)
{
    for(var i=0;i<cartArray.length;i++)
    {
        if(cartArray[i].username==user.username && cartArray[i].mname==mname)
        return i;
    }
    return -1;
}

function checkCart()
{
    for(var i=0;i<cartArray.length;i++)
    {
        if(cartArray[i].username==user.username)
            return true;
    }
    return false;
}

function quanEmpty()
{
    for(var i=0;i<cartArray.length;i++)
    {
        if(cartArray[i].username==user.username)
        {
            for(var j=0;j<medArray.length;j++)
            {
                if(cartArray[i].mname==medArray[j].mname && medArray[j].mquan<=0)
                return true;
            }
        }
    }
    return false;
}
function orderArray(obj)
{
    var newobj = {
        username:user.username,
        mname:obj.mname,
        mdesc:obj.mdesc,
        mprice:obj.mprice,
        mquan:obj.mquan,
        pricepaid:price
    }
    order.push(newobj);
    addOrderdb(order);
}

function addOrderdb(order)
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
   
    }
  };
  xhttp.open("POST", "/orderarray", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("order="+JSON.stringify(order));
}

function locate()
{
    var flag=0;
    if(user!=undefined)
        flag=1;

    if(flag==0)
    {
       pic.setAttribute("style","visibility:hidden");
        alert("You need to login first");
        location.href="/login.html";
    }    
}

function getusername()
{
    console.log('called');
    var xhttp=new XMLHttpRequest();
    xhttp.onreadystatechange= function(){
        if(this.readyState == 4 && this.status == 200){	
            user = JSON.parse(this.responseText);
            console.log("Inside"+user)
            loginInDisplay();
            // getCart();
        }
    }
    xhttp.open("GET", "/getusername");
    xhttp.send();
}

function getStoredImages()
{
var xhttp=new XMLHttpRequest();
   
    xhttp.onreadystatechange=()=>{
    if(xhttp.readyState == 4 && xhttp.status == 200){
     
        img = JSON.parse(xhttp.responseText);
        loginInDisplay(); 
    }
   }
  xhttp.open("GET", "/addimg", true);
  xhttp.send();  
}

function getmedicine()
{
    var xhttp=new XMLHttpRequest();
    console.log("inside getmedicine");
    xhttp.onreadystatechange=()=>{
        if(xhttp.readyState == 4 && xhttp.status == 200){
          console.log(xhttp.responseText);
          medArray = JSON.parse(xhttp.responseText);
        }
    }
    xhttp.open("GET", "/medicine", true);
    xhttp.send();  
}

function getcartArray()
{
    console.log('called carttarry');
    var xhttp=new XMLHttpRequest();
    xhttp.onreadystatechange= function(){
        if(this.readyState == 4 && this.status == 200){	
            cartArray = JSON.parse(xhttp.responseText);
            
            for(var i=0;i<cartArray.length;i++)
            {
                if(cartArray[i].username==user.username)
                createDom(cartArray[i]);
            }
            totalPrice(cartArray);
        }
    }
    xhttp.open("GET", "/cartarray");
    xhttp.send();       
}

function totalPrice(cartArray)
{
    for(var i=0;i<cartArray.length;i++)
    {
        if(user.username==cartArray[i].username)
        {
            price=price+(cartArray[i].mprice*cartArray[i].mquan);
        }
    }
    var h = document.getElementById("total");
    h.innerHTML = "TotalPrice: "+price;
}

function createDom(obj)
{
    var div1 = document.createElement("div");
    div1.setAttribute("id","div1");
    div1.setAttribute("class","card");
    div1.setAttribute("style","background-color:#e5e8e8")
   
    var div11 = document.createElement("div11");
    div11.setAttribute("id","div11");
    div11.setAttribute("class","card-body");

    var ctitle1 = document.createElement("h4");
    ctitle1.setAttribute("id","ctitle1");
    ctitle1.setAttribute("class","card-title");
    ctitle1.innerHTML=obj.mname;

    var img1 = document.createElement("img");
    img1.setAttribute("id","img1");
    img1.setAttribute("src","./medimages/"+obj.mname+".jpg");
    img1.setAttribute("height","100px");
    img1.setAttribute("width","150px");

    var p1=document.createElement("p");
    p1.setAttribute("class","card-text");
    p1.innerHTML="Description: "+obj.mdesc;

    var p2 = document.createElement("p");
    p2.setAttribute("class","card-text");
    p2.innerHTML="Price: "+obj.mprice;

    var p3 = document.createElement("p");
    p3.setAttribute("class","card-text");
    p3.innerHTML="Quantity: "+obj.mquan;

    var br = document.createElement("br");

    var btnedit = document.createElement("button");
    btnedit.setAttribute("id","btncontinue");
    btnedit.setAttribute("class","btn btn-primary card-link");
    btnedit.innerHTML="Edit";

    var btndel = document.createElement("button");
    btndel.setAttribute("id","btndel");
    btndel.setAttribute("class","bnt btn-primary card-link");
    btndel.innerHTML="Delete";

    div11.appendChild(ctitle1);
    div11.appendChild(img1);
    div11.appendChild(p1);
    div11.appendChild(p2);
    div11.appendChild(p3);
    div11.appendChild(br);
    div11.appendChild(br);
    div11.appendChild(btnedit);
    div11.appendChild(btndel);
  
    div1.appendChild(div11);
    ListofMedicine.appendChild(div1);

    btnedit.addEventListener("click",function()
    {
        location.href="/user1.html";
        //editMedicine(obj.category,obj.mname,obj.mdesc,obj.mprice,obj.mquan)
    })

    btndel.addEventListener("click",function()
    {
        var newobj={
            username:user.username,
            mname:obj.mname
        }
        console.log(newobj);
        deleteMedicine(obj,newobj);
    })
}

function deleteMedicine(obj,newobj)
{
    var pos=-1;
    console.log(obj.mname);
    targetParent = event.target.parentNode;
    for(var i=0;i<medArray.length;i++)
    {
        if(obj.mname==cartArray[i].mname && cartArray[i].username==user.username)
        {
            pos=i;
            break;
        }
    }
    removeFromArray(pos);
    deleteFromDatabase(newobj);
    targetParent.parentNode.removeChild(targetParent);
}

function deleteFromDatabase(obj)
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     
    }
  };
  xhttp.open("POST", "/deletecartArray", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("obj="+JSON.stringify(obj));
}

function removeFromArray(pos)
{
    cartArray.splice(pos,1);
    totalPrice(cartArray);
    console.log(medArray);
}

function logoutfunc()
{
    console.log('called logout');
    var xhttp=new XMLHttpRequest();
    xhttp.onreadystatechange= function(){
        if(this.readyState == 4 && this.status == 200){	
            
        }
    }
    xhttp.open("GET", "/logout");
    xhttp.send();   
}

function loginInDisplay()
{
    var name = document.getElementById("login");
    var logout = document.getElementById("signup");
    
    if(user!=undefined)
    {
        name.innerHTML = "hello" + user.username;
        logout.innerHTML = "logout";
        console.log(img);
        for(var i=0;i<img.length;i++)
        {
            if(user.username==img[i].username)
            {
                src1=img[i].imageurl;
            }
        }
            getpic();
            pic.setAttribute("src",src1);
            logout.addEventListener("click",function(event){
            location.href="/";
            logoutfunc();
        });
    }
    else
    {
        pic.setAttribute("style","visibility:hidden");
        name.innerHTML = "login";
        logout.innerHTML = "signup";
        login.addEventListener("click",function(event)
        {
            location.href="login.html";
        })
        logout.addEventListener("click",function(event)
        {
            location.href="signup.html";
        })
    }
}

function getpic()
{
    var xhttp=new XMLHttpRequest();
    xhttp.onreadystatechange= function(){
        if(this.readyState == 4 && this.status == 200){	
            
        }
    }
    xhttp.open("POST", "/getpic");
    xhttp.setRequestHeader("Content-type", "image/jpg");
    xhttp.send();  
}
