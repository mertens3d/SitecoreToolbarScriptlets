import { HelperBase } from "../Classes/HelperBase";
import { IDataOneDoc } from "../Interfaces/IDataOneDoc";
import { IDataOneWindowStorage } from "../Interfaces/IDataOneWindowStorage";
import { scWindowType } from "../Enums/scWindowType";
import { SnapShotFlavor } from "../Enums/SnapShotFlavor";
import { IDataDesktopState } from "../Interfaces/IDataDtState";
import { IDataOneIframe } from "../Interfaces/IDataOneIframe";
import { IFactoryHelper } from "../Interfaces/IFactoryHelper";
import { Guid } from "./Guid";

export class FactoryHelper extends HelperBase implements IFactoryHelper {
  CreateNewDtDataShell(): IDataDesktopState {
    var toReturn: IDataDesktopState = {
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
        DocId: Guid.NewRandomGuid(),
        Nickname: dataOneIframe.Nickname + ' - content doc'
      }
    } else {
      this.Logger.ErrorAndThrow(this.DataOneContentDocFactoryFromIframe.name, 'no iframe provided');
    }
    return toReturn;
  }
  DataOneIframeFactory(iframeElem: HTMLIFrameElement, nickname: string): IDataOneIframe {
    this.Logger.FuncStart(this.DataOneIframeFactory.name);
    var toReturn: IDataOneIframe = null;

    if (iframeElem && nickname) {
      let zIndex: number = -1;
      if (iframeElem && iframeElem.style && iframeElem.style.zIndex) {
        zIndex = parseInt(iframeElem.style.zIndex);
      }

      var toReturn: IDataOneIframe = {
        Index: -1,
        IframeElem: iframeElem,
        Id: Guid.NewRandomGuid(),
        Zindex: zIndex,
        Nickname: nickname,
        ContentDoc: null,
      };

      toReturn.ContentDoc = this.DataOneContentDocFactoryFromIframe(toReturn);

      this.Logger.FuncEnd(this.DataOneIframeFactory.name);
    } else {
      this.Logger.ErrorAndThrow(this.DataOneIframeFactory.name, 'one of these is null');
      this.Logger.LogAsJsonPretty('iframeElem', iframeElem);
      this.Logger.LogAsJsonPretty('nickname', nickname);
    }
    return toReturn;
  }
  CreateShellIDataOneWindowStorage(windowType: scWindowType, flavor: SnapShotFlavor): IDataOneWindowStorage {
    this.Logger.FuncStart(this.CreateShellIDataOneWindowStorage.name);
    var dateToUse: Date = new Date();
    var newGuid: Guid = Guid.NewRandomGuid();

    var activeWindowSnapShot: IDataOneWindowStorage = {
      TimeStamp: dateToUse,
      TimeStampFriendly: this.HelperAgent.UtilityHelp.MakeFriendlyDate(dateToUse),
      WindowType: windowType,
      WindowFriendly: windowType[windowType],
      AllCEAr: [],
      Id: newGuid,
      NickName: '',
      RawData: null,
      Flavor: flavor,
    };

    this.Logger.FuncEnd(this.CreateShellIDataOneWindowStorage.name);

    return activeWindowSnapShot;
  }
}