import { MenuCommand } from "../Enums/MenuCommand";
import { scWindowType } from "../Enums/scWindowType";
import { HandlersExternal } from "../../../PopUp/scripts/Classes/HandlersExternal";
import { IEventHandlerData } from "./IEventHandlerData";

export interface IOneCommand {
  Command: MenuCommand,
  RequiredPageTypes: scWindowType[],
  ButtonSelector: string,
  Events: IEventHandlerData[]
}