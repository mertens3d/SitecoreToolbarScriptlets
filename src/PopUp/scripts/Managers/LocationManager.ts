import { IDataBrowserTab } from '../../../Shared/scripts/Interfaces/IDataBrowserWindow';
import { IDataOneDoc } from '../../../Shared/scripts/Interfaces/IDataOneDoc';
import { IDataOneTreeNode } from '../../../Shared/scripts/Interfaces/IDataOneTreeNode';
import { IGuid } from '../../../Shared/scripts/Interfaces/IGuid';
import { IScMode } from '../../../Shared/scripts/Interfaces/IscMode';
import { scWindowType } from '../../../Shared/scripts/Enums/scWindowType';
import { PopUpManagerBase } from './PopUpManagerBase';
import { IterationHelper } from '../../../Shared/scripts/Classes/IterationHelper';
import { PopUpHub } from './PopUpHub';
import { SharedConst } from '../../../Shared/scripts/SharedConst';
import { ICurrStateContent } from '../../../Shared/scripts/Interfaces/ICurrState';
import { StaticHelpers } from '../../../Shared/scripts/Classes/StaticHelpers';
import { UrlParts } from '../../../Shared/scripts/Interfaces/UrlParts';
import { AbsoluteUrl } from '../../../Shared/scripts/Interfaces/AbsoluteUrl';
import { PromiseResult } from "../../../Shared/scripts/Classes/PromiseResult";

export class LocationManager extends PopUpManagerBase {
  constructor(hub: PopUpHub) {
    super(hub);
    hub.Log.FuncStart(LocationManager.name);
    hub.Log.FuncEnd(LocationManager.name);
  }

  ChangeLocationSwitchBoard(desiredPageType: scWindowType) {
    this.Log().FuncStart(this.ChangeLocationSwitchBoard.name, 'desired = ' + scWindowType[desiredPageType]);

    var iteration: IterationHelper = new IterationHelper(this.Helpers(), this.ChangeLocationSwitchBoard.name);

    if (iteration.DecrementAndKeepGoing()) {
      var currentScWindowType: scWindowType = this.TabMan().CurrentTabData.UrlParts.ScWindowType;

      if (this.TabMan().CurrentTabData.UrlParts.ScWindowType === scWindowType.LoginPage) {
        var self = this;
        var callbackOnComplete: Function = () => {
          this.Log().Log('callback triggered');
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
        this.TabMan().CurrentTabData.UrlParts = this.Helpers().UrlHelp.SetFilePathFromWindowType(this.TabMan().CurrentTabData.UrlParts, desiredPageType);
        var absUrl: AbsoluteUrl = this.Helpers().UrlHelp.BuildFullUrlFromParts(this.TabMan().CurrentTabData.UrlParts);

        var callBackOnSuccessfulHrefChange: Function = function () {
          self.Log().Log('Callback triggered');
          self.ChangeLocationSwitchBoard(desiredPageType)
        }

        this.Helpers().PromiseHelp.TabChainSetHrefWaitForComplete(absUrl, this.TabMan().CurrentTabData)
          .then(() => this.MsgMan().WaitForListeningTab(this.TabMan().CurrentTabData))
          .then(() => callBackOnSuccessfulHrefChange);
      }
    }
    this.Log().FuncEnd(this.ChangeLocationSwitchBoard.name);
  }

  async SetScModeFromCeDt(newValue: IScMode, currentPageType: scWindowType) {
    return new Promise(async (resolve, reject) => {
      this.Log().FuncStart(this.SetScModeFromCeDt.name, newValue.AsString);
      this.Log().LogVal('WindowType', StaticHelpers.WindowTypeAsString(currentPageType));

      let result: PromiseResult = new PromiseResult(this.SetScModeFromCeDt.name, this.Log());

      this.Log().MarkerA();

      if (currentPageType === scWindowType.Desktop) {
        this.Log().MarkerB();
        let contState: ICurrStateContent = this.UiMan().CurrContentState;
        this.Log().MarkerC();
        if (contState && contState.ActiveCe && contState.ActiveCe.ActiveNode) {
          this.Log().MarkerD();
          let currentNodeId: IDataOneTreeNode = contState.ActiveCe.ActiveNode;
          //http://perficient9sc.dev.local/?sc_itemid=%7B9E8CD546-2354-4921-B38C-4A0C864F236B%7D&sc_mode=preview&sc_lang=en&sc_site=website
          //let editUrl = 'http://' + this.TabMan().CurrentTabData.UrlParts.Hostname
          //  + '/?sc_itemid=' + contState.ActiveCe.ActiveNode.NodeId.AsBracedGuid + '&sc_mode=preview&sc_lang=en&sc_site=website';

          let newUrlParts = this.Helpers().UrlHelp.CloneUrlParts(this.TabMan().CurrentTabData.UrlParts);
          newUrlParts = this.Helpers().UrlHelp.BuildEditPrevNormUrl(newValue, contState, this.TabMan().CurrentTabData.UrlParts);
          let editUrl = this.Helpers().UrlHelp.BuildFullUrlFromParts(newUrlParts)

          await this.BrowserMan().CreateNewTab(editUrl)
            .then(() => result.MarkSuccessful())
            .catch((ex) => result.MarkFailed(ex));
        } else {
          this.Log().Log('unknown case');
          this.Log().LogAsJsonPretty('contState', contState);
        }
      } else {

        this.Log().Log('need to handle ce case');

      }
      this.Log().FuncEnd(this.SetScModeFromCeDt.name, newValue.AsString);
      if (result.WasSuccessful()) {
        resolve();
      } else {
        reject(result.RejectReasons);
      }
    });
  }

  SetScMode(newValue: IScMode) {
    return new Promise(async (resolve, reject) => {
      this.Log().FuncStart(this.SetScMode.name, newValue.AsString);

      let result: PromiseResult = new PromiseResult(this.SetScMode.name, this.Log());

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
        this.TabMan().CurrentTabData.UrlParts = this.Helpers().UrlHelp.SetScModeFromEditPrevNorm(newValue, this.TabMan().CurrentTabData.UrlParts);

        let newHref: AbsoluteUrl = this.Helpers().UrlHelp.BuildFullUrlFromParts(this.TabMan().CurrentTabData.UrlParts);
        await this.Helpers().PromiseHelp.TabChainSetHrefWaitForComplete(newHref, this.TabMan().CurrentTabData)
          .then(() => result.MarkSuccessful())
          .catch((ex) => result.MarkFailed(ex));
      }

      this.Log().FuncEnd(this.SetScMode.name);

      if (result.MarkSuccessful) {
        resolve();
      } else {
        reject(result.RejectReasons);
      }
    });
  }
}