import { DocumentJacket } from "../../../../../DOMJacket/Document/DocumentJacket";
import { ElementDivJacket } from "../../../../../DOMJacket/Elements/ElementDivJacket";
import { ScProxyDisciminator } from "../../../../../Shared/scripts/Enums/40 - ScProxyDisciminator";
import { PromiseFailAction } from "../../../../../Shared/scripts/Enums/PromiseFailAction";
import { IAPICore } from "../../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { ContentConst } from "../../../../../Shared/scripts/Interfaces/InjectConst";
import { IStateLessDocProxy } from "../../../../../Shared/scripts/Interfaces/Proxies/IStateLessDocProxy";
import { PackageDesignerInstallerRibbonToolbarElemProxy } from "../StateLessElemProxies/PackageDesignerInstallerRibbonToolbarProxy";
import { JqueryModalDialogsFrameProxy } from "../StateLessFrameProxies/JqueryModalDialogsFrameProxy";
import { _BaseStateLessScDocProxy } from "./_BaseStateLessScDocProxy";

//old AppFrameProxy
export class InstallerDesignerProxy extends _BaseStateLessScDocProxy implements IStateLessDocProxy {
  readonly ScProxyDisciminator = ScProxyDisciminator.InstallerDesignerDocProxy;
  readonly ScProxyDisciminatorFriendly = ScProxyDisciminator[ScProxyDisciminator.InstallerDesignerDocProxy];

  private JqueryModalDialogsFrameProxy: JqueryModalDialogsFrameProxy;

  constructor(apiCore: IAPICore, hostDocJacket: DocumentJacket, jqueryModalDialogsFrameProxy: JqueryModalDialogsFrameProxy) {
    super(apiCore, hostDocJacket);
    this.Logger.CTORStart(InstallerDesignerProxy.name);

    this.JqueryModalDialogsFrameProxy = jqueryModalDialogsFrameProxy;

    this.Logger.CTOREnd(InstallerDesignerProxy.name);
  }

  async InstantiateAsyncMembers(): Promise<void> {
    this.Logger.FuncStart([InstallerDesignerProxy.name, this.InstantiateAsyncMembers.name]);

    this.Logger.FuncEnd([InstallerDesignerProxy.name, this.InstantiateAsyncMembers.name]);
  }
}