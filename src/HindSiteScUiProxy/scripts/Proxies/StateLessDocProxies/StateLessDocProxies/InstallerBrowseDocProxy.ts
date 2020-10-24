import { ScProxyDisciminator } from "../../../../../Shared/scripts/Enums/40 - ScProxyDisciminator";
import { IScDocProxy } from "../../../../../Shared/scripts/Interfaces/ScProxies/IBaseScDocProxy";
import { IStateOf_ } from "../../../../../Shared/scripts/Interfaces/StateOf/IStateOf_";
import { ScDocProxyOfTypeT } from "../../Desktop/DesktopProxy/FrameProxies/ScDocProxyOfTypeT";

export class InstallerBrowseDocProxy extends ScDocProxyOfTypeT<IStateOf_> implements IScDocProxy {
  readonly ScProxyDisciminator = ScProxyDisciminator.InstallerBrowseDocProxy;
  readonly ScProxyDisciminatorFriendly = ScProxyDisciminator[ScProxyDisciminator.InstallerBrowseDocProxy];
  //empty
  async InstantiateChildrenSelf() {
    //empty
  }
  TriggerEventsForInboundSelf(): void {
    //empty
  }
}