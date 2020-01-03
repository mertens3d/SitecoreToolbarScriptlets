import { IDataBrowserWindow } from '../Interfaces/IDataBrowserWindow';

export interface IDataOneDoc {
  ParentDoc: IDataOneDoc;
  XyyzId: IGuid;
  IsCEDoc: Boolean;
  Document: Document;
  ParentDesktop: IGuid;
  HasParentDesktop: Boolean;
  Nickname: string;
}