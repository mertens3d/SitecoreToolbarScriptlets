import { ScDocumentFacade } from "../../../../HindSiteScUiProxy/Facades/ScDocumentFacade";
import { IStateOfContentEditor } from "./States/IStateOfContentEditor";
import { DTFrameProxy } from "../../../../HindSiteScUiProxy/scripts/Proxies/Desktop/DesktopProxy/FrameProxies/DTFrameProxy";

export interface IDataBucketRestoreDesktop {
  LastChainLinkSuccessful: boolean,
  IFramesbefore: DTFrameProxy[],
  oneTreeState: IStateOfContentEditor,
  targetDoc: ScDocumentFacade,
}