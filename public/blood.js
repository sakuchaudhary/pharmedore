var donate = document.getElementById("donate");
var receive = document.getElementById("receive");
var donatebtn = document.getElementById("donatebtn");
var receivebtn = document.getElementById("receivebtn");
var pic = document.getElementById("image");
var ListofDonor = document.getElementById("ListofDonor");
var src1;
var donor=[];
var receiver=[];
var user=[];
var img=[];
var grps=[];

function callonload()
{
    //grpsarray();
    getgrps();
    getusername();
    getStoredImages();
    getdonor();
    getreceiver();
}

function getreceiver()
{
    var xhttp=new XMLHttpRequest();
    xhttp.onreadystatechange= function(){
        if(this.readyState == 4 && this.status == 200){	
            receiver = JSON.parse(xhttp.responseText);
        }
    }
    xhttp.open("GET", "/receiverarray");
    xhttp.send();       
}

function getgrps()
{
    console.log("getfrps");
    var xhttp=new XMLHttpRequest();
    xhttp.onreadystatechange= function(){
        if(this.readyState == 4 && this.status == 200){	
            grps = JSON.parse(xhttp.responseText);
            console.log(grps);
        }
    }
    xhttp.open("GET", "/grparray");
    xhttp.send();       
}

function getdonor()
{
    var xhttp=new XMLHttpRequest();
    xhttp.onreadystatechange= function(){
        if(this.readyState == 4 && this.status == 200){	
            donor = JSON.parse(xhttp.responseText);
        }
    }
    xhttp.open("GET", "/donorarray");
    xhttp.send();       
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
        }
    }
    xhttp.open("GET", "/getusername");
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

donate.addEventListener("click",function()
{
    receivebtn.setAttribute("style","visibility:hidden");
    donatebtn.setAttribute("style","visibility:block;");

    ListofDonor.innerHTML="";
    var h = document.createElement("h1");
    h.innerHTML = "The times you Donated Blood";
    ListofDonor.appendChild(h);
    
    for(var i=0;i<donor.length;i++)
        {
            if(donor[i].username==user.username && donor[i].approved=="yes")
            createDom(donor[i]);
        }
})

receive.addEventListener("click",function()
{
    ListofDonor.innerHTML="";
    donatebtn.setAttribute("style","visibility:hidden");
    receivebtn.setAttribute("style","visibility:block; margin-left:-12%;");

    var h = document.createElement("h1");
    h.innerHTML = "The times you Donated Blood";
    ListofDonor.appendChild(h);
    
    for(var i=0;i<receiver.length;i++)
        {
            console.log("looop");
            if(receiver[i].username==user.username && receiver[i].approved=="yes")
            createDom(receiver[i]);
        }
})

function createDom(obj)
{
    var div1 = document.createElement("div");
    div1.setAttribute("id","div1");
    div1.setAttribute("class","card shadow");
    div1.setAttribute("style","background-color:#e5e8e8");

    var div11 = document.createElement("div11");
    div11.setAttribute("id","div11");
    div11.setAttribute("class","card-body");

    var p1=document.createElement("p");
    p1.setAttribute("class","card-text");
    p1.innerHTML="Name: "+obj.uname;

    var p2 = document.createElement("p");
    p2.setAttribute("class","card-text");
    p2.innerHTML="Age: "+obj.uage;

    var p3=document.createElement("p");
    p3.setAttribute("class","card-text");
    p3.innerHTML="Group: "+obj.ugrp;

    var p4 = document.createElement("p");
    p4.setAttribute("class","card-text");
    p4.innerHTML="Address: "+obj.uaddress;

    var p5 = document.createElement("p");
    p5.setAttribute("class","card-text");
    p5.innerHTML="Contact: "+obj.uphn;

    div11.appendChild(p1);
    div11.appendChild(p2);
    div11.appendChild(p3);
    div11.appendChild(p4);
    div11.appendChild(p5);
    
    div1.appendChild(div11);
    ListofDonor.appendChild(div1);
}

