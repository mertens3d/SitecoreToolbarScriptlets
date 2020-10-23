import { IStateOfDesktop } from "../../Interfaces/StateOf/IStateOfDesktop";
import { IStateOfDTArea } from "../../Interfaces/StateOf/IStateOfDTProxy";
import { DefaultStateOfDTArea } from "./DefaultStateOfDTArea";
import { ScProxyDisciminator } from "../../Enums/40 - ScProxyDisciminator";
import { IStateOf_ } from "../../Interfaces/StateOf/IStateOf_";

export class DefaultStateOfDesktop implements IStateOfDesktop {
  DisciminatorFriendly = ScProxyDisciminator[ScProxyDisciminator.Desktop];
  Disciminator = ScProxyDisciminator.Desktop;
  DTArea: IStateOfDTArea = new DefaultStateOfDTArea();
  StateOfHostedProxies: IStateOf_[] = [];
}