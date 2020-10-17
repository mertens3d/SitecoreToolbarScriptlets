import { FrameElemJacket } from "../../../../../DOMJacket/Elements/FrameElemJacket";
import { ScProxyDisciminator } from "../../../../../Shared/scripts/Enums/40 - StateFullProxyDisciminator";
import { IStateLessScFrameProxy } from "../../../../../Shared/scripts/Interfaces/Proxies/StateLess/IStateLessFrameProxy";
import { InstallerBrowseDocProxy } from "../StateLessDocProxies/InstallerBrowseDocProxy";
import { _baseStatelessFrameProxyOfType } from "./_baseStatelessFrameProxyOfType";

export class InstallerBrowseFrameProxy extends _baseStatelessFrameProxyOfType<InstallerBrowseDocProxy> implements IStateLessScFrameProxy {
  TriggerInboundEventsAsync() {
      throw new Error("Method not implemented.");
  }
  InstantiateAsyncMembers(): Promise<void> {
      throw new Error("Method not implemented.");
  }
  WireEvents() {
      throw new Error("Method not implemented.");
  }
  FrameElemJacket: FrameElemJacket;
  ScProxyDisciminator: ScProxyDisciminator;
  ScProxyDisciminatorFriendly: string;
  FrameSelectorOnHost: string;
}