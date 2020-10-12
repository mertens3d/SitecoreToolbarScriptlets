import { StateFullProxyDisciminator } from "../../Enums/40 - StateFullProxyDisciminator";
import { ScWindowType } from "../../Enums/50 - scWindowType";
import { IStateOf_ } from "../../Interfaces/Data/States/IStateOf_";
import { IStateOfDTFrame } from "../../Interfaces/Data/States/IStateOfDTFrame";

export class DefaultStateOfDTFrame implements IStateOfDTFrame {
  HostedFrame: IStateOf_ = {
    Disciminator: StateFullProxyDisciminator.Unknown,
    DisciminatorFriendly : StateFullProxyDisciminator[StateFullProxyDisciminator.Unknown]
  };
  FrameStyling = null;
  WindowType: ScWindowType;
  ZIndex: number;
}