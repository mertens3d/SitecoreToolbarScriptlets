import { EventManager } from "../../../PopUp/scripts/Managers/EventManager";
import { IEventHandlerData } from "./IEventHandlerData";
import { IMenuCommandDefinition } from "./IMenuCommandDefinition";

export interface ICommandHandlerDataForPopUp {
  EventMan: EventManager;
  MenuCommandParams: IMenuCommandDefinition;
  EventHandlerData: IEventHandlerData;
  Evt: MouseEvent;
}