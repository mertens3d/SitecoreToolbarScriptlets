import { IDataOneTreeNode } from '../../../Shared/scripts/Interfaces/IDataOneTreeNode';
import { IScMode } from '../../../Shared/scripts/Interfaces/IscMode';
import { scWindowType } from '../../../Shared/scripts/Enums/scWindowType';
import { PopUpManagerBase } from './PopUpManagerBase';
import { PopUpHub } from './PopUpHub';
import { IContentState } from "../../../Shared/scripts/Interfaces/IContentState/IContentState";
import { StaticHelpers } from '../../../Shared/scripts/Classes/StaticHelpers';
import { AbsoluteUrl } from '../../../Shared/scripts/Interfaces/AbsoluteUrl';
import { PromiseResult } from "../../../Shared/scripts/Classes/PromiseResult";
import { IAllAgents } from "../../../Shared/scripts/Interfaces/Agents/IallAgents";
import { IterationDrone } from '../../../Shared/scripts/Agents/Drones/IterationDrone/IterationDrone';

export class LocationManager extends PopUpManagerBase {
  constructor(hub: PopUpHub, allAgents: IAllAgents) {
    super(hub, allAgents);
    this.AllAgents.Logger.InstantiateStart(LocationManager.name);
    this.AllAgents.Logger.InstantiateEnd(LocationManager.name);
  }
    
  ChangeLocationSwitchBoard(desiredPageType: scWindowType) {
    this.AllAgents.Logger.FuncStart(this.ChangeLocationSwitchBoard.name, 'desired = ' + scWindowType[desiredPageType]);

    var iteration: IterationDrone = new IterationDrone(this.AllAgents.Logger, this.ChangeLocationSwitchBoard.name);

    if (iteration.DecrementAndKeepGoing()) {
      var currentScWindowType: scWindowType = this.TabMan().CurrentTabData.UrlParts.ScWindowType;

      if (this.TabMan().CurrentTabData.UrlParts.ScWindowType === scWindowType.LoginPage) {
        var self = this;
        var callbackOnComplete: Function = () => {
          this.AllAgents.Logger.Log('callback triggered');
          self.ChangeLocationSwitchBoard(desiredPageType);
        };

        //this.AdminB(targetWindow.DataDocSelf, callbackOnComplete);
        //todo - send message to run adminB
        var self = this;

        //setTimeout(function () {
        //  self.Xyyz.LocationMan.ChangeLocation(desiredPageType, targetWindow);
        //}, self.Const().Timeouts.TimeoutChangeLocation);
      }

      else if (currentScWindowType === scWindowType.Launchpad || currentScWindowType === scWindowType.ContentEditor || currentScWindowType === scWindowType.Desktop) {
        var self = this;
        this.TabMan().CurrentTabData.UrlParts = this.AllAgents.HelperAgent.UrlHelp.SetFilePathFromWindowType(this.TabMan().CurrentTabData.UrlParts, desiredPageType);
        var absUrl: AbsoluteUrl = this.AllAgents.HelperAgent.UrlHelp.BuildFullUrlFromParts(this.TabMan().CurrentTabData.UrlParts);

        var callBackOnSuccessfulHrefChange: Function = function () {
          self.AllAgents.Logger.Log('Callback triggered');
          self.ChangeLocationSwitchBoard(desiredPageType)
        }

        this.AllAgents.HelperAgent.PromisesBasic.TabChainSetHrefWaitForComplete(absUrl, this.TabMan().CurrentTabData)
          .then(() => {

            console.log('todo');
            // put back?
            //this.MsgMan().WaitForListeningTab(this.TabMan().CurrentTabData)

          })
          .then(() => callBackOnSuccessfulHrefChange);
      }
    }
    this.AllAgents.Logger.FuncEnd(this.ChangeLocationSwitchBoard.name);
  }

  async SetScModeFromCeDt(newValue: IScMode, currentPageType: scWindowType) {
    return new Promise(async (resolve, reject) => {
      this.AllAgents.Logger.FuncStart(this.SetScModeFromCeDt.name, newValue.AsString);
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
          //let editUrl = 'http://' + this.TabMan().CurrentTabData.UrlParts.Hostname
          //  + '/?sc_itemid=' + contState.ActiveCe.ActiveNode.NodeId.AsBracedGuid + '&sc_mode=preview&sc_lang=en&sc_site=website';

          let newUrlParts = this.AllAgents.HelperAgent.UrlHelp.CloneUrlParts(this.TabMan().CurrentTabData.UrlParts);
          newUrlParts = this.AllAgents.HelperAgent.UrlHelp.BuildEditPrevNormUrl(newValue, contState, this.TabMan().CurrentTabData.UrlParts);
          let editUrl = this.AllAgents.HelperAgent.UrlHelp.BuildFullUrlFromParts(newUrlParts)

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
      this.AllAgents.Logger.FuncEnd(this.SetScModeFromCeDt.name, newValue.AsString);
      if (result.WasSuccessful()) {
        resolve();
      } else {
        reject(result.RejectReasons);
      }
    });
  }

  SetScMode(newValue: IScMode) {
    return new Promise(async (resolve, reject) => {
      this.AllAgents.Logger.FuncStart(this.SetScMode.name, newValue.AsString);

      let result: PromiseResult = new PromiseResult(this.SetScMode.name, this.AllAgents.Logger);

      var currentPageType: scWindowType = this.TabMan().CurrentTabData.UrlParts.ScWindowType;

      if (currentPageType === scWindowType.ContentEditor
        ||
        currentPageType === scWindowType.Desktop
      ) {
        await this.SetScModeFromCeDt(newValue, currentPageType)
          .then(() => result.MarkSuccessful())
          .catch((ex) => result.MarkFailed(ex));
      }
      else if (currentPageType === scWindowType.Edit
        || currentPageType === scWindowType.Normal
        || currentPageType === scWindowType.Preview) {
        this.TabMan().CurrentTabData.UrlParts = this.AllAgents.HelperAgent.UrlHelp.SetScModeFromEditPrevNorm(newValue, this.TabMan().CurrentTabData.UrlParts);

        let newHref: AbsoluteUrl = this.AllAgents.HelperAgent.UrlHelp.BuildFullUrlFromParts(this.TabMan().CurrentTabData.UrlParts);
        await this.AllAgents.HelperAgent.PromisesBasic.TabChainSetHrefWaitForComplete(newHref, this.TabMan().CurrentTabData)
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