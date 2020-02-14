import { HelperBase } from "../Classes/HelperBase";
import { IDataOneDoc } from "../Interfaces/IDataOneDoc";
import { IDataOneWindowStorage } from "../Interfaces/IDataOneWindowStorage";
import { scWindowType } from "../Enums/scWindowType";
import { SnapShotFlavor } from "../Enums/SnapShotFlavor";
import { IGuid } from "../Interfaces/IGuid";
import { IDataDtState } from "../Interfaces/IDataDtState";


export class FactoryHelper extends HelperBase {
    

  DataOneContentDocFactoryFromIframe(IframeElem: HTMLIFrameElement, parentDocument: IDataOneDoc, nickname: string): IDataOneDoc {
    var toReturn: IDataOneDoc = {
      ParentDoc: parentDocument,
      Document: IframeElem.contentDocument,
      DocId: this.HelperHub.GuidHelp.NewGuid(),
      ParentDesktop: null,
      Nickname: nickname + ' - content doc'
    }
    return toReturn;
  }
  CreateNewDtDataShell(): IDataDtState {

    var toReturn: IDataDtState = {
      AllCeData: [],
      livingIframeAr: [],
      ActiveCeMan: null
    }

    return toReturn;
  }


  CreateShellIDataOneWindowStorage(windowType: scWindowType, flavor: SnapShotFlavor): IDataOneWindowStorage {
    this.Debug.FuncStart(this.CreateShellIDataOneWindowStorage.name);
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
    this.Debug.FuncEnd(this.CreateShellIDataOneWindowStorage.name);

    return activeWindowSnapShot;
  }
}
