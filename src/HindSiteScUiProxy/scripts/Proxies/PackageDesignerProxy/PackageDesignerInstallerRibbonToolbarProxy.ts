import { DocumentJacket } from "../../../../DOMJacket/Document/DocumentJacket";
import { IAPICore } from "../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { ContentConst } from "../../../../Shared/scripts/Interfaces/InjectConst";
import { ElementFrameJacket } from "../../../../DOMJacket/Elements/ElementFrameJacket";
import { ElementJacket } from "../../../../DOMJacket/Elements/ElementJacket";
import { ElementDivJacket } from "../../../../DOMJacket/Elements/ElementDivJacket";
import { _APICoreBase } from "../../../../Shared/scripts/_APICoreBase";
import { JqueryModalDialogsDocProxy } from "../SupportProxies/JqueryModalDialogsProxy";

export class PackageDesignerInstallerRibbonToolbarProxy extends _APICoreBase {
  private parentDocumentJacket: DocumentJacket;
  ElementDivJacket: ElementDivJacket;
  JqueryModalDialogsProxy: JqueryModalDialogsDocProxy;

  constructor(apiCore: IAPICore, elementDivJacket: ElementDivJacket, parentDocumentJacket: DocumentJacket, jqueryModalDialogsProxy: JqueryModalDialogsDocProxy) {
    super(apiCore);
    this.parentDocumentJacket = parentDocumentJacket;
    this.ElementDivJacket = elementDivJacket;
    this.JqueryModalDialogsProxy = jqueryModalDialogsProxy;
  }

  async OpenFile(fileName: string): Promise<void> {
    //let jqueryFrameProxy: JqueryModalDialogsProxy = null;

    //await this.ElementDivJacket.WaitForElement(ContentConst.Const.Selector.SC.PackageDesigner.Ribbon.Open, this.OpenFile.name)
    //  .then((elemJacket: ElementJacket) => elemJacket.NativeElement.click())
    //  .then(() => {
    //    let matchingJackets: ElementFrameJacket[] = this.parentDocumentJacket.GetHostedFramesFilteredBySelector(ContentConst.Const.Selector.SC.Frames.JqueryModalDialogsFrame.Id);
    //    if (matchingJackets && matchingJackets.length > 0) {
    //      jqueryFrameProxy = new JqueryModalDialogsProxy(this.ApiCore, matchingJackets[0]);
    //      this.Logger.LogImportant('jquery frame found');
    //    }
    //    else {
    //      this.ErrorHand.ErrorAndThrow([PackageDesignerInstallerRibbonToolbarProxy.name, this.OpenFile.name], 'no matching jacket');
    //    }
    //  })

    if (this.JqueryModalDialogsProxy) {
      this.JqueryModalDialogsProxy.OpenFile(fileName);
    } else {
      this.ErrorHand.HandleFatalError(this.OpenFile.name, 'no jquery proxy');
    }

      //.then(() => jqueryFrameProxy.OpenFile(fileName))
      //.catch((err) => this.ErrorHand.ErrorAndThrow([PackageDesignerInstallerRibbonToolbarProxy.name, this.OpenFile.name], err))
  }
}