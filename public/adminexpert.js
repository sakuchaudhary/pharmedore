var question=[];
var targetParent;
var view = document.getElementById("view");
var answer = document.getElementById("answer");

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

view.addEventListener("click",function(){
    answer.innerHTML="";
    call();
})

function call()
{
    console.log("btn view");
    for(var i=0;i<question.length;i++)
    {
        if(question[i].answered=="no")
            createDom(question[i]);
    }
}

function createDom(obj)
{
    var div1 = document.createElement("div");
    div1.setAttribute("id","div1");
    div1.setAttribute("class","card shadow");
    div1.setAttribute("style","background-color:#e5e8e8");

    var div11 = document.createElement("div11");
    div11.setAttribute("id","div11");
    div11.setAttribute("class","card-body");

    var p1=document.createElement("h4");
    p1.setAttribute("class","card-text");
    p1.innerHTML="userName: "+obj.username;

    var p2=document.createElement("p");
    p2.setAttribute("class","card-text");
    p2.innerHTML="Ques Asked: "+obj.question;

    var btnreply = document.createElement("button");
    btnreply.setAttribute("id","btnreply");
    btnreply.setAttribute("class","btn btn-danger");
    btnreply.innerHTML="Reply";

    var br = document.createElement("br");

    div11.appendChild(p1);
    div11.appendChild(p2);
    div11.appendChild(btnreply);
    div11.appendChild(br);
    
    div1.appendChild(div11);
    answer.appendChild(div1);

    btnreply.addEventListener("click",function(){
        var replyans = document.createElement("textarea");
        replyans.setAttribute("id","replyans");
        replyans.setAttribute("rows","10");
        replyans.setAttribute("cols","10");
        replyans.setAttribute("style","width:50%;margin-top:2%");

        var btnsubmit = document.createElement("button");
        btnsubmit.setAttribute("id","btnsubmit");
        btnsubmit.setAttribute("class","btn btn-primary mb-3");
        btnsubmit.setAttribute("style","margin-top:13%;margin-left:-50%");
        btnsubmit.innerHTML="Submit";

        var btnhide = document.createElement("button");
        btnhide.setAttribute("id","btnhide");
        btnhide.setAttribute("class","btn btn-danger mb-3");
        btnhide.setAttribute("style","margin-top:13%;");
        btnhide.innerHTML="Hide";

        btnreply.disabled = true;

        btnhide.addEventListener("click",function(){
            document.getElementById("replyans").remove();
            document.getElementById("btnsubmit").remove();
            btnreply.disabled = false;
            document.getElementById("btnhide").remove();
        })
        
        btnsubmit.addEventListener("click",function(){
            var ans = document.getElementById("replyans").value;
            console.log(ans);
            if(ans=="")
            {
                alert("Write ur answer");
                document.getElementById("replyans").focus();
            }
            else
            {
                var newobj={
                    username:obj.username,
                    qid:obj.qid,
                    answer:ans,
                    answered:"yes"
                }
                console.log(newobj);
                updatequsarray(newobj);
                updatedb(newobj);
                alert("Answer submitted");
                answer.innerHTML="";
                call();
            }
        })

        div11.appendChild(replyans);
        div11.appendChild(btnsubmit);
        div11.appendChild(btnhide);
    })
}

function updatequsarray(obj)
{
    for(var i=0;i<question.length;i++)
    {
        if(question[i].qid==obj.qid)
        {
            question[i].answer = obj.answer;
            question[i].answered=obj.answered;
        }
    }
}

function updatedb(obj)
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     
    }
  };
  xhttp.open("POST", "/quesupdate", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("obj="+JSON.stringify(obj));
}