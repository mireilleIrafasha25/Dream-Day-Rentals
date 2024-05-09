import nodemailer from 'nodemailer';

export const sendEmail = (recipient, subject, body) => {
    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        },
        tls: {
            rejectUnauthorized: false // Add this line to accept self-signed certificates
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: recipient,
        subject: subject,
        text: body
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error('Error sending email', err);
        } 
        else {
            console.log('Email sent');
        }
    });
};
