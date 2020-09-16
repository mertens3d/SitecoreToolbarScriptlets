import { EventManager } from "../../../PopUp/scripts/Managers/EventManager";
import { IEventHandlerData } from "./IEventHandlerData";
import { IMenuCommandParams } from "./MenuCommand";
import { IMenuStateForMsg } from "./IMenuStateForMsg";

export interface ICommandHndlrDataForPopUp {
  MenuState: IMenuStateForMsg;
  EventMan: EventManager;
  MenuCommandParams: IMenuCommandParams;
  Event: IEventHandlerData;
  Evt: MouseEvent;
}