var express = require('express');
var mongoose = require('mongoose');
const app = express();
mongoose.connect("mongodb://localhost:27017/pharmedore");
app.use(express.urlencoded());
var bodyParser=require('body-parser');
var session=require('express-session');
app.use(express.json());
app.use(express.static('public'));
const router = express.Router();
app.use(express.static('views'));

app.set('view engine', 'ejs');
app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));
app.use(bodyParser.json());      
app.use(bodyParser.urlencoded({extended: true}));

const helpers = require('helpers');
const multer = require("multer");
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, req.body.username + path.extname(file.originalname)); 
    }
});

mongoose.connection.on('error', (err) => {
  console.log('DB connection Error');
});

mongoose.connection.on('connected', (err) => {
  console.log('DB connected');
});
<<<<<<< HEAD
=======
mongoose.set('useFindAndModify', false);

>>>>>>> 0c55e8b5dcd82e9ea77658868c9a9a88ecff66d1
var Schema=mongoose.Schema;


let Users=new Schema({
    username:String,
    email:String,
    password:String,
    phne:Number
    
});
var user = mongoose.model('users', Users);

let image=new Schema({
    username:String,
    imageurl:String
})
var Image=mongoose.model('Image',image);

let Category = new Schema({
    vcategory:String
})
var category = mongoose.model('category',Category);

let Medicine = new Schema({
    category:String,
    mname:String,
    mdesc:String,
    mprice:Number,
    mquan:Number
})
var medicine = mongoose.model('medicine',Medicine);

let CartArray = new Schema({
    username:String,
    mname:String,
    mdesc:String,
    mprice:Number,
    mquan:Number
})
var cartarray = mongoose.model('cartArray',CartArray);

let Order = new Schema({
    username:String,
    mname:String,
    mdesc:String,
    mprice:Number,
    mquan:Number,
    price:Number
})
var order = mongoose.model('Order',Order);

let Donors=new Schema({
    username:String,
    uname:String,
    uage:Number,
    ugrp:String,
    uphn:Number,
    uaddress:String,
    approved:String,
    units:Number,
    bname:String
});
var donor = mongoose.model('donors', Donors);

let Receiver=new Schema({
    username:String,
    uname:String,
    uage:Number,
    ugrp:String,
    uphn:Number,
    uaddress:String,
    approved:String,
    units:Number,
    bname:String
});
var receiver = mongoose.model('receivers', Receiver);

var BloodBank = new Schema({
    name:String,
    location:String,
    grp:({
        a1:Number,
        a2:Number,
        b1:Number,
        b2:Number,
        ab1:Number,
        ab2:Number,
        o1:Number,
        o2:Number
    })
})
var bloodbank = mongoose.model('bloodbanks',BloodBank);

var Ques = new Schema({
    username:String,
    qid:Number,
    question:String,
    answer:String,
    answered:String
})
var ques = mongoose.model('questions',Ques);

app.get('/',function(req,res)
{
    res.sendFile(__dirname+'/home.html');
})

app.get("/login.html",function(req,res)
       {
    res.sendFile(__dirname+"/login.html");
    });

app.get("/signup.html",function(req,res)
       {
    res.sendFile(__dirname+"/signup.html");
});

app.post('/api/photo', (req, res) => {
    let upload = multer({ storage: storage, fileFilter: helpers.imageFilter }).single('userPhoto');

    upload(req, res, function(err) {
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        // else if (!req.file) {
        //     return res.send('Please select an image to upload');
        // }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }
        //res.contentType('image/jpg');
        var img = new Image();

        img.username = req.body.username;
        img.imageurl =__dirname+'\\uploads\\'+req.body.username+'.jpg';
        img.save(); 
        console.log("image saved");
        res.redirect('/login.html');
        //res.sendFile(__dirname+'/uploads/'+req.body.username+'.jpg');
        //res.send(`You have uploaded this image: <hr/><img src="${'\\uploads\\'+req.body.username+'.jpg'}" width="500"><hr /><a href="./">Upload another image</a>`);
    });
});

const imageFilter = function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
exports.imageFilter = imageFilter;

