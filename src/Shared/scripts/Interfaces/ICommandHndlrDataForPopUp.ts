import { EventManager } from "../../../PopUp/scripts/Managers/EventManager";
import { IEventHandlerData } from "./IEventHandlerData";
import { IOneCommand } from "./IOneCommand";

export interface ICommandHndlrDataForPopUp {
    Self: EventManager;
    Command: IOneCommand;
    Event: IEventHandlerData;
    Evt: MouseEvent;
}
