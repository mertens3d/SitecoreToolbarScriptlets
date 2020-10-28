import { ScProxyDisciminator } from "../../Enums/40 - ScProxyDisciminator";
import { IStateOfDesktop } from "../../Interfaces/StateOf/IStateOfDesktop";
import { IStateOf_ } from "../../Interfaces/StateOf/IStateOf_";

export class DefaultStateOfDesktop implements IStateOfDesktop {
  DisciminatorFriendly = ScProxyDisciminator[ScProxyDisciminator.Desktop];
  Disciminator = ScProxyDisciminator.Desktop;
  Children: IStateOf_[] = [];
}