import { ScProxyDisciminator } from "../../../../../Shared/scripts/Enums/40 - ScProxyDisciminator";
import { IScFrameProxy } from "../../../../../Shared/scripts/Interfaces/ScProxies/IStateFullFrameProxy";
import { IStateOf_ } from "../../../../../Shared/scripts/Interfaces/StateOf/IStateOf_";
import { BaseFrameProxy } from "../../Desktop/DesktopProxy/FrameProxies/BaseFrameProxy";

export class InstallerBrowseFrameProxy extends BaseFrameProxy<IStateOf_> implements IScFrameProxy {
  readonly ScProxyDisciminator = ScProxyDisciminator.DTFrameProxy;
  readonly ScProxyDisciminatorFriendly = ScProxyDisciminator[ScProxyDisciminator.InstallerBrowseFrameProxy];
}