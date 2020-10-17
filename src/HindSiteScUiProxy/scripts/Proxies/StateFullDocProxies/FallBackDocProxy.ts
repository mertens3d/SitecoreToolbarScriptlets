import { ScProxyDisciminator } from "../../../../Shared/scripts/Enums/40 - StateFullProxyDisciminator";
import { IStateFullDocProxy } from "../../../../Shared/scripts/Interfaces/Proxies/StateFull/IStateFullDocProxy";
import { IStateOfFallBack } from "../../../../Shared/scripts/Interfaces/StateOf/IStateOfFallBack";
import { _BaseStateFullDocProxy } from "../Desktop/DesktopProxy/FrameProxies/_BaseStateFullDocProxy";


export class FallBackDocProxy extends _BaseStateFullDocProxy<IStateOfFallBack> implements IStateFullDocProxy {
  readonly ScProxyDisciminatorFriendly = ScProxyDisciminator[ScProxyDisciminator.FallBack];
  readonly ScProxyDisciminator: ScProxyDisciminator = ScProxyDisciminator.FallBack;

  async GetState(): Promise<IStateOfFallBack> {
    let toReturn: IStateOfFallBack = {
      Disciminator: this.ScProxyDisciminator,
      DisciminatorFriendly: ScProxyDisciminator[this.ScProxyDisciminator]
    }
    try {
    } catch (err) {
      this.ErrorHand.HandleFatalError(this.GetState + '.' + FallBackDocProxy.name, err)
    }

    return toReturn;
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