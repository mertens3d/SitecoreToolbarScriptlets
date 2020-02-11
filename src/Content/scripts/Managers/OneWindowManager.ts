import { ContentHub } from './ContentHub';
import { ContentManagerBase } from '../_first/_ContentManagerBase';
import { PromiseChainQuickPublish } from '../Promises/PromiseChainQuickPublish';
import { IDataOneStorageCE } from '../../../Shared/scripts/Interfaces/IDataOneStorageCE';
import { IDataOneIframe } from '../../../Shared/scripts/Interfaces/IDataOneIframe';
import { IDataBrowserWindow } from '../../../Shared/scripts/Interfaces/IDataBrowserWindow';
import { scWindowType } from '../../../Shared/scripts/Enums/scWindowType';
import { IDataOneWindowStorage } from '../../../Shared/scripts/Interfaces/IDataOneWindowStorage';
import { IDataOneDoc } from '../../../Shared/scripts/Interfaces/IDataOneDoc';
import { IDataPayloadSnapShot } from '../../../Shared/scripts/Classes/IDataPayloadSnapShot';
import { SnapShotFlavor } from '../../../Shared/scripts/Enums/SnapShotFlavor';

export class OneWindowManager extends ContentManagerBase {
  __activeWindowSnapShot: IDataOneWindowStorage;

  constructor(xyyz: ContentHub) {
    super(xyyz);
    xyyz.debug.FuncStart(OneWindowManager.name);

    xyyz.debug.FuncEnd(OneWindowManager.name);
  }

  SaveWindowState(targetWindow: IDataBrowserWindow, snapShotSettings: IDataPayloadSnapShot) {
    this.debug().FuncStart(this.SaveWindowState.name);

    var currentPageType = this.PageDataMan().GetCurrentPageType();
    this.OneWinMan().CreateNewWindowSnapShot(currentPageType, snapShotSettings.Flavor);

    if (currentPageType === scWindowType.ContentEditor) {
      this.debug().Log('is Content Editor');

      var id = this.ContentHub.GuidMan.EmptyGuid();

      this.ContentHub.OneCEMan.SaveStateOneContentEditor(id, targetWindow.DataDocSelf, snapShotSettings);
    }
    else if (currentPageType === scWindowType.Desktop) {
      this.debug().Log('is Desktop');
      this.ContentHub.OneDesktopMan.SaveStateOneDesktop(targetWindow, snapShotSettings);
    } else {
      this.debug().Error(this.SaveWindowState.name, 'Invalid page location ' + currentPageType);
    }

    //this.PopulateStateSel();

    this.debug().FuncEnd(this.SaveWindowState.name);;
  }

  //WaitForPageLoad(desiredPageType: WindowType, targetWindow: IDataBrowserWindow, iteration: number, successCallBack: Function) {
  //  this.debug().FuncStart(this.WaitForPageLoad.name, 'Iteration: ' + iteration + ' | Desired type: ' + WindowType[desiredPageType]);

  //  var targetPageType: WindowType = this.PageDataMan().GetPageTypeOfTargetWindow(targetWindow.Window);

  //  if (targetPageType !== desiredPageType) {
  //    var self = this;
  //    if (iteration > 0) {
  //      iteration = iteration - 1;
  //      setTimeout(function () {
  //        self.WaitForPageLoad(desiredPageType, targetWindow, iteration, successCallBack);
  //      }, self.Const().Timeouts.WaitFogPageLoad);
  //    }
  //  } else {
  //    this.debug().Log('success, triggering callback: ' + successCallBack.name);
  //    successCallBack();
  //  }
  //  this.debug().FuncEnd(this.WaitForPageLoad.name);
  //}

  private __getTopLevelIframe(targetWindow: IDataBrowserWindow) {
    var toReturn: IDataOneIframe = null;
    var allIframe = this.DesktopMan().GetAllLiveIframeData(targetWindow);
    var maxZVal = -1;
    if (allIframe && allIframe.length > 0) {
      for (var idx = 0; idx < allIframe.length; idx++) {
        var candidateIframe = allIframe[idx];
        if (candidateIframe && candidateIframe.Zindex > maxZVal) {
          toReturn = candidateIframe;
          maxZVal = candidateIframe.Zindex
        }
      }
    }
    return toReturn;
  }