app.post('/adduser',(req,res)=>{
    console.log("adduser");
    var len=JSON.parse(req.body.userList).length;
    var sData=new user();
    sData.username=JSON.parse(req.body.userList)[len-1].username;
    sData.email=JSON.parse(req.body.userList)[len-1].email;
    sData.password=JSON.parse(req.body.userList)[len-1].password;
    sData.phne=JSON.parse(req.body.userList)[len-1].phne;
    sData.save(function(err)
    {
    if(err)
     {
         console.log("Error");
     }
     //res.sendFile(__dirname+'/login.html');    
    });
 
})
app.post('/category',(req,res)=>{
    var len=JSON.parse(req.body.category).length;
    var sdata=new category();
    sdata.vcategory=JSON.parse(req.body.category)[len-1].vcategory;
    sdata.save(function(err)
    {
        if(err)
        console.log(err);
        res.redirect('/admin.html');
    });
})

app.post('/medicine',(req,res)=>{
    var len=JSON.parse(req.body.medicine).length;
    var sdata=new medicine();
    sdata.category=JSON.parse(req.body.medicine)[len-1].category;
    sdata.mname=JSON.parse(req.body.medicine)[len-1].mname;
    sdata.mdesc=JSON.parse(req.body.medicine)[len-1].mdesc;
    sdata.mprice=JSON.parse(req.body.medicine)[len-1].mprice;
    sdata.mquan=JSON.parse(req.body.medicine)[len-1].mquan;
    sdata.save(function(err)
    {
        if(err)
        console.log(err);
       // res.redirect('/admin.html');
    })
})

app.post('/cartarray',(req,res)=>{
    var len=JSON.parse(req.body.cartArray).length;
    var sdata=new cartarray();
    sdata.username=JSON.parse(req.body.cartArray)[len-1].username;
    sdata.mname=JSON.parse(req.body.cartArray)[len-1].mname;
    sdata.mdesc=JSON.parse(req.body.cartArray)[len-1].mdesc;
    sdata.mprice=JSON.parse(req.body.cartArray)[len-1].mprice;
    sdata.mquan=JSON.parse(req.body.cartArray)[len-1].mquan;
    sdata.save(function(err)
    {
        if(err)
        console.log(err);
       // res.redirect('/admin.html');
    })
})

app.get('/cartarray',(req,res)=>{
    console.log('running it');
    cartarray.find({},function(err,docs){
        if(err)
            {
                console.log("error");
            }
        //console.log(docs);
        res.send(docs);
       
    });
  });

app.post('/update',(req,res)=>{
    var ob=(JSON.parse(req.body.obj));
       console.log(ob.oldmname);

    var myquery = { mname: ob.oldmname };
  var newvalues = { $set: { category: ob.category, mname: ob.mname, mdesc:ob.mdesc,
                        mprice:ob.mprice,mquan:ob.mquan } };
   
    medicine.updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
        else
    console.log("1 document updated");
    });
})

app.post('/delete',(req,res)=>{
    medicine.findOneAndRemove({'mname':JSON.parse(req.body.mname)}, function(err){
        if (err){
            throw err;
        }
        console.log('deleted');
    });
})

var midFunction = (req,res,next)=>
{
    console.log("insdie medfxn");
    if(req.path==='/admin.html')
    {
    res.redirect('/login.html');
    console.log("redirect login");
    }
    else
    next();
}

app.get('/blood.html',(req,res)=>{
    res.sendFile(__dirname+'/blood.html');
})

app.get('/ftpswd.html',(req,res)=>{
    res.sendFile(__dirname+'/ftpswd.html');
})

app.get('/admin.html',midFunction,(req,res)=>{
   res.sendFile(__dirname+'/admin.html');
   console.log("admin");
})

app.get('/orders.html',(req,res)=>
{
    res.sendFile(__dirname+'/orders.html');
    console.log("order");
})

app.get('/cart.html',(req,res)=>
{
    res.sendFile(__dirname+'/cart.html');
    console.log("cart");
})

app.get('/expert.html',(req,res)=>{
    res.sendFile(__dirname+'/expert.html');
})

var midFunction3 = (req,res,next)=>
{
    console.log("insdie medfxn3");
    if(req.path==='/adminexpert.html')
    {
        res.redirect('/login.html');
        console.log("redirect login");
    }
    else
    next();
}

