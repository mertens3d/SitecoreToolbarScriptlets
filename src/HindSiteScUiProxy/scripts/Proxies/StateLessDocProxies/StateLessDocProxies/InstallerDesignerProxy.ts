import { DocumentJacket } from "../../../../../DOMJacket/scripts/Document/DocumentJacket";
import { ScProxyDisciminator } from "../../../../../Shared/scripts/Enums/40 - ScProxyDisciminator";
import { IAPICore } from "../../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { IScDocProxy } from "../../../../../Shared/scripts/Interfaces/ScProxies/IBaseScDocProxy";
import { IStateOf_ } from "../../../../../Shared/scripts/Interfaces/StateOf/IStateOf_";
import { ScDocProxy } from "../../Desktop/DesktopProxy/FrameProxies/_BaseStateFullDocProxy";
import { JqueryModalDialogsFrameProxy } from "../StateLessFrameProxies/JqueryModalDialogsFrameProxy";

//old AppFrameProxy
export class InstallerDesignerProxy extends ScDocProxy<IStateOf_> implements IScDocProxy {
  readonly ScProxyDisciminator = ScProxyDisciminator.InstallerDesignerDocProxy;
  readonly ScProxyDisciminatorFriendly = ScProxyDisciminator[ScProxyDisciminator.InstallerDesignerDocProxy];

  private JqueryModalDialogsFrameProxy: JqueryModalDialogsFrameProxy;

  constructor(apiCore: IAPICore, hostDocJacket: DocumentJacket, jqueryModalDialogsFrameProxy: JqueryModalDialogsFrameProxy) {
    super(apiCore, hostDocJacket);
    this.Logger.CTORStart(InstallerDesignerProxy.name);

    this.JqueryModalDialogsFrameProxy = jqueryModalDialogsFrameProxy;

    this.Logger.CTOREnd(InstallerDesignerProxy.name);
  }

  async InstantiateAsyncMembersSelf(): Promise<void> {
    this.Logger.FuncStart([InstallerDesignerProxy.name, this.InstantiateAsyncMembersSelf.name]);

    this.Logger.FuncEnd([InstallerDesignerProxy.name, this.InstantiateAsyncMembersSelf.name]);
  }
}