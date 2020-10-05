import { ReadyStateNAB } from "../Enums/ReadyState";
import { ScDocumentFacade } from "../../../HindSiteScUiProxy/Facades/ScDocumentFacade";
import { IDataPublishChain } from "./Data/IDataPublishChain";
import { IAbsoluteUrl } from "./IAbsoluteUrl";
import { IScVerSpec } from "./IScVerSpec";
import { DTFrameProxy } from "../../../HindSiteScUiProxy/scripts/Proxies/Desktop/DesktopProxy/FrameProxies/DTFrameProxy";

export interface IRecipeBasics {
  //RaceWaitAndClick(scStartButton: IScVerSpec, arg1: ScDocumentProxy);
  TabChainSetHrefWaitForComplete(newHref: IAbsoluteUrl);
  TabWaitForReadyStateCompleteNative(browserTab: browser.tabs.Tab): Promise<void>;
  //WaitForAndClickWithPayload(MenuDropDownPublishItem: string, docToPublish: ScDocumentProxy, payload: IDataPublishChain);
  //WaitForAndReturnFoundElem(ContentDoc: ScDocumentProxy, SettingsHidden: string);
  //WaitForAndReturnFoundElem(ContentDoc: ScDocumentProxy, SettingsHidden: string, maxIteration: number);
  //WaitForIframeElemAndReturnWhenReady(ContentDoc: ScDocumentProxy, ContentIFrame1: string, arg2: string): Promise<DTFrameProxy>;
  WaitForNewIframe(allIframeDataAtBeginning: any, targetDoc: ScDocumentFacade): Promise<DTFrameProxy>;
  WaitForCompleteNAB_DataOneDoc(targetDoc: ScDocumentFacade, friendly: string): Promise<ReadyStateNAB>;
  //WaitForThenClick(arg0: string[], arg1: ScDocumentProxy);
  GetTopLevelIframe(targetDoc: ScDocumentFacade): Promise<DTFrameProxy>
}