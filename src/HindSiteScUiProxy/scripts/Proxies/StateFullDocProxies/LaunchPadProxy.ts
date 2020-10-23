import { ScProxyDisciminator } from "../../../../Shared/scripts/Enums/40 - ScProxyDisciminator";
import { IBaseScDocProxy } from "../../../../Shared/scripts/Interfaces/Proxies/IBaseScDocProxy";
import { IStateOfLaunchPad } from "../../../../Shared/scripts/Interfaces/StateOf/IStateOfLaunchPad";
import { _BaseStateFullDocProxy } from "../Desktop/DesktopProxy/FrameProxies/_BaseStateFullDocProxy";

export class LaunchPadProxy extends _BaseStateFullDocProxy<IStateOfLaunchPad> implements IBaseScDocProxy {
  readonly ScProxyDisciminator: ScProxyDisciminator = ScProxyDisciminator.LaunchPad;
  readonly ScProxyDisciminatorFriendly = ScProxyDisciminator[ScProxyDisciminator.LaunchPad];

  async GetState(): Promise<any> {
    //empty
  }

  async SetState(state: any): Promise<void> {
    //empty
  }

  async  WireEvents(): Promise<void> {
    //empty
  }

  async InstantiateAsyncMembers(): Promise<void> {
    //empty
  }

  TriggerInboundEventsAsync(): void {
    //empty
  }
}