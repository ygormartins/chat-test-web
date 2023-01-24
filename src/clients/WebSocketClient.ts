/*---------- Services ----------*/
import { getAccessToken } from "@/services/AuthService";

/*---------- Types ----------*/
import { IWebSocketMessage } from "@/@types/websocket";

/*---------- Interfaces ----------*/
export interface StartClientInput {
  onConnect?: () => Promise<void>;
  onDisconnect?: () => Promise<void>;
  onMessage?: (message: IWebSocketMessage) => Promise<void>;
  onError?: () => Promise<void>;
}

export interface SendMessageInput {
  action: string;
  data: Record<string, unknown>;
}

let wss: WebSocket | undefined;

export const startClient = async (input: StartClientInput) => {
  const idToken = await getAccessToken();

  if (!idToken) throw new Error("Unauthenticated");

  const wsPath = `${import.meta.env.VITE_PUBLIC_WS_URL}?idToken=${idToken}`;

  wss = new WebSocket(wsPath);

  wss.addEventListener("open", async () => {
    await input.onConnect?.();
  });

  wss.addEventListener("close", async () => {
    await input.onDisconnect?.();
  });

  wss.addEventListener("message", async ({ data: message }) => {
    const typedMessage = JSON.parse(message) as IWebSocketMessage;

    await input.onMessage?.(typedMessage);
  });

  wss.addEventListener("error", async () => {
    await input.onError?.();
  });
};

export const sendMessage = (input: SendMessageInput) => {
  if (!wss) return;

  const data = JSON.stringify(input);

  wss.send(data);
};
