import { DocumentJacket } from "../../../DOMJacket/DocumentJacket";
import { DTFrameProxy } from "../../../HindSiteScUiProxy/scripts/Proxies/Desktop/DesktopProxy/FrameProxies/DTFrameProxy";
import { ReadyStateNAB } from "../Enums/ReadyState";
import { ISiteUrl } from "./IAbsoluteUrl";

export interface IRecipeBasics {
  //RaceWaitAndClick(scStartButton: IScVerSpec, arg1: ScDocumentProxy);
  TabChainSetHrefWaitForComplete(newHref: ISiteUrl);
  TabWaitForReadyStateCompleteNative(browserTab: browser.tabs.Tab): Promise<void>;
  //WaitForAndClickWithPayload(MenuDropDownPublishItem: string, docToPublish: ScDocumentProxy, payload: IDataPublishChain);
  //WaitForAndReturnFoundElem(ContentDoc: ScDocumentProxy, SettingsHidden: string);
  //WaitForAndReturnFoundElem(ContentDoc: ScDocumentProxy, SettingsHidden: string, maxIteration: number);
  //WaitForIframeElemAndReturnWhenReady(ContentDoc: ScDocumentProxy, ContentIFrame1: string, arg2: string): Promise<DTFrameProxy>;
  WaitForNewIframe(allIframeDataAtBeginning: any, documentJacket: DocumentJacket): Promise<DTFrameProxy>;
  WaitForCompleteNAB_DataOneDoc(targetDoc: DocumentJacket, friendly: string): Promise<ReadyStateNAB>;
  //WaitForThenClick(arg0: string[], arg1: ScDocumentProxy);
  GetTopLevelIframe(targetDoc: DocumentJacket): Promise<DTFrameProxy>
}