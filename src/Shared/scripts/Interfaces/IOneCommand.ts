import { MenuCommand } from "../Enums/2xxx-MenuCommand";
import { VisibilityType } from "../Enums/VisibilityType";
import { IEventHandlerData } from "./IEventHandlerData";
import { ModuleType } from "./CommandButtonEvents";

export interface IOneCommand {
  PlaceHolderSelector: string,
  Command: MenuCommand,
  EventData: IEventHandlerData,
  IconClassName: string,
  InnerText: string
  VisibilityControllers: VisibilityType[],
  ModuleType: ModuleType,
}