if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express =  require('express');
const app = express();
app.use(express.urlencoded({extended: true}))
app.use(express.json())

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS
  }
});

app.post('/submit', async (req, res) => {
  const { name, userEmail, subject, message, phoneNumber} = req.body;

  try {
    const mailOptions = {
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: 'Message from Imperial Total Solutions',
      html: `<p>Name: ${name}</p>\n<p>Client Email: ${userEmail}</p>\n<p>subject: ${subject}</p>\n<p>Client Message: ${message}</p>\n<p>Client Phone Number: ${phoneNumber}</p>`
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true });
    console.log('sent successfully')
  } catch (error) {
    console.error(error);

    res.status(500).json({ success: false, message: 'Failed to send email' });
  }
});


const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('running')
})