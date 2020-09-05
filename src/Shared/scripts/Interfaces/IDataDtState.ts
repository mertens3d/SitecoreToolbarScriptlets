import { IDataOneStorageOneTreeState } from "./IDataOneStorageOneTreeState";
import { IDataOneIframe } from "./IDataOneIframe";
import { OneCEAgent } from "../../../Content/scripts/Agents/OneCEAgent/OneCEAgent";

export interface IDataDesktopState {
  ActiveCeState: IDataOneStorageOneTreeState
  ActiveCeMan: OneCEAgent;
  livingIframeAr: IDataOneIframe[];
  AllCeData: IDataOneStorageOneTreeState[]
}