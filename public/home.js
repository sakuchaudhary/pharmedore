var pic = document.getElementById("image");
var donor=[];
var user=[];
var img=[];
var src1;
var expertbtn=document.getElementById("expertbtn");
var bloodbtn = document.getElementById("bloodbtn");
var userbtn = document.getElementById("userbtn");

function callonload()
{
    check();
    getusername();
    getStoredImages();
}

function check()
{
    console.log("inside chck");
    var flag=1;
    if(user!=undefined)
    flag=0;
    else
    flag=1;

    if(flag==1)
    {
        alert("You need to login first");
        location.href="/login.html";
    }
}

expertbtn.addEventListener("click",function()
{
    check();
    if(user!=undefined)
    location.href="/expert.html";
})

bloodbtn.addEventListener("click",function()
{
    check();
    if(user!=undefined)
    location.href='/blood.html';
})

userbtn.addEventListener("click",function()
{
    check();
    if(user!=undefined)
    location.href='/user1.html';
})

function getusername()
{
    console.log('called');
    var xhttp=new XMLHttpRequest();
    xhttp.onreadystatechange= function(){
        if(this.readyState == 4 && this.status == 200){	
            user = JSON.parse(this.responseText);
            console.log("Inside"+user)
            loginInDisplay();
        }
    }
    xhttp.open("GET", "/getusername");
    xhttp.send();
}

function loginInDisplay()
{
    console.log("Logindisply");
    var name = document.getElementById("login");
    var logout = document.getElementById("signup");
        
    
    if(user!=undefined)
    {
        name.setAttribute("style","height:auto; font-weight:bold;");
        logout.setAttribute("style","height:auto; font-weight:bold;");
    
        name.innerHTML = "hello " + user.username;
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
            console.log("login btn");
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
