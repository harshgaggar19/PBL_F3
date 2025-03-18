import Chat from "../../model/chat.schema.js";
import User from "../../model/User.schema.js";

import { allsockets } from "./websocket.js";
// HTTP route to send a message
export async function sendMessage(req, res) {
    const { roomId, senderPhone, message } = req.body;

    try {
        const sender = await User.findOne({ phone: senderPhone });
        if (!sender) {
            return res.status(404).json({ error: "Sender not found" });
        }

        // Save message to database
        const newMessage = new Chat({
            roomId,
            sender: sender._id,
            message,
        });
        await newMessage.save();

        // Broadcast message to WebSocket clients
        allsockets.forEach((client) => {
            if (client.roomId === roomId) {
                client.socket.send(
                    JSON.stringify({
                        type: "NewMessage",
                        message,
                        sender: senderPhone,
                    })
                );
            }
        });

        res.status(200).json({ success: true });
    } catch (error) {
        console.error("Error in sendMessage:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
