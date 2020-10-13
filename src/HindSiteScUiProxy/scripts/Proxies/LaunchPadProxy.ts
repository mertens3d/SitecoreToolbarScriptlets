import { StateFullProxyDisciminator } from "../../../Shared/scripts/Enums/40 - StateFullProxyDisciminator";
import { IStateFullProxy } from "../../../Shared/scripts/Interfaces/Agents/IStateProxy";
import { IStateOfLaunchPad } from "../../../Shared/scripts/Interfaces/Data/States/IStateOfLaunchPad";
import { _BaseStateFullProxy } from "./Desktop/DesktopProxy/FrameProxies/_StateProxy";

export class LaunchPadProxy extends _BaseStateFullProxy<IStateOfLaunchPad> implements IStateFullProxy {
  readonly StateFullProxyDisciminator: StateFullProxyDisciminator = StateFullProxyDisciminator.LaunchPad;
  readonly StateFullProxyDisciminatorFriendly = StateFullProxyDisciminator[StateFullProxyDisciminator.LaunchPad];
  async GetState(): Promise<any> {
    //empty
  }

  async SetState(state: any) {
    //empty
  }

  WireEvents() {
    //empty
  }

  async InstantiateAsyncMembers(): Promise<void> {
    //empty
  }

  TriggerInboundEventsAsync(): void {
    //empty
  }
}