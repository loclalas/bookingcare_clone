const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (dataSend) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: '"Phan Thanh Lộc" <loclalas@gmail.com>', // sender address
    to: dataSend.receiverEmail, // list of receivers
    subject: "Thông tin đặt lịch khám bệnh", // Subject line
    text: "Hello world?", // plain text body
    html: `<b>Xin chào ${dataSend.patientName}</b>
        <p>Email này được gửi từ BookingCare</p>
        <p>Thông tin lịch hẹn:</p>
        <div><b>Thời gian: ${dataSend.time}</b></div>
        <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
        <div>
        <a href=${dataSend.redirectLink} target="_blank">Click Here</a>
        </div>`,
  });
};

module.exports = {
  sendEmail,
};
