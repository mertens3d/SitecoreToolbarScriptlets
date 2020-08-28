import { MenuCommand } from "../Enums/2xxx-MenuCommand";
import { VisibilityType } from "../Enums/VisibilityType";
import { IEventHandlerData } from "./IEventHandlerData";

export interface IOneCommand {
  Command: MenuCommand,
  VisibilityControllers: VisibilityType[],
  ButtonSelector: string,
  EventData: IEventHandlerData
}