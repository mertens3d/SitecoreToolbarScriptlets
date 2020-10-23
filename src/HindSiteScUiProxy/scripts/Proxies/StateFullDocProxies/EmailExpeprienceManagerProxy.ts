import { ScProxyDisciminator } from "../../../../Shared/scripts/Enums/40 - ScProxyDisciminator";
import { IBaseScDocProxy } from "../../../../Shared/scripts/Interfaces/Proxies/IBaseScDocProxy";
import { _justWindowStateFullDocProxy } from "../Desktop/DesktopProxy/FrameProxies/_justWindowStateFullProxy";


export class EmailExpeprienceManagerProxy extends _justWindowStateFullDocProxy implements IBaseScDocProxy {
    readonly ScProxyDisciminator = ScProxyDisciminator.EmailExperienceManager;
    readonly ScProxyDisciminatorFriendly = ScProxyDisciminator[this.ScProxyDisciminator];
}
