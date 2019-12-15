var medArray=[];
var category=[];
var addcategorybtn = document.getElementById("addcategorybtn");
var addmed = document.getElementById("addmed");
var clearmed = document.getElementById("clearmed");
var btnsave = document.getElementById("btnsave");
var scategory = document.getElementById("scategory"); 
var scategorybtn = document.getElementById("scategorybtn");
var ListofMedicine = document.getElementById("ListofMedicine");
var editParent;
var targetParent;
var newi=-1;

addcategorybtn.addEventListener("click",function()
{
    var flag=0;
    console.log("inside add btn");
    var catvalue = document.getElementById("addcategory").value;
    if(catvalue=="")
    alert("fill some value in it");
    var catobj={
        vcategory:catvalue
    }
    if(category.length==0)
    {
    category.push(catobj);
    storecategory(category);
    }
    else
    {
        for(var i=0;i<category.length;i++)
        {
            if(catvalue!=category[i].vcategory)
            flag=0;
            else if(catvalue==category[i].vcategory)
            flag=1;
        }
        if(flag==1)
        alert("this category "+catvalue+" already exists");
        else if(flag==0)
        {
            category.push(catobj);
            storecategory(category);
            alert("Category "+catvalue+" added Successfully");
        }
        
    }
})

addmed.addEventListener("click",function()
{
var catvalue = document.getElementById("addcategory").value; 
var medname = document.getElementById("medname").value;
var medesc = document.getElementById("medesc").value;
var medprice = document.getElementById("medprice").value;
var medquan = document.getElementById("medquan").value;
var flag=0;

    if(catvalue=="")
    {
        alert("Add category in it");
        document.getElementById("addcategory").focus();
    }
    else if(medname=="" || medesc=="" || medprice=="" || medquan=="")
        alert("Fill all the empty fields");
    else if(medprice<0 || medquan<0)
        alert("values cannot be negative");
    else if(isNaN(medprice))
    {
        alert("cannot enter alphabet... only nos required");
        document.getElementById("medprice").focus();
    }
    else if(isNaN(medquan))
    {
        alert("cannot enetr alphabet... only nos required");
        document.getElementById("medquan").focus();
    }
    else
    {
        for(var i=0;i<medArray.length;i++)
        {
            if(medname==medArray[i].mname)
            {
                flag=1;
                break;
            }
            else if(medname!=medArray[i].mname)
            flag=0;
        }
        if(flag==0 || medArray.length==0)
        {
            var Medobj={
                category:document.getElementById("addcategory").value,
                mname:document.getElementById("medname").value,
                mdesc:document.getElementById("medesc").value,
                mprice:document.getElementById("medprice").value,
                mquan:document.getElementById("medquan").value
            }
            medArray.push(Medobj);
            alert("Added successfully");
            storemedicine(medArray);
        }
        else if(flag==1)
            alert("this medicine already exists");
    }
})

clearmed.addEventListener("click",function()
{
    document.getElementById("medname").value="";
    document.getElementById("medesc").value="";
    document.getElementById("medprice").value="";
    document.getElementById("medquan").value="";
})

scategorybtn.addEventListener("click",function()
{
    var scatvalue = document.getElementById("scategory").value;
    if(scatvalue=="")
    {
        alert("fil some value in it");
        document.getElementById("scategory").focus();
    }
    var flag=0;
    for(var i=0;i<category.length;i++)
    {
        if(scatvalue==category[i].vcategory)
        {
            flag=1;
            alert("searching..");
            break;
        }
        else if(scatvalue!=category[i].vcategory)
        flag=0;
    }
    if(flag==1)
    {
        ListofMedicine.innerHTML="";
        var h = document.createElement("h1");
        h.innerHTML="Category: "+scatvalue;
        ListofMedicine.appendChild(h);
        
        for(var i=0;i<medArray.length;i++)
        {
            if(scatvalue==medArray[i].category)
            addproductToDom(medArray[i]);
        }
    }
    else if(flag==0)
    {
        alert("No such category exists");
        document.getElementById("scategory").focus();
    }
})

function addproductToDom(obj)
{
    var div1 = document.createElement("div");
    div1.setAttribute("id","div1");
    div1.setAttribute("class","card");
    div1.setAttribute("style","width:30%");

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

    var btnedit = document.createElement("button");
    btnedit.setAttribute("id","btnedit");
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
    div11.appendChild(btnedit);
    div11.appendChild(btndel);
  
    div1.appendChild(div11);
    ListofMedicine.appendChild(div1);

    btnedit.addEventListener("click",function()
    {
        editMedicine(obj.category,obj.mname,obj.mdesc,obj.mprice,obj.mquan)
    })

    btndel.addEventListener("click",function()
    {
        deleteMedicine(obj);
    })
}

function editMedicine(category,mname,mdesc,mprice,mquan)
{
    editParent=event.target.parentNode;
    document.getElementById("addmed").setAttribute("style","visibility:hidden");
    document.getElementById("clearmed").setAttribute("style","visibility:hidden");
    document.getElementById("btnsave").setAttribute("style","visibility:visible");
    insertIntoFields(category,mname,mdesc,mprice,mquan);
}

function deleteMedicine(obj)
{
    var pos=-1;
    console.log(obj.mname);
    targetParent = event.target.parentNode;
    for(var i=0;i<medArray.length;i++)
    {
        if(obj.mname==medArray[i].mname)
        {
            pos=i;
            break;
        }
    }
    removeFromArray(pos);
    deleteFromDatabase(obj.mname);
    targetParent.parentNode.removeChild(targetParent);
}

