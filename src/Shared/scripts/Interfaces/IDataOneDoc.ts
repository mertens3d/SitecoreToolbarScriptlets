﻿import { IGuid } from "./IGuid";

export interface IDataOneDoc {
  ParentDoc: IDataOneDoc;
  DocId: IGuid;
  Document: Document;
  ParentDesktop: IGuid;
  HasParentDesktop: Boolean;
  Nickname: string;
}