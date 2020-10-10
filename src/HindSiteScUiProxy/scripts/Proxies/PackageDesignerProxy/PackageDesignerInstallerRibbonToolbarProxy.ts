import { DocumentJacket } from "../../../../DOMJacket/DocumentJacket";
import { IAPICore } from "../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { ContentConst } from "../../../../Shared/scripts/Interfaces/InjectConst";
import { ElementFrameJacket } from "../../../../DOMJacket/ElementFrameJacket";
import { ElementJacket } from "../../../../DOMJacket/ElementJacket";
import { ElementDivJacket } from "../../../../DOMJacket/ElementDivJacket";
import { _APICoreBase } from "../../../../Shared/scripts/_APICoreBase";
import { JqueryFrameProxy } from "../SupportProxies/JqueryFrameProxy";

export class PackageDesignerInstallerRibbonToolbarProxy extends _APICoreBase {
    private parentDocumentJacket: DocumentJacket;
    ElementDivJacket: ElementDivJacket;

    constructor(apiCore: IAPICore, elementDivJacket: ElementDivJacket, parentDocumentJacket: DocumentJacket) {
        super(apiCore);
        this.parentDocumentJacket = parentDocumentJacket;
        this.ElementDivJacket = elementDivJacket;
    }


    async OpenFile(fileName: string): Promise<void> {
        let jqueryFrameProxy: JqueryFrameProxy = null;

        await this.ElementDivJacket.WaitForElement(ContentConst.Const.Selector.SC.PackageDesigner.Ribbon.Open, this.OpenFile.name)
            .then((elemJacket: ElementJacket) => elemJacket.NativeElement.click())
          .then(() => {
            let matchingJackets: ElementFrameJacket[] = this.parentDocumentJacket.GetHostedFramesFilteredBySelector(ContentConst.Const.Selector.SC.Frames.JqueryModalDialogsFrame.Id);
            if (matchingJackets && matchingJackets.length > 0) {

                    jqueryFrameProxy = new JqueryFrameProxy(this.ApiCore, matchingJackets[0]);
                    this.Logger.LogImportant('jquery frame found');
                }
                else {
                  this.ErrorHand.ErrorAndThrow([PackageDesignerInstallerRibbonToolbarProxy.name, this.OpenFile.name], 'no matching jacket');
                }
            })
          .then(() => jqueryFrameProxy.OpenFile(fileName))
          .catch((err) => this.ErrorHand.ErrorAndThrow([PackageDesignerInstallerRibbonToolbarProxy.name, this.OpenFile.name],err))
    }
}