  async PublishActiveCE(targetWindow: IDataBrowserWindow) {
    this.debug().FuncStart(this.PublishActiveCE.name);

    var currentWindowType = this.PageDataMan().GetCurrentPageType();

    var docToPublish: IDataOneDoc = null;

    if (currentWindowType == scWindowType.Desktop) {
      var topIframe: IDataOneIframe = this.__getTopLevelIframe(targetWindow);
      if (topIframe) {
        docToPublish = topIframe.ContentDoc
      }
    } else {
      docToPublish = this.PageDataMan().TopLevelWindow().DataDocSelf;
    }

    this.debug().Log('docToPublish', this.debug().IsNullOrUndefined(docToPublish));

    if (docToPublish) {
      var publishChain: PromiseChainQuickPublish = new PromiseChainQuickPublish(this.ContentHub);
      await publishChain.PublishCE(docToPublish);
    }

    this.debug().FuncEnd(this.PublishActiveCE.name);
  }

  async RestoreWindowStateToTarget(targetWindow: IDataBrowserWindow, dataToRestore: IDataOneWindowStorage) {
    this.debug().FuncStart(this.RestoreWindowStateToTarget.name);

    if (dataToRestore) {
      if (dataToRestore.WindowType === scWindowType.ContentEditor) {
        await this.ContentHub.OneCEMan.RestoreCEStateAsync(dataToRestore.AllCEAr[0], targetWindow.DataDocSelf);
      }
      else if (dataToRestore.WindowType === scWindowType.Desktop) {
        await this.ContentHub.OneDesktopMan.RestoreDesktopStateAsync(targetWindow, dataToRestore);
      }
      else {
        this.debug().Error(this.RestoreWindowStateToTarget.name, 'No match found for snap shot');
      }
      this.debug().FuncEnd(this.RestoreWindowStateToTarget.name);
    }
  }

  PutCEDataToCurrentSnapShot(oneCeData: IDataOneStorageCE, snapShotSettings: IDataPayloadSnapShot) {
    this.debug().FuncStart(this.PutCEDataToCurrentSnapShot.name);
    this.debug().Log('PutCEDataToCurrentSnapShot');

    var matchingCeData = this.FindMatchingCeData(oneCeData);

    if (matchingCeData) {
      matchingCeData = oneCeData;
    } else {
      this.__activeWindowSnapShot.AllCEAr.push(oneCeData);
    }

    if (snapShotSettings) {
      if (snapShotSettings.SnapShotNewNickname) {
        this.__activeWindowSnapShot.NickName = snapShotSettings.SnapShotNewNickname;
      }
      this.__activeWindowSnapShot.Flavor = snapShotSettings.Flavor;
    }

    //this.__activeWindowTreeSnapShot.ShowDebugDataOneWindow();

    this.UpdateStorage();

    //this.AtticMan().DrawDebugDataPretty(this.__activeWindowSnapShot);

    this.debug().FuncEnd(this.PutCEDataToCurrentSnapShot.name);
  }

  UpdateStorage() {
    this.debug().FuncStart(this.UpdateStorage.name);
    this.AtticMan().WriteToStorage(this.__activeWindowSnapShot);
    this.debug().FuncEnd(this.UpdateStorage.name);
  }

  FindMatchingCeData(oneCeData: IDataOneStorageCE): IDataOneStorageCE {
    var toReturn: IDataOneStorageCE = null;

    for (var idx = 0; idx < this.__activeWindowSnapShot.AllCEAr.length; idx++) {
      var candidate: IDataOneStorageCE = this.__activeWindowSnapShot.AllCEAr[idx];
      if (candidate.Id === oneCeData.Id) {
        toReturn = candidate;
        break;
      }
    }

    this.debug().Log('match found :' + (toReturn !== null));
    return toReturn;
  }

  Init() {
    var currentPageType = this.PageDataMan().GetCurrentPageType();
    this.CreateNewWindowSnapShot(currentPageType, SnapShotFlavor.Unknown);
  }
  CreateNewWindowSnapShot(windowType: scWindowType, flavor: SnapShotFlavor) {
    this.debug().FuncStart(this.CreateNewWindowSnapShot.name);

    var dateToUse: Date = new Date();
    //var friendly: string = this.Xyyz.Utilities.MakeFriendlyDate(dateToUse);

    var newGuid = this.ContentHub.GuidMan.NewGuid();

    this.__activeWindowSnapShot = {
      TimeStamp: dateToUse,
      WindowType: windowType,
      WindowFriendly: windowType[windowType],
      //TimeStampFriendly: friendly,
      AllCEAr: [],
      Id: newGuid,
      NickName: '',
      RawData: null,
      Flavor: flavor,
    }

    this.debug().FuncEnd(this.CreateNewWindowSnapShot.name);
  }
}