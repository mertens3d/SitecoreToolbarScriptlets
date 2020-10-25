import { ScProxyDisciminator } from "../../Enums/40 - ScProxyDisciminator";
import { IStateOfDTArea } from "../../Interfaces/StateOf/IStateOfDTProxy";
import { IStateOf_ } from "../../Interfaces/StateOf/IStateOf_";

export class DefaultStateOfDTArea implements IStateOfDTArea {
  DisciminatorFriendly: string = ScProxyDisciminator[ScProxyDisciminator.DTArea];
  Disciminator: ScProxyDisciminator = ScProxyDisciminator.DTArea;
  Children: IStateOf_[] = [];
  //DTFrames: IStateOfGenericFrame[] = [];
  ActiveFrameIndex = -1;
}