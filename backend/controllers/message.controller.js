import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";


export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // this runs one-by-one, hence takes more time
    // await conversation.save();
    // await newMessage.save();

    // this runs all the process in parallel
    await Promise.all([await conversation.save(), await newMessage.save()]);

     // socket io functionality will come here
    const receiverSocketId = getReceiverSocketId( receiverId );
    if( receiverSocketId ){
      io.to( receiverSocketId).emit("newMessage", newMessage)
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages"); // populate is a mongoose property, that allows us to fetch the object from messages collection, using the stored object id

    if(!conversation){
        return res.status(200).json([]);
    }

    const messages = conversation.messages;
    res.status(200).json(messages);

  } catch (error) {
    console.log("Error in getMessage Controller", error.message);
    res.status(500).json({ error: "Internal Server error" });
  }
};
