import { IDataBrowserWindow } from '../../../Shared/scripts/Interfaces/IDataBrowserWindow';
import { IDataOneDoc } from '../../../Shared/scripts/Interfaces/IDataOneDoc';
import { IDataOneTreeNode } from '../../../Shared/scripts/Interfaces/IDataOneTreeNode';
import { IGuid } from '../../../Shared/scripts/Interfaces/IGuid';
import { IsScMode } from '../../../Shared/scripts/Interfaces/IscMode';
import { scWindowType } from '../../../Shared/scripts/Enums/scWindowType';
import { PopUpManagerBase } from './PopUpManagerBase';
import { IterationHelper } from '../../../Shared/scripts/Classes/IterationHelper';
import { PopUpHub } from './PopUpHub';


export class LocationManager extends PopUpManagerBase {
  constructor(hub: PopUpHub) {
    super(hub);
    hub.debug.FuncStart(LocationManager.name);
    hub.debug.FuncEnd(LocationManager.name);
  }

  ChangeLocationSwitchBoard(desiredPageType: scWindowType, targetWindow: IDataBrowserWindow) {
    this.debug().FuncStart(this.ChangeLocationSwitchBoard.name, 'desired = ' + scWindowType[desiredPageType] );


    var iteration: IterationHelper = new IterationHelper(this.Helpers(), this.ChangeLocationSwitchBoard.name);

    if (iteration.DecrementAndKeepGoing()) {

      var currentState = this.PageMan().GetCurrentPageType();

      if (currentState === scWindowType.LoginPage) {
        var self = this;
        var callbackOnComplete: Function = () => {
          this.debug().Log('callback triggered');
          self.ChangeLocationSwitchBoard(desiredPageType, targetWindow);
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
          self.debug().Log('Callback triggered');
          targetWindow = self.PageMan().SetWindowDataToCurrent(targetWindow.Window, targetWindow.DataDocSelf.Nickname);

          self.ChangeLocationSwitchBoard(desiredPageType, targetWindow)
        }

        if (desiredPageType === scWindowType.Desktop && currentState !== scWindowType.Desktop) {
          this.Helpers().PromiseHelp.SetHrefAndWaitForReadyStateComplete(this.Const().UrlSuffix.Desktop, targetWindow, desiredPageType)
            //.then(() => this.MsgMan().wa)
            .then(() => callBackOnSuccessfulHrefChange);
        }

        else if (desiredPageType === scWindowType.ContentEditor && currentState !== scWindowType.ContentEditor) {
          this.Helpers().PromiseHelp.SetHrefAndWaitForReadyStateComplete(this.Const().UrlSuffix.CE, targetWindow, desiredPageType)
            .then(() => callbackOnComplete);
        }

        else if (currentState === scWindowType.Desktop && desiredPageType === scWindowType.Desktop) {
          this.debug().Log('On Desktop');

          //todo this.DesktopMan().TriggerRedButton(targetWindow.DataDocSelf);
        }
      }
    }
    this.debug().FuncEnd(this.ChangeLocationSwitchBoard.name);
  }

  SetScMode(newValue: IsScMode, useOrigWindow: boolean) {
    return new Promise(async () => {
      this.debug().FuncStart(this.SetScMode.name, newValue.AsString);

      var itemGuid: IGuid;
      var targetWindow: IDataBrowserWindow;

      var currentPageType = this.PageMan().GetCurrentPageType();

      if (currentPageType === scWindowType.ContentEditor
        ||
        currentPageType === scWindowType.Desktop
      ) {
        var dataOneDoc: IDataOneDoc = null;

        if (currentPageType == scWindowType.Desktop) {
          //todo - put back?
          //var currentIframe = this.DesktopMan().GetActiveDesktopIframeData();
          //if (currentIframe) {
          //  dataOneDoc = currentIframe.ContentDoc;
          //}
        }
        else {
          dataOneDoc = this.PageMan().TopLevelWindow().DataDocSelf;
        }

        if (dataOneDoc) {

          //todo - put back?
          //var AllTreeNodeAr: IDataOneTreeNode[] = this.PopHub.OneTreeMan.GetOneLiveTreeData(dataOneDoc);

          //for (var idx = 0; idx < AllTreeNodeAr.length; idx++) {
          //  var candidate: IDataOneTreeNode = AllTreeNodeAr[idx];
          //  if (candidate.IsActive) {
          //    itemGuid = candidate.NodeId;
          //    break;
          //  }
          //}
          await alert(itemGuid.AsString);
          // we should use the sitecore buttons

          if (itemGuid) {
            targetWindow = await this.PageMan().GetTargetWindowAsync(useOrigWindow, scWindowType.Edit);
          }
        }
      } else if (currentPageType == scWindowType.Edit
        || currentPageType == scWindowType.Normal
        || currentPageType == scWindowType.Preview) {
        if (targetWindow) {
          window.opener.location.href = window.opener.location.href.replace('=normal', newValue.AsString).replace('=preview', newValue.AsString).replace('=edit', newValue.AsString);
        }
      }
      this.debug().FuncEnd(this.SetScMode.name);
    });
  }

  GetCurrentUrl(targ) {
  }



  
}