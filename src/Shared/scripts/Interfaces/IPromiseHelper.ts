import { AbsoluteUrl } from "./AbsoluteUrl";
import { IDataBrowserTab } from "./IDataBrowserWindow";
import { IDataOneDoc } from "./IDataOneDoc";
import { IDataOneIframe } from "./IDataOneIframe";
import { IScVerSpec } from "./IScVerSpec";
import { IDataPublishChain } from "./IDataPublishChain";

export interface IPromiseHelper {
    WaitForAndClickWithPayload(MenuDropDownPublishItem: string, docToPublish: IDataOneDoc, payload: IDataPublishChain);
    TabWaitForReadyStateCompleteNative(Tab: browser.tabs.Tab);
    RaceWaitAndClick(scStartButton: IScVerSpec, arg1: IDataOneDoc);
    WaitForReadyIframe(jqIframe: IDataOneIframe);
  WaitForAndReturnFoundElem(ContentDoc: IDataOneDoc, SettingsHidden: string);
  WaitForAndReturnFoundElem(ContentDoc: IDataOneDoc, SettingsHidden: string, maxIteration: number);
    WaitForIframeElemAndReturnWhenReady(ContentDoc: IDataOneDoc, ContentIFrame1: string, arg2: string);
    WaitForThenClick(arg0: string[], arg1: IDataOneDoc);
    TabChainSetHrefWaitForComplete(newHref: AbsoluteUrl, CurrentTabData: IDataBrowserTab);
}
