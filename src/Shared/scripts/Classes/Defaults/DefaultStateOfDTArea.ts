import { ScProxyDisciminator } from "../../Enums/40 - ScProxyDisciminator";
import { IStateOfDTFrame } from "../../Interfaces/StateOf/IStateOfDTFrame";
import { IStateOfDTArea } from "../../Interfaces/StateOf/IStateOfDTProxy";
import { IStateOf_ } from "../../Interfaces/StateOf/IStateOf_";

export class DefaultStateOfDTArea implements IStateOfDTArea {
  DisciminatorFriendly: string;
  Disciminator: ScProxyDisciminator;
  StateOfHostedProxies: IStateOf_[];
  DTFrames: IStateOfDTFrame[] = [];
  ActiveFrameIndex = -1;
}