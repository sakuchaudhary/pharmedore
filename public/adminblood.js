var donor=[];
var receiver=[];
var listofDonor = document.getElementById("listofDonor");
var donate = document.getElementById("donate");
var receive = document.getElementById("receive");
var grps=[];
var targetParent;

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

donate.addEventListener("click",function(){

    listofDonor.innerHTML="";
    for(var i=0;i<donor.length;i++)
    {
        if(donor[i].approved=="no")
        createDom(donor[i],i);
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

    var p3=document.createElement("p");
    p3.setAttribute("class","card-text");
    p3.innerHTML="Group: "+obj.ugrp;

    var p4 = document.createElement("p");
    p4.setAttribute("class","card-text");
    p4.innerHTML="Address: "+obj.uaddress;

    var p5 = document.createElement("p");
    p5.setAttribute("class","card-text");
    p5.innerHTML="Contact: "+obj.uphn;

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
    div11.appendChild(btnapprove); 
    div11.appendChild(br);
    div11.appendChild(dqty);   

    div1.appendChild(div11);
    listofDonor.appendChild(div1);

    btnapprove.addEventListener("click",function(){
        var dqty = document.getElementById("rqty").value;
        if(dqty=="")
            alert("Enetr value in it");
        else
        {
            donor[j].approved = "yes";
            var newobj={
                username:obj.username,
                uname:obj.uname,
                approved:donor[j].approved
            }
            console.log(newobj);
            alert("Approved..!!.. Blood donated");
            updatedonor(newobj);
            grpsarray(obj.ugrp,dqty);
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

    var p3=document.createElement("p");
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
    div11.appendChild(rqty);
    div11.appendChild(br);
    div11.appendChild(btnapprove);    

    div1.appendChild(div11);
    listofDonor.appendChild(div1);

    btnapprove.addEventListener("click",function(){
        var rqty = document.getElementById("rqty").value;
        if(rqty=="")
            alert("Enetr value in it");
        else
        {
            receiver[j].approved = "yes";
            var newobj={
                username:obj.username,
                uname:obj.uname,
                approved:receiver[j].approved
            }
            console.log(newobj);
            alert("Approved..!!.. Blood donated");
            updatereceiver(newobj);
            grpsarrayreceive(obj.ugrp,rqty);
            targetParent = event.target.parentNode;
            targetParent.parentNode.removeChild(targetParent);            
        }
    })
}

function grpsarrayreceive(ugrp,rqty)
{
    var newq=0;
    for(var i=0;i<grps.length;i++)
    {
        if(grps[i].grp==ugrp)
        {
            grps[i].qty-=rqty;
            newq=grps[i].qty;
        }
    }
    var newobj={
        grp:ugrp,
        qty:newq
    }
    console.log(newobj);
    updategrpdb(newobj);
}

function grpsarray(ugrp,dqty)
{
    var newq=0;
    for(var i=0;i<grps.length;i++)
    {
        if(grps[i].grp==ugrp)
        {
            grps[i].qty+=dqty;
            newq=grps[i].qty;
        }
    }
    var newobj={
        grp:ugrp,
        qty:newq
    }
    console.log(newobj);
    updategrpdb(newobj);
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

function updategrpdb(obj)
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     
    }
  };
  xhttp.open("POST", "/grpupdate", true);
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
