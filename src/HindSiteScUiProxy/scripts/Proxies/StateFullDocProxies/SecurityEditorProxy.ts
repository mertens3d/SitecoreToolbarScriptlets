﻿import { ScProxyDisciminator } from "../../../../Shared/scripts/Enums/40 - ScProxyDisciminator";
import { IScDocProxy } from "../../../../Shared/scripts/Interfaces/ScProxies/IBaseScDocProxy";
import { IStateOf_ } from "../../../../Shared/scripts/Interfaces/StateOf/IStateOf_";
import { _ScDocProxyOfTypeT } from "../Desktop/DesktopProxy/FrameProxies/ScDocProxyOfTypeT";

export class SecurityEditorDocProxy extends _ScDocProxyOfTypeT<IStateOf_> implements IScDocProxy {
  readonly ScProxyDisciminator = ScProxyDisciminator.SecurityEditor;
  readonly ScProxyDisciminatorFriendly = ScProxyDisciminator[this.ScProxyDisciminator];
}