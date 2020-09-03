import { ScUrlAgent } from '../../../Shared/scripts/Agents/Agents/UrlAgent/ScUrlAgent';
import { IterationDrone } from '../../../Shared/scripts/Agents/Drones/IterationDrone/IterationDrone';
import { PromiseResult } from '../../../Shared/scripts/Classes/PromiseResult';
import { StaticHelpers } from '../../../Shared/scripts/Classes/StaticHelpers';
import { QueryStrKey } from '../../../Shared/scripts/Enums/QueryStrKey';
import { scMode } from '../../../Shared/scripts/Enums/scMode';
import { scWindowType } from '../../../Shared/scripts/Enums/scWindowType';
import { HelperAgent } from '../../../Shared/scripts/Helpers/Helpers';
import { AbsoluteUrl } from '../../../Shared/scripts/Interfaces/AbsoluteUrl';
import { ILoggerAgent } from '../../../Shared/scripts/Interfaces/Agents/ILoggerBase';
import { IContentState } from "../../../Shared/scripts/Interfaces/IContentState/IContentState";
import { IDataOneTreeNode } from '../../../Shared/scripts/Interfaces/IDataOneTreeNode';
import { GenericUrlParts } from '../../../Shared/scripts/Interfaces/UrlParts';
import { BrowserManager } from './MessageManager/BrowserManager';
import { UiManager } from './UiManager/UiManager';

export class TabManager {
  private ScUrlAgent: ScUrlAgent;
  private Logger: ILoggerAgent;
  private HelperAgent: HelperAgent;
  private UiMan: UiManager;
  private BrowserMan: BrowserManager;

  constructor(logger: ILoggerAgent, helperAgent: HelperAgent, uiMan: UiManager, browserMan: BrowserManager) {
    this.Logger = logger;
    this.Logger.InstantiateStart(TabManager.name);

    this.HelperAgent = helperAgent;
    this.UiMan = uiMan;
    this.BrowserMan = browserMan;

    this.Logger.InstantiateEnd(TabManager.name);
  }

  GetFullUrl(): AbsoluteUrl {
    return this.ScUrlAgent.BuildFullUrlFromParts();
  }

  SetQueryStringKeyValue(qsKey: QueryStrKey, qsValue: string) {
    this.ScUrlAgent.SetParameterValueByKey(qsKey, qsValue)
  }

  GetUrlParts(): GenericUrlParts {
    return this.ScUrlAgent.GetUrlParts();
  }

  GetWindowType(): scWindowType {
    return this.ScUrlAgent.GetScWindowType();
  }

  async InitTabManager() {
    this.Logger.FuncStart(TabManager.name, this.InitTabManager.name);

    this.ScUrlAgent = new ScUrlAgent(this.Logger);
    await this.ScUrlAgent.InitGenericUrlAgent();

    this.Logger.FuncEnd(TabManager.name, this.InitTabManager.name);
  }

  ChangeLocationSwitchBoard(desiredPageType: scWindowType) {
    this.Logger.FuncStart(this.ChangeLocationSwitchBoard.name, 'desired = ' + scWindowType[desiredPageType]);

    var iteration: IterationDrone = new IterationDrone(this.Logger, this.ChangeLocationSwitchBoard.name);

    if (iteration.DecrementAndKeepGoing()) {
      var currentScWindowType: scWindowType = this.ScUrlAgent.GetScWindowType();//.ScWindowType;

      if (currentScWindowType === scWindowType.LoginPage) {
        var self = this;
      }

      else if (currentScWindowType === scWindowType.Launchpad || currentScWindowType === scWindowType.ContentEditor || currentScWindowType === scWindowType.Desktop) {
        var self = this;

        this.ScUrlAgent.SetFilePathFromWindowType(desiredPageType);

        var absUrl: AbsoluteUrl = this.ScUrlAgent.BuildFullUrlFromParts();

        var callBackOnSuccessfulHrefChange: Function = function () {
          self.Logger.Log('Callback triggered');
          self.ChangeLocationSwitchBoard(desiredPageType)
        }

        this.HelperAgent.PromisesBasic.TabChainSetHrefWaitForComplete(absUrl)
          .then(() => {
            console.log('todo');
            // put back?
            //this.MsgMan().WaitForListeningTab(this.CurrentTabData)
          })
          .then(() => callBackOnSuccessfulHrefChange);
      }
    }
    this.Logger.FuncEnd(this.ChangeLocationSwitchBoard.name);
  }