app.get('/adminexpert.html',midFunction3,(req,res)=>{
    res.sendFile(__dirname+'/adminexpert.html');
    console.log("adminexpert");
 })
 
 var nodemailer = require("nodemailer");
 var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: 'ur email id',
        pass: 'ur paswd'
    }
});

 app.post('/sendmail',(req,res)=>{
     console.log("kjdkdjddwkhdwdh");
    var obj = JSON.parse(req.body.obj);
    var mailOptions={
        to : obj.email,
        subject : 'sending email',
        text : 'helllo '+obj.username+' copy the link to confirm ur passwd localhost:2000/reset/'+obj.username
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
     if(error){
            console.log(error);
        res.end("error");
     }else{
            console.log("Message sent: " + response.message);
        res.end("sent");
         }
});
 })

app.post('/updatepwd',(req,res)=>{
    var ob=(JSON.parse(req.body.obj));
      console.log(ob);
    var myquery = { username: ob.username };
  var newvalues = { $set: { password:ob.password } };
   
    user.updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
        else
    console.log("1 document updated");
    });
})

 var fs=require('fs');
 app.get('/reset/:name',(req,res)=>{
     
    var uname=req.params.name;
    console.log(uname);
    fs.readFile('reset.html',(err,data)=>{
        if(err)
        {
           res.writeHead(500);
           res.end(err);
           return;
        }
        data = data.toString().replace(/\{\{someVal\}\}/, uname);
        res.writeHead(200);
        res.end(data, 'utf8');
       
    })
    // res.sendFile(__dirname+'/login.html');
 })

 app.get('/locate.html',(req,res)=>{
     res.sendFile(__dirname+'/locate.html');
 })

app.post('/addques',(req,res)=>{
    var len=JSON.parse(req.body.quesList).length;
    var sData=new ques();
    sData.username=JSON.parse(req.body.quesList)[len-1].username;
    sData.qid=JSON.parse(req.body.quesList)[len-1].qid;
    sData.question=JSON.parse(req.body.quesList)[len-1].question;
    sData.answer=JSON.parse(req.body.quesList)[len-1].answer;
    sData.answered=JSON.parse(req.body.quesList)[len-1].answered;
    sData.save(function(err)
    {
    if(err)
     {
         console.log("Error");
     }
     console.log("Ques saved");
    });
})

app.get('/quesarray',(req,res)=>{
    console.log('running it');
    ques.find({},function(err,docs){
        if(err)
            {
                console.log("error");
            }
        res.send(docs);
    });
})

app.post('/quesupdate',(req,res)=>{
    var ob = JSON.parse(req.body.obj);
    console.log(ob);
    var myquery = { username: ob.username,qid:ob.qid };
  var newvalues = { $set: { answer: ob.answer, answered:ob.answered, para:ob.para} };
   console.log(ob.grp);
    ques.updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
        else
    console.log("1 ques document updated");
    })
})

app.post('/deletecartArray',(req,res)=>{
    var ob = JSON.parse(req.body.obj);
    cartarray.findOneAndRemove({'mname':ob.mname,'username':ob.username}, function(err){
        if (err){
            throw err;
        }
        console.log('deleted cart');
    });
})

app.post('/addonor',(req,res)=>{
    console.log("inside donor");
    var len=JSON.parse(req.body.donorList).length;
    var sData=new donor();
    sData.username=JSON.parse(req.body.donorList)[len-1].username;
    sData.uname=JSON.parse(req.body.donorList)[len-1].uname;
    sData.uage=JSON.parse(req.body.donorList)[len-1].uage;
    sData.ugrp=JSON.parse(req.body.donorList)[len-1].ugrp;
    sData.uphn=JSON.parse(req.body.donorList)[len-1].uphn;
    sData.uaddress=JSON.parse(req.body.donorList)[len-1].uaddress;
    sData.approved=JSON.parse(req.body.donorList)[len-1].approved;
    sData.units=JSON.parse(req.body.donorList)[len-1].units;
    sData.bname=JSON.parse(req.body.donorList)[len-1].bname;
    sData.save(function(err)
    {
    if(err)
     {
         console.log("Error");
     }
     console.log("donor saved");
    });
})

app.post('/addreceiver',(req,res)=>{
    console.log("inside receiver");
    var len=JSON.parse(req.body.receiverList).length;
    var sData=new receiver();
    sData.username=JSON.parse(req.body.receiverList)[len-1].username;
    sData.uname=JSON.parse(req.body.receiverList)[len-1].uname;
    sData.uage=JSON.parse(req.body.receiverList)[len-1].uage;
    sData.ugrp=JSON.parse(req.body.receiverList)[len-1].ugrp;
    sData.uphn=JSON.parse(req.body.receiverList)[len-1].uphn;
    sData.uaddress=JSON.parse(req.body.receiverList)[len-1].uaddress;
    sData.approved=JSON.parse(req.body.receiverList)[len-1].approved;
    sData.units=JSON.parse(req.body.receiverList)[len-1].units;
    sData.bname=JSON.parse(req.body.receiverList)[len-1].bname;
    sData.save(function(err)
    {
    if(err)
     {
         console.log("Error");
     }
     console.log("receiver saved");
    });
})

