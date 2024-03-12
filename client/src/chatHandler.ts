const serverHost = process.env.REACT_APP_SERVER_URL;

export const getMessagesHandler = async (
  e: string,
  roomId: string | undefined
) => {
  let response = await fetch(`${serverHost}room/${e}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ roomId: roomId }),
  });
  return response;
};
