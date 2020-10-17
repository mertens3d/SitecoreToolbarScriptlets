﻿import { ScProxyDisciminator } from "../../../../Shared/scripts/Enums/40 - StateFullProxyDisciminator";
import { IStateFullDocProxy } from "../../../../Shared/scripts/Interfaces/Proxies/StateFull/IStateFullDocProxy";
import { _justWindowStateFullProxy } from "../Desktop/DesktopProxy/FrameProxies/_justWindowStateFullProxy";


export class RoleManagerProxy extends _justWindowStateFullProxy implements IStateFullDocProxy {
    readonly ScProxyDisciminator = ScProxyDisciminator.RoleManager;
    readonly ScProxyDisciminatorFriendly = ScProxyDisciminator[this.ScProxyDisciminator];
}
