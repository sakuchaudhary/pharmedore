var donor=[];
var receiver=[];
var listofDonor = document.getElementById("listofDonor");
var donate = document.getElementById("donate");
var receive = document.getElementById("receive");
var targetParent;
var addbb = document.getElementById("addbb");
var sbtn = document.getElementById("sbtn");

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

donate.addEventListener("click",function(){

    listofDonor.innerHTML="";
    for(var i=0;i<donor.length;i++)
    {
        if(donor[i].approved=="no")
        createDom(donor[i],i);
    }
})

sbtn.addEventListener("click",function(){
    var sname = document.getElementById("sname").value;
    if(sname=="")
    {
        alert("Enetr value in it");
    }
    else
    {
        listofDonor.innerHTML="";
        for(var i=0;i<receiver.length;i++)
        {
            if((receiver[i].username==sname || receiver[i].uname==sname) && receiver[i].approved=="no")
            createDom2(receiver[i],i);
        }

        for(var j=0;j<donor.length;j++)
        {
            if((donor[j].username==sname || donor[j].uname==sname) && donor[j].approved=="no")
            createDom(donor[j],j);
        }
    }
})

receive.addEventListener("click",function(){
    listofDonor.innerHTML="";
    for(var i=0;i<receiver.length;i++)
    {
        if(receiver[i].approved=="no")
        createDom2(receiver[i],i);
    }
})

function createDom(obj,j)
{
    var div1 = document.createElement("div");
    div1.setAttribute("id","div1");
    div1.setAttribute("class","card");
    div1.setAttribute("style","background-color:#e5e8e8");

    var div11 = document.createElement("div11");
    div11.setAttribute("id","div11");
    div11.setAttribute("class","card-body");

    var ctitle1 = document.createElement("h4");
    ctitle1.setAttribute("id","ctitle1");
    ctitle1.setAttribute("class","card-title");
    ctitle1.innerHTML=obj.username;

    var p1=document.createElement("p");
    p1.setAttribute("class","card-text");
    p1.innerHTML="Name: "+obj.uname;

    var p2 = document.createElement("p");
    p2.setAttribute("class","card-text");
    p2.innerHTML="Age: "+obj.uage;

    var p3=document.createElement("h5");
    p3.setAttribute("class","card-text");
    p3.innerHTML="Group: "+obj.ugrp;

    var p4 = document.createElement("p");
    p4.setAttribute("class","card-text");
    p4.innerHTML="Address: "+obj.uaddress;

    var p5 = document.createElement("p");
    p5.setAttribute("class","card-text");
    p5.innerHTML="Contact: "+obj.uphn;

    var p6 = document.createElement("h5");
    p6.setAttribute("class","card-text");
    p6.innerHTML="Blood Bank: "+obj.bname;

    var br = document.createElement("br");

    var dqty = document.createElement("input");
    dqty.setAttribute("class","card-text");
    dqty.setAttribute("type","text");
    dqty.setAttribute("id","dqty");
    dqty.setAttribute("placeholder","QDonated");

    var btnapprove = document.createElement("button");
    btnapprove.setAttribute("id","btnbuy");
    btnapprove.setAttribute("class","btn btn-primary card-link");
    btnapprove.innerHTML="Donated";

    div11.appendChild(ctitle1);
    div11.appendChild(p1);
    div11.appendChild(p2);
    div11.appendChild(p3);
    div11.appendChild(p4);
    div11.appendChild(p5);
    div11.appendChild(p6);
    div11.appendChild(br);  
    div11.appendChild(btnapprove); 
     div11.appendChild(br);

    div1.appendChild(div11);
    listofDonor.appendChild(div1);

    btnapprove.addEventListener("click",function(){
        div11.appendChild(dqty);
        var qty = document.getElementById("dqty").value;
        if(qty=="")
            alert("Enter value in it");
        else
        {
            donor[j].approved = "yes";
            var newobj={
                username:obj.username,
                uname:obj.uname,
                approved:donor[j].approved,
                units:qty,
                bname:obj.bname
            }
            console.log(newobj);
            alert("Approved..!!.. Blood donated");
            updatedonor(newobj);
            grpsarray(obj.ugrp,qty,obj.bname);
            targetParent = event.target.parentNode;
            targetParent.parentNode.removeChild(targetParent);
        }
    })
}
function createDom2(obj,j)
{
    var div1 = document.createElement("div");
    div1.setAttribute("id","div1");
    div1.setAttribute("class","card");
    div1.setAttribute("style","background-color:#e5e8e8");

    var div11 = document.createElement("div11");
    div11.setAttribute("id","div11");
    div11.setAttribute("class","card-body");

    var ctitle1 = document.createElement("h4");
    ctitle1.setAttribute("id","ctitle1");
    ctitle1.setAttribute("class","card-title");
    ctitle1.innerHTML=obj.username;

    var p1=document.createElement("p");
    p1.setAttribute("class","card-text");
    p1.innerHTML="Name: "+obj.uname;

    var p2 = document.createElement("p");
    p2.setAttribute("class","card-text");
    p2.innerHTML="Age: "+obj.uage;

    var p3=document.createElement("h5");
    p3.setAttribute("class","card-text");
    p3.innerHTML="Group: "+obj.ugrp;

    var p4 = document.createElement("p");
    p4.setAttribute("class","card-text");
    p4.innerHTML="Address: "+obj.uaddress;

    var p5 = document.createElement("p");
    p5.setAttribute("class","card-text");
    p5.innerHTML="Contact: "+obj.uphn;

    var br = document.createElement("br");

    var rqty = document.createElement("input");
    rqty.setAttribute("class","card-text");
    rqty.setAttribute("type","text");
    rqty.setAttribute("id","rqty");
    rqty.setAttribute("placeholder","QReceived");

    var p6 = document.createElement("h5");
    p6.setAttribute("class","card-text");
    p6.innerHTML="Blood Bank: "+obj.bname;

    var btnapprove = document.createElement("button");
    btnapprove.setAttribute("id","btnbuy");
    btnapprove.setAttribute("class","btn btn-danger card-link");
    btnapprove.innerHTML="Received";

    div11.appendChild(ctitle1);
    div11.appendChild(p1);
    div11.appendChild(p2);
    div11.appendChild(p3);
    div11.appendChild(p4);
    div11.appendChild(p5);
    div11.appendChild(p6);
    div11.appendChild(btnapprove);  
    div11.appendChild(br);  

    div1.appendChild(div11);
    listofDonor.appendChild(div1);

    btnapprove.addEventListener("click",function(){
        div11.appendChild(rqty);
    
        var qty = document.getElementById("rqty").value;
        if(qty=="")
            alert("Enetr value in it");
        else
        {
            receiver[j].approved = "yes";
            var newobj={
                username:obj.username,
                uname:obj.uname,
                approved:receiver[j].approved,
                units:qty,
                bname:obj.bname
            }
            console.log(newobj);
            alert("Approved..!!.. Blood Received");
            updatereceiver(newobj);
            grpsarrayreceive(obj.ugrp,qty,obj.bname);
            targetParent = event.target.parentNode;
            targetParent.parentNode.removeChild(targetParent);            
        }
    })
}

