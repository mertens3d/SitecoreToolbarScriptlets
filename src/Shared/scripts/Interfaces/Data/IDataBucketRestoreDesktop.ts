import { DocumentJacket } from "../../../../DOMJacket/scripts/Document/DocumentJacket";
import { IScFrameProxy } from "../ScProxies/IStateFullFrameProxy";
import { IStateOfContentEditor } from "../StateOf/IStateOfContentEditor";

export interface IDataBucketRestoreDesktop {
  LastChainLinkSuccessful: boolean,
  IFramesbefore: IScFrameProxy[],
  oneTreeState: IStateOfContentEditor,
  targetDocumentJacket: DocumentJacket,
}