app.post('/addbb',(req,res)=>{
    var ob = (JSON.parse(req.body.obj));
    console.log(ob);
    var sdata = new bloodbank();
    sdata.name = ob.name;
    sdata.location = ob.location;
    sdata.grp.a1 = ob.grps.a1;
    sdata.grp.a2 = ob.grps.a2;
    sdata.grp.b1 = ob.grps.b1;
    sdata.grp.b2 = ob.grps.b2;
    sdata.grp.ab1 = ob.grps.ab1;
    sdata.grp.ab2 = ob.grps.ab2;
    sdata.grp.o1 = ob.grps.o1;
    sdata.grp.o2 = ob.grps.o2;
    sdata.save(function(err)
    {
    if(err)
     {
         console.log("Error");
     }
     console.log("bb saved");
    });
})

app.get('/getbb',(req,res)=>{
    console.log('running it');
    bloodbank.find({},function(err,docs){
        if(err)
            {
                console.log("error");
            }
        res.send(docs);
    });
})

app.post('/bbupdate',(req,res)=>{
    var ob = JSON.parse(req.body.obj);
    console.log(ob);
    var myquery = { name: ob.name };
  var newvalues = { $set: { grp: ob.grp} };
   console.log(ob.grp);
    bloodbank.updateOne(myquery, newvalues, function(err, res) {
      //  console.log(newvalues);
    if (err) throw err;
        else
    console.log("1 bb document updated");
    })

})
app.post('/emptycart',(req,res)=>{
    var ob=(JSON.parse(req.body.username));
      cartarray.remove({'username':ob}, function(err){
          if (err){
              throw err;
              
          }
          console.log('deleted user cart');
      });
})

app.post('/updatemedicne',(req,res)=>{
    var len=JSON.parse(req.body.medList).length;
    var arr=JSON.parse(req.body.medList);
    for(var i=0;i<len;i++)
    {
        var myquery = { mname: arr[i].mname };
        var newvalues = { $set: {  mdesc:arr[i].mdesc,mprice:arr[i].mprice,mquan:arr[i].mquan } };
        medicine.updateOne(myquery, newvalues, function(err, res) {
            if (err) throw err;
                else
            console.log("1 medicne updated");
          });
    }
})

app.post('/orderarray',(req,res)=>{

    var len=JSON.parse(req.body.order).length;
    var sdata=new order();
    sdata.username=JSON.parse(req.body.order)[len-1].username;
    sdata.mname=JSON.parse(req.body.order)[len-1].mname;
    sdata.mdesc=JSON.parse(req.body.order)[len-1].mdesc;
    sdata.mprice=JSON.parse(req.body.order)[len-1].mprice;
    sdata.mquan=JSON.parse(req.body.order)[len-1].mquan;
    sdata.price=JSON.parse(req.body.order)[len-1].pricepaid;

    sdata.save(function(err)
    {
        if(err)
        console.log(err);
       // res.redirect('/admin.html');
    })
})

app.get('/orderarray',(req,res)=>{
    console.log('running it');
    order.find({},function(err,docs){
        if(err)
            {
                console.log("error");
            }
        //console.log(docs);
        res.send(docs);
       
    });
  });

app.post('/cartupdate',(req,res)=>
{
    var ob=(JSON.parse(req.body.obj));
       console.log(ob.username+";;"+ob.mname);

    var myquery = { mname: ob.mname, username: ob.username };
  var newvalues = { $set: { mname: ob.mname, mdesc:ob.mdesc,mprice:ob.mprice,mquan:ob.mquan } };
   
    cartarray.updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
        else
    console.log("1 cart document updated");
    })
})

app.get('/adduser',(req,res)=>{
    console.log('running it');
    user.find({},function(err,docs){
        if(err)
            {
                console.log("error");
            }
        //console.log(docs);
        res.send(docs);
       
    });
  });

  app.get('/addimg',(req,res)=>{
    console.log('running it');
    Image.find({},function(err,docs){
        if(err)
            {
                console.log("error");
            }
        //console.log(docs);
        res.send(docs);
       
    });
  });

