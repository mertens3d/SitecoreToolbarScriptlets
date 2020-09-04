import { IDataOneDoc } from "../IDataOneDoc";

export interface IToastAgent {
  PopUpToastNotification(targetDoc: IDataOneDoc, ScreenMessage: string);
}
