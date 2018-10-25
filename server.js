var express = require("express"),
  nodeMailer = require("nodemailer"),
  bodyParser = require("body-parser"),
  request = require("request"),
  cookieParser = require("cookie-parser"),
  session = require("express-session"),
  helmet = require("helmet");

var config = require("./config.json");

// Compression Setup - Remove if not needed
const compression = require('compression');


var app = express();
const expressValidator = require("express-validator");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.use(compression());
app.use(helmet());

// Express Validator
app.use(expressValidator());
app.use(cookieParser());
app.use(
  session({
    secret: 'mySuPeRS3cR3tSecR3t676974677564',
    name: 'sessionId',
    saveUninitialized: false,
    resave: false,
    secure: true,
    httpOnly: true
  })
);
// End Express Validator

var port = 3000;

// Routes
app.get("/", function (req, res) {
  res.render("index");
});

app.get("/contact", function (req, res) {
  let query = req.query.subject;
  console.log(query);

  res.render("contact", {
    data: {
      subject: query
    }
  });
});

app.get("/privacy-policy", function (req, res) {
  res.render("privacy-policy");
});

app.get("/portfolio", function (req, res) {
  res.render("portfolio");
});

app.get("/admin", function (req, res) {
  res.render("admin");
})

app.get("/about", function (req, res) {
  res.render("about");
})
// End Routes

app.post("/send", function (req, res) {
  let name = req.body.name;
  let email = req.body.email;
  let telepone = req.body.telephone;
  let subject = req.body.subject;

  // Set the fields
  req.checkBody("name", "Name is required").notEmpty();
  req.checkBody("email", "Email is required").notEmpty();
  req.checkBody("email", "Enter a valid email address").isEmail();
  req.checkBody("telephone", "Telephone is required").notEmpty();
  req
    .checkBody("telephone", "Enter a valid phone number")
    .isMobilePhone("en-US");

  // If there's form validation errors, render the contact page and produce the errors
  var errors = req.validationErrors();
  if (errors) {
    console.log(errors);
    req.session.errors = errors;
    req.session.success = false;
    res.render("contact", {
      data: {
        errors: errors,
        errorMsg: "Please correct the following errors:"
      }
    });
    return;
  }

  // g-recaptcha-response is the key that browser will generate upon form submit.
  // if its blank or null means user has not selected the captcha, so return the error.
  if (
    req.body["g-recaptcha-response"] === undefined ||
    req.body["g-recaptcha-response"] === "" ||
    req.body["g-recaptcha-response"] === null
  ) {
    res.render("contact", {
      data: {
        errorMsg: "Please complete the Captcha",
        errors: true
      }
    });
    return;
  }
  // Put your secret key here.
  var secretKey = config.secretKey;
  // req.connection.remoteAddress will provide IP address of connected user.
  var verificationUrl =
    "https://www.google.com/recaptcha/api/siteverify?secret=" +
    secretKey +
    "&response=" +
    req.body["g-recaptcha-response"] +
    "&remoteip=" +
    req.connection.remoteAddress;
  // Hitting GET request to the URL, Google will respond with success or error scenario.
  request(verificationUrl, function (error, response, body) {
    body = JSON.parse(body);
    // Success will be true or false depending upon captcha validation.
    // If the user fails the Captcha
    if (body.success !== undefined && !body.success) {
      res.render("contact", {
        data: {
          errors: true,
          errorMsg: "Captcha verification failed"
        }
      });
      return;
    }
    // If there's no errors with the Captcha
    if (!error) {
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

      // Set the transporter settings for NodeMailer
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

      // Set the mail options for NodeMailer
      let mailOptions = {
        from: `Contact ${config.from}`, // sender address
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
          data: {
            msg: "Email has been sent successfully!"
          }
        });
      });
    }
  });
});

// 404
app.use(function (req, res, next) {
  res.status(404);

  // respond with html page
  if (req.accepts("html")) {
    res.render("404", {
      url: req.url
    });
    return;
  }

  // respond with json
  if (req.accepts("json")) {
    res.send({
      error: "Not found"
    });
    return;
  }

  // default to plain-text. send()
  res.type("txt").send("Not found");
});

app.listen(process.env.PORT || port, function () {
  console.log("Server is running at port: ", port);
});