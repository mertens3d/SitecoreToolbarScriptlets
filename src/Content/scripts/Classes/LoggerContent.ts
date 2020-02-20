import { LoggerBase } from "../../../Shared/scripts/Classes/LoggerBase";
import { IDataBucketRestoreDesktop } from "../../../Shared/scripts/Interfaces/IDataBucketRestoreDesktop";
import { IDataOneDoc } from "../../../Shared/scripts/Interfaces/IDataOneDoc";
import { ICurrStateContent } from "../../../Shared/scripts/Interfaces/ICurrState";
import { MsgFromPopUp } from "../../../Shared/scripts/Classes/MsgFromPopUp";
import { PayloadDataFromPopUp } from "../../../Shared/scripts/Classes/PayloadDataReqPopUp";
import { StaticHelpers } from "../../../Shared/scripts/Classes/StaticHelpers";
import { IDataPayloadSnapShot } from "../../../Shared/scripts/Classes/IDataPayloadSnapShot";
import { IDataOneIframe } from "../../../Shared/scripts/Interfaces/IDataOneIframe";
export class LoggerContent extends LoggerBase {

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


    DebugPayloadDataFromPopUp(data: PayloadDataFromPopUp) {
        if (this.IsNotNullOrUndefinedBool('PayloadDataFromPopUp', data)) {
            this.LogVal('idOfSelect', data.IdOfSelect);
            this.DebugIGuid(data.IdOfSelect);
            this.DebugIDataPayloadSnapShot(data.SnapShotSettings);
        }
    }
    DebugIDataPayloadSnapShot(snapShotSettings: IDataPayloadSnapShot) {
        if (this.IsNotNullOrUndefinedBool('IDataPayloadSnapShot', snapShotSettings)) {
            this.LogVal('Flavor', StaticHelpers.FlavorAsString(snapShotSettings.Flavor));
            this.LogVal('Nickname', snapShotSettings.SnapShotNewNickname);
        }
    }
  //DebugIDataContentPrefs(prefs: IOneGenericSetting) {
  //      if (this.IsNotNullOrUndefinedBool('IDataContentPrefs', prefs)) {
  //          if (this.IsNotNullOrUndefinedBool('MaxAutoSaveCount', prefs.MaxAutoSaveCount)) {
  //              this.LogVal('MaxAutoSaveCount', prefs.MaxAutoSaveCount);
  //          }
  //      }
  //  }
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
            //if (this.IsNotNullOrUndefinedBool('PageType', state.WindowType)) {
            //  this.LogVal('scWindowType : ', scWindowType[state.WindowType]);
            //}
            //if (this.IsNotNullOrUndefinedBool('PageType', state.Url)) {
            //  this.LogVal('Url : ', state.Url);
            //}
        }
    }
    DebugIDataOneDoc(dataOneDoc: IDataOneDoc) {
        if (this.IsNotNullOrUndefinedBool('IDataOneDoc', dataOneDoc)) {
            if (this.IsNotNullOrUndefinedBool('Document', dataOneDoc.ContentDoc)) {
                this.LogVal('Doc Url', dataOneDoc.ContentDoc.location.href);
            }
        }
    }
    PromiseBucketDebug(promiseBucket: IDataBucketRestoreDesktop, friendlyName: string) {
        this.FuncStart(this.PromiseBucketDebug.name, friendlyName);
        this.Log('promiseBucket : ' + this.IsNullOrUndefined(promiseBucket));
        if (promiseBucket && typeof (promiseBucket) !== 'undefined') {
            this.Log('promiseBucket.IFramesbefore: ' + this.IsNullOrUndefined(promiseBucket.IFramesbefore));
            //this.Log('promiseBucket.targetWindow: ' + this.IsNullOrUndefined(promiseBucket.targetWindow));
            this.Log('promiseBucket.oneCEdata: ' + this.IsNullOrUndefined(promiseBucket.oneCEdata));
            this.Log('promiseBucket.NewIframe: ' + this.IsNullOrUndefined(promiseBucket.NewIframe));
            if (promiseBucket.NewIframe) {
                this.DebugDataOneIframe(promiseBucket.NewIframe);
            }
        }
        this.FuncEnd(this.PromiseBucketDebug.name, friendlyName);
    }
}
