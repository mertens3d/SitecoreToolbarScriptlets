﻿import { DocumentJacket } from "../../../../DOMJacket/scripts/Document/DocumentJacket";
import { ElementDivJacket } from "../../../../DOMJacket/scripts/DOMJacketEntry";
import { ScProxyDisciminator } from "../../../../Shared/scripts/Enums/40 - ScProxyDisciminator";
import { PromiseFailAction } from "../../../../Shared/scripts/Enums/PromiseFailAction";
import { IAPICore } from "../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { ContentConst } from "../../../../Shared/scripts/Interfaces/InjectConst";
import { IBaseScDocProxy } from "../../../../Shared/scripts/Interfaces/Proxies/IBaseScDocProxy";
import { _justWindowStateFullDocProxy } from "../Desktop/DesktopProxy/FrameProxies/_justWindowStateFullProxy";
import { PackageDesignerInstallerRibbonToolbarElemProxy } from "../StateLessDocProxies/StateLessElemProxies/PackageDesignerInstallerRibbonToolbarProxy";
import { JqueryModalDialogsFrameProxy } from "../StateLessDocProxies/StateLessFrameProxies/JqueryModalDialogsFrameProxy";

export class AppToolsInstallerDesignerProxy extends _justWindowStateFullDocProxy implements IBaseScDocProxy {
  readonly ScProxyDisciminator = ScProxyDisciminator.AppToolsInstallerDesigner;
  readonly ScProxyDisciminatorFriendly = ScProxyDisciminator[ScProxyDisciminator.AppToolsInstallerDesigner];

  packagedesignerInstallerRibbonToolbarElem: PackageDesignerInstallerRibbonToolbarElemProxy = null;


  private JqueryModalDialogsFrameProxy: JqueryModalDialogsFrameProxy;

  constructor(apiCore: IAPICore, documentJacket: DocumentJacket, jqueryModalDialogsFrameProxy: JqueryModalDialogsFrameProxy) {
    super(apiCore, documentJacket);
    this.Logger.CTORStart(AppToolsInstallerDesignerProxy.name);

    this.JqueryModalDialogsFrameProxy = jqueryModalDialogsFrameProxy;
    this.ErrorHand.ThrowIfNullOrUndefined([AppToolsInstallerDesignerProxy.name], [documentJacket, jqueryModalDialogsFrameProxy]);

    this.Logger.CTOREnd(AppToolsInstallerDesignerProxy.name);
  }


  async InstantiateAsyncMembers(): Promise<void> {
    this.Logger.FuncStart([AppToolsInstallerDesignerProxy.name, this.InstantiateAsyncMembers.name]);

    await this.HarvestRibbonToolbar()
      .catch((err: any) => this.ErrorHand.HandleFatalError([AppToolsInstallerDesignerProxy.name, this.InstantiateAsyncMembers.name], err));


    this.Logger.FuncEnd([AppToolsInstallerDesignerProxy.name, this.InstantiateAsyncMembers.name]);
  }



  async OpenFile(fileName: string): Promise<void> {
    this.Logger.FuncStart([AppToolsInstallerDesignerProxy.name, this.OpenFile.name]);

    try {
      this.packagedesignerInstallerRibbonToolbarElem = null;

      if (this.packagedesignerInstallerRibbonToolbarElem) {
        await this.packagedesignerInstallerRibbonToolbarElem.OpenFile(fileName)
          .catch((err: any) => this.ErrorHand.HandleFatalError(this.OpenFile.name, err));
      }
    }
    catch (err: any) {
      this.ErrorHand.HandleFatalError([AppToolsInstallerDesignerProxy.name, this.OpenFile.name], err);
    }

    this.Logger.FuncEnd([AppToolsInstallerDesignerProxy.name, this.OpenFile.name]);
  }
  private async HarvestRibbonToolbar(): Promise<void> {
    this.Logger.FuncStart([AppToolsInstallerDesignerProxy.name, this.HarvestRibbonToolbar.name]);

    await this.DocumentJacket.WaitForGenericElemJacket(ContentConst.Const.Selector.SC.PackageDesigner.Ribbon.InstallerRibbon_Toolbar, PromiseFailAction.RejectThrow)
      .then((elementDivJacket: ElementDivJacket) => this.packagedesignerInstallerRibbonToolbarElem = new PackageDesignerInstallerRibbonToolbarElemProxy(this.ApiCore, elementDivJacket, this.JqueryModalDialogsFrameProxy))
      .then(() => this.packagedesignerInstallerRibbonToolbarElem.InstantiateAsyncMembers())
      .catch((err: any) => this.ErrorHand.HandleFatalError([AppToolsInstallerDesignerProxy.name, this.HarvestRibbonToolbar.name], err));

    this.Logger.FuncEnd([AppToolsInstallerDesignerProxy.name, this.HarvestRibbonToolbar.name]);
  }

}