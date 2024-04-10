import styles from "./Chat.module.css";

export interface ChatData {
  id: number;
  email: string;
  name: string;
  message: string;
  roomId: string;
}

const Chat = ({ data }: { data: ChatData }) => {
  let currentUser = JSON.parse(
    sessionStorage.getItem("videoChatUser") as string
  );

  return (
    <div
      className={
        data.email === currentUser.email
          ? `${styles.chatWrapper} ${styles.you}`
          : styles.chatWrapper
      }
    >
      <p className={styles.userName}>{data.name}</p>
      <p className={styles.messageContent}>{data.message}</p>
    </div>
  );
};

export default Chat;
