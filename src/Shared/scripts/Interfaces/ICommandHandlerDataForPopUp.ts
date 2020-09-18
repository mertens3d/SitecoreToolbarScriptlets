import { EventManager } from "../../../PopUp/scripts/Managers/EventManager";
import { IEventHandlerData } from "./IEventHandlerData";
import { IMenuStateForMsg } from "./IMenuStateForMsg";
import { IMenuCommandDefinition } from "./IMenuCommandDefinition";

export interface ICommandHandlerDataForPopUp {
  MenuState: IMenuStateForMsg;
  EventMan: EventManager;
  MenuCommandParams: IMenuCommandDefinition;
  EventHandlerData: IEventHandlerData;
  Evt: MouseEvent;
}