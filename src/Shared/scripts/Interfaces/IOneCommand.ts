import { MenuCommand } from "../Enums/2xxx-MenuCommand";
import { scWindowType } from "../Enums/scWindowType";
import { HandlersExternal } from "../../../PopUp/scripts/Classes/HandlersExternal";
import { IEventHandlerData } from "./IEventHandlerData";
import { VisibilityType } from "../Enums/VisibilityType";

export interface IOneCommand {
  Command: MenuCommand,
  VisibilityControllers: VisibilityType[],
  ButtonSelector: string,
  Events: IEventHandlerData[]
}