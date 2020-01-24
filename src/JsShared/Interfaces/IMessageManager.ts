import { IMsgFromX } from "./IMsgPayload";

export interface IMessageManager {
  ReceiveMessage(msgPayload: IMsgFromX);
  SendMessage(msgPayload: IMsgFromX);
}