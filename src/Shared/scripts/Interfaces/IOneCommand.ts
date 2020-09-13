import { MenuCommand } from "../Enums/2xxx-MenuCommand";
import { VisibilityType } from "../Enums/VisibilityType";
import { IEventHandlerData } from "./IEventHandlerData";

export interface IOneCommand {
  ButtonSelector: string,
  Command: MenuCommand,
  EventData: IEventHandlerData,
  IconClassName: string,
  InnerText: string
  VisibilityControllers: VisibilityType[],
}