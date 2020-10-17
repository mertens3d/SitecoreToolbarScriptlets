/// <reference path="../../../../node_modules/web-ext-types/global/index.d.ts" />

import { ScWindowType } from '../Enums/50 - scWindowType';
import { QueryStrKey } from '../Enums/QueryStrKey';
import { TypeDiscriminator } from '../Enums/70 - TypeDiscriminator';
import { IBaseBrowserProxy } from '../Interfaces/Agents/IBaseBrowserProxy';
import { ICommonCore } from "../Interfaces/Agents/ICommonCore";
import { ISettingsAgent } from '../Interfaces/Agents/ISettingsAgent';
import { IDataBrowserTab } from '../Interfaces/Data/IDataBrowserWindow';
import { ISiteUrl } from '../Interfaces/IAbsoluteUrl';
import { IScWindowTypeResolver } from '../Interfaces/Jackets/IScUrlAgent';
import { IPopUpBrowserProxy } from '../Interfaces/Proxies/IBrowserProxy';
import { BaseBrowserProxy } from '../Proxies/Browser/_BaseBrowserProxy';
import { _CommonBase } from "../_CommonCoreBase";
import { IterationDrone } from './Drones/IterationDrone/IterationDrone';
import { IScURLResolver } from '../Interfaces/Jackets/IScPathResolver';

export class BrowserTabAgent extends _CommonBase {
  TypeDiscriminator = TypeDiscriminator.BrowserTabAgent;
  private ScURLResolver: IScURLResolver;
  private ScWindowTypeResolver: IScWindowTypeResolver;
  private SettingsAgent: ISettingsAgent;
  private PopUpBrowserProxy: IPopUpBrowserProxy;

  constructor(commonCore: ICommonCore, scWindowTypeResolver: IScWindowTypeResolver, settingsAgent: ISettingsAgent, popUpBrowserProxy: IPopUpBrowserProxy, scURLResolver: IScURLResolver) {
    super(commonCore);
    this.Logger.CTORStart(BrowserTabAgent.name);
    this.ScWindowTypeResolver = scWindowTypeResolver;
    this.SettingsAgent = settingsAgent;
    this.ScURLResolver = scURLResolver;

    this.PopUpBrowserProxy = popUpBrowserProxy;

    this.Logger.CTOREnd(BrowserTabAgent.name);
  }

  GetFullUrl(): ISiteUrl {
    return this.ScURLResolver.UrlJacket.BuildFullUrlFromParts();
  }

  SetQueryStringKeyValue(qsKey: QueryStrKey, qsValue: string) {
    this.ScURLResolver.SetParameterValueByKey(qsKey, qsValue)
  }

  GetWindowType(): ScWindowType {
    return this.ScWindowTypeResolver.GetScWindowType(this.ScURLResolver.UrlJacket);
  }

  async CreateNewTab(tabUrl: ISiteUrl) {
    return new Promise<IDataBrowserTab>(async (resolve, reject) => {
      this.Logger.FuncStart(this.CreateNewTab.name, tabUrl.AbsUrl);

      //let result: PromiseResult = new PromiseResult(this.CreateNewTab.name, this.AllAgents.Logger);

      //let newTab: IDataBrowserTab;

      //this.UiMan().MessageFeedbackModule.UpdateMsgStatusStack('Opening new tab');

      await browser.tabs.create({ url: tabUrl.AbsUrl })
        .then(() => resolve())
        .catch((err) => reject(err));
    })
  }

  ChangeLocationSwitchBoard(desiredPageType: ScWindowType) {
    this.Logger.FuncStart(this.ChangeLocationSwitchBoard.name, 'desired = ' + ScWindowType[desiredPageType]);

    var iteration: IterationDrone = new IterationDrone(this.CommonCore, this.ChangeLocationSwitchBoard.name, true);

    if (iteration.DecrementAndKeepGoing()) {
      var currentScWindowType: ScWindowType = this.ScWindowTypeResolver.GetScWindowType(this.ScURLResolver.UrlJacket);//.ScWindowType;

      if (currentScWindowType === ScWindowType.LoginPage) {
        var self = this;
      }

      else if (currentScWindowType === ScWindowType.Launchpad || currentScWindowType === ScWindowType.ContentEditor || currentScWindowType === ScWindowType.Desktop) {
        var self = this;

        this.ScURLResolver.SetFilePathFromWindowType(desiredPageType);

        var absUrl: ISiteUrl = this.ScURLResolver.UrlJacket.BuildFullUrlFromParts();

        var callBackOnSuccessfulHrefChange: Function = function () {
          self.Logger.Log('Callback triggered');
          self.ChangeLocationSwitchBoard(desiredPageType)
        }

        this.TabChainSetHrefWaitForComplete(absUrl)
          .then(() => {
            // put back?
            //this.MsgMan().WaitForListeningTab(this.CurrentTabData)
          })
          .then(() => callBackOnSuccessfulHrefChange);
      }
    }
    this.Logger.FuncEnd(this.ChangeLocationSwitchBoard.name);
  }

