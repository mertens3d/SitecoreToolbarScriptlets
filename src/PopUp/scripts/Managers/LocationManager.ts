import { IDataBrowserTab } from '../../../Shared/scripts/Interfaces/IDataBrowserWindow';
import { IDataOneDoc } from '../../../Shared/scripts/Interfaces/IDataOneDoc';
import { IDataOneTreeNode } from '../../../Shared/scripts/Interfaces/IDataOneTreeNode';
import { IGuid } from '../../../Shared/scripts/Interfaces/IGuid';
import { IsScMode } from '../../../Shared/scripts/Interfaces/IscMode';
import { scWindowType } from '../../../Shared/scripts/Enums/scWindowType';
import { PopUpManagerBase } from './PopUpManagerBase';
import { IterationHelper } from '../../../Shared/scripts/Classes/IterationHelper';
import { PopUpHub } from './PopUpHub';
import { SharedConst } from '../../../Shared/scripts/SharedConst';
import { ICurrStateContent } from '../../../Shared/scripts/Interfaces/ICurrState';
import { StaticHelpers } from '../../../Shared/scripts/Classes/StaticHelpers';
import { UrlParts } from '../../../Shared/scripts/Interfaces/UrlParts';

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
      var currentState = this.TabMan().CurrentTabData.ScWindowType;

      if (this.TabMan().CurrentTabData.ScWindowType === scWindowType.LoginPage) {
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

      else if (currentState === scWindowType.Launchpad || currentState === scWindowType.ContentEditor || currentState === scWindowType.Desktop) {
        var self = this;
        var callBackOnSuccessfulHrefChange: Function = function () {
          self.Log().Log('Callback triggered');
          //targetWindow = self.TabMan().SetWindowDataToCurrent(targetWindow.Window, targetWindow.DataDocSelf.Nickname);

          self.ChangeLocationSwitchBoard(desiredPageType)
        }

        if (desiredPageType === scWindowType.Desktop && currentState !== scWindowType.Desktop) {
          this.Helpers().PromiseHelp.TabChainSetHrefWaitForComplete(SharedConst.SharedConst.UrlSuffix.CE, this.TabMan().CurrentTabData)
            //this.Helpers().PromiseHelp.SetHrefAndWaitForReadyStateComplete(this.Const().UrlSuffix.Desktop, targetWindow, desiredPageType)
            .then(() => this.MsgMan().WaitForListeningTab(this.TabMan().CurrentTabData))
            //.then(() => this.MsgMan().wa)
            .then(() => callBackOnSuccessfulHrefChange);
        }

        else if (desiredPageType === scWindowType.ContentEditor && currentState !== scWindowType.ContentEditor) {
          this.Helpers().PromiseHelp.TabChainSetHrefWaitForComplete(SharedConst.SharedConst.UrlSuffix.CE, this.TabMan().CurrentTabData)
            //this.Helpers().PromiseHelp.SetHrefAndWaitForReadyStateComplete(this.Const().UrlSuffix.CE, targetWindow, desiredPageType)
            .then(() => callbackOnComplete);
        }

        else if (currentState === scWindowType.Desktop && desiredPageType === scWindowType.Desktop) {
          this.Log().Log('On Desktop');

          //todo this.DesktopMan().TriggerRedButton(targetWindow.DataDocSelf);
        }
      }
    }
    this.Log().FuncEnd(this.ChangeLocationSwitchBoard.name);
  }

  async SetScModeFromEditPrevNorm(newValue: IsScMode, currentPageType: scWindowType) {
    var currentTabHref: string = this.TabMan().CurrentTabData.Tab.url;
    var newHref = currentTabHref.replace('=normal', newValue.AsString).replace('=preview', newValue.AsString).replace('=edit', newValue.AsString);
    await this.Helpers().PromiseHelp.TabChainSetHrefWaitForComplete(newHref, this.TabMan().CurrentTabData);
  }


  BuildEditPrevNormUrl(scMode: IsScMode) {
    let contState: ICurrStateContent = this.UiMan().CurrContentState;

    let toReturn:string = 'http://' + this.TabMan().CurrentTabData.UrlParts.Hostname
      + '/?sc_itemid=' + contState.ActiveCe.ActiveNode.NodeId.AsBracedGuid
      + '&sc_mode=' + scMode.AsString
      + '&sc_lang=en'
      + 'sc_site=website';

    return toReturn;
  }


  SetScModeFromCeDt(newValue: IsScMode, currentPageType: scWindowType) {
    this.Log().FuncStart(this.SetScModeFromCeDt.name, newValue.AsString);
    var dataOneDoc: IDataOneDoc = null;

    if (currentPageType == scWindowType.Desktop) {

      let contState: ICurrStateContent = this.UiMan().CurrContentState;
      if (contState && contState.ActiveCe && contState.ActiveCe.ActiveNode) {

        let currentNodeId: IDataOneTreeNode = contState.ActiveCe.ActiveNode;
        //http://perficient9sc.dev.local/?sc_itemid=%7B9E8CD546-2354-4921-B38C-4A0C864F236B%7D&sc_mode=preview&sc_lang=en&sc_site=website
        //let editUrl = 'http://' + this.TabMan().CurrentTabData.UrlParts.Hostname
        //  + '/?sc_itemid=' + contState.ActiveCe.ActiveNode.NodeId.AsBracedGuid + '&sc_mode=preview&sc_lang=en&sc_site=website';

        let editUrl = this.BuildEditPrevNormUrl(newValue);

        this.BrowserMan().CreateNewTab(editUrl);

      //await this.MsgMan().SendMessageToContentTab()

      //todo - put back?
      //var currentIframe = this.DesktopMan().GetActiveDesktopIframeData();
      //if (currentIframe) {
      //  dataOneDoc = currentIframe.ContentDoc;
      //}
      }
    }
    this.Log().FuncEnd(this.SetScModeFromCeDt.name, newValue.AsString);
  }

  SetScMode(newValue: IsScMode, useOrigWindow: boolean) {
    return new Promise(async () => {
      this.Log().FuncStart(this.SetScMode.name, newValue.AsString);

      var itemGuid: IGuid;
      var targetWindow: IDataBrowserTab;

      var currentPageType: scWindowType = this.TabMan().CurrentTabData.ScWindowType;

      if (currentPageType === scWindowType.ContentEditor
        ||
        currentPageType === scWindowType.Desktop
      ) {
        await this.SetScModeFromCeDt(newValue, currentPageType);
      }
      else if (currentPageType == scWindowType.Edit
        || currentPageType == scWindowType.Normal
        || currentPageType == scWindowType.Preview) {
        await this.SetScModeFromEditPrevNorm(newValue, currentPageType);
      }
      this.Log().FuncEnd(this.SetScMode.name);
    });
  }
}