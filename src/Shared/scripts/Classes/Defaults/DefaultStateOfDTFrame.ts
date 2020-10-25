import { ScProxyDisciminator } from "../../Enums/40 - ScProxyDisciminator";
import { ScWindowType } from "../../Enums/50 - scWindowType";
import { IStateOf_ } from "../../Interfaces/StateOf/IStateOf_";
import { IStateOfGenericFrame } from "../../Interfaces/StateOf/IStateOfDTFrame";
import { IFrameJacketStyling } from "../../Interfaces/StateOf/IStateOfFrameStyling";

export class DefaultStateOfFrameProxy implements IStateOfGenericFrame {
  Children: IStateOf_[] = []

  Disciminator = ScProxyDisciminator.FrameProxy;
  DisciminatorFriendly = ScProxyDisciminator[ScProxyDisciminator.FrameProxy];

  FrameStyling: IFrameJacketStyling = null;
  WindowType: ScWindowType;
  ZIndex: number;
}