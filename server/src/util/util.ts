import { Socket } from "socket.io";
import { v4 as uuidV4 } from "uuid";

const rooms: Record<string, string[]> = {};

interface RoomParams {
  roomId: string;
  peerId: string;
}

export const roomHandler = (socket: Socket) => {
  const createRoom = () => {
    // room id
    const roomId = uuidV4();
    rooms[roomId] = [];
    console.log("uuid ", roomId);

    socket.emit("room-created", { roomId });
    console.log("User created a room");
  };

  const joinRoom = ({ roomId, peerId }: RoomParams) => {
    if (rooms[roomId]) {
      console.log("User joined the room", roomId, peerId);
      rooms[roomId].push(peerId);
      socket.join(roomId);
      socket.to(roomId).emit("user-joined", { peerId });
      socket.emit("get-users", {
        roomId,
        participants: rooms[roomId],
      });
    }

    socket.on("disconnect", () => {
      console.log("User disconnected", peerId);
      leaveRoom({ roomId, peerId });
    });
  };

  const leaveRoom = ({ roomId, peerId }: RoomParams) => {
    if (rooms[roomId]) {
      rooms[roomId] = rooms[roomId].filter((id) => id !== peerId);
      socket.to(roomId).emit("user-disconnected", peerId);
    }
  };

  socket.on("join-room", joinRoom);
  socket.on("create-room", createRoom);
};
