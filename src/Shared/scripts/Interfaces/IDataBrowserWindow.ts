import { scWindowType } from '../Enums/scWindowType';

export interface IDataBrowserTab {
  //Window: Window,
  //DataDocSelf: IDataOneDoc;
  Tab: browser.tabs.Tab,
  ScWindowType: scWindowType
}