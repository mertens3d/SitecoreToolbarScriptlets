import { _BaseFrameProxy } from "../../../HindSiteScUiProxy/scripts/Proxies/Desktop/DesktopProxy/FrameProxies/_BaseFrameProxy";
import { ReadyStateNAB } from "../Enums/ReadyState";
import { IDataOneDoc } from "./data/IDataOneDoc";
import { IDataPublishChain } from "./Data/IDataPublishChain";
import { IAbsoluteUrl } from "./IAbsoluteUrl";
import { IScVerSpec } from "./IScVerSpec";

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
  WaitForThenClick(arg0: string[], arg1: IDataOneDoc);
  GetTopLevelIframe(targetDoc: IDataOneDoc): Promise<_BaseFrameProxy>
}