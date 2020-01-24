import { IDataBrowserWindow } from '../Interfaces/IDataBrowserWindow';
import { IDataOneStorageCE } from '../Interfaces/IDataOneStorageCE';
import { IDataOneIframe } from '../Interfaces/IDataOneIframe';
import { IDataOneDoc } from '../Interfaces/IDataOneDoc';

export interface IDataBucketRestoreDesktop {
  LastChainLinkSuccessful: boolean,
  targetWindow: IDataBrowserWindow,
  IFramesbefore: IDataOneIframe[],
  NewIframe: IDataOneIframe;
  oneCEdata: IDataOneStorageCE,
  targetDoc: IDataOneDoc,
}