var order=[];
var img=[];
var user=[];
var src1;
var pic = document.getElementById("image");
var ListofMedicine = document.getElementById("ListofMedicine");

function callonload()
{
    locate();
    getusername();
    getStoredImages();
    getorderArray();
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

function getorderArray()
{
    console.log('called carttarry');
    var xhttp=new XMLHttpRequest();
    xhttp.onreadystatechange= function(){
        if(this.readyState == 4 && this.status == 200){	
            order = JSON.parse(xhttp.responseText);
            
            for(var i=0;i<order.length;i++)
            {
                if(order[i].username==user.username)
                createDom(order[i]);
            }
            
        }
    }
    xhttp.open("GET", "/orderarray");
    xhttp.send();       
}

function createDom(obj)
{
    var h = document.createElement("h1");
    h.innerHTML = "PricePaid: "+obj.price;

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

    div11.appendChild(ctitle1);
    div11.appendChild(img1);
    div11.appendChild(p1);
    div11.appendChild(p2);
    div11.appendChild(p3);
  
    div1.appendChild(div11);
    ListofMedicine.appendChild(h);
    ListofMedicine.appendChild(div1);

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
        name.setAttribute("style","height:auto; font-weight:bold;");
    logout.setAttribute("style","height:auto; font-weight:bold;");
    
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
            // getpic();
            // pic.setAttribute("src",src1);
            logout.addEventListener("click",function(event){
            location.href="/";
            logoutfunc();
        });
    }
    else
    {
       // pic.setAttribute("style","visibility:hidden");
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
