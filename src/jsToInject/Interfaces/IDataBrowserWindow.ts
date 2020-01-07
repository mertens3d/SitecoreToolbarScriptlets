import { scWindowType } from '../enums/scWindowType';
import { IDataOneDoc } from '../Interfaces/IDataOneDoc';

export interface IDataBrowserWindow {
  Window: Window,
  DataDocSelf: IDataOneDoc;
  //Id: IGuid,
  Friendly: String,
  WindowType: scWindowType
}