donatebtn.addEventListener("click",function()
{
    var flag=1;
    if(user!=undefined)
        flag=0;
    else
        flag=1;
    
    if(flag==1)
    {
        alert("You need to Login first");
        location.href="/login.html";
    }
    var username=user.username;
    var name = document.getElementById("name").value;
    var age = document.getElementById("age").value;
    var grp = document.getElementById("grp").value;
    var phn = document.getElementById("phn").value;
    var address = document.getElementById("address").value;
    var expr = /^(A|B|O|AB|a|b|o|ab|Ab|aB)[12]$/;
    
    if(name=="" || age=="" || grp=="" || phn=="" || address=="")
    {
        alert("Fill all the Empty Fields");
    }
    else if(age<18)
    {
        alert("Your age must be greater than 18 for donating blood");
    }
    else if(!grp.match(expr))
    {
        alert("Enetr valid blood group");
        document.getElementById("grp").focus();
    }
    else
    {
        var newobj={
            username:username,
            uname:name,
            uage:age,
            ugrp:grp,
            uphn:phn,
            uaddress:address,
            approved:"no"
        }
        donor.push(newobj);
        console.log(donor);
        donordb(donor);
        alert("Congrats.. You can donate");
        confirm("You can come at 12:00 pm in abc hospital");
    }
})

receivebtn.addEventListener("click",function(){
    var flag=1;
    if(user!=undefined)
        flag=0;
    else
        flag=1;
    
    if(flag==1)
    {
        alert("You need to Login first");
        location.href="/login.html";
    }
    var username=user.username;
    var name = document.getElementById("name").value;
    var age = document.getElementById("age").value;
    var grp = document.getElementById("grp").value;
    var phn = document.getElementById("phn").value;
    var address = document.getElementById("address").value;
    var expr = /^(A|B|O|AB|a|b|o|ab|Ab|aB)[12]$/;
    
    if(name=="" || age=="" || grp=="" || phn=="" || address=="")
    {
        alert("Fill all the Empty Fields");
    }
    else if(!grp.match(expr))
    {
        alert("Enetr valid blood group");
        document.getElementById("grp").focus();
    }
    else
    {
        for(var i=0;i<grps.length;i++)
        {
            if(grps[i].grp==grp && grps[i].qty==0)
                alert("Sorry this blood grp "+grps[i].grp+" doesnot exists");
            else if(grps[i].grp==grp && grps[i].qty>0)
            {
                alert(grps[i].qty+" units are avaliable of "+grps[i].grp+" blood group");
                confirm("You can call on this number 9876544321");
                ListofDonor.innerHTML="";
                var h = document.createElement("h4");
                h.innerHTML = "if avaliable call on 9876544321";
                ListofDonor.appendChild(h);

                var newobj={
                    username:username,
                    uname:name,
                    uage:age,
                    ugrp:grp,
                    uphn:phn,
                    uaddress:address,
                    approved:"no"
                }
                receiver.push(newobj);
                console.log(receiver);
                receiverdb(receiver);
            }
        }
    }
})

function donordb(donor)
{
    var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
if (this.readyState == 4 && this.status == 200) {
   
    }
    };
  xhttp.open("POST", "/addonor", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("donorList="+JSON.stringify(donor));
}

function receiverdb(receiver)
{
    var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
if (this.readyState == 4 && this.status == 200) {
   
    }
    };
  xhttp.open("POST", "/addreceiver", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("receiverList="+JSON.stringify(receiver));

}

function grpsarray()
{
    var obj1={
        grp:"a1",
        qty:"0"
    }
    var obj2={
        grp:"a2",
        qty:"0"
    }
    var obj3={
        grp:"b1",
        qty:"0"
    }
    var obj4={
        grp:"b2",
        qty:"0"
    }
    var obj5={
        grp:"ab1",
        qty:"0"
    }
    var obj6={
        grp:"ab2",
        qty:"0"
    }
    var obj7={
        grp:"o1",
        qty:"0"
    }
    var obj8={
        grp:"o2",
        qty:"0"
    }
    grps.push(obj1);
    grps.push(obj2);
    grps.push(obj3);
    grps.push(obj4);
    grps.push(obj5);
    grps.push(obj6);
    grps.push(obj7);
    grps.push(obj8);
    console.log(grps);
    for(var i=0;i<grps.length;i++)
    {
        grpsdb(grps[i]);
    }
    
}

function grpsdb(obj)
{
    console.log(obj);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       
        }
        };
      xhttp.open("POST", "/addgrp", true);
      xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhttp.send("obj="+JSON.stringify(obj));
}
