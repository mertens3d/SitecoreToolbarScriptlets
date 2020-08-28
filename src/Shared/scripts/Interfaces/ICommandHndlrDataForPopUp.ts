import { EventManager } from "../../../PopUp/scripts/Managers/EventManager";
import { IOneCommand } from "./IOneCommand";
import { IEventHandlerData } from "./IEventHandlerData";
import { PopUpHub } from "../../../PopUp/scripts/Managers/PopUpHub";

export interface ICommandHndlrDataForPopUp {
    Self: EventManager;
    Command: IOneCommand;
    Event: IEventHandlerData;
    Evt: MouseEvent;
    PopUpHub: PopUpHub;
}
