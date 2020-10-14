import { DocumentJacket } from "../../../DOMJacket/Document/DocumentJacket";
import { DTFrameProxy } from "../../../HindSiteScUiProxy/scripts/Proxies/Desktop/DesktopProxy/FrameProxies/DTFrameProxy";
import { ReadyStateNAB } from "../Classes/ReadyState";
import { ISiteUrl } from "./IAbsoluteUrl";

export interface IRecipeBasics {
  //WaitForNewIframek(allIframeDataAtBeginning: any, documentJacket: DocumentJacket): Promise<DTFrameProxy>;
  WaitForCompleteNAB_DataOneDoc(targetDoc: DocumentJacket, friendly: string): Promise<ReadyStateNAB>;
  //GetTopLevelIframe(targetDoc: DocumentJacket): Promise<DTFrameProxy>
}