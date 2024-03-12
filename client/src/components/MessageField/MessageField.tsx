import SendIcon from "@mui/icons-material/Send";
import styles from "./MessageFields.module.css";
import { useContext, useEffect, useState } from "react";
import Chat, { ChatData } from "../Chat/Chat";
import { RoomContext } from "../Context/RoomProvider";
import { getMessagesHandler } from "../../chatHandler";

export default function MessageField({
  roomId,
}: {
  roomId: string | undefined;
}) {
  const { ws } = useContext(RoomContext);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatData[]>([]);

  useEffect(() => {
    ws.on("receive-message", (data: any) =>
      setMessages((pre) => [...pre, data])
    );

    return () => {
      ws.off("receive-message");
    };
  }, [messages, ws]);

  useEffect(() => {
    (async function getAllMessages() {
      let res = await getMessagesHandler("getAllMessages", roomId);
      if (!res.ok) {
        console.log("Somewhere went wrong");
        return;
      }
      const { data } = await res.json();
      console.log("From server", data);
      if (data) {
        setMessages(data);
      }
    })();
  }, [roomId]);

  function submitMessageHandler() {
    const userEmail = JSON.parse(
      sessionStorage.getItem("videoChatUser") as string
    );

    const { name, email } = userEmail;
    if (roomId) {
      const data = {
        name,
        email,
        message: message,
        roomId: roomId,
      };
      ws.emit("chat", data);
      setMessage("");
    } else {
      alert("Issue in room id");
    }
  }

  return (
    <div style={{ width: "30vw" }}>
      <div id={styles.messages}>
        <div id={styles.messageField}>
          {messages.length > 0 &&
            messages.map((data, index) => <Chat data={data} key={index} />)}
        </div>
        <div id={styles.textField}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            autoFocus
          />
          <button
            style={{ backgroundColor: `rgb(25,118,210)`, color: "white" }}
            onClick={submitMessageHandler}
            disabled={!message}
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
