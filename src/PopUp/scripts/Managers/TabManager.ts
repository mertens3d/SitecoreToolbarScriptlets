import { ScUrlAgent } from '../../../Shared/scripts/Agents/Agents/UrlAgent/ScUrlAgent';
import { IterationDrone } from '../../../Shared/scripts/Agents/Drones/IterationDrone/IterationDrone';
import { PromiseResult } from '../../../Shared/scripts/Classes/PromiseResult';
import { StaticHelpers } from '../../../Shared/scripts/Classes/StaticHelpers';
import { QueryStrKey } from '../../../Shared/scripts/Enums/QueryStrKey';
import { scMode } from '../../../Shared/scripts/Enums/scMode';
import { scWindowType } from '../../../Shared/scripts/Enums/scWindowType';
import { AbsoluteUrl } from '../../../Shared/scripts/Interfaces/AbsoluteUrl';
import { IAllAgents } from "../../../Shared/scripts/Interfaces/Agents/IallAgents";
import { IContentState } from "../../../Shared/scripts/Interfaces/IContentState/IContentState";
import { IDataOneTreeNode } from '../../../Shared/scripts/Interfaces/IDataOneTreeNode';
import { GenericUrlParts } from '../../../Shared/scripts/Interfaces/UrlParts';
import { PopUpHub } from './PopUpHub';
import { PopUpManagerBase } from './PopUpManagerBase';

export class TabManager extends PopUpManagerBase {
  private ScUrlAgent: ScUrlAgent;

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

  constructor(hub: PopUpHub, allAgents: IAllAgents) {
    super(hub, allAgents);
    this.AllAgents.Logger.InstantiateStart(TabManager.name);

    this.AllAgents.Logger.InstantiateEnd(TabManager.name);
  }

  async InitTabManager() {
    this.AllAgents.Logger.FuncStart(TabManager.name, this.InitTabManager.name);

    this.ScUrlAgent = new ScUrlAgent(this.AllAgents.Logger);
    await this.ScUrlAgent.InitGenericUrlAgent();

    this.AllAgents.Logger.FuncEnd(TabManager.name, this.InitTabManager.name);
  }

  ChangeLocationSwitchBoard(desiredPageType: scWindowType) {
    this.AllAgents.Logger.FuncStart(this.ChangeLocationSwitchBoard.name, 'desired = ' + scWindowType[desiredPageType]);

    var iteration: IterationDrone = new IterationDrone(this.AllAgents.Logger, this.ChangeLocationSwitchBoard.name);

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
          self.AllAgents.Logger.Log('Callback triggered');
          self.ChangeLocationSwitchBoard(desiredPageType)
        }

        this.AllAgents.HelperAgent.PromisesBasic.TabChainSetHrefWaitForComplete(absUrl)
          .then(() => {
            console.log('todo');
            // put back?
            //this.MsgMan().WaitForListeningTab(this.CurrentTabData)
          })
          .then(() => callBackOnSuccessfulHrefChange);
      }
    }
    this.AllAgents.Logger.FuncEnd(this.ChangeLocationSwitchBoard.name);
  }

  async SetScModeFromCeDt(newMode: scMode, currentPageType: scWindowType) {
    return new Promise(async (resolve, reject) => {
      this.AllAgents.Logger.FuncStart(this.SetScModeFromCeDt.name, scMode[newMode]);
      this.AllAgents.Logger.LogVal('WindowType', StaticHelpers.WindowTypeAsString(currentPageType));

      let result: PromiseResult = new PromiseResult(this.SetScModeFromCeDt.name, this.AllAgents.Logger);

      this.AllAgents.Logger.MarkerA();

      if (currentPageType === scWindowType.Desktop) {
        this.AllAgents.Logger.MarkerB();
        let contState: IContentState = this.UiMan().CurrContentState;
        this.AllAgents.Logger.MarkerC();
        if (contState && contState.ActiveCe && contState.ActiveCe.ActiveNode) {
          this.AllAgents.Logger.MarkerD();
          let currentNodeId: IDataOneTreeNode = contState.ActiveCe.ActiveNode;
          //http://perficient9sc.dev.local/?sc_itemid=%7B9E8CD546-2354-4921-B38C-4A0C864F236B%7D&sc_mode=preview&sc_lang=en&sc_site=website
          //let editUrl = 'http://' + this.CurrentTabData.UrlParts.Hostname
          //  + '/?sc_itemid=' + contState.ActiveCe.ActiveNode.NodeId.AsBracedGuid + '&sc_mode=preview&sc_lang=en&sc_site=website';

          this.ScUrlAgent.BuildEditPrevNormUrl(newMode, contState);
          let editUrl = this.ScUrlAgent.GetFullUrl();

          await this.BrowserMan().CreateNewTab(editUrl)
            .then(() => result.MarkSuccessful())
            .catch((ex) => result.MarkFailed(ex));
        } else {
          //this.AllAgents.Logger.Log('unknown case');
          this.AllAgents.Logger.LogAsJsonPretty('contState', contState);
          reject('unknown contState ');
        }
      } else {
        this.AllAgents.Logger.Log('need to handle ce case');
      }
      this.AllAgents.Logger.FuncEnd(this.SetScModeFromCeDt.name, scMode[newMode]);
      if (result.WasSuccessful()) {
        resolve();
      } else {
        reject(result.RejectReasons);
      }
    });
  }

  SetScMode(newMode: scMode) {
    return new Promise(async (resolve, reject) => {
      this.AllAgents.Logger.FuncStart(this.SetScMode.name, scMode[newMode]);

      let result: PromiseResult = new PromiseResult(this.SetScMode.name, this.AllAgents.Logger);

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
        await this.AllAgents.HelperAgent.PromisesBasic.TabChainSetHrefWaitForComplete(newHref)
          .then(() => result.MarkSuccessful())
          .catch((ex) => result.MarkFailed(ex));
      }

      this.AllAgents.Logger.FuncEnd(this.SetScMode.name);

      if (result.WasSuccessful()) {
        resolve();
      } else {
        reject(result.RejectReasons);
      }
    });
  }
}