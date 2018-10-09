var express = require("express"),
  nodeMailer = require("nodemailer"),
  bodyParser = require("body-parser");

var config = require("./config.json");

var app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

var port = 3000;

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/contact", function (req, res) {
  res.render("contact", {
    msg: ""
  });
});

app.get("/privacy-policy", function (req, res) {
  res.render("privacy-policy");
});

app.get("/gallery", function (req, res) {
  res.render("gallery");
});

app.post("/send", function (req, res) {
  const output = `
    <p><strong>You have a new inquiry!</strong></p>
    <h3>Contact Details</h3>
    <ul>
        <li>Name: ${req.body.name}</li>
        <li>Subject: ${req.body.subject}</li>
        <li>Email: ${req.body.email}</li>
        <li>Telephone: ${req.body.telephone}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
    `;

  let transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: config.username,
      pass: config.password
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  let mailOptions = {
    from: '"Contact" <email@domain.com>', // sender address
    to: config.to, // list of receivers
    subject: "New Inquiry", // Subject line
    text: "", // plain text body
    html: output // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }

    console.log("Message %s sent: %s", info.messageId, info.response);
    res.render("contact", {
      msg: "Email has been sent successfully!"
    });
  });
});

// 404
app.use(function (req, res, next) {
  return res.status(404).send({
    message: 'Route ' + req.url + ' Not found.'
  });
});

app.listen(process.env.PORT || port, function () {
  console.log("Server is running at port: ", port);
});