import { IDataBrowserWindow } from "../../../Shared/scripts/Interfaces/IDataBrowserWindow";
import { IDataOneIframe } from "./IDataOneIframe";
import { IDataOneStorageCE } from "../../../Shared/scripts/Interfaces/IDataOneStorageCE";
import { IDataOneDoc } from "../../../Shared/scripts/Interfaces/IDataOneDoc";

export interface IDataBucketRestoreDesktop {
  LastChainLinkSuccessful: boolean,
  targetWindow: IDataBrowserWindow,
  IFramesbefore: IDataOneIframe[],
  NewIframe: IDataOneIframe;
  oneCEdata: IDataOneStorageCE,
  targetDoc: IDataOneDoc,
}