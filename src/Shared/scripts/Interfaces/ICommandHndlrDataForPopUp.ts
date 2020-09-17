import { EventManager } from "../../../PopUp/scripts/Managers/EventManager";
import { IEventHandlerData } from "./IEventHandlerData";
import { IMenuStateForMsg } from "./IMenuStateForMsg";
import { IMenuCommandDefinition } from "./IMenuCommandDefinition";

export interface ICommandHndlrDataForPopUp {
  MenuState: IMenuStateForMsg;
  EventMan: EventManager;
  MenuCommandParams: IMenuCommandDefinition;
  Event: IEventHandlerData;
  Evt: MouseEvent;
}