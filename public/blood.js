var donate = document.getElementById("donate");
var receive = document.getElementById("receive");
var donatebtn = document.getElementById("donatebtn");
var receivebtn = document.getElementById("receivebtn");
var pic = document.getElementById("image");
var ListofDonor = document.getElementById("ListofDonor");
var src1;
var donor=[];
var receiver=[];
var bloodBank=[];
var user=[];
var img=[];

function callonload()
{
    getusername();
    getStoredImages();
    getdonor();
    getreceiver();
    getbb();
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

function getbb()
{
    var xhttp=new XMLHttpRequest();
    xhttp.onreadystatechange= function(){
        if(this.readyState == 4 && this.status == 200){	
            bloodBank = JSON.parse(xhttp.responseText);
        }
    }
    xhttp.open("GET", "/getbb");
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
    h.innerHTML = "The times you Received Blood";
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

    var p6 = document.createElement("h4");
    p6.setAttribute("class","card-text");
    p6.innerHTML="Units: "+obj.units;

    var p4 = document.createElement("p");
    p4.setAttribute("class","card-text");
    p4.innerHTML="Address: "+obj.uaddress;

    var p5 = document.createElement("p");
    p5.setAttribute("class","card-text");
    p5.innerHTML="Contact: "+obj.uphn;

    var p7 = document.createElement("p");
    p7.setAttribute("class","card-text");
    p7.innerHTML="BloodBank: "+obj.bname;

    div11.appendChild(p1);
    div11.appendChild(p2);
    div11.appendChild(p3);
    div11.appendChild(p6);
    div11.appendChild(p4);
    div11.appendChild(p5);
    div11.appendChild(p7);
    
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
            approved:"no",
            units:"0",
            bname:""
        }
        donor.push(newobj);
        console.log(donor);
        donordb(donor);

        ListofDonor.innerHTML="";
        alert("Congrats.. You can donate");
        var h = document.createElement("h2");
        h.innerHTML = "Chooose ur Location of Bloodbank";
        ListofDonor.appendChild(h);

        for(var i=0;i<bloodBank.length;i++)
        {
            if(bloodBank[i].name!="" || bloodBank[i].location!="")
            addtoDom2(bloodBank[i],name);
        }
    }
})

function addtoDom2(obj,name)
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
    p1.innerHTML="Name: "+obj.name;

    var p2 = document.createElement("p");
    p2.setAttribute("class","card-text");
    p2.innerHTML="Location: "+obj.location;

    var br = document.createElement("br");

    var btnchoose = document.createElement("button");
    btnchoose.setAttribute("id","btnchoose");
    btnchoose.setAttribute("class","btn btn-primary card-link");
    btnchoose.innerHTML="Choose";

    div11.appendChild(p1);
    div11.appendChild(p2);
    div11.appendChild(br);
    div11.appendChild(btnchoose);
    
    div1.appendChild(div11);
    ListofDonor.appendChild(div1);

    btnchoose.addEventListener("click",function(){
        alert("You can donate ur blood in "+obj.name+" at "+obj.location);
        confirm("Confirm your donation");
        var newobj={
            username:user.username,
            uname:name,
            bname:obj.name,
            units:"0",
            approved:"no"
        }
        updatedonor(newobj);
        ListofDonor.innerHTML="";
    })
}

function updatedonor(obj)
{
    var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
   
  }
};
xhttp.open("POST", "/donorupdate", true);
xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

xhttp.send("obj="+JSON.stringify(obj));
}

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
        var newobj={
            username:username,
            uname:name,
            uage:age,
            ugrp:grp,
            uphn:phn,
            uaddress:address,
            approved:"no",
            units:"0",
            bname:""
        }
        receiver.push(newobj);
        console.log(receiver);
        receiverdb(receiver);

        ListofDonor.innerHTML="";
        var h = document.createElement("h2");
            h.innerHTML = "Names and locations of BloodBank";
            ListofDonor.appendChild(h);
        var p = document.createElement("p");
            p.innerHTML = "If nothing showes it means "+grp+" blood grp is not availiabe";
            ListofDonor.appendChild(p);

        for(var i=0;i<bloodBank.length;i++)
        {
            func(bloodBank[i],grp,name);
        }
    }
})

function func(obj,grps,name)
{
    console.log(obj);
    var quan=-1;
    if(grps=="a1")
        quan = obj.grp.a1;
    else if(grps=="a2")
        quan = obj.grp.a2;
    else if(grps=="b1")
        quan = obj.grp.b1;
    else if(grps=="b2")
        quan = obj.grp.b2;
    else if(grps=="ab1")
        quan = obj.grp.ab1;
    else if(grps=="ab2")
        quan = obj.grp.ab2;
    else if(grps=="o1")
        quan = obj.grp.o1;
    else if(grps=="o2")
        quan = obj.grp.o2;
    console.log(quan);

        if(quan>0)
        {
               var newobj= {
                name:obj.name,
                location:obj.location,
                grp:grps,
                units:quan
            }
            addToDom(newobj,name);
            console.log(newobj);
        }
}

function addToDom(obj,name)
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
    p1.innerHTML="Name: "+obj.name;

    var p2 = document.createElement("p");
    p2.setAttribute("class","card-text");
    p2.innerHTML="Location: "+obj.location;

    var p3=document.createElement("p");
    p3.setAttribute("class","card-text");
    p3.innerHTML="Group: "+obj.grp;

    var p4 = document.createElement("h4");
    p4.setAttribute("class","card-text");
    p4.innerHTML="Units: "+obj.units;

    var br = document.createElement("br");

    var btnchoose = document.createElement("button");
    btnchoose.setAttribute("id","btnchoose");
    btnchoose.setAttribute("class","btn btn-danger card-link");
    btnchoose.innerHTML="Choose";

    div11.appendChild(p1);
    div11.appendChild(p2);
    div11.appendChild(p3);
    div11.appendChild(p4);
    div11.appendChild(br);
    div11.appendChild(btnchoose);
    
    div1.appendChild(div11);
    ListofDonor.appendChild(div1);

    btnchoose.addEventListener("click",function(){
        alert("You can Receive blood in "+obj.name+" at "+obj.location);
        confirm("Confirm your Location");
        var newobj={
            username:user.username,
            uname:name,
            bname:obj.name,
            units:"0",
            approved:"no"
        }
        updatereceiver(newobj);
        console.log(newobj.bname);
        ListofDonor.innerHTML="";
    })
}

function updatereceiver(obj)
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     
    }
  };
  xhttp.open("POST", "/receiverupdate", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  
  xhttp.send("obj="+JSON.stringify(obj));
}

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
