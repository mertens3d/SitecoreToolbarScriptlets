import { IStateOfDesktop } from "../../Interfaces/Data/States/IStateOfDesktop";
import { IStateOfDTArea } from "../../Interfaces/Data/States/IStateOfDTProxy";
import { DefaultStateOfDTArea } from "./DefaultStateOfDTArea";
import { StateFullProxyDisciminator } from "../../Enums/4000 - StateFullProxyDisciminator";

export class DefaultStateOfDesktop implements IStateOfDesktop {
  StatefullDisciminatorFriendly = StateFullProxyDisciminator[StateFullProxyDisciminator.Desktop];
  StatefullDisciminator = StateFullProxyDisciminator.Desktop;
  StateOfDTArea: IStateOfDTArea = new DefaultStateOfDTArea();
}