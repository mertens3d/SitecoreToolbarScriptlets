import { IGuid } from "./IGuid";

export interface IDataOneDoc {
  ParentDoc: IDataOneDoc;
  DocId: IGuid;
  IsCEDoc: Boolean;
  Document: Document;
  ParentDesktop: IGuid;
  HasParentDesktop: Boolean;
  Nickname: string;
}