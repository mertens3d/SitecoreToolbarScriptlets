import { scWindowType } from '../Enums/scWindowType';
import { UrlParts } from './UrlParts';

export interface IDataBrowserTab {
  //Window: Window,
  //DataDocSelf: IDataOneDoc;
  Tab: browser.tabs.Tab,
  ScWindowType: scWindowType,
  UrlParts: UrlParts,
}