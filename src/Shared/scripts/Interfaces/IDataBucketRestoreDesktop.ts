import { IDataOneIframe } from "./IDataOneIframe";
import { IDataOneStorageCE } from "../../../Shared/scripts/Interfaces/IDataOneStorageCE";
import { IDataOneDoc } from "../../../Shared/scripts/Interfaces/IDataOneDoc";
import { UrlParts } from "./UrlParts";

export interface IDataBucketRestoreDesktop {
  LastChainLinkSuccessful: boolean,
  IFramesbefore: IDataOneIframe[],
  NewIframe: IDataOneIframe;
  oneCEdata: IDataOneStorageCE,
  targetDoc: IDataOneDoc,
}