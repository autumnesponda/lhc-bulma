var express = require('express'),
    path = require('path'),
    nodeMailer = require('nodemailer'),
    bodyParser = require('body-parser');

var app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
var port = 3000;
app.get('/', function (req, res) {
    res.render('index');
});

app.get('/contact', function (req, res) {
    res.render('contact');
});

app.get('/privacy-policy', function (req, res) {
    res.render('privacy-policy');
});

app.post('/send',
    function (req, res) {
        const output = `
    <p>You have a new inquiry</p>
    <h3>Contact Details</h3>
    <ul>
        <li>Name: ${req.body.name}</li>
        <li>Subject: ${req.body.subject}</li>
        <li>Email: ${req.body.email}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
    `;

        let transporter = nodeMailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'wnxtyrael@gmail.com',
                pass: 'trance123'
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        let mailOptions = {
            from: '"Nick" <wnxtyrael@gmail.com>', // sender address
            to: 'wnxtyrael@gmail.com', // list of receivers
            subject: 'Test', // Subject line
            text: 'Hello', // plain text body
            html: output // html body
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
            res.render('contact', {
                msg: 'Email has been sent successfully!'
            });
        });

    });
app.listen(port, function () {
    console.log('Server is running at port: ', port);
});