import { IGuid } from "./IGuid";

export interface IDataOneDoc {
  //ParentDoc: IDataOneDoc;
  DocId: IGuid;
  ContentDoc: Document;
  Nickname: string;
}