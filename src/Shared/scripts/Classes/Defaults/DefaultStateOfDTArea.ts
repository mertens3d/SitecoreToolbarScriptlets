import { ScProxyDisciminator } from "../../Enums/40 - ScProxyDisciminator";
import { IStateOfDTArea } from "../../Interfaces/StateOf/IStateOfDTProxy";
import { IStateOf_ } from "../../Interfaces/StateOf/IStateOf_";

export class DefaultStateOfDTArea implements IStateOfDTArea {
  Disciminator: ScProxyDisciminator = ScProxyDisciminator.DTArea;
  DisciminatorFriendly: string = ScProxyDisciminator[ScProxyDisciminator.DTArea];
  ActiveFrameIndex = -1;
  Children: IStateOf_[] = [];
}