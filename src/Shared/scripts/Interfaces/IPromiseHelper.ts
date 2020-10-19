import { DocumentJacket } from "../../../DOMJacket/Document/DocumentJacket";
import { ReadyStateNAB } from "../Classes/ReadyStateNAB";

export interface IRecipeBasics {
  //WaitForNewIframek(allIframeDataAtBeginning: any, documentJacket: DocumentJacket): Promise<DTFrameProxy>;
  WaitForCompleteNAB_DataOneDoc(targetDoc: DocumentJacket, friendly: string): Promise<ReadyStateNAB>;
  //GetTopLevelIframe(targetDoc: DocumentJacket): Promise<DTFrameProxy>
}