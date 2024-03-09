import { useContext, useEffect, useState } from "react";
import styles from "./Room.module.css";
import { useParams } from "react-router-dom";
import { RoomContext } from "../Context/RoomProvider";
import VideoStream from "../Video/VideoStream";
import { PeerState } from "../../Actions/peerReducer";
import { Drawer } from "@mui/material";

export default function Call() {
  const [openChat, setOpenChat] = useState<boolean>(false);
  const { id } = useParams();
  const { ws, me, stream, peers, shareScreen } = useContext(RoomContext);
  const size = "2rem";

  useEffect(() => {
    if (me) ws.emit("join-room", { roomId: id, peerId: me._id });
  }, [id, ws, me]);

  return (
    <div id={styles.call}>
      <p>Room id : {id}</p>
      <button onClick={() => setOpenChat(true)}>Chat</button>
      <button onClick={shareScreen}>Share Screen</button>
      <div
        style={{
          display: "flex",
          gap: "1rem",
        }}
      >
        <Drawer
          anchor="right"
          open={openChat}
          onClose={() => setOpenChat(false)}
        >
          <div style={{ width: "50vw", height: "100vh" }}>
            <div
              style={{
                border: "1px solid black",
                height: `calc(100vh - ${size})`,
              }}
            ></div>
            <div
              style={{
                height: "2rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <input type="text" />
              <button>Send</button>
            </div>
          </div>
        </Drawer>
        <VideoStream stream={stream} />
        {Object.values(peers as PeerState).map((peer, i) => (
          <VideoStream stream={peer.stream} key={i} />
        ))}
      </div>
    </div>
  );
}
