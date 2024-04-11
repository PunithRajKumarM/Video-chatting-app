import { AppDataSource } from "../data-source";
import { Messages } from "../entity/Messages";
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const clientId =
  process.env.CLIENT_EMAIL_ID ||
  "1071602962965-fmpiv14a7r4em8f5v84ot01io4hlmnsk.apps.googleusercontent.com";
const clientSecret =
  process.env.CLIENT_EMAIL_SECRET || "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";
const refreshToken =
  process.env.CLIENT_REFRESH_TOKEN ||
  "1//04tzq8O_y_ht3CgYIARAAGAQSNwF-L9IrneC4fxIv2b-vgl4fYR84cs9qc8XZeTmiKhTc7uF66ZTmW-B-YtmQytBrUQk7EafzR9w";

// https://developers.google.com/oauthplayground/
// --> https://mail.google.com

console.log("ci", clientId);
console.log("cs", clientSecret);
console.log("rt", refreshToken);

const OAuth2_client = new OAuth2(clientId, clientSecret);
OAuth2_client.setCredentials({ refresh_token: refreshToken });

const messageRepo = AppDataSource.getRepository(Messages);

export const sendMessage = async (payload) => {
  try {
    let newMsg = new Messages();

    const { name, email, message, roomId } = payload;
    newMsg.email = email;
    newMsg.name = name;
    newMsg.message = message;
    newMsg.roomId = roomId;
    await messageRepo.save(newMsg);
  } catch (error) {
    console.error(`Failed to send message, ${error}`);
  }
};

export const getAllMessages = async (req, res) => {
  const { roomId } = req.body;
  try {
    const allMessages = await messageRepo.find({
      where: {
        roomId: roomId,
      },
    });

    res
      .status(200)
      .json({ message: "Messages fetched successfully!!", data: allMessages });
  } catch (error) {
    console.log(`Failed to fetch the messages, ${error}`);
    res.status(404).json({ message: "Failed to fetch messages" });
  }
};

export const sendMailToRecipient = (req, res) => {
  const { emailData } = req.body;
  const { sender, recipient, username, roomId } = emailData;
  console.log("mail received", sender, recipient, username, roomId);

  function send_mail(sender, recipient, roomId) {
    console.log(sender, recipient, username, roomId);

    const accessToken = OAuth2_client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: sender,
        clientId: clientId,
        clientSecret: clientSecret,
        refreshToken: refreshToken,
        accessToken: accessToken,
      },
    });

    const mail_options = {
      from: sender,
      to: recipient,
      subject: `A message from ${username}`,
      html: `Hi there! You got an invitation for a meeting. Join the meeting by copy and pasting the given room ID URL.

      Room ID : ${roomId}

      Thanks.
      `,
    };

    transport.sendMail(mail_options, function (error, result) {
      if (error) {
        console.log("Error: ");
      } else {
        console.log("Success: ", result);
      }
      transport.close();
    });
  }

  send_mail(sender, recipient, roomId);

  res.status(200).json({ message: "Mail sent successfully" });
};
