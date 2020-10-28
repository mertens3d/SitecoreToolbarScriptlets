﻿import { ElementDivJacket } from "../../../../../DOMJacket/scripts/Elements/ElementDivJacket";
import { ScProxyDisciminator } from "../../../../../Shared/scripts/Enums/40 - ScProxyDisciminator";
import { IJacketOfType } from "../../../../../Shared/scripts/IJacketOfType";
import { IAPICore } from "../../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { ContentConst } from "../../../../../Shared/scripts/Interfaces/InjectConst";
import { IBaseScProxy, IProxyCommand } from "../../../../../Shared/scripts/Interfaces/ScProxies/IBaseScProxy";
import { IScFrameProxy } from "../../../../../Shared/scripts/Interfaces/ScProxies/IStateFullFrameProxy";
import { IStateOf_ } from "../../../../../Shared/scripts/Interfaces/StateOf/IStateOf_";
import { _BaseElemProxy } from "../../Desktop/DesktopProxy/FrameProxies/_BaseElemProxy";

export class PackageDesignerInstallerRibbonToolbarElemProxy extends _BaseElemProxy<IStateOf_> implements IBaseScProxy {
  readonly ScProxyDisciminator = ScProxyDisciminator.PackageDesignerInstallerRibbonToolbarElemProxy;
  readonly ScProxyDisciminatorFriendly: string = ScProxyDisciminator[ScProxyDisciminator.PackageDesignerInstallerRibbonToolbarElemProxy];
  readonly IsStateFull: boolean = false;


  JqueryModalDialogsFrameProxy: IScFrameProxy;
  private GenerateZipButton: IJacketOfType;

  constructor(apiCore: IAPICore, elementDivJacket: ElementDivJacket, jqueryModalDialogsFrameProxy: IScFrameProxy) {
    super(apiCore, elementDivJacket);

    this.JqueryModalDialogsFrameProxy = jqueryModalDialogsFrameProxy;

    this.ErrorHand.ThrowIfNullOrUndefined(PackageDesignerInstallerRibbonToolbarElemProxy.name, [jqueryModalDialogsFrameProxy])
  }

  private async AttachClickEventToGenZip(): Promise<void> {
    this.Logger.FuncStart([PackageDesignerInstallerRibbonToolbarElemProxy.name, this.AttachClickEventToGenZip.name]);

    this.ContainerElemJacket.WaitFor(ContentConst.Const.Selector.SC.InstallerDesigner.GenerateZip)
      .then((genericElemJacket: IJacketOfType) => this.GenerateZipButton = genericElemJacket)
      .then(() => this.GenerateZipButton.NativeElement.addEventListener('click', ((event: Event) => this.CallBackOnGenerateZipButtonClicked(event))))
      .catch((err: any) => this.ErrorHand.HandleFatalError([PackageDesignerInstallerRibbonToolbarElemProxy.name, this.AttachClickEventToGenZip.name], err));

    this.Logger.FuncEnd([PackageDesignerInstallerRibbonToolbarElemProxy.name, this.AttachClickEventToGenZip.name]);
  }

  private CallBackOnGenerateZipButtonClicked(event: Event): void {
    //this.Logger.FuncStart([PackageDesignerInstallerRibbonToolbarElemProxy.name, this.CallBackOnGenerateZipButtonClicked.name]);

    ////alert('generate zip button clicked');
    //this.Logger.FuncEnd([PackageDesignerInstallerRibbonToolbarElemProxy.name, this.CallBackOnGenerateZipButtonClicked.name]);
  }

  protected  async InstantiateAwaitElementsSelf(): Promise<void> {
    try {
      this.Logger.FuncStart([PackageDesignerInstallerRibbonToolbarElemProxy.name, this.InstantiateAwaitElementsSelf.name]);
      await this.AttachClickEventToGenZip()
        .catch((err: any) => this.ErrorHand.HandleFatalError([PackageDesignerInstallerRibbonToolbarElemProxy.name, this.InstantiateAwaitElementsSelf.name], err));
    } catch (err: any) {
      this.ErrorHand.HandleFatalError([PackageDesignerInstallerRibbonToolbarElemProxy.name, this.InstantiateAwaitElementsSelf.name], err);
    }
    this.Logger.FuncEnd([PackageDesignerInstallerRibbonToolbarElemProxy.name, this.InstantiateAwaitElementsSelf.name]);
  }



  async OpenFile(fileName: string): Promise<void> {
    //let jqueryFrameProxy: JqueryModalDialogsProxy = null;

    await this.ContainerElemJacket.WaitFor(ContentConst.Const.Selector.SC.PackageDesigner.Ribbon.Open, this.OpenFile.name)
      .then((elemJacket: IJacketOfType) => elemJacket.NativeElement.click())
      .catch((err: any) => this.ErrorHand.HandleFatalError([PackageDesignerInstallerRibbonToolbarElemProxy.name, this.OpenFile.name], err))

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
      let flowCommand: IProxyCommand = {};
      this.JqueryModalDialogsFrameProxy.SendCommand(flowCommand);
    } else {
      this.ErrorHand.HandleFatalError(this.OpenFile.name, 'no jquery proxy');
    }

    //.then(() => jqueryFrameProxy.OpenFile(fileName))
  }
}