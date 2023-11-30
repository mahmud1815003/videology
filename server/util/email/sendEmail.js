const { google } = require("googleapis");
const nodemailer = require("nodemailer");

const sendMail = async (subject, body, to) => {
  try {
    const oAuth2Client = new google.auth.OAuth2(
      process.env.client_id,
      process.env.client_secret,
      process.env.redirect_uri
    );
    oAuth2Client.setCredentials({ refresh_token: process.env.refresh_token });
    const access_token = await oAuth2Client.getAccessToken();
    console.log(access_token);
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: `${process.env.sender}`,
        clientId: process.env.client_id,
        clientSecret: process.env.client_secret,
        refreshToken: process.env.refresh_token,
        accessToken: access_token,
      },
    });
    const mailOptions = {
      from: `Videology Server ${process.env.sender}`,
      to: to,
      subject: subject,
      text: body,
    };
    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
};


module.exports = {
  sendMail,
};
