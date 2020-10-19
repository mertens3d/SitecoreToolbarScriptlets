import { IStateOfDesktop } from "../../Interfaces/StateOf/IStateOfDesktop";
import { IStateOfDTArea } from "../../Interfaces/StateOf/IStateOfDTProxy";
import { DefaultStateOfDTArea } from "./DefaultStateOfDTArea";
import { ScProxyDisciminator } from "../../Enums/40 - ScProxyDisciminator";

export class DefaultStateOfDesktop implements IStateOfDesktop {
  DisciminatorFriendly = ScProxyDisciminator[ScProxyDisciminator.Desktop];
  Disciminator = ScProxyDisciminator.Desktop;
  DTArea: IStateOfDTArea = new DefaultStateOfDTArea();
}