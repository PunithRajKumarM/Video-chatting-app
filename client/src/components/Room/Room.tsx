import { useContext, useEffect, useState } from "react";
import styles from "./Room.module.css";
import { useParams } from "react-router-dom";
import { RoomContext } from "../Context/RoomProvider";
import VideoStream from "../Video/VideoStream";
import { PeerState } from "../../Actions/peerReducer";
import { Drawer } from "@mui/material";
// import BottomNavigation from "@mui/material/BottomNavigation";
// import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import CallEndIcon from "@mui/icons-material/CallEnd";
import MessageField from "../MessageField/MessageField";

export default function Call() {
  const [openChat, setOpenChat] = useState<boolean>(false);
  const [buttonValue, setChatValue] = useState(0);
  const { id } = useParams();

  const { ws, me, stream, peers, shareScreen } = useContext(RoomContext);

  useEffect(() => {
    if (me) ws.emit("join-room", { roomId: id, peerId: me._id });
  }, [id, ws, me]);

  return (
    <div id={styles.wrapper}>
      <div id={styles.call}>
        <Drawer
          anchor="right"
          open={openChat}
          onClose={() => setOpenChat(false)}
        >
          <MessageField roomId={id} />
        </Drawer>

        <div id={styles.videoWrapper}>
          <VideoStream stream={stream} />
          {Object.values(peers as PeerState).map((peer, i) => (
            <VideoStream stream={peer.stream} key={i} />
          ))}
        </div>
      </div>
      <div id={styles.bottomBar}>
        <div className={styles.bottomBarBtn} onClick={() => setOpenChat(true)}>
          <ChatBubbleIcon sx={{ color: "rgb(236, 236, 236)" }} />
          <p>Chat</p>
        </div>
        <button className={styles.leaveBtn}>
          <CallEndIcon sx={{ color: "rgb(236, 236, 236)" }} />
        </button>
      </div>
    </div>
  );
}
