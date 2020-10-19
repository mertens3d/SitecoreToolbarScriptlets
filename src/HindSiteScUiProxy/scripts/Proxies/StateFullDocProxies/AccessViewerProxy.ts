import { ScProxyDisciminator } from "../../../../Shared/scripts/Enums/40 - ScProxyDisciminator";
import { IStateFullDocProxy } from "../../../../Shared/scripts/Interfaces/Proxies/StateFull/IStateFullDocProxy";
import { _justWindowStateFullDocProxy } from "../Desktop/DesktopProxy/FrameProxies/_justWindowStateFullProxy";


export class AccessViewerProxy extends _justWindowStateFullDocProxy implements IStateFullDocProxy {
    readonly ScProxyDisciminator = ScProxyDisciminator.AccessViewer;
    readonly ScProxyDisciminatorFriendly = ScProxyDisciminator[ScProxyDisciminator.AccessViewer];
}
