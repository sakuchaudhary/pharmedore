var  userArray=[];
var userId=0;

function signup()
{
    console.log("signup");
    var uname = document.getElementById("uname").value;
    var email = document.getElementById("email").value;
    var pwd = document.getElementById("pwd").value;
    var phn = document.getElementById("phn").value;
    var path = document.getElementById("image").value;

    var obj={
        username:uname,
        email:email,
        password:pwd,
        phne:phn
    }
    var valid = validate(obj);
    if(valid==1)
    {
        alert("signup successful");
        local();
    }
}

function local()
{
    console.log("insdie locaye");
   window.location.href="login.html?";
}

function validate(obj)
{
    console.log("validate");
    var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    var email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(obj.username==""||obj.email==""||obj.password==""||obj.phne=="")
    {
        alert("Fill all empty fields");
        return 0;
    }
    if(!obj.password.match(passw))
    {
        alert("enter password between 6-20 characters containing one digit, one uppercase and one lowercase letter");
        document.getElementById("pwd").focus();
        return 0;
    }
    if(!obj.email.match(email))
    {
        alert("enter valid email");
        document.getElementById("email").focus();
        return 0;
    }
    if(userArray.length==0)
    {
        userArray.push(obj);
        console.log(userArray);
        storeUsers(userArray);
        userId++;
        return 1;
    }
    else{
            var f=0;
        for(var i=0;i<userArray.length;i++)
        {
        if(userArray[i].username==obj.username)
        {
            f=1;
            break;
        }
        }
        if(f==1)
        {
        alert("Username Already Exist, try another user name");
        return 0;
        }
        else
        {
        userArray.push(obj);
        userId++;
        console.log(userArray);
        storeUsers(userArray);
        return 1;
        }
    }
}

function storeUsers(userArray)
{
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
if (this.readyState == 4 && this.status == 200) {
   
    }
    };
  xhttp.open("POST", "/adduser", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("userList="+JSON.stringify(userArray));

}

function getStoredUsers()
{
var xhttp=new XMLHttpRequest();
   
    xhttp.onreadystatechange=()=>{
    if(xhttp.readyState == 4 && xhttp.status == 200){
       
      console.log("response text");
      console.log(xhttp.responseText);
      userArray = JSON.parse(xhttp.responseText);
     
    }
   }
  xhttp.open("GET", "/adduser", true);
  xhttp.send();  
 
}
