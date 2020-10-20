import { ElementDivJacket } from "../../../../../DOMJacket/scripts/Elements/ElementDivJacket";
import { IJacketOfType } from "../../../../../Shared/scripts/IJacketOfType";
import { IAPICore } from "../../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { ContentConst } from "../../../../../Shared/scripts/Interfaces/InjectConst";
import { _BaseStateLessElemProxy } from "../../Desktop/DesktopProxy/FrameProxies/_BaseStateLessElemProxy";
import { JqueryModalDialogsFrameProxy } from "../StateLessFrameProxies/JqueryModalDialogsFrameProxy";

export class PackageDesignerInstallerRibbonToolbarElemProxy extends _BaseStateLessElemProxy {
  ElementDivJacket: ElementDivJacket;
  JqueryModalDialogsFrameProxy: JqueryModalDialogsFrameProxy;
  private GenerateZipButton: IJacketOfType;

  constructor(apiCore: IAPICore, elementDivJacket: ElementDivJacket, jqueryModalDialogsFrameProxy: JqueryModalDialogsFrameProxy) {
    super(apiCore);
    this.ElementDivJacket = elementDivJacket;
    this.JqueryModalDialogsFrameProxy = jqueryModalDialogsFrameProxy;

    this.ErrorHand.ThrowIfNullOrUndefined(PackageDesignerInstallerRibbonToolbarElemProxy.name, [jqueryModalDialogsFrameProxy])
  }

  private async AttachClickEventToGenZip(): Promise<void> {
    this.Logger.FuncStart([PackageDesignerInstallerRibbonToolbarElemProxy.name, this.AttachClickEventToGenZip.name]);

    this.ElementDivJacket.WaitForElement(ContentConst.Const.Selector.SC.InstallerDesigner.GenerateZip)
      .then((genericElemJacket: IJacketOfType) => this.GenerateZipButton = genericElemJacket)
      .then(() => this.GenerateZipButton.NativeElement.addEventListener('click', ((event: Event) => this.CallBackOnGenerateZipButtonClicked(event))))
      .catch((err) => this.ErrorHand.HandleFatalError([PackageDesignerInstallerRibbonToolbarElemProxy.name, this.AttachClickEventToGenZip.name], err));

    this.Logger.FuncEnd([PackageDesignerInstallerRibbonToolbarElemProxy.name, this.AttachClickEventToGenZip.name]);
  }

  async InstantiateAsyncMembers(): Promise<void> {
    try {
      this.Logger.FuncStart([PackageDesignerInstallerRibbonToolbarElemProxy.name, this.InstantiateAsyncMembers.name]);
      await this.AttachClickEventToGenZip()
        .catch((err) => this.ErrorHand.HandleFatalError([PackageDesignerInstallerRibbonToolbarElemProxy.name, this.InstantiateAsyncMembers.name], err));
    } catch (err) {
      this.ErrorHand.HandleFatalError([PackageDesignerInstallerRibbonToolbarElemProxy.name, this.InstantiateAsyncMembers.name], err);
    }
    this.Logger.FuncEnd([PackageDesignerInstallerRibbonToolbarElemProxy.name, this.InstantiateAsyncMembers.name]);
  }

  private CallBackOnGenerateZipButtonClicked(event: Event): void {
    //this.Logger.FuncStart([PackageDesignerInstallerRibbonToolbarElemProxy.name, this.CallBackOnGenerateZipButtonClicked.name]);

    ////alert('generate zip button clicked');
    //this.Logger.FuncEnd([PackageDesignerInstallerRibbonToolbarElemProxy.name, this.CallBackOnGenerateZipButtonClicked.name]);
  }

  async OpenFile(fileName: string): Promise<void> {
    //let jqueryFrameProxy: JqueryModalDialogsProxy = null;

    await this.ElementDivJacket.WaitForElement(ContentConst.Const.Selector.SC.PackageDesigner.Ribbon.Open, this.OpenFile.name)
      .then((elemJacket: IJacketOfType) => elemJacket.NativeElement.click())
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