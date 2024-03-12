import Peer from "peerjs";
import {
  FunctionComponent,
  ReactNode,
  createContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import socketIO from "socket.io-client";
import { v4 as uuidV4 } from "uuid";
import { peersReducer } from "../../Actions/peerReducer";
import { addPeerAction, removePeerAction } from "../../Actions/peerActions";

export const RoomContext = createContext<null | any>(null);
const WS = process.env.REACT_APP_SERVER_URL as string;

const ws = socketIO(WS);

interface RoomProviderProps {
  children: ReactNode;
}

export const RoomProvider: FunctionComponent<RoomProviderProps> = ({
  children,
}) => {
  const navigate = useNavigate();
  const [me, setMe] = useState<Peer>();
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [peers, dispatch] = useReducer(peersReducer, {});
  const [screenSharingId, setScreenSharingId] = useState("");
  const [roomParticipants, setRoomParticipants] = useState<string[]>([]);
  // const [peerConnections, setPeerConnections] = useState<DataConnection | null>(
  //   null
  // );

  const getUsers = ({ participants }: { participants: string[] }) => {
    console.log("participants", participants);
    setRoomParticipants(participants);
    localStorage.setItem("participants", JSON.stringify(participants));
  };

  const enterRoom = ({ roomId }: { roomId: string }) => {
    console.log(roomId);
    navigate(`/room/${roomId}`);
  };

  const removePeer = (peerId: string) => {
    dispatch(removePeerAction(peerId));
  };

  function switchSharing(stream: MediaStream) {
    setStream(stream);
    setScreenSharingId(me?.id || "");
  }

  useEffect(() => {
    // user id
    const meId = uuidV4();

    const peer = new Peer(meId);
    setMe(peer);

    function videoPlayerHandler() {
      try {
        navigator.mediaDevices
          .getUserMedia({ video: true, audio: true })
          .then((s) => setStream(s));
      } catch (error) {
        console.error(error);
      }
    }
    videoPlayerHandler();

    ws.on("room-created", enterRoom);
    ws.on("get-users", getUsers);
    ws.on("user-disconnected", removePeer);
  }, []);

  useEffect(() => {
    console.log(`Participants are ${roomParticipants}`);
  }, [roomParticipants]);

  useEffect(() => {
    if (!me) return;
    if (!stream) return;

    ws.on("user-joined", ({ peerId }) => {
      const call = me.call(peerId, stream);
      call.on("stream", (peerStream) => {
        dispatch(addPeerAction(peerId, peerStream));
      });
    });

    me.on("call", (call) => {
      call.answer(stream);
      call.on("stream", (peerStream) => {
        dispatch(addPeerAction(call.peer, peerStream));
      });
    });
  }, [me, stream]);
  // console.log(peers);

  function shareScreen() {
    if (screenSharingId) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then(switchSharing)
        .catch((err) => console.log("Failed to play video", err));
    } else {
      navigator.mediaDevices
        .getDisplayMedia({ video: true, audio: true })
        .then(switchSharing)
        .catch((err) => console.log("Failed to share screen", err));
    }

    console.log(peers.connections);

    // Object.values(me?.connections)).forEach((connection: any) => {
    //   const videoTrack = stream
    //     ?.getTracks()
    //     .find((track) => track.kind === "video");
    //   connection[0].peerConnections
    //     .getSenders()[1]
    //     .replaceTrack(videoTrack)
    //     .catch((err: any) => console.log(err));
    // });
  }

  return (
    <RoomContext.Provider value={{ ws, me, stream, peers, shareScreen }}>
      {children}
    </RoomContext.Provider>
  );
};
