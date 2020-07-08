var userArray=[];

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

function sendmail()
{
    console.log("wkjhdjdh");
    var flag=0;
    var uname = document.getElementById('uname').value;
    var email = document.getElementById('email').value;
    
    if(uname==""|| email=="")
    {
        alert("Fill the Empty feilds");
    }
    else
    {
        for(var i=0;i<userArray.length;i++)
        {
            if(userArray[i].email==email && userArray[i].username==uname)
            {
                flag=1;
            }
        }
    }
    if(flag==0)
    {
    alert("Invalid username or email");
    }
    else if(flag==1)
    {
        var obj={
            username:uname,
            email:email,
        }
        maildb(obj);
        alert("Check ur mail");
    }   
}

function maildb(obj)
{
    var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
if (this.readyState == 4 && this.status == 200) {
   
    }
    };
  xhttp.open("POST", "/sendmail", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("obj="+JSON.stringify(obj));

}