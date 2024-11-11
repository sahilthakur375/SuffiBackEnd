import nodemailer from 'nodemailer';

const sendMail = async (req, res) => {
  let testAccount = await nodemailer.createTestAccount();

  // connect with the smtp
  let transporter = await nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "effie.schmeler@ethereal.email",
      pass: "JhKHJ9UFQxccj6zn44",
    },
  });

  let info = await transporter.sendMail({
    from: '"Sahil Thakur" <thapa@gmail.com>', // sender address
    to: "iam@gmail.com", // list of receivers
    subject: "Hello Sahil", // Subject line
    text: "blah! blah! blah!", // plain text body
    html: "<b>Hello</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  res.json(info);
};

export default sendMail;

