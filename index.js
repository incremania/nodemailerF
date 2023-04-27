if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express =  require('express');
const app = express();
app.use(express.urlencoded({extended: true}))
// const transporter = nodemailer.createTestAccount({
//     service: 'gmail', 
//     auth: {
//         user: 'companychris00@gmail.com',
//         pass: 'wdcdawjhdxbxfsea'
//     }
// })
// app.post('/submit', async (req, res) => {
//     const {name, userEmail, subject, message } = req.body
  
//     try {
       

//         const mailOptions = {
//             from: 'companychris00@gmail.com',
//             to: 'companychris00@gmail.com',
//             subject: 'new registration',
//             html: `<p>name: ${name}</p> \n <p>user-email: ${userEmail}</p> \n
//             <p>subject: ${subject}</p> \n <p>message: ${message}</p>
//             `
//         }

//        await transporter.sendMail(mailOptions, (err) => {
//             if(err) {
//                 console.log('this is the eroor', err)
//             } else {
//                 console.log('email sent successfully');
//                 res.json('email sent succesfully')
//             };
//         });
                    
//     } catch (error) {
//         console.log(error)
//         res.status(500).json('error from the backend')
//     }
   

//     console.log(req.body)
// })

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_APP_PASSWORD
  }
});

app.post('/submit', async (req, res) => {
  const { name, userEmail, subject, message, phoneNumber} = req.body;

  try {
    const mailOptions = {
      from: 'companychris00@gmail.com',
      to: 'companychris00@gmail.com',
      subject: 'New registration',
      html: `<p>name: ${name}</p>\n<p>user-email: ${userEmail}</p>\n<p>subject: ${subject}</p>\n<p>message: ${message}</p>\n<p>phone Number: ${phoneNumber}</p>`
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true });
  } catch (error) {
    console.error(error);

    res.status(500).json({ success: false, message: 'Failed to send email' });
  }
});

app.get('/long', (req, res) => {
    res.json('hello  json')
})

app.listen('3000', () => {
    console.log('hello its been a while')
})