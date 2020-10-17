import { DocumentJacket } from "../../../../DOMJacket/Document/DocumentJacket";
import { DTFrameProxy } from "../../../../HindSiteScUiProxy/scripts/Proxies/Desktop/DesktopProxy/FrameProxies/DTFrameProxy";
import { IStateOfContentEditor } from "../StateOf/IStateOfContentEditor";

export interface IDataBucketRestoreDesktop {
  LastChainLinkSuccessful: boolean,
  IFramesbefore: DTFrameProxy[],
  oneTreeState: IStateOfContentEditor,
  targetDocumentJacket: DocumentJacket,
}