import { IDataOneDoc } from './IDataOneDoc';
import { scWindowType } from '../Enums/scWindowType';

export interface IDataBrowserTab {
  //Window: Window,
  //DataDocSelf: IDataOneDoc;
  Tab: browser.tabs.Tab,
  Friendly: string,
  ScWindowType: scWindowType
}