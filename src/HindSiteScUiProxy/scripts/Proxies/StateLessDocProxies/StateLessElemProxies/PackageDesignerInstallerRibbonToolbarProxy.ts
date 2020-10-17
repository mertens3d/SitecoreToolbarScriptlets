import { DocumentJacket } from "../../../../../DOMJacket/Document/DocumentJacket";
import { ElementDivJacket } from "../../../../../DOMJacket/Elements/ElementDivJacket";
import { IAPICore } from "../../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { _APICoreBase } from "../../../../../Shared/scripts/_APICoreBase";
import { ContentConst } from "../../../../../Shared/scripts/Interfaces/InjectConst";
import { GenericElemJacket } from "../../../../../DOMJacket/Elements/GenericElemJacket";
import { JqueryModalDialogsFrameProxy } from "../StateLessFrameProxies/JqueryModalDialogsFrameProxy";
import { _BaseStateLessElemProxy } from "../../Desktop/DesktopProxy/FrameProxies/_BaseStateLessElemProxy";

export class PackageDesignerInstallerRibbonToolbarElemProxy  extends _BaseStateLessElemProxy {
  private parentDocumentJacket: DocumentJacket;
  ElementDivJacket: ElementDivJacket;
  JqueryModalDialogsFrameProxy: JqueryModalDialogsFrameProxy;

  constructor(apiCore: IAPICore, elementDivJacket: ElementDivJacket,  jqueryModalDialogsFrameProxy: JqueryModalDialogsFrameProxy) {
    super(apiCore);
    this.ElementDivJacket = elementDivJacket;
    this.JqueryModalDialogsFrameProxy = jqueryModalDialogsFrameProxy;

    this.ErrorHand.ThrowIfNullOrUndefined(PackageDesignerInstallerRibbonToolbarElemProxy.name, [jqueryModalDialogsFrameProxy])

  }

  async OpenFile(fileName: string): Promise<void> {
    //let jqueryFrameProxy: JqueryModalDialogsProxy = null;

    await this.ElementDivJacket.WaitForElement(ContentConst.Const.Selector.SC.PackageDesigner.Ribbon.Open, this.OpenFile.name)
      .then((elemJacket: GenericElemJacket) => elemJacket.NativeElement.click())
      .catch((err) => this.ErrorHand.HandleFatalError([PackageDesignerInstallerRibbonToolbarElemProxy.name, this.OpenFile.name], err))

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

    if (this.JqueryModalDialogsFrameProxy) {
      this.JqueryModalDialogsFrameProxy.PackageDesignerOpenFile(fileName);
    } else {
      this.ErrorHand.HandleFatalError(this.OpenFile.name, 'no jquery proxy');
    }

      //.then(() => jqueryFrameProxy.OpenFile(fileName))
  }
}