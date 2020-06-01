import { IDataOneIframe } from "./IDataOneIframe";
import { scWindowType } from "../Enums/scWindowType";
import { SnapShotFlavor } from "../Enums/SnapShotFlavor";
import { IDataOneWindowStorage } from "./IDataOneWindowStorage";
import { IDataOneDoc } from "./IDataOneDoc";
import { IDataDesktopState } from "./IDataDtState";

export interface IFactoryHelper {
  CreateNewDtDataShell(): IDataDesktopState;
  CreateShellIDataOneWindowStorage(CurrentPageType: scWindowType, Flavor: SnapShotFlavor): IDataOneWindowStorage;
  DataOneContentDocFactoryFromIframe(toReturnIframeData: IDataOneIframe): IDataOneDoc;
  DataOneIframeFactory(arg0: HTMLIFrameElement, iframeNickName: string): IDataOneIframe;
}