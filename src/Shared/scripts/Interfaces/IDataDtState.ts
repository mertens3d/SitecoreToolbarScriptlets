import { IDataOneStorageCE } from "./IDataOneStorageCE";
import { IDataOneIframe } from "./IDataOneIframe";
import { OneCEManager } from "../../../Content/scripts/Managers/OneCEManager";

export interface IDataDtState {
  ActiveCeState: IDataOneStorageCE
  ActiveCeMan: OneCEManager;
  livingIframeAr: IDataOneIframe[];
  AllCeData: IDataOneStorageCE[]
}