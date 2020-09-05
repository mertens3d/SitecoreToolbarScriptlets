import { AbsoluteUrl } from "./AbsoluteUrl";
import { IDataOneDoc } from "./IDataOneDoc";
import { IDataOneIframe } from "./IDataOneIframe";
import { IDataPublishChain } from "./IDataPublishChain";
import { IScVerSpec } from "./IScVerSpec";

export interface IRecipeBasics {
  GetAllLiveIframeData(arg0: IDataOneDoc): Promise<IDataOneIframe[]>;
  RaceWaitAndClick(scStartButton: IScVerSpec, arg1: IDataOneDoc);
  TabChainSetHrefWaitForComplete(newHref: AbsoluteUrl);
  TabWaitForReadyStateCompleteNative(browserTab: browser.tabs.Tab): Promise<void>;
  WaitForAndClickWithPayload(MenuDropDownPublishItem: string, docToPublish: IDataOneDoc, payload: IDataPublishChain);
  WaitForAndReturnFoundElem(ContentDoc: IDataOneDoc, SettingsHidden: string);
  WaitForAndReturnFoundElem(ContentDoc: IDataOneDoc, SettingsHidden: string, maxIteration: number);
  WaitForIframeElemAndReturnWhenReady(ContentDoc: IDataOneDoc, ContentIFrame1: string, arg2: string);
  WaitForNewIframe(allIframeDataAtBeginning: any, targetDoc: IDataOneDoc): Promise<IDataOneIframe>;
  WaitForPageReadyNative(targetDoc: IDataOneDoc);
  WaitForReadyIframe(jqIframe: IDataOneIframe): Promise<null>;
  WaitForThenClick(arg0: string[], arg1: IDataOneDoc);
  GetTopLevelIframe(targetDoc: IDataOneDoc): Promise<IDataOneIframe>
}