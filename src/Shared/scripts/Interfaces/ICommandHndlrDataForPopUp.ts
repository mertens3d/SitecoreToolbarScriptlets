import { EventManager } from "../../../PopUp/scripts/Managers/EventManager";
import { IEventHandlerData } from "./IEventHandlerData";
import { IOneCommand } from "./IOneCommand";
import { IMenuStateForMsg } from "../Classes/IMenuStateForMsg";

export interface ICommandHndlrDataForPopUp {
  MenuState: IMenuStateForMsg;
  EventMan: EventManager;
  Command: IOneCommand;
  Event: IEventHandlerData;
  Evt: MouseEvent;
}