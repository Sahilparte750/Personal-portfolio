const { request } = require("express");
const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
const SendmailTransport = require("nodemailer/lib/sendmail-transport");

const PORT = process.env.PORT || 5000;

app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/contact.html");
});

app.post("/", (req, res) => {
  console.log(req.body);

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "sahilportfolio031@gmail.com",
      pass: "Portfolio@123",
    },
  });
  const mailOptions = {
    from: req.body.email,
    to: "sahilportfolio031@gmail.com",
    subject: `Message from ${req.body.email}: ${req.body.subject}`,
    text: req.body.message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send("this is error");
    } else {
      console.log("Email sent : " + info.response);
      res.send("sucess");
    }
  });
});

app.listen(PORT, () => {
  console.log(`server running on port $(PORT)`);
});
