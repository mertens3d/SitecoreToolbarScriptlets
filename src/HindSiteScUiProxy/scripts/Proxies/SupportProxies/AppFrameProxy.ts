import { ElementFrameJacket } from "../../../../DOMJacket/ElementFrameJacket";
import { IAPICore } from "../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { ContentConst } from "../../../../Shared/scripts/Interfaces/InjectConst";
import { PromiseFailAction } from "../../../../Shared/scripts/Enums/PromiseFailAction";
import { ElementDivJacket } from "../../../../DOMJacket/ElementDivJacket";
import { PackageDesignerInstallerRibbonToolbarProxy } from "../PackageDesignerProxy/PackageDesignerInstallerRibbonToolbarProxy";
import { DocumentJacket } from "../../../../DOMJacket/DocumentJacket";
import { _baseSupportStatelessFrameProxy } from "./_baseSupportFrameProxy";

export class AppFrameProxy extends _baseSupportStatelessFrameProxy {
  private ParentJacket: DocumentJacket;

  constructor(apiCore: IAPICore, frameJacket: ElementFrameJacket, parentJacket: DocumentJacket) {
    super(apiCore, frameJacket);
    this.ParentJacket = parentJacket;
  }
  async OpenFile(fileName: string): Promise<void> {
    try {
      let toolbarProxy: PackageDesignerInstallerRibbonToolbarProxy = null;

      await this.FrameJacket.DocumentJacket.WaitForElem(ContentConst.Const.Selector.SC.PackageDesigner.Ribbon.InstallerRibbon_Toolbar, PromiseFailAction.RejectThrow)
        .then((elementDivJacket: ElementDivJacket) => toolbarProxy = new PackageDesignerInstallerRibbonToolbarProxy(this.ApiCore, elementDivJacket, this.ParentJacket))
        .then(() => toolbarProxy.OpenFile(fileName));
    }
    catch (err) {
      this.ErrorHand.ErrorAndThrow([AppFrameProxy.name, this.OpenFile.name], err);
    }
  }
}