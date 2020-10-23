import { ScProxyDisciminator } from "../../../../Shared/scripts/Enums/40 - ScProxyDisciminator";
import { IBaseScDocProxy } from "../../../../Shared/scripts/Interfaces/Proxies/IBaseScDocProxy";
import { _justWindowStateFullDocProxy } from "../Desktop/DesktopProxy/FrameProxies/_justWindowStateFullProxy";

export class AccessViewerProxy extends _justWindowStateFullDocProxy implements IBaseScDocProxy {
  readonly ScProxyDisciminator = ScProxyDisciminator.AccessViewer;
  readonly ScProxyDisciminatorFriendly = ScProxyDisciminator[ScProxyDisciminator.AccessViewer];
}