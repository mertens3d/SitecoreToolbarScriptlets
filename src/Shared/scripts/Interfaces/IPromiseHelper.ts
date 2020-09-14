﻿import { AbsoluteUrl } from "./AbsoluteUrl";
import { IDataPublishChain } from "./Data/IDataPublishChain";
import { IScVerSpec } from "./IScVerSpec";
import { IDataOneDoc } from "./data/IDataOneDoc";
import { _BaseFrameProxy } from "../../../Content/scripts/Proxies/_BaseFrameProxy";
//import { FrameProxy } from "./Data/Proxies/FrameProxy";

export interface IRecipeBasics {
  RaceWaitAndClick(scStartButton: IScVerSpec, arg1: IDataOneDoc);
  TabChainSetHrefWaitForComplete(newHref: AbsoluteUrl);
  TabWaitForReadyStateCompleteNative(browserTab: browser.tabs.Tab): Promise<void>;
  WaitForAndClickWithPayload(MenuDropDownPublishItem: string, docToPublish: IDataOneDoc, payload: IDataPublishChain);
  WaitForAndReturnFoundElem(ContentDoc: IDataOneDoc, SettingsHidden: string);
  WaitForAndReturnFoundElem(ContentDoc: IDataOneDoc, SettingsHidden: string, maxIteration: number);
  WaitForIframeElemAndReturnWhenReady(ContentDoc: IDataOneDoc, ContentIFrame1: string, arg2: string);
  WaitForNewIframe(allIframeDataAtBeginning: any, targetDoc: IDataOneDoc): Promise<_BaseFrameProxy>;
  WaitForReadyNABDocument(targetDoc: IDataOneDoc);
  WaitForReadyNABFrameProxy(jqIframe: _BaseFrameProxy): Promise<_BaseFrameProxy>;
  WaitForThenClick(arg0: string[], arg1: IDataOneDoc);
  GetTopLevelIframe(targetDoc: IDataOneDoc): Promise<_BaseFrameProxy>
}