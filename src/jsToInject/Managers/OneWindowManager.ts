import { Hub } from '../Managers/Hub';
import { ManagerBase } from '../_first/_ManagerBase';
import { PromiseChainQuickPublish } from '../Promises/PromiseChainQuickPublish';
import { IDataOneWindowStorage } from '../Interfaces/IDataOneWindowStorage';
import { IDataOneStorageCE } from '../Interfaces/IDataOneStorageCE';
import { IDataBrowserWindow } from '../Interfaces/IDataBrowserWindow';
import { scWindowType } from '../Enums/scWindowType';
import { IDataOneDoc } from '../Interfaces/IDataOneDoc';
import { IDataOneIframe } from '../Interfaces/IDataOneIframe';


export class OneWindowManager extends ManagerBase {
  __activeWindowSnapShot: IDataOneWindowStorage;

  constructor(xyyz: Hub) {
    super(xyyz);
    xyyz.debug.FuncStart(OneWindowManager.name);

    xyyz.debug.FuncEnd(OneWindowManager.name);
  }

  SaveWindowState(targetWindow: IDataBrowserWindow) {
    this.debug().FuncStart(this.SaveWindowState.name);

    var currentPageType = this.PageDataMan().GetCurrentPageType();
    this.Xyyz.OneWindowMan.CreateNewWindowSnapShot(currentPageType);

    if (currentPageType === scWindowType.ContentEditor) {
      this.debug().Log('is Content Editor');

      var id = this.Xyyz.GuidMan.EmptyGuid();
      //var docElem = targetWindow.DataDocSelf;

      this.Xyyz.OneCEMan.SaveStateOneContentEditor(id, targetWindow.DataDocSelf);
    }
    else if (currentPageType === scWindowType.Desktop) {
      this.debug().Log('is Desktop');
      this.Xyyz.OneDesktopMan.SaveStateOneDesktop(targetWindow);
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
      var publishChain: PromiseChainQuickPublish = new PromiseChainQuickPublish(this.Xyyz);
      await publishChain.PublishCE(docToPublish);
    }

    this.debug().FuncEnd(this.PublishActiveCE.name);
  }

  async RestoreWindowStateToTarget(targetWindow: IDataBrowserWindow, dataToRestore: IDataOneWindowStorage) {
    this.debug().FuncStart(this.RestoreWindowStateToTarget.name);

    if (dataToRestore) {
      if (dataToRestore.WindowType === scWindowType.ContentEditor) {
        await this.Xyyz.OneCEMan.RestoreCEStateAsync(dataToRestore.AllCEAr[0], targetWindow.DataDocSelf);
      }
      else if (dataToRestore.WindowType === scWindowType.Desktop) {
        await this.Xyyz.OneDesktopMan.RestoreDesktopStateAsync(targetWindow, dataToRestore);
      }
      else {
        this.debug().Error(this.RestoreWindowStateToTarget.name, 'No match found for snap shot');
      }
      this.debug().FuncEnd(this.RestoreWindowStateToTarget.name);
    }
  }

  PutCEDataToCurrentSnapShot(oneCeData: IDataOneStorageCE) {
    this.debug().FuncStart(this.PutCEDataToCurrentSnapShot.name);
    this.debug().Log('PutCEDataToCurrentSnapShot');

    var matchingCeData = this.FindMatchingCeData(oneCeData);

    if (matchingCeData) {
      matchingCeData = oneCeData;
    } else {
      this.__activeWindowSnapShot.AllCEAr.push(oneCeData);
    }

    //this.__activeWindowTreeSnapShot.ShowDebugDataOneWindow();

    this.UpdateStorage();

    this.AtticMan().DrawDebugDataPretty(this.__activeWindowSnapShot);

    this.debug().FuncEnd(this.PutCEDataToCurrentSnapShot.name);
  }

  ShowDebugDataOneWindow() {
    this.debug().FuncStart('ShowDebugDataOneWindow');
    var toReturn: string[] = [];

    toReturn.push(this.__activeWindowSnapShot.TimeStamp.toJSON());
    for (var jdx = 0; jdx < this.__activeWindowSnapShot.AllCEAr.length; jdx++) {
      var oneCE = this.__activeWindowSnapShot.AllCEAr[jdx];
      toReturn = toReturn.concat(this.Xyyz.OneCEMan.GetDebugDataOneCE(oneCE));
    }

    for (var kdx = 0; kdx < toReturn.length; kdx++) {
      this.debug().Log(toReturn[kdx]);
    }

    this.debug().FuncEnd('ShowDebugDataOneWindow');
    return toReturn;
  }

  UpdateStorage() {
    this.debug().FuncStart(this.UpdateStorage.name);
    this.AtticMan().WriteToStorage(this.__activeWindowSnapShot);

    this.UiMan().RefreshUi();
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
    this.CreateNewWindowSnapShot(currentPageType);
  }
  CreateNewWindowSnapShot(windowType: scWindowType) {
    this.debug().FuncStart('CreateNewWindowSnapShot');

    var dateToUse: Date = new Date();
    //var friendly: string = this.Xyyz.Utilities.MakeFriendlyDate(dateToUse);

    var newGuid = this.Xyyz.GuidMan.NewGuid();

    this.__activeWindowSnapShot = {
      TimeStamp: dateToUse,
      WindowType: windowType,
      WindowFriendly: windowType[windowType],
      //TimeStampFriendly: friendly,
      AllCEAr: [],
      Id: newGuid,
      IsFavorite: false,
      NickName: '',
      RawData: null
    }

    this.debug().FuncEnd('CreateNewWindowSnapShot');
  }
}