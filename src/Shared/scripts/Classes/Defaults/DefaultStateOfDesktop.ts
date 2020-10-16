import { IStateOfDesktop } from "../../Interfaces/Data/States/IStateOfDesktop";
import { IStateOfDTArea } from "../../Interfaces/Data/States/IStateOfDTProxy";
import { DefaultStateOfDTArea } from "./DefaultStateOfDTArea";
import { ScDocProxyDisciminator } from "../../Enums/40 - StateFullProxyDisciminator";

export class DefaultStateOfDesktop implements IStateOfDesktop {
  DisciminatorFriendly = ScDocProxyDisciminator[ScDocProxyDisciminator.Desktop];
  Disciminator = ScDocProxyDisciminator.Desktop;
  DTArea: IStateOfDTArea = new DefaultStateOfDTArea();
}