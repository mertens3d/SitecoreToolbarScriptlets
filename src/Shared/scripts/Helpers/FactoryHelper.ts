import { HelperBase } from "../Classes/HelperBase";
import { IDataOneDoc } from "../Interfaces/IDataOneDoc";
import { IDataOneWindowStorage } from "../Interfaces/IDataOneWindowStorage";
import { scWindowType } from "../Enums/scWindowType";
import { SnapShotFlavor } from "../Enums/SnapShotFlavor";
import { IGuid } from "../Interfaces/IGuid";
import { IDataDtState } from "../Interfaces/IDataDtState";
import { IDataOneIframe } from "../Interfaces/IDataOneIframe";

export class FactoryHelper extends HelperBase {
  CreateNewDtDataShell(): IDataDtState {
    var toReturn: IDataDtState = {
      AllCeData: [],
      livingIframeAr: [],
      ActiveCeMan: null,
      ActiveCeState: null
    }

    return toReturn;
  }
  DataOneContentDocFactoryFromIframe(dataOneIframe: IDataOneIframe): IDataOneDoc {
    //IframeElem: HTMLIFrameElement, nickname: string
    var toReturn: IDataOneDoc = null;

    if (dataOneIframe) {
      toReturn =
      {
        //ParentDoc: parentDocument,
        ContentDoc: dataOneIframe.IframeElem.contentDocument,
        DocId: this.HelperHub.GuidHelp.NewGuid(),
        Nickname: dataOneIframe.Nickname + ' - content doc'
      }
    } else {
      this.AllHelperAgents.LoggerAgent.Error(this.DataOneContentDocFactoryFromIframe.name, 'no iframe provided');
    }
    return toReturn;
  }
  DataOneIframeFactory(iframeElem: HTMLIFrameElement, nickname: string): IDataOneIframe {
    this.AllHelperAgents.LoggerAgent.FuncStart(this.DataOneIframeFactory.name);
    var toReturn: IDataOneIframe = null;

    if (iframeElem && nickname) {
      let zIndex: number = -1;
      if (iframeElem && iframeElem.style && iframeElem.style.zIndex) {
        zIndex = parseInt(iframeElem.style.zIndex);
      }

      var toReturn: IDataOneIframe = {
        Index: -1,
        IframeElem: iframeElem,
        Id: this.HelperHub.GuidHelp.NewGuid(),
        Zindex: zIndex,
        Nickname: nickname,
        ContentDoc:null,
      };

      toReturn.ContentDoc = this.DataOneContentDocFactoryFromIframe(toReturn);

      this.AllHelperAgents.LoggerAgent.FuncEnd(this.DataOneIframeFactory.name);
    } else {
      this.AllHelperAgents.LoggerAgent.Error(this.DataOneIframeFactory.name, 'one of these is null');
      this.AllHelperAgents.LoggerAgent.LogAsJsonPretty('iframeElem', iframeElem);
      this.AllHelperAgents.LoggerAgent.LogAsJsonPretty('nickname', nickname);
    }
    return toReturn;
  }
  CreateShellIDataOneWindowStorage(windowType: scWindowType, flavor: SnapShotFlavor): IDataOneWindowStorage {
    this.AllHelperAgents.LoggerAgent.FuncStart(this.CreateShellIDataOneWindowStorage.name);
    var dateToUse: Date = new Date();
    var newGuid: IGuid = this.GuidHelp().NewGuid();

    var activeWindowSnapShot: IDataOneWindowStorage = {
      TimeStamp: dateToUse,
      WindowType: windowType,
      WindowFriendly: windowType[windowType],
      AllCEAr: [],
      Id: newGuid,
      NickName: '',
      RawData: null,
      Flavor: flavor,
    };
    this.AllHelperAgents.LoggerAgent.FuncEnd(this.CreateShellIDataOneWindowStorage.name);

    return activeWindowSnapShot;
  }
}