import { DocumentJacket } from "../../../../../DOMJacket/Document/DocumentJacket";
import { ElementDivJacket } from "../../../../../DOMJacket/Elements/ElementDivJacket";
import { PromiseFailAction } from "../../../../../Shared/scripts/Enums/PromiseFailAction";
import { IAPICore } from "../../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { IStateLessFrameProxy } from "../../../../../Shared/scripts/Interfaces/Agents/IStateLessFrameProxy";
import { ContentConst } from "../../../../../Shared/scripts/Interfaces/InjectConst";
import { PackageDesignerInstallerRibbonToolbarProxy } from "../../PackageDesignerProxy/PackageDesignerInstallerRibbonToolbarProxy";
import { JqueryModalDialogsDocProxy } from "../JqueryModalDialogsProxy";
import { _baseStatelessFrameProxy } from "./_baseStatelessFrameProxy";

export class AppFrameProxy extends _baseStatelessFrameProxy implements IStateLessFrameProxy {
  FrameSelectorOnHost: string = ContentConst.Const.Selector.SC.Frames.AppFrame.Id;

  constructor(apiCore: IAPICore, hostDocJacket: DocumentJacket) {
    super(apiCore, hostDocJacket);
  }

  async InstantiateAsyncMembers(): Promise<void> {
    await this._base_InstantiateAsyncProperties()
      .catch((err) => this.ErrorHand.HandleFatalError(this.InstantiateAsyncMembers.name, err));
  }

  async OpenFile(fileName: string, jqueryModalDialogsProxy: JqueryModalDialogsDocProxy): Promise<void> {
    try {
      let toolbarProxy: PackageDesignerInstallerRibbonToolbarProxy = null;

      await this.FrameJacket.DocumentJacket.WaitForElem(ContentConst.Const.Selector.SC.PackageDesigner.Ribbon.InstallerRibbon_Toolbar, PromiseFailAction.RejectThrow)
        .then((elementDivJacket: ElementDivJacket) => toolbarProxy = new PackageDesignerInstallerRibbonToolbarProxy(this.ApiCore, elementDivJacket, this.HostJacket, jqueryModalDialogsProxy))
        .then(() => toolbarProxy.OpenFile(fileName))
        .catch((err) => this.ErrorHand.HandleFatalError(this.OpenFile.name,err));
    }
    catch (err) {
      this.ErrorHand.HandleFatalError([AppFrameProxy.name, this.OpenFile.name], err);
    }
  }
}