function removeFromArray(pos)
{
    medArray.splice(pos,1);
    console.log(medArray);
}

var oldcategory="";
var oldmedname="";

function insertIntoFields(category,mname,mdesc,mprice,mquan)
{
    document.getElementById("medname").focus();
    document.getElementById("addcategory").value = category;
    document.getElementById("medname").value = mname;
    document.getElementById("medesc").value = mdesc;
    document.getElementById("medprice").value = mprice;
    document.getElementById("medquan").value = mquan;

    oldcategory=category;
    oldmedname=mname;
    for(var i=0;i<medArray.length;i++)
    {
        if(mname==medArray[i].mname)
        newi=i;
    }
    console.log(newi); 
}

btnsave.addEventListener("click",function()
{
    var flag=0;
    var flag2=0;

    var newobj={
        oldmname:oldmedname,
        category:document.getElementById("addcategory").value,
        mname:document.getElementById("medname").value,
        mdesc:document.getElementById("medesc").value,
        mprice:document.getElementById("medprice").value,
        mquan:document.getElementById("medquan").value
    }
    if(oldcategory!=newobj.category)
    {
        for(var i=0;i<category.length;i++)
        {
            if(newobj.category==category[i].vcategory)
            {
                flag2=0;
                break;
            }
            else
                flag2=1;
        }
        if(flag2==0)
        {
            replaceinArray(newi,newobj);
            alert("Saved Successfully");
            clearAll();
        }
        else if(flag2==1)
        {
            alert("Add this Category "+newobj.category+" first");
            document.getElementById("addcategory").focus();
        }
    }
    else
    {
        if(oldmedname!=newobj.mname)
        {
            for(var i=0;i<medArray.length;i++)
            {
                if(newobj.mname==medArray[i].mname)
                {
                    flag=1;
                    break;
                }
            }
        }
        if(flag==1)
        {
            alert("This Medicine Already Exixts");
            document.getElementById("medname").focus();
        }
        else if(flag==0)
        {
            replaceinArray(newi,newobj);
            alert("Saved Successfully");
            clearAll();
        }
    }
    
    if(newobj.category!=document.getElementById("scategory").value)
    {
        ListofMedicine.innerHTML="";
        var h=document.createElement("h1");
        h.innerHTML = "Category: "+document.getElementById("scategory").value;
        ListofMedicine.appendChild(h);

        for(var i=0;i<medArray.length;i++)
        {
            if(document.getElementById("scategory").value==medArray[i].category)
            addproductToDom(medArray[i]);
        }
    }
    else
        updateDom(newobj);

    console.log(newobj.category+";;;"+document.getElementById("scategory").value)
           
})

function clearAll()
{
    document.getElementById("medname").value="";
    document.getElementById("medesc").value="";
    document.getElementById("medprice").value="";
    document.getElementById("medquan").value="";
    document.getElementById("btnsave").setAttribute("style","visibility:hidden");
    document.getElementById("addmed").setAttribute("style","visibility:visible");
    document.getElementById("clearmed").setAttribute("style","visibility:visible");
}

function updateDom(obj)
{
    var div1 = document.createElement("div");
    div1.setAttribute("id","div1");
    div1.setAttribute("class","card");

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

    var btnedit = document.createElement("button");
    btnedit.setAttribute("id","btnedit");
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
    div11.appendChild(btnedit);
    div11.appendChild(btndel);
  
    div1.appendChild(div11);
    ListofMedicine.appendChild(div1);

    editParent.parentNode.replaceChild(div1,editParent);
    
    btnedit.addEventListener("click",function()
    {
        editMedicine(obj.category,obj.mname,obj.mdesc,obj.mprice,obj.mquan)
    })    

    btndel.addEventListener("click",function()
    {
        deleteMedicine(obj);
    })
}

function replaceinArray(j,newobj)
{
    console.log(newobj);

    for(var i=0;i<medArray.length;i++)
    {
        if(i==j)
        {
            medArray[i].category=newobj.category;
            medArray[i].mname=newobj.mname;
            medArray[i].mdesc=newobj.mdesc;
            medArray[i].mprice=newobj.mprice;
            medArray[i].mquan=newobj.mquan;
        }
    }
    console.log(medArray);
    updateDatabase(newobj);
}
function updateDatabase(obj)
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     
    }
  };
  xhttp.open("POST", "/update", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("obj="+JSON.stringify(obj));
}

function deleteFromDatabase(mname)
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     
    }
  };
  xhttp.open("POST", "/delete", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("mname="+JSON.stringify(mname));
}

function storecategory(catarray)
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
   
    }
  };
  xhttp.open("POST", "/category", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("category="+JSON.stringify(catarray));
}

function storemedicine(medarray)
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
   
    }
  };
  xhttp.open("POST", "/medicine", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("medicine="+JSON.stringify(medarray));
}

function getcategory()
{
    var xhttp=new XMLHttpRequest();
    console.log("inside getcatergry");
    xhttp.onreadystatechange=()=>{
        if(xhttp.readyState == 4 && xhttp.status == 200){
          console.log(xhttp.responseText);
          category = JSON.parse(xhttp.responseText);
        }
    }
    xhttp.open("GET", "/category", true);
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