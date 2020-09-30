import { _BaseFrameProxy } from "../../../../HindSiteScUiProxy/scripts/Proxies/Desktop/DesktopProxy/FrameProxies/_BaseFrameProxy";
import { IDataOneDoc } from "./IDataOneDoc";
import { IStateOfContentEditor } from "./States/IStateOfContentEditor";

export interface IDataBucketRestoreDesktop {
  LastChainLinkSuccessful: boolean,
  IFramesbefore: _BaseFrameProxy[],
  oneTreeState: IStateOfContentEditor,
  targetDoc: IDataOneDoc,
}