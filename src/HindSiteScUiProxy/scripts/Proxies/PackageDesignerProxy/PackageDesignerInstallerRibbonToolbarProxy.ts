import { DocumentJacket } from "../../../../DOMJacket/DocumentJacket";
import { IHindeCore } from "../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { ContentConst } from "../../../../Shared/scripts/Interfaces/InjectConst";
import { ElementFrameJacket } from "../../../../DOMJacket/ElementFrameJacket";
import { ElementJacket } from "../../../../DOMJacket/ElementJacket";
import { ElementDivJacket } from "../../../../DOMJacket/ElementDivJacket";
import { _HindeCoreBase } from "../../../../Shared/scripts/_HindeCoreBase";
import { JqueryFrameProxy } from "../SupportProxies/JqueryFrameProxy";

export class PackageDesignerInstallerRibbonToolbarProxy extends _HindeCoreBase {
    private parentDocumentJacket: DocumentJacket;
    ElementDivJacket: ElementDivJacket;

    constructor(hindeCore: IHindeCore, elementDivJacket: ElementDivJacket, parentDocumentJacket: DocumentJacket) {
        super(hindeCore);
        this.parentDocumentJacket = parentDocumentJacket;
        this.ElementDivJacket = elementDivJacket;
    }


    async OpenFile(fileName: string): Promise<void> {
        let jqueryFrameProxy: JqueryFrameProxy = null;

        await this.ElementDivJacket.WaitAndReturnFoundElemJacketFromElemJacket(ContentConst.Const.Selector.SC.PackageDesigner.Ribbon.Open, this.OpenFile.name)
            .then((elemJacket: ElementJacket) => elemJacket.NativeElement.click())
          .then(() => {
            let matchingJackets: ElementFrameJacket[] = this.parentDocumentJacket.GetHostedFramesFilteredBySelector(ContentConst.Const.Selector.SC.Frames.JqueryModalDialogsFrame.Id);
            if (matchingJackets && matchingJackets.length > 0) {

                    jqueryFrameProxy = new JqueryFrameProxy(this.HindeCore, matchingJackets[0]);
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
