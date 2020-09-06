import { IDataOneDoc } from "../Data/IDataOneDoc";

export interface IToastAgent {
  PopUpToastNotification(targetDoc: IDataOneDoc, ScreenMessage: string);
}
