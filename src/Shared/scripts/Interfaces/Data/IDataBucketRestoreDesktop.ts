import { DocumentJacket } from "../../../../DOMJacket/DocumentJacket";
import { DTFrameProxy } from "../../../../HindSiteScUiProxy/scripts/Proxies/Desktop/DesktopProxy/FrameProxies/DTFrameProxy";
import { IStateOfContentEditor } from "./States/IStateOfContentEditor";

export interface IDataBucketRestoreDesktop {
  LastChainLinkSuccessful: boolean,
  IFramesbefore: DTFrameProxy[],
  oneTreeState: IStateOfContentEditor,
  targetDocumentJacket: DocumentJacket,
}