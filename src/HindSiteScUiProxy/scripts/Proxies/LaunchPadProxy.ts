import { ScDocProxyDisciminator } from "../../../Shared/scripts/Enums/40 - StateFullProxyDisciminator";
import { IStateFullDocProxy } from "../../../Shared/scripts/Interfaces/Agents/IStateFullProxy";
import { IStateOfLaunchPad } from "../../../Shared/scripts/Interfaces/Data/States/IStateOfLaunchPad";
import { _BaseStateFullDocProxy } from "./Desktop/DesktopProxy/FrameProxies/_StateProxy";

export class LaunchPadProxy extends _BaseStateFullDocProxy<IStateOfLaunchPad> implements IStateFullDocProxy {
  readonly ScDocProxyDisciminator: ScDocProxyDisciminator = ScDocProxyDisciminator.LaunchPad;
  readonly ScDocProxyDisciminatorFriendly = ScDocProxyDisciminator[ScDocProxyDisciminator.LaunchPad];
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