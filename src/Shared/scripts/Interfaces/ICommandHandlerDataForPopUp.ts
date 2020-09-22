import { EventManager } from "../../../PopUpUi/scripts/Managers/EventManager";
import { IEventHandlerData } from "./IEventHandlerData";
import { IMenuCommandDefinition } from "./IMenuCommandDefinition";

export interface ICommandHandlerDataForPopUp {
  EventMan: EventManager;
  MenuCommandDefinition: IMenuCommandDefinition;
  EventHandlerData: IEventHandlerData;
  Evt: MouseEvent;
}