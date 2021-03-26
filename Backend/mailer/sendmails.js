const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "corpenviro@gmail.com",
    pass: "4122001@Hr",
  },
});


//


//  register mail 
const RegisterMail = (email2, password, name ) => {
  let mailOptions = {
    from: "corpenviro@gmail.com",
    to: "shivbhushan703@gmail.com",
    subject: "Welcome To CorpEnviro",
    text: `Hello ${name}, Welcome to CorpEnviro We are happy to see you on board.. 
    find your login Credentials Below
    Login Email = ${email2},
    Login Password= ${password}
    if you are facing Any Issue While Login Please Contact Your HR
    Team CorpEnviro`,
    

  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) console.log("error", err);
    console.log("mail sent!");
  });
};

// login mail
const LoginMail = (email1) => {
  let mailOptions = {
    from: "corpenviro@gmail.com",
    to: "shivbhushan703@gmail.com",
    subject: "Login Notification",
    text: "We have noticed a login from your account",
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) console.log("error", err);
    console.log("mail sent!");
  });
};



module.exports = {RegisterMail, LoginMail}