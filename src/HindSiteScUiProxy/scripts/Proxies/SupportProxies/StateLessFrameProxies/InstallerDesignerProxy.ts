import { DocumentJacket } from "../../../../../DOMJacket/Document/DocumentJacket";
import { ElementDivJacket } from "../../../../../DOMJacket/Elements/ElementDivJacket";
import { PromiseFailAction } from "../../../../../Shared/scripts/Enums/PromiseFailAction";
import { IAPICore } from "../../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { IStateLessDTFrameProxy } from "../../../../../Shared/scripts/Interfaces/Agents/IStateLessFrameProxy";
import { ContentConst } from "../../../../../Shared/scripts/Interfaces/InjectConst";
import { PackageDesignerInstallerRibbonToolbarProxy } from "../../PackageDesignerProxy/PackageDesignerInstallerRibbonToolbarProxy";
import { JqueryModalDialogsFrameProxy } from "./JqueryModalDialogsFrameProxy";
import { _baseStatelessDTFrameProxy } from "./_baseStatelessFrameProxy";
//old AppFrameProxy

export class InstallerDesignerProxy extends _baseStatelessDTFrameProxy implements IStateLessDTFrameProxy {
  FrameSelectorOnHost: string = ContentConst.Const.Selector.SC.Frames.AppFrame.Id;

  constructor(apiCore: IAPICore, hostDocJacket: DocumentJacket, jqueryModalDialogsFrameProxy: JqueryModalDialogsFrameProxy) {
    super(apiCore, hostDocJacket, jqueryModalDialogsFrameProxy);
    this.Logger.CTORStart(InstallerDesignerProxy.name);
    this.Logger.CTOREnd(InstallerDesignerProxy.name);
  }

  async InstantiateAsyncMembers(): Promise<void> {
    this.Logger.FuncStart([InstallerDesignerProxy.name, this.InstantiateAsyncMembers.name]);
    try {
      await this._base_InstantiateAsyncProperties()
        .catch((err) => this.ErrorHand.HandleFatalError(this.InstantiateAsyncMembers.name, err));
    } catch (err) {
      this.ErrorHand.HandleFatalError(this.InstantiateAsyncMembers.name, err);
    }
    this.Logger.FuncEnd([InstallerDesignerProxy.name, this.InstantiateAsyncMembers.name]);
  }

  async OpenFile(fileName: string): Promise<void> {
    this.Logger.FuncStart([InstallerDesignerProxy.name, this.OpenFile.name]);
    try {
      let toolbarProxy: PackageDesignerInstallerRibbonToolbarProxy = null;

      await this.FrameJacket.DocumentJacket.WaitForGenericElemJacket(ContentConst.Const.Selector.SC.PackageDesigner.Ribbon.InstallerRibbon_Toolbar, PromiseFailAction.RejectThrow)
        .then((elementDivJacket: ElementDivJacket) => toolbarProxy = new PackageDesignerInstallerRibbonToolbarProxy(this.ApiCore, elementDivJacket, this.HostJacket, this.JqueryModalDialogsFrameProxy))
        .then(() => toolbarProxy.OpenFile(fileName))
        .catch((err) => this.ErrorHand.HandleFatalError(this.OpenFile.name, err));
    }
    catch (err) {
      this.ErrorHand.HandleFatalError([InstallerDesignerProxy.name, this.OpenFile.name], err);
    }

    this.Logger.FuncEnd([InstallerDesignerProxy.name, this.OpenFile.name]);
  }
}