function check(obj,grp,qty,bname)
{
    var quan=0;
    var grps = grp.toLowerCase();
    var rqty = parseInt(qty);
    if(grps=="a1")
    {
        quan = obj.grp.a1;
        quan-=rqty;
        obj.grp.a1 = quan;
    }
    else if(grps=="a2")
    {
        quan = obj.grp.a2;
        quan-=rqty;
        obj.grp.a2 = quan;
    }
    else if(grps=="b1")
    {
        quan = obj.grp.b1;
        quan-=rqty;
        obj.grp.b1 = quan;
    }
    else if(grps=="b2")
    {
        quan = obj.grp.b2;
        quan-=rqty;
        obj.grp.b2 = quan;
    }
    else if(grps=="ab1")
    {
        quan = obj.grp.ab1;
        quan-=rqty;
        obj.grp.ab1 = quan;
    }
    else if(grps=="ab2")
    {
        quan = obj.grp.ab2;
        quan-=rqty;
        obj.grp.ab2 = quan;
    }
    else if(grps=="o1")
    {
        quan = obj.grp.o1;
        quan-=rqty;
        obj.grp.o1 = quan;
    }
    else if(grps=="o2")
    {
        quan = obj.grp.o2;
        quan-=rqty;
        obj.grp.o2 = quan;
    }
    console.log(quan);
    var newobj={
        name:bname,
        grp:obj.grp
    }
    updatebbdb(newobj);
    console.log(newobj);
}

function grpsarrayreceive(ugrp,rqty,bname)
{
    for(var i=0;i<bloodBank.length;i++)
    {
        if(bloodBank[i].name==bname)
        {
            check(bloodBank[i],ugrp,rqty,bname);
        }
    }
}

function grpsarray(grp,dqty,bname)
{
    for(var i=0;i<bloodBank.length;i++)
    {
        if(bloodBank[i].name==bname)
        {
            checkdonate(bloodBank[i],grp,dqty,bname);
        }
    }
}

function checkdonate(obj,grp,qty,bname)
{
    var quan=0;
    var grps=grp.toLowerCase();
    var rqty = parseInt(qty);
    if(grps=="a1")
    {
        quan = obj.grp.a1;
        quan+=rqty;
        obj.grp.a1 = quan;
    }
    else if(grps=="a2")
    {
        quan = obj.grp.a2;
        quan+=rqty;
        obj.grp.a2 = quan;
    }
    else if(grps=="b1")
    {
        quan = obj.grp.b1;
        quan+=rqty;
        obj.grp.b1 = quan;
    }
    else if(grps=="b2")
    {
        quan = obj.grp.b2;
        quan+=rqty;
        obj.grp.b2 = quan;
    }
    else if(grps=="ab1")
    {
        quan = obj.grp.ab1;
        quan+=rqty;
        obj.grp.ab1 = quan;
    }
    else if(grps=="ab2")
    {
        quan = obj.grp.ab2;
        quan+=rqty;
        obj.grp.ab2 = quan;
    }
    else if(grps=="o1")
    {
        quan = obj.grp.o1;
        quan+=rqty;
        obj.grp.o1 = quan;
    }
    else if(grps=="o2")
    {
        quan = obj.grp.o2;
        quan+=rqty;
        obj.grp.o2 = quan;
    }
    console.log(quan);
    var newobj={
        name:bname,
        grp:obj.grp
    }
    updatebbdb(newobj);
    console.log(newobj);
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

function updatebbdb(obj)
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     
    }
  };
  xhttp.open("POST", "/bbupdate", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  
  xhttp.send("obj="+JSON.stringify(obj));   
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

var bloodBank=[];
addbb.addEventListener("click",function(){  
    var newobj={
        name:"",
        location:"",
         grps:{
            a1:"0",
            a2:"0",
            b1:"0",
            b2:"0",
            ab1:"0",
            ab2:"0",
            o1:"0",
            o2:"0"
        }
    }
    addbbdb(newobj);
    console.log(newobj);
})

function addbbdb(obj)
{
    var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
if (this.readyState == 4 && this.status == 200) {
   
    }
    };
  xhttp.open("POST", "/addbb", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("obj="+JSON.stringify(obj));
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