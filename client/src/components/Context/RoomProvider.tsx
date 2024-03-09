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

  const getUsers = ({ participants }: { participants: string[] }) => {
    console.log("participants", participants);
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

  return (
    <RoomContext.Provider value={{ ws, me, stream, peers, shareScreen }}>
      {children}
    </RoomContext.Provider>
  );
};
