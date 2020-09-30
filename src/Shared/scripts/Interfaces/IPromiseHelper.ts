import { IAbsoluteUrl } from "./IAbsoluteUrl";
import { IDataPublishChain } from "./Data/IDataPublishChain";
import { IScVerSpec } from "./IScVerSpec";
import { IDataOneDoc } from "./data/IDataOneDoc";
import { _BaseFrameProxy } from "../../../HindSiteScUiProxy/scripts/Proxies/Desktop/DesktopProxy/FrameProxies/_BaseFrameProxy";
import { DocumentReadyState, ReadyStateNAB } from "../Enums/ReadyState";

export interface IRecipeBasics {
  RaceWaitAndClick(scStartButton: IScVerSpec, arg1: IDataOneDoc);
  TabChainSetHrefWaitForComplete(newHref: IAbsoluteUrl);
  TabWaitForReadyStateCompleteNative(browserTab: browser.tabs.Tab): Promise<void>;
  WaitForAndClickWithPayload(MenuDropDownPublishItem: string, docToPublish: IDataOneDoc, payload: IDataPublishChain);
  WaitForAndReturnFoundElem(ContentDoc: IDataOneDoc, SettingsHidden: string);
  WaitForAndReturnFoundElem(ContentDoc: IDataOneDoc, SettingsHidden: string, maxIteration: number);
  WaitForIframeElemAndReturnWhenReady(ContentDoc: IDataOneDoc, ContentIFrame1: string, arg2: string): Promise<_BaseFrameProxy>;
  WaitForNewIframe(allIframeDataAtBeginning: any, targetDoc: IDataOneDoc): Promise<_BaseFrameProxy>;
  WaitForCompleteNABDataOneDoc(targetDoc: IDataOneDoc, friendly: string): Promise<ReadyStateNAB>;
  //WaitForReadyNABFrameProxy(jqIframe: _BaseFrameProxy): Promise<_BaseFrameProxy>;
  WaitForThenClick(arg0: string[], arg1: IDataOneDoc);
  GetTopLevelIframe(targetDoc: IDataOneDoc): Promise<_BaseFrameProxy>
}