import { ContentHub } from './ContentHub';
import { ContentManagerBase } from '../_first/_ContentManagerBase';
import { PromiseChainQuickPublish } from '../Promises/PromiseChainQuickPublish';
import { IDataOneStorageCE } from '../../../Shared/scripts/Interfaces/IDataOneStorageCE';
import { IDataOneIframe } from '../../../Shared/scripts/Interfaces/IDataOneIframe';
import { scWindowType } from '../../../Shared/scripts/Enums/scWindowType';
import { IDataOneWindowStorage } from '../../../Shared/scripts/Interfaces/IDataOneWindowStorage';
import { IDataOneDoc } from '../../../Shared/scripts/Interfaces/IDataOneDoc';
import { IDataPayloadSnapShot } from '../../../Shared/scripts/Classes/IDataPayloadSnapShot';
import { SnapShotFlavor } from '../../../Shared/scripts/Enums/SnapShotFlavor';
import { OneDesktopManager } from './OneDesktopManager';
import { OneCEManager } from './OneCEManager';

export class OneScWindowManager extends ContentManagerBase {
  OneDesktopMan: OneDesktopManager = null;
  OneCEMan: OneCEManager = null;

  constructor(hub: ContentHub) {
    super(hub);
    hub.Logger.FuncStart(OneScWindowManager.name);

    

    hub.Logger.FuncEnd(OneScWindowManager.name);
  }

  Init() {
    //Init() {
    //  //todo put back ? var currentPageType = this.PageMan().GetCurrentPageType();
    //  //todo put back ?  this.CreateNewWindowSnapShot(currentPageType, SnapShotFlavor.Unknown);
    //}
    let currPageType = this.ScUiMan().GetCurrentPageType();
    if (currPageType === scWindowType.Desktop) {
      this.OneDesktopMan = new OneDesktopManager(this.ContentHub, this.ScUiMan().TopLevelDoc());
    } else if (currPageType === scWindowType.ContentEditor) {
      this.OneCEMan = new OneCEManager(this.ContentHub, this.ScUiMan().TopLevelDoc());
    }
  }


  SaveWindowState(snapShotSettings: IDataPayloadSnapShot) {
    this.Log().FuncStart(this.SaveWindowState.name);
    var currentPageType = snapShotSettings.CurrentPageType;

    this.Helpers().FactoryHelp.CreateShellIDataOneWindowStorage(currentPageType, snapShotSettings.Flavor);

    var snapShot: IDataOneWindowStorage = this.Helpers().FactoryHelp.CreateShellIDataOneWindowStorage(snapShotSettings.CurrentPageType, snapShotSettings.Flavor);

    if (snapShotSettings) {
      if (snapShotSettings.SnapShotNewNickname) {
        snapShot.NickName = snapShotSettings.SnapShotNewNickname;
      }
      snapShot.Flavor = snapShotSettings.Flavor;
    }


    if (currentPageType === scWindowType.ContentEditor) {
      this.Log().MarkerA();
      var id = this.ContentHub.Helpers.GuidHelp.EmptyGuid();
      snapShot.AllCEAr.push( this.OneCEMan.GetStateCe(id));
    }
    else if (currentPageType === scWindowType.Desktop) {
      this.Log().MarkerB();
     snapShot.AllCEAr = this.OneDesktopMan.GetStateDesktop().AllCeData;
    }
    else {
      this.Log().Error(this.SaveWindowState.name, 'Invalid page location ' + currentPageType);
    }
    //this.PopulateStateSel();
    this.Log().FuncEnd(this.SaveWindowState.name);
    ;
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
    var allIframe = this.OneDesktopMan.GetAllLiveIframeData();
    var maxZVal = -1;
    if (allIframe && allIframe.length > 0) {
      for (var idx = 0; idx < allIframe.length; idx++) {
        var candidateIframe = allIframe[idx];
        if (candidateIframe && candidateIframe.Zindex > maxZVal) {
          toReturn = candidateIframe;
          maxZVal = candidateIframe.Zindex;
        }
      }
    }
    return toReturn;
  }
  async PublishActiveCE(targetDoc: IDataOneDoc) {
    this.Log().FuncStart(this.PublishActiveCE.name);
    var currentWindowType = this.ScUiMan().GetCurrentPageType();
    var docToPublish: IDataOneDoc = null;
    if (currentWindowType == scWindowType.Desktop) {
      var topIframe: IDataOneIframe = this.__getTopLevelIframe(targetDoc);
      if (topIframe) {
        docToPublish = topIframe.ContentDoc;
      }
    }
    else {
      docToPublish = this.ScUiMan().TopLevelDoc();
    }
    this.Log().Log('docToPublish', this.Log().IsNullOrUndefined(docToPublish));
    if (docToPublish) {
      var publishChain: PromiseChainQuickPublish = new PromiseChainQuickPublish(this.ContentHub);
      await publishChain.PublishCE(docToPublish);
    }
    this.Log().FuncEnd(this.PublishActiveCE.name);
  }
  async RestoreWindowStateToTarget(targetDoc: IDataOneDoc, dataToRestore: IDataOneWindowStorage) {
    this.Log().FuncStart(this.RestoreWindowStateToTarget.name);
    if (dataToRestore) {
      if (dataToRestore.WindowType === scWindowType.ContentEditor) {
        await this.OneCEMan.RestoreCEStateAsync(dataToRestore.AllCEAr[0], targetDoc);
      }
      else if (dataToRestore.WindowType === scWindowType.Desktop) {
        await this.OneDesktopMan.RestoreDesktopState(targetDoc, dataToRestore);
      }
      else {
        this.Log().Error(this.RestoreWindowStateToTarget.name, 'No match found for snap shot');
      }
      this.Log().FuncEnd(this.RestoreWindowStateToTarget.name);
    }
  }

  //UpdateStorage() {
  //  this.debug().FuncStart(this.UpdateStorage.name);
  //  this.AtticMan().WriteToStorage(this.__activeWindowSnapShot);
  //  this.debug().FuncEnd(this.UpdateStorage.name);
  //}

  //FindMatchingCeData(oneCeData: IDataOneStorageCE): IDataOneStorageCE {
  //  var toReturn: IDataOneStorageCE = null;
  //  for (var idx = 0; idx < this.__activeWindowSnapShot.AllCEAr.length; idx++) {
  //    var candidate: IDataOneStorageCE = this.__activeWindowSnapShot.AllCEAr[idx];
  //    if (candidate.Id === oneCeData.Id) {
  //      toReturn = candidate;
  //      break;
  //    }
  //  }
  //  this.debug().Log('match found :' + (toReturn !== null));
  //  return toReturn;
  //}

  
}