import { IDataOneDoc } from './IDataOneDoc';
import { scWindowType } from '../Enums/scWindowType';

export interface IDataBrowserWindow {
  Window: Window,
  DataDocSelf: IDataOneDoc;
  //Id: IGuid,
  Friendly: string,
  WindowType: scWindowType
}

