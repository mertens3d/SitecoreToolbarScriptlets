﻿import { ScProxyDisciminator } from "../../../../Shared/scripts/Enums/40 - ScProxyDisciminator";
import { IScDocProxy } from "../../../../Shared/scripts/Interfaces/ScProxies/IBaseScDocProxy";
import { _justWindowStateFullDocProxy } from "../Desktop/DesktopProxy/FrameProxies/_justWindowStateFullProxy";


export class EmailExpeprienceManagerProxy extends _justWindowStateFullDocProxy implements IScDocProxy {
    readonly ScProxyDisciminator = ScProxyDisciminator.EmailExperienceManager;
    readonly ScProxyDisciminatorFriendly = ScProxyDisciminator[this.ScProxyDisciminator];
}
