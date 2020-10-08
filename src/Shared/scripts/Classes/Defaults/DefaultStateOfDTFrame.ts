import { StateFullProxyDisciminator } from "../../Enums/4000 - StateFullProxyDisciminator";
import { ScWindowType } from "../../Enums/scWindowType";
import { IStateOf_ } from "../../Interfaces/Data/States/IStateOf_";
import { IStateOfDTFrame } from "../../Interfaces/Data/States/IStateOfDTFrame";

export class DefaultStateOfDTFrame implements IStateOfDTFrame {
  StateOfHosted: IStateOf_ = {
    StatefullDisciminator: StateFullProxyDisciminator.Unknown,
    StatefullDisciminatorFriendly : StateFullProxyDisciminator[StateFullProxyDisciminator.Unknown]
  };
  StateOfFrameStyling = null;
  WindowType: ScWindowType;
  ZIndex: number;
}