app.get('/donorarray',(req,res)=>{
    console.log("get donor arry");
    donor.find({},function(err,docs){
        if(err)
            {
                console.log("error");
            }
        //console.log(docs);
        res.send(docs);
       
    });
})

app.get('/receiverarray',(req,res)=>{
    console.log("get donor arry");
    receiver.find({},function(err,docs){
        if(err)
            {
                console.log("error");
            }
        //console.log(docs);
        res.send(docs); 
    });
})

app.post('/donorupdate',(req,res)=>{
    var ob=(JSON.parse(req.body.obj));
    console.log(ob);
       console.log(ob.username+";;"+ob.uname);

    var myquery = { uname: ob.uname, username: ob.username, approved:"no" };
  var newvalues = { $set: { approved: ob.approved,units:ob.units,bname:ob.bname } };
   
    donor.updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
        else
    console.log("1 donor document updated");
    })
})

app.post('/receiverupdate',(req,res)=>{
    var ob=(JSON.parse(req.body.obj));
    console.log(ob);
       console.log(ob.username+";;"+ob.uname+";"+ob.bname);

    var myquery = { uname: ob.uname, username: ob.username, approved:"no" };
  var newvalues = { $set: { approved: ob.approved,units:ob.units, bname:ob.bname } };
   
    receiver.updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
        else
    console.log("1 receiver document updated");
    })  
})

router.post('/login',(req,res)=>
  {
    let uname = req.body.username;
    let pswd = req.body.password;
    if(uname == 'admin' && pswd == 'Admin1234'){
        req.session.user = "admin";
        return res.sendFile(__dirname+"/admin.html");
    }
    if(uname == 'bloodadmin' && pswd == 'Adminblood')
    {
        req.session.user = 'Adminblood';
        return res.sendFile(__dirname+'/adminblood.html');
    }
    if(uname == 'expertadmin' && pswd == 'Adminexpert')
    {
        req.session.user = 'Adminexpert';
        return res.sendFile(__dirname+'/adminexpert.html');
    }
    user.find({username : uname , password : pswd},(err,doc)=>{
        if(err){
            console.log(err)
        }
        if(doc.length == 0){
            return  res.redirect("/login.html")
        }
        else{
            console.log("redirect /user");
            req.session.user = doc[0]._id;
            return res.redirect("/user");
        }
    })
  })

  var midFunction2 = (req,res,next)=>
{
    console.log("insdie medfxn");
    if(req.path==='/adminblood.html')
    {
        res.redirect('/login.html');
        console.log("redirect login");
    }
    else
    next();
}

app.get('/adminblood.html',midFunction2,(req,res)=>{
    res.sendFile(__dirname+'/adminblood.html');
    console.log("adminblood");
 })
 
app.get('/user1.html',(req,res)=>{
    res.sendFile(__dirname+'/user1.html');
})

  app.get('/user',(req,res)=>{
    let user=req.session.user;
    if(user==undefined || user=="admin" || user=="bloodadmin")
    {
         return res.send('Error 404 not found')
    }
    else
    {
    console.log("redirect user1");
    res.redirect('/');
    }
    })

app.post('/getpic',(req,res)=>
{
    let User=req.session.user;  
    console.log(User);
    user.findOne({_id:User},(err,docs)=>{
        if(err)
        console.log(err)
        //res.json(docs)
        //console.log(docs.username);
        console.log("redirect picuser");
        res.set("Content-Type","image/jpg");
        //res.render('user1',{username:docs.username});//__dirname+'/uploads/'+docs.username+'.jpg');
        })
    })
    
    
app.get('/logout',(req,res) => {
    res.sendFile(__dirname+'/login.html');
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        console.log("inside logout");        
    });

});

app.get('/getusername',(req,res)=>{
    let User=req.session.user;  
    user.findOne({_id:User},(err,docs)=>{
        if(err)
        console.log(err)
        res.json(docs)
    })
})

app.get('/category',(req,res)=>{
  category.find({},function(err,docs)
  {
      if(err){
      console.log(err);}
      res.send(docs);
  })  
})

app.get('/medicine',(req,res)=>{
    medicine.find({},function(err,docs)
    {
        if(err){
        console.log(err);}
        res.send(docs);
    })
})

app.use('/', router);

app.listen(2000);
