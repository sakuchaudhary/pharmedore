var userArray=[];

function login()
{
    var flag=0;
    var uname=document.getElementById('uname').value;
    var passwrd = document.getElementById('pwd').value;
    
    for(var i=0;i<userArray.length;i++)
    {
        if(uname==userArray[i].username && passwrd==userArray[i].password)
            flag=1;
            else if(uname=="admin" && passwrd=="Admin1234")
                flag=2;
    }
    if(flag==2)
    {
        alert("Admin Logged In");
        location.href='admin.html';
    }
    else if(flag==1)
    {
        alert("Login Successfull");
        location.href='user1.html';
    }
    else if(flag==0)
    {
        alert("invalid username or password...");
        location.href='login.html';
    }
}

function getStoredUsers()
{
var xhttp=new XMLHttpRequest();
   
    xhttp.onreadystatechange=()=>{
    if(xhttp.readyState == 4 && xhttp.status == 200){
     
        userArray = JSON.parse(xhttp.responseText);
     
    }
   }
  xhttp.open("GET", "/adduser", true);
  xhttp.send();  
 
}
