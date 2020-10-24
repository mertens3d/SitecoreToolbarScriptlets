import { ScProxyDisciminator } from "../../../../../Shared/scripts/Enums/40 - ScProxyDisciminator";
import { IScDocProxy } from "../../../../../Shared/scripts/Interfaces/ScProxies/IBaseScDocProxy";
import { IStateOf_ } from "../../../../../Shared/scripts/Interfaces/StateOf/IStateOf_";
import { ScDocProxy } from "../../Desktop/DesktopProxy/FrameProxies/_BaseStateFullDocProxy";

export class InstallerBrowseDocProxy extends ScDocProxy<IStateOf_> implements IScDocProxy {
  readonly ScProxyDisciminator = ScProxyDisciminator.InstallerBrowseDocProxy;
  readonly ScProxyDisciminatorFriendly = ScProxyDisciminator[ScProxyDisciminator.InstallerBrowseDocProxy];
  //empty
  async InstantiateAsyncMembersSelf() {
    //empty
  }
  TriggerEventsForInboundSelf(): void {
    //empty
  }
}