﻿import { ScProxyDisciminator } from "../../../../../Shared/scripts/Enums/40 - ScProxyDisciminator";
import { IScDocProxy } from "../../../../../Shared/scripts/Interfaces/ScProxies/IBaseScDocProxy";
import { IStateOf_ } from "../../../../../Shared/scripts/Interfaces/StateOf/IStateOf_";
import { _ScDocProxyOfTypeT } from "../../Desktop/DesktopProxy/FrameProxies/ScDocProxyOfTypeT";

//old AppFrameProxy
export class InstallerDesignerProxy extends _ScDocProxyOfTypeT<IStateOf_> implements IScDocProxy {
  readonly ScProxyDisciminator = ScProxyDisciminator.InstallerDesignerDocProxy;
  readonly ScProxyDisciminatorFriendly = ScProxyDisciminator[ScProxyDisciminator.InstallerDesignerDocProxy];
}