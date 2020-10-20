import { FrameElemJacket } from "../../../../../DOMJacket/scripts/Elements/FrameElemJacket";
import { ScProxyDisciminator } from "../../../../../Shared/scripts/Enums/40 - ScProxyDisciminator";
import { IStateLessScFrameProxy } from "../../../../../Shared/scripts/Interfaces/Proxies/StateLess/IStateLessFrameProxy";
import { InstallerBrowseDocProxy } from "../StateLessDocProxies/InstallerBrowseDocProxy";
import { _baseStatelessFrameProxyOfType } from "./_baseStatelessFrameProxyOfType";

export class InstallerBrowseFrameProxy extends _baseStatelessFrameProxyOfType<InstallerBrowseDocProxy> implements IStateLessScFrameProxy {
  async TriggerInboundEventsAsync(): Promise<void> {
      // empty
  }
  async InstantiateAsyncMembers(): Promise<void> {
      // empty
  }
  async WireEvents() : Promise<void>{
      // empty
  }
  FrameElemJacket: FrameElemJacket;
  ScProxyDisciminator: ScProxyDisciminator;
  ScProxyDisciminatorFriendly: string;
  FrameSelectorOnHost: string;
}