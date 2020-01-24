import { IDataBrowserWindow } from '../Interfaces/IDataBrowserWindow';
import { IGuid } from '../../JsShared/Interfaces/IGuid';

export interface IDataOneDoc {
  ParentDoc: IDataOneDoc;
  XyyzId: IGuid;
  IsCEDoc: Boolean;
  Document: Document;
  ParentDesktop: IGuid;
  HasParentDesktop: Boolean;
  Nickname: string;
}