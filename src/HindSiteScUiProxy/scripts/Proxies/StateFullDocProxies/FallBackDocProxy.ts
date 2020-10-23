import { ScProxyDisciminator } from "../../../../Shared/scripts/Enums/40 - ScProxyDisciminator";
import { IBaseScDocProxy } from "../../../../Shared/scripts/Interfaces/Proxies/IBaseScDocProxy";
import { IStateOfFallBack } from "../../../../Shared/scripts/Interfaces/StateOf/IStateOfFallBack";
import { _BaseStateFullDocProxy } from "../Desktop/DesktopProxy/FrameProxies/_BaseStateFullDocProxy";


export class FallBackDocProxy extends _BaseStateFullDocProxy<IStateOfFallBack> implements IBaseScDocProxy {
  readonly ScProxyDisciminatorFriendly = ScProxyDisciminator[ScProxyDisciminator.FallBack];
  readonly ScProxyDisciminator: ScProxyDisciminator = ScProxyDisciminator.FallBack;

  async GetState(): Promise<IStateOfFallBack> {
    let toReturn: IStateOfFallBack = {
      Disciminator: this.ScProxyDisciminator,
      DisciminatorFriendly: ScProxyDisciminator[this.ScProxyDisciminator],
      StateOfHostedProxies: [],
    }

    try {

    } catch (err: any) {
      this.ErrorHand.HandleFatalError(this.GetState + '.' + FallBackDocProxy.name, err)
    }

    return toReturn;
  }

  async SetState(state: any) {
    //empty
  }

 async WireEvents() : Promise<void>{
    //empty
  }

  async InstantiateAsyncMembers(): Promise<void> {
    //empty
  }

  TriggerInboundEventsAsync(): void {
    //empty
  }
}