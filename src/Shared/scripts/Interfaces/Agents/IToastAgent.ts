import { IDataOneDoc } from "../IDataOneDoc";

export interface IToastAgent {
  Notify(targetDoc: IDataOneDoc, ScreenMessage: string);
}
