function update()
{
    var uname = document.getElementById('uname').value;
    var pwd = document.getElementById('pwd').value;
    var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if(pwd=="")
    {
        alert("Enter password");
        document.getElementById('pwd').focus();
    }
    else if(!pwd.match(passw))
    {
        alert("enter password between 6-20 characters containing one digit, one uppercase and one lowercase letter");
        document.getElementById("pwd").focus();
        return 0;
    }
    else
    {
        console.log("lala");
        var obj={
            username:uname,
            password:pwd
        }
        updatedb(obj);
        alert("Updated successfully");
         location.href('./login.html');
         uname="";
    }
}

function updatedb(obj)
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     
    }
  };
  xhttp.open("POST", "/updatepwd", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("obj="+JSON.stringify(obj));
}