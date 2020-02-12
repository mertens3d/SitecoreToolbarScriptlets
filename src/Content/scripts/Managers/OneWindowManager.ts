import { ContentHub } from './ContentHub';
import { ContentManagerBase } from '../_first/_ContentManagerBase';
import { PromiseChainQuickPublish } from '../Promises/PromiseChainQuickPublish';
import { IDataOneStorageCE } from '../../../Shared/scripts/Interfaces/IDataOneStorageCE';
import { IDataOneIframe } from '../../../Shared/scripts/Interfaces/IDataOneIframe';
import { IDataBrowserTab } from '../../../Shared/scripts/Interfaces/IDataBrowserWindow';
import { scWindowType } from '../../../Shared/scripts/Enums/scWindowType';
import { IDataOneWindowStorage } from '../../../Shared/scripts/Interfaces/IDataOneWindowStorage';
import { IDataOneDoc } from '../../../Shared/scripts/Interfaces/IDataOneDoc';
import { IDataPayloadSnapShot } from '../../../Shared/scripts/Classes/IDataPayloadSnapShot';
import { SnapShotFlavor } from '../../../Shared/scripts/Enums/SnapShotFlavor';

export class OneWindowManager extends ContentManagerBase {
  __activeWindowSnapShot: IDataOneWindowStorage;

  constructor(hub: ContentHub) {
    super(hub);
    hub.debug.FuncStart(OneWindowManager.name);

    hub.debug.FuncEnd(OneWindowManager.name);
  }

  SaveWindowState(targetDoc: IDataOneDoc, snapShotSettings: IDataPayloadSnapShot) {
    this.debug().FuncStart(this.SaveWindowState.name);

    var currentPageType = snapShotSettings.CurrentPageType;
    this.OneWinMan().CreateNewWindowSnapShot(currentPageType, snapShotSettings.Flavor);

    if (currentPageType === scWindowType.ContentEditor) {
      this.debug().Log('is Content Editor');

      var id = this.ContentHub.Helpers.GuidHelp.EmptyGuid();

      this.ContentHub.OneCEMan.SaveStateOneContentEditor(id, targetDoc, snapShotSettings);
    }
    else if (currentPageType === scWindowType.Desktop) {
      this.debug().Log('is Desktop');
      this.ContentHub.OneDesktopMan.SaveStateOneDesktop(targetDoc, snapShotSettings);
    } else {
      this.debug().Error(this.SaveWindowState.name, 'Invalid page location ' + currentPageType);
    }

    //this.PopulateStateSel();

    this.debug().FuncEnd(this.SaveWindowState.name);;
  }

  //WaitForPageLoad(desiredPageType: WindowType, targetWindow: IDataBrowserWindow, iteration: number, successCallBack: Function) {
  //  this.debug().FuncStart(this.WaitForPageLoad.name, 'Iteration: ' + iteration + ' | Desired type: ' + WindowType[desiredPageType]);

  //  var targetPageType: WindowType = this.PageMan().GetPageTypeOfTargetWindow(targetWindow.Window);

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

  private __getTopLevelIframe(targetDoc: IDataOneDoc) {
    var toReturn: IDataOneIframe = null;
    var allIframe = this.DesktopMan().GetAllLiveIframeData(targetDoc);
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

  async PublishActiveCE(targetDoc: IDataOneDoc) {
    this.debug().FuncStart(this.PublishActiveCE.name);

    var currentWindowType = this.ScUiMan().GetCurrentPageType();

    var docToPublish: IDataOneDoc = null;

    if (currentWindowType == scWindowType.Desktop) {
      var topIframe: IDataOneIframe = this.__getTopLevelIframe(targetDoc);
      if (topIframe) {
        docToPublish = topIframe.ContentDoc
      }
    } else {
      docToPublish = this.ScUiMan().TopLevelDoc().DataDocSelf;
    }

    this.debug().Log('docToPublish', this.debug().IsNullOrUndefined(docToPublish));

    if (docToPublish) {
      var publishChain: PromiseChainQuickPublish = new PromiseChainQuickPublish(this.ContentHub);
      await publishChain.PublishCE(docToPublish);
    }

    this.debug().FuncEnd(this.PublishActiveCE.name);
  }

  async RestoreWindowStateToTarget(targetDoc: IDataOneDoc, dataToRestore: IDataOneWindowStorage) {
    this.debug().FuncStart(this.RestoreWindowStateToTarget.name);

    if (dataToRestore) {
      if (dataToRestore.WindowType === scWindowType.ContentEditor) {
        await this.ContentHub.OneCEMan.RestoreCEStateAsync(dataToRestore.AllCEAr[0], targetDoc);
      }
      else if (dataToRestore.WindowType === scWindowType.Desktop) {
        await this.ContentHub.OneDesktopMan.RestoreDesktopStateAsync(targetDoc, dataToRestore);
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
    //todo put back ? var currentPageType = this.PageMan().GetCurrentPageType();
    //todo put back ?  this.CreateNewWindowSnapShot(currentPageType, SnapShotFlavor.Unknown);
  }
  CreateNewWindowSnapShot(windowType: scWindowType, flavor: SnapShotFlavor) {
    this.debug().FuncStart(this.CreateNewWindowSnapShot.name);

    var dateToUse: Date = new Date();
    //var friendly: string = this.Xyyz.Utilities.MakeFriendlyDate(dateToUse);

    var newGuid = this.ContentHub.Helpers.GuidHelp. NewGuid();

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