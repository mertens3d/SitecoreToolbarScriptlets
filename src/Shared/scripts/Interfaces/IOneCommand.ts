import { MenuCommand } from "../Enums/MenuCommand";
import { scWindowType } from "../Enums/scWindowType";

export interface IOneCommand {
  Command: MenuCommand,
  RequiredPageTypes: scWindowType[],
  ButtonSelector: string,

}