  async SetScModeFromCeDt(newMode: scMode, currentPageType: scWindowType) {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.SetScModeFromCeDt.name, scMode[newMode]);
      this.Logger.LogVal('WindowType', StaticHelpers.WindowTypeAsString(currentPageType));

      let result: PromiseResult = new PromiseResult(this.SetScModeFromCeDt.name, this.Logger);

      this.Logger.MarkerA();

      if (currentPageType === scWindowType.Desktop) {
        this.Logger.MarkerB();
        let contState: IContentState = this.UiMan.CurrContentState;
        this.Logger.MarkerC();
        if (contState && contState.ActiveCe && contState.ActiveCe.ActiveNode) {
          this.Logger.MarkerD();
          let currentNodeId: IDataOneTreeNode = contState.ActiveCe.ActiveNode;
          //http://perficient9sc.dev.local/?sc_itemid=%7B9E8CD546-2354-4921-B38C-4A0C864F236B%7D&sc_mode=preview&sc_lang=en&sc_site=website
          //let editUrl = 'http://' + this.CurrentTabData.UrlParts.Hostname
          //  + '/?sc_itemid=' + contState.ActiveCe.ActiveNode.NodeId.AsBracedGuid + '&sc_mode=preview&sc_lang=en&sc_site=website';

          this.ScUrlAgent.BuildEditPrevNormUrl(newMode, contState);
          let editUrl = this.ScUrlAgent.GetFullUrl();

          await this.BrowserMan.CreateNewTab(editUrl)
            .then(() => result.MarkSuccessful())
            .catch((ex) => result.MarkFailed(ex));
        } else {
          //this.Logger.Log('unknown case');
          this.Logger.LogAsJsonPretty('contState', contState);
          reject('unknown contState ');
        }
      } else {
        this.Logger.Log('need to handle ce case');
      }
      this.Logger.FuncEnd(this.SetScModeFromCeDt.name, scMode[newMode]);
      if (result.WasSuccessful()) {
        resolve();
      } else {
        reject(result.RejectReasons);
      }
    });
  }

  SetScMode(newMode: scMode) {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.SetScMode.name, scMode[newMode]);

      let result: PromiseResult = new PromiseResult(this.SetScMode.name, this.Logger);

      var currentPageType: scWindowType = this.ScUrlAgent.GetScWindowType();

      if (currentPageType === scWindowType.ContentEditor
        ||
        currentPageType === scWindowType.Desktop
      ) {
        await this.SetScModeFromCeDt(newMode, currentPageType)
          .then(() => result.MarkSuccessful())
          .catch((ex) => result.MarkFailed(ex));
      }
      else if (currentPageType === scWindowType.Edit
        || currentPageType === scWindowType.Normal
        || currentPageType === scWindowType.Preview) {
        this.ScUrlAgent.SetScMode(newMode);

        let newHref: AbsoluteUrl = this.ScUrlAgent.GetFullUrl();
        await this.HelperAgent.PromisesBasic.TabChainSetHrefWaitForComplete(newHref)
          .then(() => result.MarkSuccessful())
          .catch((ex) => result.MarkFailed(ex));
      }

      this.Logger.FuncEnd(this.SetScMode.name);

      if (result.WasSuccessful()) {
        resolve();
      } else {
        reject(result.RejectReasons);
      }
    });
  }
}