import { UiEventManager } from "../../../PopUpUi/scripts/Managers/UiEventManager";
import { IEventHandlerData } from "./IEventHandlerData";
import { IMenuCommandDefinition } from "./IMenuCommandDefinition";

export interface ICommandHandlerDataForPopUp {
  EventMan: UiEventManager;
  MenuCommandDefinition: IMenuCommandDefinition;
  EventHandlerData: IEventHandlerData;
  Evt: MouseEvent;
}