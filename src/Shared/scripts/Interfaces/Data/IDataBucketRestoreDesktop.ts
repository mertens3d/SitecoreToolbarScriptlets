import { DocumentJacket } from "../../../../DOMJacket/scripts/Document/DocumentJacket";
import { IStateFullFrameProxy } from "../Proxies/StateFull/IStateFullFrameProxy";
import { IStateOfContentEditor } from "../StateOf/IStateOfContentEditor";

export interface IDataBucketRestoreDesktop {
  LastChainLinkSuccessful: boolean,
  IFramesbefore: IStateFullFrameProxy[],
  oneTreeState: IStateOfContentEditor,
  targetDocumentJacket: DocumentJacket,
}