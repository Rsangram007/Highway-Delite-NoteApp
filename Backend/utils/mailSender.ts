import nodemailer from "nodemailer";

const mailSender = async (email: string, otp: string) => {
  try {
    const contactEmailOptions = {
      host: process.env.SMTP_HOST,
      service: process.env.SMTP_SERVICE,
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    };

    const transporter = nodemailer.createTransport(contactEmailOptions);

    // Send emails to users
    let info = await transporter.sendMail({
      from: "sangrambeheraa007@gmail.com",
      to: email,
      subject: "Your OTP for Registration/Login",
      text: `Your OTP is ${otp}`,
    });
    console.log("Email info: ", info);
    return info;
  } catch (error: any) {
    console.log(error.message);
  }
};

export default mailSender;
