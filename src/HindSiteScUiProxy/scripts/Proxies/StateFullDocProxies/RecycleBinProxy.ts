﻿import { ScProxyDisciminator } from "../../../../Shared/scripts/Enums/40 - StateFullProxyDisciminator";
import { IStateFullDocProxy } from "../../../../Shared/scripts/Interfaces/Proxies/StateFull/IStateFullDocProxy";
import { _justWindowStateFullProxy } from "../Desktop/DesktopProxy/FrameProxies/_justWindowStateFullProxy";

export class RecycleBinProxy extends _justWindowStateFullProxy implements IStateFullDocProxy {
  readonly ScProxyDisciminator = ScProxyDisciminator.RecycleBin;
  readonly ScProxyDisciminatorFriendly = ScProxyDisciminator[this.ScProxyDisciminator];
}