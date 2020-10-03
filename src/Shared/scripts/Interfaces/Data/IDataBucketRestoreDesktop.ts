import { ScDocumentProxy } from "../../../../HindSiteScUiProxy/scripts/Proxies/ScDocumentProxy";
import { IStateOfContentEditor } from "./States/IStateOfContentEditor";
import { DTFrameProxy } from "../../../../HindSiteScUiProxy/scripts/Proxies/Desktop/DesktopProxy/FrameProxies/DTFrameProxy";

export interface IDataBucketRestoreDesktop {
  LastChainLinkSuccessful: boolean,
  IFramesbefore: DTFrameProxy[],
  oneTreeState: IStateOfContentEditor,
  targetDoc: ScDocumentProxy,
}