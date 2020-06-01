import { IDataOneStorageCE } from "./IDataOneStorageCE";
import { IDataOneIframe } from "./IDataOneIframe";
import { OneCEAgent } from "../../../Content/scripts/Managers/OneCEAgent";

export interface IDataDesktopState {
  ActiveCeState: IDataOneStorageCE
  ActiveCeMan: OneCEAgent;
  livingIframeAr: IDataOneIframe[];
  AllCeData: IDataOneStorageCE[]
}