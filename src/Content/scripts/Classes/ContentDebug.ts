import { BaseDebug } from "../../../Shared/scripts/Classes/debug";
import { IDataOneIframe } from "../../../Shared/scripts/Interfaces/IDataOneIframe";
import { IDataBucketRestoreDesktop } from "../../../Shared/scripts/Interfaces/IDataBucketRestoreDesktop";
import { PageDataManager } from "../Managers/PageDataManager";
import { IDataBrowserWindow } from "../../../Shared/scripts/Interfaces/IDataBrowserWindow";
import { IDataOneDoc } from "../../../Shared/scripts/Interfaces/IDataOneDoc";
import { scWindowType } from "../../../Shared/scripts/Enums/scWindowType";
import { ICurrState } from "../../../Shared/scripts/Interfaces/ICurrState";

export class ContentDebug extends BaseDebug {
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



  DebugObjState(state: ICurrState) {
    if (this.IsNotNullOrUndefinedBool('State', state)) {
      if (this.IsNotNullOrUndefinedBool('CurrentSnapShots', state.CurrentSnapShots)) {
        this.LogVal('Snapshot count', state.CurrentSnapShots.length);
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