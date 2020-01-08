var ask = document.getElementById("ask");
var view = document.getElementById("view");
var questions = document.getElementById("questions");
var askques = document.getElementById("askques");
var pic = document.getElementById("image");
var qustxt = document.getElementById("qustxt");
var submit = document.getElementById("submit");
var src1;
var user=[];
var img=[];
var question=[];
var answer=[];

function callonload()
{
    getStoredImages();
    getusername();
    getques();
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

ask.addEventListener("click",function(){
    var flag=0;
    if(user!=undefined)
    flag=1;

    if(flag==0)
    {
        alert("You need to login first");
        location.href="/login.html";
    }
    
    questions.innerHTML="";
    createDom();
})

function createDom()
{
    var askques = document.createElement("textarea");
    askques.setAttribute("id","askques");
    askques.setAttribute("style","width:50%;");
    askques.setAttribute("rows","10");
    askques.setAttribute("cols","10");
    askques.setAttribute("placeholder","Ask your Query");
    
    var br = document.createElement("br");

    var btnsubmit = document.createElement("button");
    btnsubmit.setAttribute("id","btnsubmit");
    btnsubmit.setAttribute("class","btn btn-primary");
    btnsubmit.setAttribute("style","margin-top:2%;")
    btnsubmit.innerHTML="Submit"

    btnsubmit.addEventListener("click",function(){
        callid();
        var qus = askques.value;
        if(qus=="")
        {
            alert("Ask Your Question first");
            qustxt.focus();
        }
        else{
            var newobj = {
                username:user.username,
                qid:id,
                question:qus,
                answer:"",
                answered:"no"
            }
            question.push(newobj);
            questiondb(question);
            console.log(newobj);
            alert("Question Submitted");
            askques.value="";
        }
    })
    
    questions.appendChild(askques);
    questions.appendChild(br);
    questions.appendChild(br);
    questions.appendChild(btnsubmit);
}

var id=1;
function callid()
{
    if(question.length==0)
    id=1;
    else
    {
        id=question[question.length-1].qid;
        id++;
    }
}

view.addEventListener("click",function(){
    questions.innerHTML="";
    for(var i=0;i<question.length;i++)
    {
        if(question[i].username==user.username && question[i].answered=="yes")
        createDomReply(question[i]);
    }
})

function createDomReply(obj)
{
    var div1 = document.createElement("div");
    div1.setAttribute("id","div1");
    div1.setAttribute("class","card shadow");
    div1.setAttribute("style","background-color:#e5e8e8");

    var div11 = document.createElement("div11");
    div11.setAttribute("id","div11");
    div11.setAttribute("class","card-body");

    var p2=document.createElement("p");
    p2.setAttribute("class","card-text");
    p2.innerHTML="Ques Asked: "+obj.question;

    var p1=document.createElement("h6");
    p1.setAttribute("class","card-text shadow-lg");
    p1.innerHTML="Answer: "+obj.answer;

    var btnreply = document.createElement("button");
    btnreply.setAttribute("id","btnreply");
    btnreply.setAttribute("class","btn btn-danger");
    btnreply.innerHTML="Reply";

    var br = document.createElement("br");

    div11.appendChild(p2);
    div11.appendChild(p1);
    div11.appendChild(btnreply);
    div11.appendChild(br);
    
    div1.appendChild(div11);
    questions.appendChild(div1);

}

function questiondb(question)
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       
    }
    };
    xhttp.open("POST", "/addques", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("quesList="+JSON.stringify(question));
}

function getques()
{
    var xhttp=new XMLHttpRequest();
    xhttp.onreadystatechange= function(){
        if(this.readyState == 4 && this.status == 200){	
            question = JSON.parse(xhttp.responseText);
        }
    }
    xhttp.open("GET", "/quesarray");
    xhttp.send();          
}