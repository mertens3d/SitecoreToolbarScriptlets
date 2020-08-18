import { IDataOneDoc } from "../IDataOneDoc";

export interface IToastAgent {
  NotifyCompleteOnContent(targetDoc: IDataOneDoc, ScreenMessage: string);
}
