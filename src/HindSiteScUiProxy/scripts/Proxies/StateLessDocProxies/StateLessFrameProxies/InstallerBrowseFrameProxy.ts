import { ScProxyDisciminator } from "../../../../../Shared/scripts/Enums/40 - ScProxyDisciminator";
import { IScFrameProxy } from "../../../../../Shared/scripts/Interfaces/ScProxies/IStateFullFrameProxy";
import { IStateOf_ } from "../../../../../Shared/scripts/Interfaces/StateOf/IStateOf_";
import { BaseScFrameProxy } from "../../Desktop/DesktopProxy/FrameProxies/BaseFrameProxy";

export class InstallerBrowseFrameProxy extends BaseScFrameProxy<IStateOf_> implements IScFrameProxy {
  readonly ScProxyDisciminator = ScProxyDisciminator.DTFrameProxy;
  readonly ScProxyDisciminatorFriendly = ScProxyDisciminator[ScProxyDisciminator.InstallerBrowseFrameProxy];
}