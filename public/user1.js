var user=[];
var img=[];
var category=[];
var medArray=[];
var cartArray=[];
var ListofMedicine = document.getElementById("ListofMedicine");
var ulist1 = document.getElementById("ulist1");
var src1;
var scategorybtn = document.getElementById("scategorybtn");
var scategory = document.getElementById("scategory");
var heading = document.getElementById("heading");
var pic = document.getElementById("image");
var allmed = document.getElementById("allmed");

function callonload()
{
    getusername();
    getStoredImages();
    getcategory();
    getmedicine();
    getcartArray();
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

function getcategory()
{
    var xhttp=new XMLHttpRequest();
    console.log("inside getcatergry");
    xhttp.onreadystatechange=()=>{
        if(xhttp.readyState == 4 && xhttp.status == 200){
          console.log(xhttp.responseText);
          category = JSON.parse(xhttp.responseText);
          console.log(category);
          getcategoryDom(category);
        }
    }
    xhttp.open("GET", "/category", true);
    xhttp.send();  
}

function getcategoryDom(category)
{
    for(var i=0;i<category.length;i++)
    {
        var item1 = document.createElement("li");
        item1.setAttribute("id","item1");
        item1.setAttribute("style","text-align : center;");
        ulist1.appendChild(item1);
        item1.innerHTML=category[i].vcategory;
    }
    document.getElementById("scategory").focus();
}

allmed.addEventListener("click",function()
{
    display();
})

function getmedicine()
{
    var xhttp=new XMLHttpRequest();
    console.log("inside getmedicine");
    xhttp.onreadystatechange=()=>{
        if(xhttp.readyState == 4 && xhttp.status == 200){
          console.log(xhttp.responseText);
          medArray = JSON.parse(xhttp.responseText);

          for(var i=0;i<medArray.length;i++)
            createDom(medArray[i]);
        }
    }
    xhttp.open("GET", "/medicine", true);
    xhttp.send();  
}

scategorybtn.addEventListener("click",function()
{
    var flag=0;
    var newj=-1;
    if(scategory.value=="")
    {
        alert("Enter category that you want to search");
        scategory.focus();
    }
    else
    {
        for(var i=0;i<category.length;i++)
        {
            if(scategory.value==category[i].vcategory)
            {
                newj=i;
                flag=1;
                break;
            }
        }
        if(flag==0)
        {
            alert("No such category exits...choose among the above categories");
            display();
        }
        else if(flag==1)
        {
            var flag2=0,c=0;
            ListofMedicine.innerHTML="";
            var h = document.createElement("h1");
            h.innerHTML = "Category: "+scategory.value;
            ListofMedicine.appendChild(h);
                for(var j=0;j<medArray.length;j++)
                {
                    if(medArray[j].category==category[newj].vcategory)
                    {
                        flag2=1;
                        createDom(medArray[j]);
                    }
                }
            if(flag2==0)
            {
                alert("No medicine t display in this Caegory");
                display();
            }
        }
    }
})

function display()
{
    ListofMedicine.innerHTML="";

    var h = document.createElement("h1");
    h.innerHTML = "All Medicines";
    ListofMedicine.appendChild(h);

    for(var i=0;i<medArray.length;i++)
      createDom(medArray[i],1);
}

function createDom(obj)
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

    var br = document.createElement("br");

    var btnbuy = document.createElement("button");
    btnbuy.setAttribute("id","btnbuy");
    btnbuy.setAttribute("class","btn btn-primary card-link");
    btnbuy.innerHTML="Buy";

    var btncart = document.createElement("button");
    btncart.setAttribute("id","btncart");
    btncart.setAttribute("class","btn btn-primary");
    btncart.setAttribute("style","margin-left:2%");
    btncart.innerHTML = "Cart";

    if(obj.mquan>0)
    {
        var quan = document.createElement("input");
        quan.setAttribute("class","card-text");
        quan.setAttribute("id","quan");
        quan.setAttribute("type","text");
        quan.setAttribute("placeholder","Enter Quantity");
    }
    else if(obj.mquan==0)
    {
        var quan = document.createElement("p");
        quan.setAttribute("class","card-text");
        quan.setAttribute("style","color:red");
        quan.innerHTML="Out of Stock!";
        btnbuy.disabled = true;
    }

    div11.appendChild(ctitle1);
    div11.appendChild(img1);
    div11.appendChild(p1);
    div11.appendChild(p2);
    div11.appendChild(btnbuy);
    div11.appendChild(btncart);
    div11.appendChild(br);
    div11.appendChild(br);    

    div1.appendChild(div11);
    ListofMedicine.appendChild(div1);

    btnbuy.addEventListener("click",function()
    {
        div11.appendChild(quan);
        console.log(obj.mname+" oooo;");
        var equan = document.getElementById('quan').value;
        if(equan=="")
        {
            alert("Enter some value in it");
            document.getElementById('quan').focus();
        }
        else if(isNaN(equan))
        {
            alert("cannot enter alphabet... only nos required");
            equan.focus();
        }
        else if(equan>obj.mquan)
        {
            alert("Your value should be less than "+obj.mquan);
            equan.focus();
        }
        else
        {
          
           var flag=0;
            if(user!=undefined)
            {
                var newobj = {
                    username:user.username,
                    mname:obj.mname,
                    mquan:equan,
                    mprice:obj.mprice,
                    mdesc:obj.mdesc
                }
                flag=1;
                var temp = checkIndex(obj);
                if(temp==-1)
                {
                    cartArray.push(newobj);
                    console.log(parseInt(equan.value)+";;");
                    addcartArraydb(cartArray);
                    alert("added successfully");
                    document.getElementById("quan").value="";
                    quan.setAttribute("style","visibility:hidden");
                }
                else if(temp!=-1)
                {
                    cartArray.splice(temp,1,newobj);
                    alert("edited successfully");
                    document.getElementById("quan").value="";
                    quan.setAttribute("style","visibility:hidden");
                    updateCartdb(newobj);
                }
            }

            if(flag==0)
            {
               pic.setAttribute("style","visibility:hidden");
                alert("You need to login first");
                location.href="/login.html";
            }
        }   
    })

    btncart.addEventListener("click",function()
    {
        location.href="/cart.html";
    })
}

function checkIndex(obj)
{
    for(var i=0;i<cartArray.length;i++)
    {
        if(obj.mname==cartArray[i].mname && user.username==cartArray[i].username)
        {
            console.log(obj.mname+";;"+user.username);
            return i;
        }
    }
    return -1;
}

function updateCartdb(obj)
{
    console.log("update cart working");
  console.log(obj);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
   
  }
};
xhttp.open("POST", "/cartupdate", true);
xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

xhttp.send("obj="+JSON.stringify(obj));
}

function addcartArraydb(cartArray)
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
   
    }
  };
  xhttp.open("POST", "/cartarray", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("cartArray="+JSON.stringify(cartArray));
}

function getcartArray()
{
    console.log('called carttarry');
    var xhttp=new XMLHttpRequest();
    xhttp.onreadystatechange= function(){
        if(this.readyState == 4 && this.status == 200){	
            cartArray = JSON.parse(xhttp.responseText);
        }
    }
    xhttp.open("GET", "/cartarray");
    xhttp.send();       
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