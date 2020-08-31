import { Guid } from "../Helpers/Guid";

export interface IDataOneDoc {
  //ParentDoc: IDataOneDoc;
  DocId: Guid;
  ContentDoc: Document;
  Nickname: string;
}