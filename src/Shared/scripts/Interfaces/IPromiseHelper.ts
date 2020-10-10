﻿import { DocumentJacket } from "../../../DOMJacket/DocumentJacket";
import { DTFrameProxy } from "../../../HindSiteScUiProxy/scripts/Proxies/Desktop/DesktopProxy/FrameProxies/DTFrameProxy";
import { ReadyStateNAB } from "../Enums/ReadyState";
import { ISiteUrl } from "./IAbsoluteUrl";

export interface IRecipeBasics {
  TabChainSetHrefWaitForComplete(newHref: ISiteUrl);
  WaitForNewIframe(allIframeDataAtBeginning: any, documentJacket: DocumentJacket): Promise<DTFrameProxy>;
  WaitForCompleteNAB_DataOneDoc(targetDoc: DocumentJacket, friendly: string): Promise<ReadyStateNAB>;
  GetTopLevelIframe(targetDoc: DocumentJacket): Promise<DTFrameProxy>
}