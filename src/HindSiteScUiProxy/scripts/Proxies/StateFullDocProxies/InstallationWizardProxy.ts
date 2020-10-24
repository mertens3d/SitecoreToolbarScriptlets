﻿import { ScProxyDisciminator } from "../../../../Shared/scripts/Enums/40 - ScProxyDisciminator";
import { IScDocProxy } from "../../../../Shared/scripts/Interfaces/ScProxies/IBaseScDocProxy";
import { _justWindowStateFullDocProxy } from "../Desktop/DesktopProxy/FrameProxies/_justWindowStateFullProxy";


export class InstallationWizardProxy extends _justWindowStateFullDocProxy implements IScDocProxy {
    readonly ScProxyDisciminator = ScProxyDisciminator.InstallationWizard;
    readonly ScProxyDisciminatorFriendly = ScProxyDisciminator[this.ScProxyDisciminator];
}
