/*var express = require('express');
var router = express.Router();
var mailer = require('nodemailer');

//send on enail info
var transport = mailer.createTransport({
   service: 'gmail',
  auth: {
    user: 'vaslnko25@gmail.com',
    pass: 'albinailera1999'
  }
});

router.post('/sendEmail', function(req, res) {
var mail = {
    	from: 'email',
  	to: 'vaslnko25@gmail.com',
 	subject: 'Sending Email using Node.js',
    	text: "Имя клиента :"+req.query.name +"; Телефон:"+req.query.phone + ";Почта:"+req.query.email
};
transport.sendMail(mail,function(err,response){
    if (err){
        console.log(err);
    }else {
        res.end('send');
        console.log("Отправлено "+ response.message);
    }
})
});
module.exports = router;*/




var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');



app.set('port', 3000);

app.use(express.static(path.join(__dirname, 'public')));

var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});

var smtpTransport = nodemailer.createTransport(smtpTransport({
  service: 'Gmail',
  auth: {
    user: 'vaslnko25@gmail.com',
    pass: 'albinailera1999'
  }
}));

app.post('/send-email', function(req, res) {
    var mailOptions = {
        from: 'user.email', // sender address
        to: "vaslnko25@gmail.com", // list of receivers
        subject: user.subj, // Subject line
        text: user.mess.to // plaintext body

    };
        smtpTransport.sendMail(mailOptions, function(error, info) {
         if (error) {
             return console.log(error);
         }
         console.log('Message sent: ' + info.response);
     });

     res.redirect("/contact.component.html");
