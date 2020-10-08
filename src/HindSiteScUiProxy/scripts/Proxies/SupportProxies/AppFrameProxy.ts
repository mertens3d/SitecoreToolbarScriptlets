import { FrameJacket } from "../../../../DOMJacket/FrameJacket";
import { IHindeCore } from "../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { ContentConst } from "../../../../Shared/scripts/Interfaces/InjectConst";
import { _HindeCoreBase } from "../../../../Shared/scripts/_HindeCoreBase";
import { PromiseFailAction } from "../../../../Shared/scripts/Enums/PromiseFailAction";
import { ElementDivJacket } from "../../../../DOMJacket/ElementDivJacket";
import { PackageDesignerInstallerRibbonToolbarProxy } from "../PackageDesignerProxy/PackageDesignerInstallerRibbonToolbarProxy";
import { DocumentJacket } from "../../../../DOMJacket/DocumentJacket";

export class AppFrameProxy extends _HindeCoreBase {
    private FrameJacket: FrameJacket = null;
    private ParentJacket: DocumentJacket;

    constructor(hindeCore: IHindeCore, appFrameJacket: FrameJacket, parentJacket: DocumentJacket) {
        super(hindeCore);
        this.FrameJacket = appFrameJacket;
        this.ParentJacket = parentJacket;
    }
    async OpenFile(fileName: string): Promise<void> {
        try {
            let toolbarProxy: PackageDesignerInstallerRibbonToolbarProxy = null;

            await this.FrameJacket.WaitForCompleteNABHtmlIframeElement('AppFrameJacket')
                .then(() => this.FrameJacket.DocumentJacket.WaitForAndReturnFoundElemJacket(ContentConst.Const.Selector.SC.PackageDesigner.Ribbon.InstallerRibbon_Toolbar, PromiseFailAction.RejectThrow))
                .then((elementDivJacket: ElementDivJacket) => toolbarProxy = new PackageDesignerInstallerRibbonToolbarProxy(this.HindeCore, elementDivJacket, this.ParentJacket))
                .then(() => toolbarProxy.OpenFile(fileName));
        }
        catch (err) {
            this.ErrorHand.ErrorAndThrow([AppFrameProxy.name, this.OpenFile.name], err);
        }
    }
}
