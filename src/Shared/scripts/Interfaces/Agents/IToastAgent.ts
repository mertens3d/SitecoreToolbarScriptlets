import { IDataOneDoc } from "../Data/IDataOneDoc";

export interface IToastAgent {
  RaiseToastNotification(targetDoc: IDataOneDoc, ScreenMessage: string);
}