  TabChainSetHrefWaitForComplete(href: ISiteUrl): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.TabChainSetHrefWaitForComplete.name, href.AbsUrl);

      let browserProxy: IBaseBrowserProxy = new BaseBrowserProxy(this.CommonCore);
      //await browserProxy.InitAsyncProperties()
      //  .then(() => browserProxy.ActiveBrowserTabProxy.UpdateAndWaitForComplete(href.AbsUrl))
      //  .then(() => resolve())
      //  .catch((ex) => reject(ex));
      resolve();

      this.Logger.FuncEnd(this.TabChainSetHrefWaitForComplete.name, href.AbsUrl);
    });

    //async SetScModeFromCeDt(newMode: scMode, currentPageType: scWindowType) {
    //  return new Promise(async (resolve, reject) => {
    //    this.Logger.FuncStart(this.SetScModeFromCeDt.name, scMode[newMode]);
    //    this.Logger.LogVal('WindowType', StaticHelpers.WindowTypeAsString(currentPageType));

    //    let result: PromiseResult = new PromiseResult(this.SetScModeFromCeDt.name, this.HindeCore);

    //    this.Logger.MarkerA();

    //    if (currentPageType === scWindowType.Desktop) {
    //      this.Logger.MarkerB();
    //      let contState: IContentState = this.UiMan.CurrContentState;
    //      this.Logger.MarkerC();
    //      if (contState && contState.ActiveCe && contState.ActiveCe.ActiveNode) {
    //        this.Logger.MarkerD();
    //        let currentNodeId: IDataOneTreeNode = contState.ActiveCe.ActiveNode;
    //        //http://perficient9sc.dev.local/?sc_itemid=%7B9E8CD546-2354-4921-B38C-4A0C864F236B%7D&sc_mode=preview&sc_lang=en&sc_site=website
    //        //let editUrl = 'http://' + this.CurrentTabData.UrlParts.Hostname
    //        //  + '/?sc_itemid=' + contState.ActiveCe.ActiveNode.NodeId.AsBracedGuid + '&sc_mode=preview&sc_lang=en&sc_site=website';

    //        this.ScUrlAgent.BuildEditPrevNormUrl(newMode, contState);
    //        let editUrl = this.ScUrlAgent.GetFullUrl();

    //        await this.CreateNewTab(editUrl)
    //          .then(() => result.MarkSuccessful())
    //          .catch((ex) => result.MarkFailed(ex));
    //      } else {
    //        //this.Logger.Log('unknown case');
    //        this.Logger.LogAsJsonPretty('contState', contState);
    //        reject('unknown contState ');
    //      }
    //    } else {
    //      this.Logger.Log('need to handle ce case');
    //    }
    //    this.Logger.FuncEnd(this.SetScModeFromCeDt.name, scMode[newMode]);
    //    if (result.WasSuccessful()) {
    //      resolve();
    //    } else {
    //      reject(result.RejectReasons);
    //    }
    //  });
    //}

    //SetScMode(newMode: scMode) {
    //  return new Promise(async (resolve, reject) => {
    //    this.Logger.FuncStart(this.SetScMode.name, scMode[newMode]);

    //    let result: PromiseResult = new PromiseResult(this.SetScMode.name, this.HindeCore);

    //    var currentPageType: scWindowType = this.ScUrlAgent.GetScWindowType();

    //    if (currentPageType === scWindowType.ContentEditor
    //      ||
    //      currentPageType === scWindowType.Desktop
    //    ) {
    //      await this.SetScModeFromCeDt(newMode, currentPageType)
    //        .then(() => result.MarkSuccessful())
    //        .catch((ex) => result.MarkFailed(ex));
    //    }
    //    else if (currentPageType === scWindowType.Edit
    //      || currentPageType === scWindowType.Normal
    //      || currentPageType === scWindowType.Preview) {
    //      this.ScUrlAgent.SetScMode(newMode);

    //      let newHref: AbsoluteUrl = this.ScUrlAgent.GetFullUrl();
    //      await this.HelperAgent.PromisesBasic.TabChainSetHrefWaitForComplete(newHref)
    //        .then(() => result.MarkSuccessful())
    //        .catch((ex) => result.MarkFailed(ex));
    //    }

    //    this.Logger.FuncEnd(this.SetScMode.name);

    //    if (result.WasSuccessful()) {
    //      resolve();
    //    } else {
    //      reject(result.RejectReasons);
    //    }
    //  });
  }
}