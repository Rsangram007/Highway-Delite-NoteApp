import mailSender from "../utils/mailSender"; //


export const sendOTP = async (email: string, otp: string) => {
  const subject = "Your OTP Code";
  const body = `<p>Your OTP code is <strong>${otp}</strong>. It will expire in 10 minutes.</p>`;
  await mailSender(email, otp);
};
