import { AppDataSource } from "../data-source";
import { Messages } from "../entity/Messages";

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
