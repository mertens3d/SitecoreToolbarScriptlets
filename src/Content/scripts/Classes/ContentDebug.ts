import { BaseDebug } from "../../../Shared/scripts/Classes/debug";
import { IDataOneIframe } from "../../../Shared/scripts/Interfaces/IDataOneIframe";
import { IDataBucketRestoreDesktop } from "../../../Shared/scripts/Interfaces/IDataBucketRestoreDesktop";
import { PageDataManager } from "../Managers/PageDataManager";
import { IDataBrowserWindow } from "../../../Shared/scripts/Interfaces/IDataBrowserWindow";
import { IDataOneDoc } from "../../../Shared/scripts/Interfaces/IDataOneDoc";
import { scWindowType } from "../../../Shared/scripts/Enums/scWindowType";
import { ICurrStateContent } from "../../../Shared/scripts/Interfaces/ICurrState";
import { MsgFromPopUp } from "../../../Shared/scripts/Classes/MsgPayloadRequestFromPopUp";
import { IDataContentPrefs } from "../../../Shared/scripts/Interfaces/IDataContentPrefs";
import { PayloadDataFromPopUp } from "../../../Shared/scripts/Classes/PayloadDataReqPopUp";
import { StaticHelpers } from "../../../Shared/scripts/Classes/StaticHelpers";

export class ContentDebug extends BaseDebug {
  DebugMsgFromPopUp(reqMsgFromPopup: MsgFromPopUp) {
    if (this.IsNotNullOrUndefinedBool('MsgFromPopUp', reqMsgFromPopup)){
      this.LogVal('requestMsgFromPopup', JSON.stringify(reqMsgFromPopup));
      this.LogVal('MsgFlag', StaticHelpers. MsgFlagAsString( reqMsgFromPopup.MsgFlag));

      this.DebugIDataContentPrefs(reqMsgFromPopup.CurrentContentPrefs);
      this.DebugPayloadDataFromPopUp(reqMsgFromPopup.Data);
    }
  }

  DebugPayloadDataFromPopUp(Data: PayloadDataFromPopUp) {
    if (this.IsNotNullOrUndefinedBool('PayloadDataFromPopUp', Data)) {
      this.LogVal('idOfSelect', Data.IdOfSelect);
      this.DebugIGuid(Data.IdOfSelect);
    }
  }

  DebugIDataContentPrefs(prefs: IDataContentPrefs) {
    if (this.IsNotNullOrUndefinedBool('MaxAutoSaveCount', prefs.MaxAutoSaveCount)) {
      this.LogVal('MaxAutoSaveCount', prefs.MaxAutoSaveCount);
    }
  }


  DebugPageDataMan(pageDataMan: PageDataManager) {
    if (this.IsNotNullOrUndefinedBool('pageDataMan', pageDataMan)) {
      this.DebugIDataBrowserWindow(pageDataMan.TopLevelWindow());
    }
  }

  DebugIDataBrowserWindow(browserWindow: IDataBrowserWindow) {
    if (this.IsNotNullOrUndefinedBool('IDataBrowserWindow', browserWindow)) {
      this.LogVal('Friendly', browserWindow.Friendly);
      this.LogVal('WindowType', scWindowType[browserWindow.WindowType]);

      this.DebugIDataOneDoc(browserWindow.DataDocSelf);
      this.DebugWindow(browserWindow.Window);
    }
  }



  //DebugIDataBrowserWindow(targetWindow: IDataBrowserWindow) {
  //  this.NotNullCheck('toReturn', targetWindow);
  //  this.NotNullCheck('toReturn', targetWindow.DataDocSelf);
  //  this.NotNullCheck('toReturn', targetWindow.DataDocSelf.Document);
  //  this.NotNullCheck('toReturn', targetWindow.DataDocSelf.Document.location);
  //  this.NotNullCheck('toReturn', targetWindow.DataDocSelf.Document.location.href);
  //  this.LogVal('targetWindow.DataDocSelf.Document.location.href', targetWindow.DataDocSelf.Document.location.href);
  //}

