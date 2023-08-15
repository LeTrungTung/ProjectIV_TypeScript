import nodemailer from "nodemailer";
import mailerConfig from "../../configs/mail.config";

// Cấu hình transporter
const transporter = nodemailer.createTransport({
  service: mailerConfig.email.service,
  auth: {
    user: mailerConfig.email.user,
    pass: mailerConfig.email.password,
  },
});

// Hàm gửi email thông báo cho người dùng
const sendRegistrationEmail = async (email: string) => {
  // Nội dung email
  const mailOptions = {
    from: mailerConfig.email.user,
    to: email,
    subject: "Registration Successful",
    html: `
      <html>
        <head>
          <style>
            /* CSS styles */
            body {
              font-family: Arial, sans-serif;
              background-color: #f0f0f0;
            }
            h2 {
              color: #333333;
            }
            p {
              color: #555555;
            }
          </style>
        </head>
        <body>
          <h2>Chúc mừng ${email} đã đăng ký thành công!</h2>
          <p>Hãy khám phá và có những trải nghiệm tuyệt vời.</p>
        </body>
      </html>
    `,
  };

  // Gửi email
  await transporter.sendMail(mailOptions);
};

export default sendRegistrationEmail;
