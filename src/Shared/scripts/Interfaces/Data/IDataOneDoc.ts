import { GuidData } from "../../Helpers/GuidData";

export interface IDataOneDoc {
  //ParentDoc: IDataOneDoc;
  DocId: GuidData;
  ContentDoc: Document;
  Nickname: string;
}