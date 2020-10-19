import { ScProxyDisciminator } from "../../Enums/40 - ScProxyDisciminator";
import { ScWindowType } from "../../Enums/50 - scWindowType";
import { IStateOf_ } from "../../Interfaces/StateOf/IStateOf_";
import { IStateOfDTFrame } from "../../Interfaces/StateOf/IStateOfDTFrame";

export class DefaultStateOfDTFrame implements IStateOfDTFrame {
  HostedFrame: IStateOf_ = {
    Disciminator: ScProxyDisciminator.Unknown,
    DisciminatorFriendly : ScProxyDisciminator[ScProxyDisciminator.Unknown]
  };
  FrameStyling = null;
  WindowType: ScWindowType;
  ZIndex: number;
}