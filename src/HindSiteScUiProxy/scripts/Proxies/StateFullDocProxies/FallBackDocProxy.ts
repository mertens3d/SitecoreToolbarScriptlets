import { ScProxyDisciminator } from "../../../../Shared/scripts/Enums/40 - ScProxyDisciminator";
import { IScDocProxy } from "../../../../Shared/scripts/Interfaces/ScProxies/IBaseScDocProxy";
import { IStateOfFallBack } from "../../../../Shared/scripts/Interfaces/StateOf/IStateOfFallBack";
import { ScDocProxyOfTypeT } from "../Desktop/DesktopProxy/FrameProxies/ScDocProxyOfTypeT";

export class FallBackDocProxy extends ScDocProxyOfTypeT<IStateOfFallBack> implements IScDocProxy {
  readonly ScProxyDisciminatorFriendly = ScProxyDisciminator[ScProxyDisciminator.FallBack];
  readonly ScProxyDisciminator: ScProxyDisciminator = ScProxyDisciminator.FallBack;

  async GetStateOfSelf(): Promise<IStateOfFallBack> {
    let toReturn: IStateOfFallBack = {
      Disciminator: this.ScProxyDisciminator,
      DisciminatorFriendly: ScProxyDisciminator[this.ScProxyDisciminator],
      StateOfHostedProxies: [],
    }

    try {
    } catch (err: any) {
      this.ErrorHand.HandleFatalError(this.GetStateOfSelf + '.' + FallBackDocProxy.name, err)
    }

    return toReturn;
  }
}