import { ScProxyDisciminator } from "../../../../Shared/scripts/Enums/40 - ScProxyDisciminator";
import { IScDocProxy } from "../../../../Shared/scripts/Interfaces/ScProxies/IBaseScDocProxy";
import { IStateOfLaunchPad } from "../../../../Shared/scripts/Interfaces/StateOf/IStateOfLaunchPad";
import { ScDocProxyOfTypeT } from "../Desktop/DesktopProxy/FrameProxies/ScDocProxyOfTypeT";

export class LaunchPadProxy extends ScDocProxyOfTypeT<IStateOfLaunchPad> implements IScDocProxy {
  readonly ScProxyDisciminator: ScProxyDisciminator = ScProxyDisciminator.LaunchPad;
  readonly ScProxyDisciminatorFriendly = ScProxyDisciminator[ScProxyDisciminator.LaunchPad];
}