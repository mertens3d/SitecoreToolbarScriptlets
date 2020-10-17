import { ScProxyDisciminator } from "../../../../Shared/scripts/Enums/40 - StateFullProxyDisciminator";
import { IStateFullDocProxy } from "../../../../Shared/scripts/Interfaces/Proxies/StateFull/IStateFullDocProxy";
import { IStateOfLaunchPad } from "../../../../Shared/scripts/Interfaces/StateOf/IStateOfLaunchPad";
import { _BaseStateFullDocProxy } from "../Desktop/DesktopProxy/FrameProxies/_BaseStateFullDocProxy";

export class LaunchPadProxy extends _BaseStateFullDocProxy<IStateOfLaunchPad> implements IStateFullDocProxy {
  readonly ScProxyDisciminator: ScProxyDisciminator = ScProxyDisciminator.LaunchPad;
  readonly ScProxyDisciminatorFriendly = ScProxyDisciminator[ScProxyDisciminator.LaunchPad];
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