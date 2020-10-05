﻿import { IterationDrone } from '../../../Shared/scripts/Agents/Drones/IterationDrone/IterationDrone';
import { RecipeBasics } from '../../../Shared/scripts/Classes/RecipeBasics';
import { QueryStrKey } from '../../../Shared/scripts/Enums/QueryStrKey';
import { ScWindowType } from '../../../Shared/scripts/Enums/scWindowType';
import { IHindeCore } from "../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { IScUrlAgent } from '../../../Shared/scripts/Interfaces/Jackets/IScUrlAgent';
import { ISettingsAgent } from '../../../Shared/scripts/Interfaces/Agents/ISettingsAgent';
import { IDataBrowserTab } from '../../../Shared/scripts/Interfaces/Data/IDataBrowserWindow';
import { IAbsoluteUrl } from '../../../Shared/scripts/Interfaces/IAbsoluteUrl';
import { _HindeCoreBase } from '../../../Shared/scripts/LoggableBase';

export class BrowserTabAgent extends _HindeCoreBase{
  private ScUrlAgent: IScUrlAgent;
  private RecipeBasics: RecipeBasics;
  SettingsAgent: ISettingsAgent;

  constructor(hindeCore: IHindeCore, scUrlAgent: IScUrlAgent, settingsAgent: ISettingsAgent) {
    super(hindeCore);
    this.Logger.CTORStart(BrowserTabAgent.name);
    this.ScUrlAgent = scUrlAgent;
    this.SettingsAgent = settingsAgent;
    this.RecipeBasics = new RecipeBasics(this.HindeCore);
    this.Logger.CTOREnd(BrowserTabAgent.name);
  }

  GetFullUrl(): IAbsoluteUrl {
    return this.ScUrlAgent.UrlJacket.BuildFullUrlFromParts();
  }

  SetQueryStringKeyValue(qsKey: QueryStrKey, qsValue: string) {
    this.ScUrlAgent.SetParameterValueByKey(qsKey, qsValue)
  }

  GetWindowType(): ScWindowType {
    return this.ScUrlAgent.GetScWindowType();
  }

  async CreateNewTab(tabUrl: IAbsoluteUrl) {
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

    var iteration: IterationDrone = new IterationDrone(this.HindeCore, this.ChangeLocationSwitchBoard.name, true);

    if (iteration.DecrementAndKeepGoing()) {
      var currentScWindowType: ScWindowType = this.ScUrlAgent.GetScWindowType();//.ScWindowType;

      if (currentScWindowType === ScWindowType.LoginPage) {
        var self = this;
      }

      else if (currentScWindowType === ScWindowType.Launchpad || currentScWindowType === ScWindowType.ContentEditor || currentScWindowType === ScWindowType.Desktop) {
        var self = this;

        this.ScUrlAgent.SetFilePathFromWindowType(desiredPageType);

        var absUrl: IAbsoluteUrl = this.ScUrlAgent.UrlJacket.BuildFullUrlFromParts();

        var callBackOnSuccessfulHrefChange: Function = function () {
          self.Logger.Log('Callback triggered');
          self.ChangeLocationSwitchBoard(desiredPageType)
        }

        this.RecipeBasics.TabChainSetHrefWaitForComplete(absUrl)
          .then(() => {
            // put back?
            //this.MsgMan().WaitForListeningTab(this.CurrentTabData)
          })
          .then(() => callBackOnSuccessfulHrefChange);
      }
    }
    this.Logger.FuncEnd(this.ChangeLocationSwitchBoard.name);
  }

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
  //}
}