  DebugObjState(state: ICurrStateContent) {
    if (this.IsNotNullOrUndefinedBool('State', state)) {
      if (this.IsNotNullOrUndefinedBool('CurrentSnapShots', state.SnapShotsMany.CurrentSnapShots)) {
        this.LogVal('Snapshot count', state.SnapShotsMany.CurrentSnapShots.length);
      }
      if (this.IsNotNullOrUndefinedBool('PageType', state.WindowType)) {
        this.LogVal('scWindowType : ', scWindowType[state.WindowType]);
      }
      if (this.IsNotNullOrUndefinedBool('PageType', state.Url)) {
        this.LogVal('Url : ', state.Url);
      }
    }
  }

  DebugWindow(window: Window) {
    if (this.IsNotNullOrUndefinedBool('window', window)) {
    }
  }

  DebugIDataOneDoc(dataOneDoc: IDataOneDoc) {
    if (this.IsNotNullOrUndefinedBool('IDataOneDoc', dataOneDoc)) {
      if (this.IsNotNullOrUndefinedBool('Document', dataOneDoc.Document)) {
        this.LogVal('Doc Url', dataOneDoc.Document.location.href);
      }
    }
  }

  PromiseBucketDebug(promiseBucket: IDataBucketRestoreDesktop, friendlyName: string) {
    this.FuncStart(this.PromiseBucketDebug.name, friendlyName);
    this.Log('promiseBucket : ' + this.IsNullOrUndefined(promiseBucket));

    if (promiseBucket && typeof (promiseBucket) !== 'undefined') {
      this.Log('promiseBucket.IFramesbefore: ' + this.IsNullOrUndefined(promiseBucket.IFramesbefore));
      this.Log('promiseBucket.targetWindow: ' + this.IsNullOrUndefined(promiseBucket.targetWindow));
      this.Log('promiseBucket.oneCEdata: ' + this.IsNullOrUndefined(promiseBucket.oneCEdata));
      this.Log('promiseBucket.NewIframe: ' + this.IsNullOrUndefined(promiseBucket.NewIframe));
      if (promiseBucket.NewIframe) {
        this.DebugDataOneIframe(promiseBucket.NewIframe);
      }
    }
    this.FuncEnd(this.PromiseBucketDebug.name, friendlyName);
  }
  DebugDataOneIframe(dataOneIframe: IDataOneIframe) {
    this.FuncStart(this.DebugDataOneIframe.name);

    this.Log('dataOneIframe : ' + this.IsNullOrUndefined(dataOneIframe));

    if (dataOneIframe) {
      this.Log('dataOneIframe.Nickname : ' + dataOneIframe.Nickname);
      this.Log('dataOneIframe.IframeElem: \t' + this.IsNullOrUndefined(dataOneIframe.IframeElem));
      if (dataOneIframe.IframeElem) {
        this.Log('dataOneIframe.id: \t' + this.IsNullOrUndefined(dataOneIframe.IframeElem.id));
        //  //this.Log('dataOneIframe.IframeElem.src: \t' + this.IsNullOrUndefined(dataOneIframe.IframeElem.src));
        //  this.Log('dataOneIframe.IframeElem.id: \t' + this.IsNullOrUndefined(dataOneIframe.IframeElem.id));
        //  //this.Log('dataOneIframe.IframeElem.name: \t' + this.IsNullOrUndefined(dataOneIframe.IframeElem.name));
      }
      this.Log('dataOneIframe.ContentDoc: \t' + this.IsNullOrUndefined(dataOneIframe.ContentDoc));

      this.DebugIDataOneDoc(dataOneIframe.ContentDoc);

      //this.Log('dataOneIframe.IframeElem: \t' + this.IsNullOrUndefined(dataOneIframe.IframeElem));

      //this.Log('dataOneIframe.Id: \t' + this.IsNullOrUndefined(dataOneIframe.Id));
      //if (dataOneIframe.Id) {
      //  this.Log('dataOneIframe.Id.asShort: \t' + this.IsNullOrUndefined(dataOneIframe.Id.asShort));
      //}

      //this.Log('dataOneIframe.DocElem: \t' + this.IsNullOrUndefined(dataOneIframe.Index));
    }
    this.FuncEnd(this.DebugDataOneIframe.name);
  }
}